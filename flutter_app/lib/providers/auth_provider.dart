import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';
import '../models/user_model.dart';
import '../services/api_service.dart';

// Storage provider
final storageProvider = Provider((ref) => const FlutterSecureStorage());

// API Service provider
final apiServiceProvider = Provider((ref) => ApiService());

// Auth state provider
final authStateProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref);
});

class AuthState {
  final UserModel? user;
  final String? token;
  final bool isLoading;
  final String? error;

  AuthState({
    this.user,
    this.token,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    UserModel? user,
    String? token,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      user: user ?? this.user,
      token: token ?? this.token,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }

  bool get isAuthenticated => user != null && token != null;
}

class AuthNotifier extends StateNotifier<AuthState> {
  final Ref ref;

  AuthNotifier(this.ref) : super(AuthState()) {
    _loadUser();
  }

  Future<void> _loadUser() async {
    final storage = ref.read(storageProvider);
    final token = await storage.read(key: 'auth_token');
    final userJson = await storage.read(key: 'user_data');

    if (token != null && userJson != null) {
      try {
        final user = UserModel.fromJson(json.decode(userJson));
        state = state.copyWith(user: user, token: token);
      } catch (e) {
        await logout();
      }
    }
  }

  Future<bool> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.login(email, password);

      final data = response.data;
      final user = UserModel.fromJson(data['user']);
      final token = data['token'];

      final storage = ref.read(storageProvider);
      await storage.write(key: 'auth_token', value: token);
      await storage.write(key: 'user_data', value: json.encode(data['user']));

      state = state.copyWith(user: user, token: token, isLoading: false);
      return true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false;
    }
  }

  Future<bool> register(Map<String, dynamic> data) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.register(data);

      final responseData = response.data;
      final user = UserModel.fromJson(responseData['user']);
      final token = responseData['token'];

      final storage = ref.read(storageProvider);
      await storage.write(key: 'auth_token', value: token);
      await storage.write(
          key: 'user_data', value: json.encode(responseData['user']));

      state = state.copyWith(user: user, token: token, isLoading: false);
      return true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false;
    }
  }

  Future<void> logout() async {
    final storage = ref.read(storageProvider);
    await storage.delete(key: 'auth_token');
    await storage.delete(key: 'user_data');
    state = AuthState();
  }

  void updateUser(UserModel user) {
    state = state.copyWith(user: user);
  }
}
