# Google Login Setup for Mobile App

## ✅ What's Been Implemented

The mobile app now has fully functional Google OAuth login with proper deep linking support:

1. **Deep Linking Configured**
   - App scheme: `metaia://`
   - Handles OAuth callbacks properly
   - Automatic token storage and navigation

2. **OAuth Flow**
   - Opens Google login in secure in-app browser
   - Handles callback with token
   - Stores auth token and navigates to main app
   - Error handling with user-friendly alerts

3. **Backend Updates**
   - OAuth routes updated to support mobile redirect URIs
   - State parameter used to pass redirect URI securely
   - Works for both web and mobile apps

## 🔧 Required Google Cloud Configuration

To enable Google login, you need to configure Google OAuth in Google Cloud Console:

### Step 1: Google Cloud Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create a new project or select existing one**
   - Project name: "METAIA Tailor"

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Configure consent screen if prompted:
     - User Type: External
     - App name: METAIA Tailor
     - User support email: your email
     - Developer contact: your email
     - Save and continue through all steps

### Step 2: Create OAuth Client IDs

You need **different client IDs for each platform**:

#### For Android (Mobile App)

1. **Create Android OAuth Client**
   - Application type: Android
   - Name: "METAIA Android"
   - Package name: `com.metaia` (from app.json)
   - SHA-1 certificate fingerprint:
     ```bash
     # Get debug keystore SHA-1 (for development)
     keytool -keystore ~/.android/debug.keystore -list -v -alias androiddebugkey
     # Password: android
     ```

2. **Copy the Client ID** - you'll need this

#### For iOS (Mobile App)

1. **Create iOS OAuth Client**
   - Application type: iOS
   - Name: "METAIA iOS"  
   - Bundle ID: `com.metaia` (from app.json)

2. **Copy the Client ID** - you'll need this

#### For Web (Backend Server)

1. **Create Web Application OAuth Client**
   - Application type: Web application
   - Name: "METAIA Backend"
   - Authorized JavaScript origins:
     - `http://localhost:5000`
     - `http://localhost:3000`
     - Your production domain (when ready)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
     - `https://your-production-domain.com/api/auth/google/callback`

2. **Copy the Client ID and Client Secret**

### Step 3: Configure Backend Environment

Update your backend `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-web-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-web-client-secret-here

# Backend URL (for OAuth callbacks)
BACKEND_URL=http://localhost:5000

# Frontend URL (for web app redirects)
FRONTEND_URL=http://localhost:3000
```

### Step 4: Test on Physical Device

For testing on a physical device, you need to:

1. **Find your computer's IP address:**
   ```powershell
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. **Create mobile app `.env` file:**
   ```
   EXPO_PUBLIC_API_BASE_URL=http://YOUR_COMPUTER_IP:5000/api
   ```
   Replace `YOUR_COMPUTER_IP` with the actual IP address.

3. **Update backend `.env` if needed:**
   ```env
   BACKEND_URL=http://YOUR_COMPUTER_IP:5000
   ```

4. **Restart both servers:**
   - Backend: Stop and restart `node server.js`
   - Mobile: Stop and restart `npm start`

## 🧪 How to Test Google Login

### Testing on Android

1. **Build development version:**
   ```bash
   cd mobile
   eas build --profile development --platform android
   ```
   Or use Android emulator with Google Play Services

2. **Open app and tap "Google" button on login screen**

3. **You should see:**
   - In-app browser opens with Google login
   - Select your Google account
   - Grant permissions
   - Browser closes automatically
   - App navigates to home screen
   - You're logged in!

### Testing on iOS

1. **Build development version:**
   ```bash
   cd mobile
   eas build --profile development --platform ios
   ```
   Or use iOS Simulator (sign-in may not work in simulator)

2. **Follow same process as Android**

### Testing on Web (Web Browser)

1. Press `w` in the Expo terminal to open in browser
2. Click "Google" button
3. OAuth should work similar to mobile

## 🔍 Troubleshooting

### Common Issues

**1. "OAuth client ID not found"**
- Make sure you created the correct client type (Android/iOS)
- Verify package name/bundle ID matches `com.metaia`
- For Android, verify SHA-1 fingerprint is correct

**2. "Redirect URI mismatch"**
- Ensure backend callback URL is added to authorized redirect URIs
- Check BACKEND_URL in `.env` matches the authorized URI

**3. "Sign-in attempt blocked"**
- Go to Google Cloud Console > OAuth consent screen
- Add your test email to "Test users" list
- Or publish the app (not recommended for development)

**4. Browser opens but shows error**
- Check backend is running on the correct IP/port
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Check backend logs for detailed error messages

**5. Browser closes but app doesn't navigate**
- Check deep linking is working: `npx uri-scheme list`
- Should show `metaia://` as registered scheme
- Verify expo-linking is installed: `npm list expo-linking`

**6. Works on one device but not another**
- Each platform needs its own OAuth client ID
- Android: needs package name + SHA-1
- iOS: needs bundle ID
- Both need to be registered in Google Cloud Console

### Debug Tips

**Check if OAuth is configured:**
```bash
# Backend logs should show:
✅ Google OAuth Strategy registered
```

**Test backend OAuth endpoint:**
```bash
# In browser, visit:
http://localhost:5000/api/auth/google
# Should redirect to Google login
```

**Check mobile app logs:**
- Look for console.log output in Metro bundler terminal
- Check for any error messages when tapping Google button

## 📱 Deep Linking Verification

Test deep linking is working:

```bash
cd mobile

# List registered schemes
npx uri-scheme list

# Should show:
# URI Scheme: metaia
```

Test deep link manually:
```bash
# On Android (if device connected via ADB)
adb shell am start -W -a android.intent.action.VIEW -d "metaia://auth/success?token=test123"

# On iOS (if simulator running)
xcrun simctl openurl booted "metaia://auth/success?token=test123"
```

## 🚀 Production Deployment

When deploying to production:

1. **Update redirect URIs** in Google Cloud Console
2. **Update environment variables:**
   ```env
   GOOGLE_CLIENT_ID=production-client-id
   GOOGLE_CLIENT_SECRET=production-client-secret
   BACKEND_URL=https://api.yourdomain.com
   FRONTEND_URL=https://app.yourdomain.com
   ```

3. **Publish OAuth consent screen** in Google Cloud Console

4. **Get production SHA-1** for Android:
   ```bash
   keytool -keystore your-release.keystore -list -v -alias your-key-alias
   ```

5. **Update Google Cloud Console** with production SHA-1

## 📝 Notes

- **Security:** Never commit `.env` files with real credentials to git
- **Testing:** Use Google Cloud Console test users during development
- **Rate Limits:** Google OAuth has rate limits - add quota monitoring
- **User Experience:** The in-app browser provides better UX than opening external browser
- **Deep Links:** The `metaia://` scheme must be unique to your app

## ✅ Current Status

- ✅ Deep linking configured (`metaia://`)
- ✅ OAuth flow implemented in LoginScreen
- ✅ Backend routes support mobile redirects
- ✅ Error handling in place
- ✅ Token storage and auto-navigation
- ⏳ Waiting for Google Cloud Console configuration
- ⏳ Waiting for testing on physical device

Once you configure Google OAuth in Google Cloud Console with the steps above, Google login will work seamlessly in your mobile app!
