# METAIA Mobile App

React Native mobile application for METAIA Tailor - Your Perfect Fit Awaits.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Android Studio (for Android emulator) or Xcode (for iOS simulator, macOS only)

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

After starting the development server, you can:

**On Physical Device:**
1. Open Expo Go app on your phone
2. Scan the QR code from the terminal
3. App will load automatically

**On Emulator:**
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

**In Browser:**
- Press `w` to open in web browser

## 🔧 Configuration

### Backend Connection

The app connects to the backend API. For local development:

1. **Local Machine Testing:**
   - Default: `http://localhost:5000/api`
   - No configuration needed

2. **Physical Device Testing:**
   - Create `.env` file in the `mobile` folder:
     ```
     EXPO_PUBLIC_API_BASE_URL=http://<your-computer-ip>:5000/api
     ```
   - Replace `<your-computer-ip>` with your computer's IP address on the local network
   - Ensure your phone and computer are on the same WiFi network
   - Restart the Expo server after creating the `.env` file

3. **Production:**
   - Update `.env` with your production API URL:
     ```
     EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
     ```

### Finding Your Computer's IP Address

**Windows:**
```bash
ipconfig
# Look for IPv4 Address under your active network adapter
```

**macOS/Linux:**
```bash
ifconfig | grep "inet "
# Or
ip addr show
```

## 📱 Features

### ✅ Implemented

- **Authentication**
  - Splash screen with auto-login
  - Login with phone/email and password
  - Google OAuth integration
  - Apple OAuth integration
  - Phone number verification (OTP)
  - Registration
  - Password reset

- **Navigation**
  - Bottom tab navigation (Home, Orders, Profile)
  - Stack navigation for screens
  - Safe area support for notched devices

- **Home Screen**
  - Category selection (Men, Women, Kids)
  - Popular styles carousel
  - Quick order initiation

- **Orders**
  - Order tracking
  - Order history
  - Order flow stepper

- **Profile**
  - User information display
  - Settings management
  - Reviews
  - About page
  - Logout

### 🚧 Ready for Implementation

- Complete order flow steps:
  - Order type selection
  - Outfit design customization
  - Measurements input
  - Tailor selection
  - Price estimation
  - Payment integration
  - Order placement confirmation

## 🎨 Design System

### Colors

```typescript
goldLight: '#F5E6D3'
gold: '#D4AF37'
goldDark: '#C5A028'
maroon: '#7A1F1F'
maroonDark: '#1A0A0A'
white: '#FFFFFF'
```

### Typography

- **Headings:** Bold (700), 24-32px
- **Body:** Regular (400-600), 14-16px
- **Captions:** Regular (400), 12-14px

### Spacing

- **Small:** 8-12px
- **Medium:** 16-24px
- **Large:** 28-32px

## 📂 Project Structure

```
mobile/
├── assets/              # Images, fonts, icons
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── PrimaryButton.tsx
│   │   └── ScreenContainer.tsx
│   ├── navigation/      # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/         # App screens
│   │   ├── auth/        # Authentication screens
│   │   ├── home/        # Main app screens
│   │   └── order/       # Order flow screens
│   ├── services/        # API services
│   │   └── api.ts
│   └── theme/           # Design tokens
│       └── colors.ts
├── App.tsx              # Root component
├── index.ts             # Entry point
└── package.json
```

## 🔌 API Integration

### Authentication

```typescript
import { authAPI } from './services/api';

// Login
await authAPI.login({ phone: '1234567890', password: 'password' });

// Register
await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  password: 'password'
});

// Logout
await authAPI.logout();

// Get current user
const user = await authAPI.getCurrentUser();
```

### Orders

```typescript
import { ordersAPI } from './services/api';

// Create order
await ordersAPI.create(orderData);

// Get my orders
const orders = await ordersAPI.getMyOrders();
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Start with cache clear
npm start -- --clear

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web
```

### Code Style

- TypeScript for type safety
- Functional components with hooks
- StyleSheet for styling (no inline styles)
- Safe area handling for all screens

## 📦 Dependencies

### Core
- React Native (via Expo)
- React Navigation (navigation)
- Expo Linear Gradient (gradients)
- AsyncStorage (local storage)

### UI
- lucide-react-native (icons)
- react-native-safe-area-context (safe areas)
- react-native-gesture-handler (gestures)
- react-native-reanimated (animations)

## 🐛 Troubleshooting

### Common Issues

**1. Metro bundler port in use:**
```bash
# Kill the process on port 8081
npx react-native start --reset-cache
```

**2. Cannot connect to backend on physical device:**
- Verify computer and phone are on same WiFi
- Check `.env` file has correct IP address
- Ensure backend server is running
- Try accessing `http://<your-ip>:5000` in phone's browser

**3. Expo Go app crashes:**
- Clear Expo cache: `npm start -- --clear`
- Restart Expo Go app
- Update Expo Go to latest version

**4. Build errors after installing packages:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

## 📱 Building for Production

### Android (APK)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build -p android --profile preview
```

### iOS (IPA - macOS only)

```bash
# Build IPA
eas build -p ios --profile preview
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test on both iOS and Android
4. Submit a pull request

## 📄 License

Copyright © 2026 METAIA. All rights reserved.

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review the backend README for API setup
- Ensure all environment variables are configured correctly
