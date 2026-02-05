
  # METAIA Tailor App Design

  This is a code bundle for METAIA Tailor App Design. The original project is available at https://www.figma.com/design/YC1YnYOEjnAP51A0OY6MOA/METAIA-Tailor-App-Design.

  ## Features

  - 🔐 User authentication (Email/Phone + Password)
  - 🌐 **Google OAuth Login** (One-click sign in)
  - 📱 OTP verification
  - 🛍️ Order management
  - 👔 Custom measurements
  - 💳 Payment integration
  - ⭐ Reviews and ratings
  - 🔔 Notifications

  ## Quick Start

  ### Frontend
  ```bash
  npm install
  npm run dev
  ```

  ### Backend
  ```bash
  cd backend
  npm install
  npm run dev
  ```

  ## Google Login Setup

  To enable Google OAuth login:
  
  1. **Quick Setup**: Follow [GOOGLE_LOGIN_QUICKSTART.md](./GOOGLE_LOGIN_QUICKSTART.md)
  2. **Detailed Guide**: See [GOOGLE_LOGIN_SETUP.md](./GOOGLE_LOGIN_SETUP.md)
  3. **Testing**: Check [TESTING_GOOGLE_LOGIN.md](./TESTING_GOOGLE_LOGIN.md)

  **TL;DR**: Get Google OAuth credentials, add them to `backend/.env`, and restart servers.

  ## Project Structure

  ```
  ├── src/                  # Frontend React app
  │   ├── components/       # UI components
  │   ├── services/         # API services
  │   └── styles/          # Global styles
  ├── backend/             # Express.js backend
  │   ├── config/          # Database & OAuth config
  │   ├── controllers/     # Route handlers
  │   ├── models/          # MongoDB models
  │   ├── routes/          # API routes
  │   └── middleware/      # Auth middleware
  └── docs/                # Documentation
  ```

  ## Environment Setup

  Create `backend/.env` file with:
  ```env
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/metaia_tailor
  JWT_SECRET=your_secret_key
  FRONTEND_URL=http://localhost:3000
  
  # Google OAuth (optional, for Google login)
  GOOGLE_CLIENT_ID=your_client_id
  GOOGLE_CLIENT_SECRET=your_client_secret
  ```

  ## Documentation

  - [Google Login Checklist](./GOOGLE_LOGIN_CHECKLIST.md)
  - [Google Login Implementation](./GOOGLE_LOGIN_IMPLEMENTATION.md)
  - [Measurement System Guide](./MEASUREMENT_SYSTEM_GUIDE.md)
  - [Quick Reference](./QUICK_REFERENCE.md)
  
