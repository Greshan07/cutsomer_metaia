# ✅ Google Login Setup Checklist

Use this checklist to set up Google Login. Check off each item as you complete it.

## Prerequisites
- [ ] Have a Google account
- [ ] MongoDB is installed and running locally

## Google Cloud Console Setup

### Create Project
- [ ] Go to https://console.cloud.google.com/
- [ ] Create a new project (or select existing)
- [ ] Note your project name: ________________

### Configure OAuth Consent Screen
- [ ] Navigate to "APIs & Services" > "OAuth consent screen"
- [ ] Select "External" user type
- [ ] Fill in app name: METAIA Tailor App
- [ ] Add your email as support email
- [ ] Add your email as developer contact
- [ ] Click "Save and Continue" through all screens
- [ ] Add yourself as a test user

### Create OAuth Credentials
- [ ] Navigate to "APIs & Services" > "Credentials"
- [ ] Click "Create Credentials" > "OAuth client ID"
- [ ] Select "Web application"
- [ ] Name it: METAIA Web Client
- [ ] Add Authorized JavaScript origin: `http://localhost:3000`
- [ ] Add Authorized JavaScript origin: `http://localhost:5000`
- [ ] Add Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
- [ ] Click "Create"
- [ ] Copy your Client ID: ________________
- [ ] Copy your Client Secret: ________________

## Backend Configuration

- [ ] Open `backend/.env` file
- [ ] Replace `GOOGLE_CLIENT_ID` with your actual Client ID
- [ ] Replace `GOOGLE_CLIENT_SECRET` with your actual Client Secret
- [ ] Verify `FRONTEND_URL=http://localhost:3000`
- [ ] Verify `MONGODB_URI` is correct
- [ ] Save the file

## Start Application

### Terminal 1 - Backend
- [ ] Open terminal in project root
- [ ] Run: `cd backend`
- [ ] Run: `npm install` (if first time)
- [ ] Run: `npm run dev`
- [ ] Verify: Backend running on port 5000 ✓

### Terminal 2 - Frontend
- [ ] Open new terminal in project root
- [ ] Run: `npm install` (if first time)
- [ ] Run: `npm run dev`
- [ ] Verify: Frontend running on port 3000 ✓

## Test Google Login

- [ ] Open browser: http://localhost:3000
- [ ] See the login screen
- [ ] Click "Continue with Google" button
- [ ] Redirected to Google login page
- [ ] Sign in with your Google account
- [ ] Grant permissions when asked
- [ ] Redirected back to app
- [ ] See home screen (logged in) 🎉

## Verify User Created

- [ ] Check MongoDB database (optional)
- [ ] Look for your user in `users` collection
- [ ] Verify `googleId` field is populated
- [ ] Verify `isEmailVerified` is `true`

## Common Issues & Fixes

If you get **"redirect_uri_mismatch"**:
- [ ] Double-check redirect URI in Google Console
- [ ] Make sure it's exactly: `http://localhost:5000/api/auth/google/callback`
- [ ] No trailing slash
- [ ] No typos

If you get **"Access blocked"**:
- [ ] Go to Google Console > OAuth consent screen
- [ ] Scroll to "Test users"
- [ ] Add your email address
- [ ] Try logging in again

If you get **"GOOGLE_CLIENT_ID is not defined"**:
- [ ] Check `.env` file has the values
- [ ] Restart backend server (Ctrl+C then `npm run dev`)
- [ ] Clear browser cache

If **MongoDB connection fails**:
- [ ] Check if MongoDB is running
- [ ] Run: `mongo` or `mongosh` in terminal to verify
- [ ] Check `MONGODB_URI` in `.env` file

## Success Indicators

✅ You should see these if everything works:

- Backend logs: "METAIA Backend Server running on port 5000"
- Frontend: Login screen loads properly
- Google: Redirects to Google OAuth page
- After login: Home screen appears
- localStorage: Has `authToken` key
- MongoDB: User document created

## Notes

- In development, you need to be added as a "test user"
- Google may show warnings about unverified app (normal for development)
- Once configured, you can login with any test user you add
- For production, you'll need to verify the app with Google

## Need Help?

- 📖 Quick guide: `GOOGLE_LOGIN_QUICKSTART.md`
- 📖 Detailed setup: `GOOGLE_LOGIN_SETUP.md`
- 📖 Testing guide: `TESTING_GOOGLE_LOGIN.md`
- 📖 Implementation details: `GOOGLE_LOGIN_IMPLEMENTATION.md`

---

**Status**: 
- [ ] Not started
- [ ] In progress
- [ ] ✅ Complete and working!

**Date completed**: _______________
