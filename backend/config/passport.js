const passport = require('passport');
const User = require('../models/User');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // Check if email already exists
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            phone: `GOOGLE_${profile.id}`, // Placeholder, user can update later
            password: Math.random().toString(36).slice(-16), // Random password
            role: 'customer',
            isEmailVerified: true,
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  
  console.log('✅ Google OAuth Strategy registered');
} else {
  console.log('⚠️  Google OAuth not configured - GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing');
}

// Apple OAuth Strategy
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID) {
  const AppleStrategy = require('passport-apple');
  
  passport.use(
    new AppleStrategy(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        callbackURL: '/api/auth/apple/callback',
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION || './apple_key.p8',
      },
      async (accessToken, refreshToken, idToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ appleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // Check if email already exists
          if (profile.email) {
            user = await User.findOne({ email: profile.email });

            if (user) {
              // Link Apple account to existing user
              user.appleId = profile.id;
              await user.save();
              return done(null, user);
            }
          }

          // Create new user
          user = await User.create({
            appleId: profile.id,
            name: profile.name?.firstName 
              ? `${profile.name.firstName} ${profile.name.lastName || ''}`.trim()
              : 'Apple User',
            email: profile.email || `apple_${profile.id}@metaia.com`,
            phone: `APPLE_${profile.id}`, // Placeholder
            password: Math.random().toString(36).slice(-16),
            role: 'customer',
            isEmailVerified: !!profile.email,
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
