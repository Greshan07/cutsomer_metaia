import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/order_model.dart';
import 'auth_provider.dart';

final orderProvider = StateNotifierProvider<OrderNotifier, OrderState>((ref) {
  return OrderNotifier(ref);
});

class OrderState {
  final List<OrderModel> orders;
  final OrderModel? currentOrder;
  final bool isLoading;
  final String? error;

  OrderState({
    this.orders = const [],
    this.currentOrder,
    this.isLoading = false,
    this.error,
  });

  OrderState copyWith({
    List<OrderModel>? orders,
    OrderModel? currentOrder,
    bool? isLoading,
    String? error,
  }) {
    return OrderState(
      orders: orders ?? this.orders,
      currentOrder: currentOrder ?? this.currentOrder,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class OrderNotifier extends StateNotifier<OrderState> {
  final Ref ref;

  OrderNotifier(this.ref) : super(OrderState()) {
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    final authState = ref.read(authStateProvider);
    if (!authState.isAuthenticated) return;

    state = state.copyWith(isLoading: true);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.getOrders();

      final List<OrderModel> orders = (response.data['orders'] as List)
          .map((json) => OrderModel.fromJson(json))
          .toList();

      state = state.copyWith(orders: orders, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<bool> createOrder(Map<String, dynamic> orderData) async {
    state = state.copyWith(isLoading: true);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.createOrder(orderData);

      final order = OrderModel.fromJson(response.data['order']);

      state = state.copyWith(
        orders: [order, ...state.orders],
        currentOrder: order,
        isLoading: false,
      );
      return true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false;
    }
  }

  Future<void> getOrderDetails(String orderId) async {
    state = state.copyWith(isLoading: true);

    try {
      final apiService = ref.read(apiServiceProvider);
      final response = await apiService.getOrderDetails(orderId);

      final order = OrderModel.fromJson(response.data['order']);

      state = state.copyWith(currentOrder: order, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<bool> cancelOrder(String orderId) async {
    state = state.copyWith(isLoading: true);

    try {
      final apiService = ref.read(apiServiceProvider);
      await apiService.cancelOrder(orderId);

      // Update local state
      final updatedOrders = state.orders.map((order) {
        if (order.id == orderId) {
          return order.copyWith(status: 'cancelled');
        }
        return order;
      }).toList();

      state = state.copyWith(orders: updatedOrders, isLoading: false);
      return true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false;
    }
  }

  void updateOrderFromSocket(Map<String, dynamic> data) {
    final updatedOrder = OrderModel.fromJson(data);

    final updatedOrders = state.orders.map((order) {
      if (order.id == updatedOrder.id) {
        return updatedOrder;
      }
      return order;
    }).toList();

    state = state.copyWith(
      orders: updatedOrders,
      currentOrder: state.currentOrder?.id == updatedOrder.id
          ? updatedOrder
          : state.currentOrder,
    );
  }

  void refreshOrders() {
    _loadOrders();
  }
}
