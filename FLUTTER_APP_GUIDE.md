# 🚀 METAIA Flutter App - Complete Implementation Guide

## Overview

This Flutter app is a complete, production-ready custom tailoring platform with:
- ✅ Industry-standard UI/UX (Ajio/Myntra level)
- ✅ Real-time Socket.IO notifications
- ✅ Complete order workflow (8 steps)
- ✅ Riverpod state management
- ✅ API integration with backend
- ✅ Payment gateway (Razorpay)
- ✅ OAuth authentication
- ✅ 60 FPS animations

## 📦 Installation

### 1. Install Flutter Dependencies
```bash
cd flutter_app
flutter pub get
```

### 2. Generate Code (for Freezed Models)
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 3. Configure Backend URL
Edit `lib/core/constants/api_constants.dart`:
```dart
static const String baseUrl = 'http://YOUR_SERVER_IP:5000/api';
static const String socketUrl = 'http://YOUR_SERVER_IP:5000';
```

### 4. Configure Firebase (Optional)
1. Create Firebase project
2. Add Android & iOS apps
3. Download configuration files:
   - `google-services.json` → `android/app/`
   - `GoogleService-Info.plist` → `ios/Runner/`
4. Enable Firebase Cloud Messaging

### 5. Configure OAuth
**Google Sign-In:**
- Get OAuth client ID from Google Cloud Console
- Add SHA-1 fingerprint for Android
- Update `android/app/src/main/AndroidManifest.xml`

**Apple Sign-In:**
- Enable in Xcode capabilities
- Configure in Apple Developer Console

### 6. Configure Razorpay
Edit `lib/widgets/payment_widget.dart`:
```dart
'key': 'YOUR_RAZORPAY_KEY_ID',
```

## 🏗️ Project Structure

```
lib/
├── core/
│   ├── constants/
│   │   └── api_constants.dart        # API endpoints & Socket events
│   └── theme/
│       ├── app_theme.dart            # Theme configuration
│       └── app_animations.dart       # Animation utilities
│
├── models/                            # Data models (Freezed)
│   ├── user_model.dart
│   ├── order_model.dart
│   ├── notification_model.dart
│   └── tailor_model.dart
│
├── providers/                         # Riverpod state management
│   ├── auth_provider.dart            # Authentication state
│   ├── order_provider.dart           # Order state
│   └── notification_provider.dart    # Notification state
│
├── services/
│   ├── api_service.dart              # HTTP API client (Dio)
│   ├── socket_service.dart           # Socket.IO client
│   └── notification_service.dart     # Firebase + Local notifications
│
├── screens/
│   ├── splash/
│   │   └── splash_screen.dart        # Animated splash
│   ├── auth/
│   │   ├── login_screen.dart
│   │   ├── registration_screen.dart
│   │   └── forgot_password_screen.dart
│   ├── home/
│   │   ├── premium_home_screen.dart  # Main home (Ajio/Myntra style)
│   │   └── customer_home_screen.dart # Original home
│   ├── order/
│   │   ├── complete_order_flow_screen.dart  # 8-step workflow
│   │   └── order_flow_screen.dart           # Original flow
│   ├── orders/
│   │   └── orders_screen.dart        # Order list & history
│   └── notifications/
│       └── notifications_screen.dart  # Notification center
│
├── widgets/                          # Reusable components
│   ├── custom_button.dart
│   ├── custom_text_field.dart
model   ├── custom_search_bar.dart
│   ├── category_chip.dart
│   ├── premium_product_card.dart
│   ├── banner_card.dart
│   ├── animated_step_indicator.dart
│   ├── measurement_form.dart
│   ├── tailor_selection_widget.dart
│   ├── fabric_selection_widget.dart
│   ├── style_selection_widget.dart
│   └── payment_widget.dart
│
└── main.dart                         # App entry point
```

## 🎨 Key Components

### 1. Premium Home Screen
**File:** `lib/screens/home/premium_home_screen.dart`

Features:
- Hero banners with auto-carousel
- Smooth page indicators
- Category chips with animations
- Flash deals section with countdown
- Product grid with shimmer loading
- Wishlist functionality
- Pull-to-refresh

### 2. Complete Order Flow
**File:** `lib/screens/order/complete_order_flow_screen.dart`

8 Steps:
1. **Order Type** - Select garment type
2. **Measurements** - Input body measurements
3. **Fabric** - Choose fabric type & quality
4. **Style** - Select design preferences
5. **Tailor** - Pick expert tailor
6. **Summary** - Review order & pricing
7. **Payment** - Razorpay integration
8. **Confirmation** - Success screen

### 3. Real-Time Notifications
**File:** `lib/services/socket_service.dart`

Features:
- Auto-connect on app start
- JWT authentication in socket handshake
- Event listeners: `order_update`, `new_notification`, `payment_update`
- Automatic reconnection
- Room-based broadcasting

### 4. State Management
**File:** `lib/providers/auth_provider.dart`

Riverpod providers:
- `authStateProvider` - User authentication state
- `orderProvider` - Order management
- `notificationProvider` - Notification state

## 🔧 Configuration Files

### pubspec.yaml
Key dependencies:
```yaml
dependencies:
  # State Management
  flutter_riverpod: ^2.4.9
  
  # Networking
  dio: ^5.4.0
  socket_io_client: ^2.0.3
  
  # Real-time
  firebase_messaging: ^14.7.9
  flutter_local_notifications: ^16.3.0
  
  # UI
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  lottie: ^3.0.0
  carousel_slider: ^4.2.1
  
  # Payment
  razorpay_flutter: ^1.3.6
  
  # Auth
  google_sign_in: ^6.2.1
  sign_in_with_apple: ^5.0.0
```

### Android Configuration
**File:** `android/app/build.gradle`
```gradle
android {
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
    }
}
```

### iOS Configuration
**File:** `ios/Runner/Info.plist`
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library</string>
```

## 🎭 Animations

### Page Transitions
```dart
// Fade
Navigator.push(context, FadePageRoute(page: TargetScreen()));

// Slide
Navigator.push(context, SlidePageRoute(page: TargetScreen()));

// Scale
Navigator.push(context, ScalePageRoute(page: TargetScreen()));
```

### Component Animations
- **Shimmer Loading:** Product cards, banners
- **Hover Effects:** Buttons, cards
- **Slide Animations:** Form steps
- **Bounce Effects:** Logo, icons

## 🌐 API Integration

### Authentication
```dart
// Login
final authNotifier = ref.read(authStateProvider.notifier);
await authNotifier.login(email, password);

// Check auth state
final authState = ref.watch(authStateProvider);
if (authState.isAuthenticated) {
  // User is logged in
}
```

### Orders
```dart
// Create order
final orderNotifier = ref.read(orderProvider.notifier);
await orderNotifier.createOrder(orderData);

// Get orders
final orderState = ref.watch(orderProvider);
final orders = orderState.orders;
```

### Notifications
```dart
// Get notifications
final notificationState = ref.watch(notificationProvider);
final notifications = notificationState.notifications;

// Mark as read
ref.read(notificationProvider.notifier).markAsRead(notificationId);
```

## 🔔 Real-Time Updates

### Socket Connection
```dart
// Auto-connects in main.dart
SocketService().connect();

// Listen to events
socketService.onOrderUpdate((data) {
  // Update UI
  ref.read(orderProvider.notifier).updateOrderFromSocket(data);
});

socketService.onNewNotification((data) {
  // Show notification
  NotificationService().showNotification(
    title: data['title'],
    body: data['message'],
  );
});
```

## 💳 Payment Integration

### Razorpay Setup
1. Sign up at https://razorpay.com
2. Get API keys from dashboard
3. Update `lib/widgets/payment_widget.dart`
4. Test with test mode keys first

### Payment Flow
1. User reaches payment step
2. Amount calculated from order summary
3. Razorpay checkout opens
4. User completes payment
5. Backend verifies payment
6. Order status updated
7. Real-time notification sent

## 🧪 Testing

### Run Tests
```bash
flutter test
```

### Test Coverage
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
```

### Manual Testing Checklist
- [ ] Login with email/password
- [ ] Google Sign-In
- [ ] Apple Sign-In
- [ ] Complete order flow (all 8 steps)
- [ ] Receive real-time notifications
- [ ] Payment integration
- [ ] Order tracking
- [ ] Pull-to-refresh
- [ ] Dark mode (if applicable)

## 📱 Building for Release

### Android APK
```bash
flutter build apk --release
```

### Android Bundle (for Play Store)
```bash
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

## 🚀 Deployment

### Play Store Preparation
1. Create keystore
2. Configure `android/key.properties`
3. Update `android/app/build.gradle`
4. Build bundle: `flutter build appbundle`
5. Upload to Play Console

### App Store Preparation
1. Open Xcode
2. Configure signing
3. Archive build
4. Upload to App Store Connect

## 🐛 Troubleshooting

### Build Errors
```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

### Socket Not Connecting
- Check backend URL in `api_constants.dart`
- Verify backend is running
- Check JWT token in secure storage
- Inspect network logs

### Firebase Issues
- Verify `google-services.json` is in correct location
- Check package name matches Firebase project
- Re-download configuration files

### Payment Errors
- Use test mode keys for development
- Check Razorpay dashboard for transaction logs
- Verify backend webhook URL

## 📊 Performance Optimization

- ✅ Cached network images
- ✅ Lazy loading for lists
- ✅ Debounced search
- ✅ Optimized ListView builders
- ✅ Shimmer placeholders
- ✅ Code splitting with lazy imports

## 🔐 Security Best Practices

- ✅ JWT tokens in secure storage
- ✅ HTTPS only in production
- ✅ Input validation
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Rate limiting on API

## 📈 Analytics Integration

Future enhancement:
```dart
// Firebase Analytics
analytics.logEvent(name: 'order_placed', parameters: {
  'order_id': orderId,
  'amount': amount,
});

// User properties
analytics.setUserProperty(name: 'user_role', value: 'customer');
```

## 🎯 Next Steps

1. **Run the app:** `flutter run`
2. **Test order flow:** Create a complete order
3. **Verify real-time:** Check notifications update instantly
4. **Review UI:** Ensure all animations are smooth
5. **Deploy:** Build for production

## 💬 Support

For issues or questions:
- Open GitHub issue
- Check documentation
- Review code comments

---

**Made with ❤️ using Flutter 3.16+**
