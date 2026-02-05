# Google Login Setup Guide

This guide will walk you through setting up Google OAuth authentication for the METAIA Tailor App.

## Prerequisites

- A Google Account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "METAIA Tailor App")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the User Type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: METAIA Tailor App
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click "Save and Continue"
6. On the "Scopes" page, click "Save and Continue" (default scopes are sufficient)
7. On the "Test users" page, add your email for testing
8. Click "Save and Continue"
9. Review and click "Back to Dashboard"

## Step 4: Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the Application type
4. Enter a name (e.g., "METAIA Web Client")
5. Under "Authorized JavaScript origins", add:
   - `http://localhost:3000`
   - `http://localhost:5000`
6. Under "Authorized redirect URIs", add:
   - `http://localhost:5000/api/auth/google/callback`
7. Click "Create"
8. Copy the **Client ID** and **Client Secret** that appear

## Step 5: Update Backend Configuration

1. Open `backend/.env` file
2. Replace the placeholder values with your actual credentials:
   ```env
   GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   ```
3. Make sure `FRONTEND_URL` is set correctly:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

## Step 6: Start the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   npm install
   npm run dev
   ```

## Step 7: Test Google Login

1. Open your browser and navigate to `http://localhost:3000`
2. Click on the "Continue with Google" button
3. You should be redirected to Google's login page
4. Sign in with your Google account
5. Grant permissions when prompted
6. You should be redirected back to the app and logged in

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:5000/api/auth/google/callback`
- Check for trailing slashes - they matter!

### "Error: GOOGLE_CLIENT_ID is not defined"
- Ensure your `.env` file has the correct values
- Restart the backend server after updating the `.env` file

### "Access blocked: This app's request is invalid"
- Make sure you've added your email as a test user in the OAuth consent screen
- Verify that the OAuth consent screen is properly configured

### Backend not connecting
- Check that MongoDB is running
- Verify the `MONGODB_URI` in your `.env` file is correct

## Production Deployment

When deploying to production:

1. Update the OAuth consent screen to "In Production" status
2. Add your production domain to "Authorized JavaScript origins"
3. Add your production callback URL to "Authorized redirect URIs"
4. Update the `.env` file with production values:
   ```env
   FRONTEND_URL=https://yourdomain.com
   ```

## Security Notes

- **Never commit your `.env` file** to version control
- Keep your Client Secret secure
- Rotate credentials regularly
- Use environment variables for all sensitive data

## How It Works

1. User clicks "Continue with Google" button
2. Frontend redirects to backend route: `/api/auth/google`
3. Backend (Passport.js) redirects to Google's OAuth page
4. User authenticates with Google
5. Google redirects back to: `/api/auth/google/callback`
6. Backend creates/updates user account and generates JWT token
7. Backend redirects to frontend with token: `/auth/success?token=...`
8. Frontend saves token and logs user in

## Support

If you encounter any issues not covered here, please check:
- Backend console logs for errors
- Browser console for frontend errors
- Network tab in browser DevTools to see request/response details
