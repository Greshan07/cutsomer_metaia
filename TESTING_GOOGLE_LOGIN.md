# Testing Google Login

This document provides quick steps to test if Google Login is working correctly.

## Quick Setup (For Testing Only)

1. **Get Google OAuth Credentials:**
   - Follow the detailed guide in [GOOGLE_LOGIN_SETUP.md](./GOOGLE_LOGIN_SETUP.md)
   - Or use these quick steps:
     - Go to [Google Cloud Console](https://console.cloud.google.com/)
     - Create project → Enable APIs → Configure OAuth → Get credentials

2. **Configure Environment:**
   ```bash
   cd backend
   # Edit .env file and add your Google credentials:
   # GOOGLE_CLIENT_ID=your_id_here.apps.googleusercontent.com
   # GOOGLE_CLIENT_SECRET=your_secret_here
   ```

3. **Start Services:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm install
   npm run dev

   # Terminal 2 - Frontend
   cd ..
   npm install
   npm run dev
   ```

4. **Test Login:**
   - Open http://localhost:3000
   - Click "Continue with Google"
   - Sign in with your Google account
   - You should be redirected back and logged in

## Expected Flow

```
User clicks Google button
    ↓
Frontend → http://localhost:5000/api/auth/google
    ↓
Backend redirects → Google OAuth page
    ↓
User authenticates with Google
    ↓
Google redirects → http://localhost:5000/api/auth/google/callback
    ↓
Backend creates/finds user + generates JWT
    ↓
Backend redirects → http://localhost:3000/auth/success?token=...
    ↓
Frontend saves token and shows home screen
```

## Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] `.env` file has valid Google credentials
- [ ] Google Console has correct redirect URI: `http://localhost:5000/api/auth/google/callback`
- [ ] Your email is added as a test user in Google OAuth consent screen

## Common Issues

### "redirect_uri_mismatch"
**Fix:** Add `http://localhost:5000/api/auth/google/callback` to Google Console authorized redirect URIs

### "GOOGLE_CLIENT_ID is not defined"
**Fix:** Check `.env` file has correct values and restart backend server

### "Access blocked"
**Fix:** Add your email as a test user in Google OAuth consent screen

### Backend returns 500 error
**Fix:** Check backend console logs. Likely MongoDB connection issue or missing environment variables

## Verify Setup

Run these commands to verify your setup:

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check environment variables (in backend directory)
node -e "require('dotenv').config(); console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set ✓' : 'Missing ✗')"
```

## Debug Mode

Enable detailed logging:

1. Open `backend/config/passport.js`
2. Add console.logs in the Google strategy callback
3. Check backend terminal for authentication flow logs

## Success Criteria

✅ Clicking Google button redirects to Google
✅ After Google auth, redirected back to app
✅ User is logged in (can see home screen)
✅ User data is saved in MongoDB
✅ JWT token is stored in localStorage

## Next Steps

Once Google login works:
- Test with different Google accounts
- Test existing user linking (use same email)
- Test profile updates
- Configure for production deployment
