# Quick Start: Enable Google Login

Follow these 3 simple steps to enable Google Login in your METAIA Tailor App:

## Step 1: Get Google OAuth Credentials (5 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:3000`, `http://localhost:5000`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
6. Copy the **Client ID** and **Client Secret**

📖 **Detailed guide:** See [GOOGLE_LOGIN_SETUP.md](./GOOGLE_LOGIN_SETUP.md)

## Step 2: Configure Backend (1 minute)

1. Open `backend/.env`
2. Replace these lines with your actual credentials:
   ```env
   GOOGLE_CLIENT_ID=paste_your_client_id_here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
   ```
3. Save the file

## Step 3: Start the Application (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

## Test It!

1. Open http://localhost:3000
2. Click the **"Continue with Google"** button
3. Sign in with your Google account
4. You should be redirected back and logged in! 🎉

## Troubleshooting

### Getting "redirect_uri_mismatch" error?
- Double-check the redirect URI in Google Console: `http://localhost:5000/api/auth/google/callback`
- No trailing slashes!

### Getting "Access blocked" error?
- Add your email as a test user in Google Console > "OAuth consent screen" > "Test users"

### Backend not starting?
- Make sure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file

## What's Already Set Up

✅ Frontend "Continue with Google" button
✅ Backend OAuth routes and handlers  
✅ User model with Google ID support
✅ JWT token generation and storage
✅ Automatic user creation on first login
✅ Session management

## You Only Need To:

1. Get Google credentials
2. Add them to `.env` file
3. Start the servers

That's it! 🚀

## Need More Help?

- **Full setup guide:** [GOOGLE_LOGIN_SETUP.md](./GOOGLE_LOGIN_SETUP.md)
- **Testing guide:** [TESTING_GOOGLE_LOGIN.md](./TESTING_GOOGLE_LOGIN.md)
- **Backend logs:** Check the terminal running `npm run dev` in the backend folder
- **Frontend logs:** Open browser console (F12) and check for errors

## Production Deployment

When you're ready to deploy:
1. Update the redirect URIs in Google Console with your production domain
2. Update `FRONTEND_URL` in `.env` to your production frontend URL
3. Keep your credentials secure and never commit `.env` to git
