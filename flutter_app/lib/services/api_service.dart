import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../core/constants/api_constants.dart';

class ApiService {
  late final Dio _dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Add auth token to all requests
          final token = await _storage.read(key: 'auth_token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (DioException error, handler) async {
          if (error.response?.statusCode == 401) {
            // Token expired, logout user
            await _storage.delete(key: 'auth_token');
            await _storage.delete(key: 'user_data');
          }
          return handler.next(error);
        },
      ),
    );
  }

  // Auth APIs
  Future<Response> login(String email, String password) async {
    return await _dio.post(ApiConstants.login, data: {
      'email': email,
      'password': password,
    });
  }

  Future<Response> register(Map<String, dynamic> data) async {
    return await _dio.post(ApiConstants.register, data: data);
  }

  Future<Response> googleAuth(String idToken) async {
    return await _dio.post(ApiConstants.googleAuth, data: {'idToken': idToken});
  }

  Future<Response> forgotPassword(String email) async {
    return await _dio.post(ApiConstants.forgotPassword, data: {'email': email});
  }

  // User APIs
  Future<Response> getProfile() async {
    return await _dio.get(ApiConstants.profile);
  }

  Future<Response> updateProfile(Map<String, dynamic> data) async {
    return await _dio.put(ApiConstants.updateProfile, data: data);
  }

  Future<Response> getAddresses() async {
    return await _dio.get(ApiConstants.addresses);
  }

  // Order APIs
  Future<Response> getOrders({String? status}) async {
    return await _dio.get(
      ApiConstants.orders,
      queryParameters: status != null ? {'status': status} : null,
    );
  }

  Future<Response> createOrder(Map<String, dynamic> orderData) async {
    return await _dio.post(ApiConstants.createOrder, data: orderData);
  }

  Future<Response> getOrderDetails(String orderId) async {
    return await _dio.get('${ApiConstants.orderDetails}$orderId');
  }

  Future<Response> cancelOrder(String orderId) async {
    return await _dio.put('${ApiConstants.orderDetails}$orderId/cancel');
  }

  // Tailor APIs
  Future<Response> getTailors({
    String? specialization,
    double? minRating,
  }) async {
    return await _dio.get(
      ApiConstants.tailors,
      queryParameters: {
        if (specialization != null) 'specialization': specialization,
        if (minRating != null) 'minRating': minRating,
      },
    );
  }

  Future<Response> getTailorDetails(String tailorId) async {
    return await _dio.get('${ApiConstants.tailorDetails}$tailorId');
  }

  // Payment APIs
  Future<Response> createPayment(String orderId, double amount) async {
    return await _dio.post(ApiConstants.createPayment, data: {
      'orderId': orderId,
      'amount': amount,
    });
  }

  Future<Response> verifyPayment(Map<String, dynamic> paymentData) async {
    return await _dio.post(ApiConstants.verifyPayment, data: paymentData);
  }

  // Notification APIs
  Future<Response> getNotifications() async {
    return await _dio.get(ApiConstants.notifications);
  }

  Future<Response> markNotificationAsRead(String notificationId) async {
    return await _dio.put('${ApiConstants.markAsRead}$notificationId/read');
  }

  Future<Response> markAllNotificationsAsRead() async {
    return await _dio.put(ApiConstants.markAllRead);
  }

  // Measurement APIs
  Future<Response> saveMeasurement(Map<String, dynamic> measurementData) async {
    return await _dio.post(ApiConstants.saveMeasurement, data: measurementData);
  }

  Future<Response> getMeasurements() async {
    return await _dio.get(ApiConstants.measurements);
  }

  // Review APIs
  Future<Response> createReview(Map<String, dynamic> reviewData) async {
    return await _dio.post(ApiConstants.createReview, data: reviewData);
  }

  // Categories & Styles
  Future<Response> getCategories() async {
    return await _dio.get(ApiConstants.categories);
  }

  Future<Response> getStyles() async {
    return await _dio.get(ApiConstants.styles);
  }
}
