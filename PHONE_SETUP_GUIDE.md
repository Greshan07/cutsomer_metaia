# Setup Guide for Phone Access with Google Login

## Step 1: Update Environment Variables

1. Find your computer's IP address (use one from: 192.168.16.1, 192.168.37.1, or 192.168.1.39)
2. Edit `backend/.env` file:
   ```
   BACKEND_URL=http://192.168.1.39:5000
   FRONTEND_URL=http://192.168.1.39:3000
   ```
   Replace `192.168.1.39` with your actual IP address.

## Step 2: Update Google Cloud Console

1. Go to https://console.cloud.google.com
2. Navigate to "APIs & Services" > "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", add these URLs:
   ```
   http://localhost:5000/api/auth/google/callback
   http://192.168.1.39:5000/api/auth/google/callback
   http://192.168.16.1:5000/api/auth/google/callback
   http://192.168.37.1:5000/api/auth/google/callback
   ```
   (Replace IPs with your actual network IPs)
5. Click "Save"

## Step 3: Restart Servers

1. Stop both frontend and backend servers
2. Run backend: `cd backend && npm start`
3. Run frontend: `npm run dev`

## Step 4: Access on Phone

1. Connect phone to same WiFi network
2. Open browser on phone
3. Navigate to: `http://192.168.1.39:3000` (use your IP)
4. Google login should now work!

## Troubleshooting

- Make sure firewall allows connections on ports 3000 and 5000
- Verify phone and computer are on same WiFi network
- Check that backend server shows your network IPs when starting
- Google OAuth redirect URIs may take a few minutes to propagate
