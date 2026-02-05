// Quick verification script for Google Login setup
// Run with: node backend/verify-google-setup.js

require('dotenv').config();

console.log('\n🔍 METAIA Google Login Setup Verification\n');
console.log('='.repeat(50));

// Check Node modules
console.log('\n📦 Checking Dependencies...');
try {
  require('passport');
  console.log('  ✅ passport installed');
} catch (e) {
  console.log('  ❌ passport NOT installed - Run: npm install');
}

try {
  require('passport-google-oauth20');
  console.log('  ✅ passport-google-oauth20 installed');
} catch (e) {
  console.log('  ❌ passport-google-oauth20 NOT installed - Run: npm install');
}

// Check environment variables
console.log('\n⚙️  Checking Environment Variables...');

const requiredVars = {
  'PORT': process.env.PORT,
  'MONGODB_URI': process.env.MONGODB_URI,
  'JWT_SECRET': process.env.JWT_SECRET,
  'FRONTEND_URL': process.env.FRONTEND_URL,
  'GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID,
  'GOOGLE_CLIENT_SECRET': process.env.GOOGLE_CLIENT_SECRET,
};

let allVarsSet = true;
for (const [key, value] of Object.entries(requiredVars)) {
  if (value && !value.startsWith('your_') && !value.startsWith('YOUR_')) {
    console.log(`  ✅ ${key} is set`);
  } else {
    console.log(`  ⚠️  ${key} needs to be configured`);
    if (key.includes('GOOGLE')) {
      allVarsSet = false;
    }
  }
}

// Check file structure
console.log('\n📁 Checking File Structure...');
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'config/passport.js',
  'routes/auth.js',
  'models/User.js',
  'controllers/authController.js',
  'server.js',
];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} missing`);
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📋 Summary:\n');

if (allVarsSet) {
  console.log('✅ All Google OAuth credentials are configured!');
  console.log('\n🚀 You can now start the server and test Google login:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Open: http://localhost:3000');
  console.log('   3. Click "Continue with Google"');
} else {
  console.log('⚠️  Google OAuth credentials need to be configured.');
  console.log('\n📖 Follow these guides:');
  console.log('   - Quick start: GOOGLE_LOGIN_QUICKSTART.md');
  console.log('   - Detailed setup: GOOGLE_LOGIN_SETUP.md');
  console.log('   - Checklist: GOOGLE_LOGIN_CHECKLIST.md');
  console.log('\n🔧 Steps:');
  console.log('   1. Get credentials from Google Cloud Console');
  console.log('   2. Update backend/.env file');
  console.log('   3. Run this script again to verify');
}

console.log('\n' + '='.repeat(50) + '\n');
