import 'package:freezed_annotation/freezed_annotation.dart';

part 'order_model.freezed.dart';
part 'order_model.g.dart';

@freezed
class OrderModel with _$OrderModel {
  const factory OrderModel({
    @JsonKey(name: '_id') required String id,
    required String orderNumber,
    required String customerId,
    String? tailorId,
    required String orderType,
    required Map<String, dynamic> measurements,
    Map<String, dynamic>? fabricDetails,
    Map<String, dynamic>? stylePreferences,
    required PricingBreakdown pricingBreakdown,
    required String status,
    List<StatusHistory>? statusHistory,
    String? specialInstructions,
    DateTime? expectedDeliveryDate,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _OrderModel;

  factory OrderModel.fromJson(Map<String, dynamic> json) =>
      _$OrderModelFromJson(json);
}

@freezed
class PricingBreakdown with _$PricingBreakdown {
  const factory PricingBreakdown({
    required double basePrice,
    @Default(0) double fabricCost,
    @Default(0) double stitchingCost,
    @Default(0) double designCost,
    @Default(0) double urgencyCharge,
    @Default(0) double deliveryCharge,
    @Default(0) double discount,
    required double totalAmount,
    @Default(false) bool priceLocked,
  }) = _PricingBreakdown;

  factory PricingBreakdown.fromJson(Map<String, dynamic> json) =>
      _$PricingBreakdownFromJson(json);
}

@freezed
class StatusHistory with _$StatusHistory {
  const factory StatusHistory({
    required String status,
    required DateTime timestamp,
    String? note,
  }) = _StatusHistory;

  factory StatusHistory.fromJson(Map<String, dynamic> json) =>
      _$StatusHistoryFromJson(json);
}
