import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/notification_model.dart';
import '../services/socket_service.dart';
import 'auth_provider.dart';

final notificationProvider =
    StateNotifierProvider<NotificationNotifier, NotificationState>((ref) {
  return NotificationNotifier(ref);
});

class NotificationState {
  final List<NotificationModel> notifications;
  final int unreadCount;
  final bool isLoading;
  final String? error;

  NotificationState({
    this.notifications = const [],
    this.unreadCount = 0,
    this.isLoading = false,
    this.error,
  });

  NotificationState copyWith({
    List<NotificationModel>? notifications,
    int? unreadCount,
    bool? isLoading,
    String? error,
  }) {
    return NotificationState(
      notifications: notifications ?? this.notifications,
      unreadCount: unreadCount ?? this.unreadCount,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class NotificationNotifier extends StateNotifier<NotificationState> {
  final Ref ref;
  final SocketService _socketService = SocketService();

  NotificationNotifier(this.ref) : super(NotificationState()) {
    _loadNotifications();
    _setupSocketListener();
  }

  void _setupSocketListener() {
    _socketService.onNewNotification((data) {
      final notification = NotificationModel.fromJson(data);
      state = state.copyWith(
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      );
    });
  }

  Future<void> _loadNotifications() async {
    final authState = ref.read(authStateProvider);
    if (!authState.isAuthenticated) return;

    state = state.copyWith(isLoading: true);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.getNotifications();

      final List<NotificationModel> notifications =
          (response.data['notifications'] as List)
              .map((json) => NotificationModel.fromJson(json))
              .toList();

      final unreadCount = notifications.where((n) => !n.isRead).length;

      state = state.copyWith(
        notifications: notifications,
        unreadCount: unreadCount,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> markAsRead(String notificationId) async {
    try {
      final apiService = ref.read(apiServiceProvider);
      await apiService.markNotificationAsRead(notificationId);

      final updatedNotifications = state.notifications.map((n) {
        if (n.id == notificationId) {
          return n.copyWith(isRead: true);
        }
        return n;
      }).toList();

      final unreadCount = updatedNotifications.where((n) => !n.isRead).length;

      state = state.copyWith(
        notifications: updatedNotifications,
        unreadCount: unreadCount,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  Future<void> markAllAsRead() async {
    try {
      final apiService = ref.read(apiServiceProvider);
      await apiService.markAllNotificationsAsRead();

      final updatedNotifications = state.notifications.map((n) {
        return n.copyWith(isRead: true);
      }).toList();

      state = state.copyWith(
        notifications: updatedNotifications,
        unreadCount: 0,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  void refreshNotifications() {
    _loadNotifications();
  }
}
