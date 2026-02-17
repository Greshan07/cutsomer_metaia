import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../core/constants/api_constants.dart';

class SocketService {
  static final SocketService _instance = SocketService._internal();
  factory SocketService() => _instance;
  SocketService._internal();

  IO.Socket? _socket;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  bool get isConnected => _socket?.connected ?? false;

  Future<void> connect() async {
    if (_socket?.connected == true) return;

    final token = await _storage.read(key: 'auth_token');
    if (token == null) return;

    _socket = IO.io(
      ApiConstants.socketUrl,
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .enableAutoConnect()
          .setExtraHeaders({'Authorization': 'Bearer $token'})
          .build(),
    );

    _socket?.onConnect((_) {
      print('Socket connected');
    });

    _socket?.onDisconnect((_) {
      print('Socket disconnected');
    });

    _socket?.onError((error) {
      print('Socket error: $error');
    });
  }

  void disconnect() {
    _socket?.disconnect();
    _socket = null;
  }

  // Listen to order updates
  void onOrderUpdate(Function(dynamic) callback) {
    _socket?.on(ApiConstants.socketOrderUpdate, callback);
  }

  // Listen to new notifications
  void onNewNotification(Function(dynamic) callback) {
    _socket?.on(ApiConstants.socketNewNotification, callback);
  }

  // Listen to payment updates
  void onPaymentUpdate(Function(dynamic) callback) {
    _socket?.on(ApiConstants.socketPaymentUpdate, callback);
  }

  // Listen to tailor status updates
  void onTailorStatusUpdate(Function(dynamic) callback) {
    _socket?.on(ApiConstants.socketTailorStatusUpdate, callback);
  }

  // Emit events
  void emit(String event, dynamic data) {
    _socket?.emit(event, data);
  }

  // Remove listeners
  void off(String event) {
    _socket?.off(event);
  }
}
