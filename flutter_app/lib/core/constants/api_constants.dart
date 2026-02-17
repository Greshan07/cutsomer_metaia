class ApiConstants {
  // Base URL - Update this with your actual backend URL
  static const String baseUrl = 'http://localhost:5000/api';
  static const String socketUrl = 'http://localhost:5000';

  // Auth Endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String googleAuth = '/auth/google';
  static const String appleAuth = '/auth/apple';
  static const String forgotPassword = '/auth/forgot-password';
  static const String resetPassword = '/auth/reset-password';
  static const String verifyOTP = '/auth/verify-otp';

  // User Endpoints
  static const String profile = '/users/profile';
  static const String updateProfile = '/users/profile';
  static const String addresses = '/users/addresses';

  // Order Endpoints
  static const String orders = '/orders';
  static const String createOrder = '/orders';
  static const String orderDetails = '/orders/'; // + orderId
  static const String cancelOrder = '/orders/'; // + orderId + /cancel

  // Tailor Endpoints
  static const String tailors = '/tailors';
  static const String tailorDetails = '/tailors/'; // + tailorId
  static const String tailorReviews = '/tailors/'; // + tailorId + /reviews

  // Measurement Endpoints
  static const String measurements = '/measurements';
  static const String saveMeasurement = '/measurements';

  // Payment Endpoints
  static const String createPayment = '/payments/create';
  static const String verifyPayment = '/payments/verify';
  static const String paymentHistory = '/payments/history';

  // Notification Endpoints
  static const String notifications = '/notifications';
  static const String markAsRead =
      '/notifications/'; // + notificationId + /read
  static const String markAllRead = '/notifications/read-all';

  // Review Endpoints
  static const String reviews = '/reviews';
  static const String createReview = '/reviews';

  // Categories & Styles
  static const String categories = '/categories';
  static const String styles = '/styles';

  // Socket Events
  static const String socketOrderUpdate = 'order_update';
  static const String socketNewNotification = 'new_notification';
  static const String socketPaymentUpdate = 'payment_update';
  static const String socketTailorStatusUpdate = 'tailor_status_update';
}
