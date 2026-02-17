// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$OrderModelImpl _$$OrderModelImplFromJson(Map<String, dynamic> json) =>
    _$OrderModelImpl(
      id: json['_id'] as String,
      orderNumber: json['orderNumber'] as String,
      customerId: json['customerId'] as String,
      tailorId: json['tailorId'] as String?,
      orderType: json['orderType'] as String,
      measurements: json['measurements'] as Map<String, dynamic>,
      fabricDetails: json['fabricDetails'] as Map<String, dynamic>?,
      stylePreferences: json['stylePreferences'] as Map<String, dynamic>?,
      pricingBreakdown: PricingBreakdown.fromJson(
          json['pricingBreakdown'] as Map<String, dynamic>),
      status: json['status'] as String,
      statusHistory: (json['statusHistory'] as List<dynamic>?)
          ?.map((e) => StatusHistory.fromJson(e as Map<String, dynamic>))
          .toList(),
      specialInstructions: json['specialInstructions'] as String?,
      expectedDeliveryDate: json['expectedDeliveryDate'] == null
          ? null
          : DateTime.parse(json['expectedDeliveryDate'] as String),
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$$OrderModelImplToJson(_$OrderModelImpl instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'orderNumber': instance.orderNumber,
      'customerId': instance.customerId,
      'tailorId': instance.tailorId,
      'orderType': instance.orderType,
      'measurements': instance.measurements,
      'fabricDetails': instance.fabricDetails,
      'stylePreferences': instance.stylePreferences,
      'pricingBreakdown': instance.pricingBreakdown,
      'status': instance.status,
      'statusHistory': instance.statusHistory,
      'specialInstructions': instance.specialInstructions,
      'expectedDeliveryDate': instance.expectedDeliveryDate?.toIso8601String(),
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

_$PricingBreakdownImpl _$$PricingBreakdownImplFromJson(
        Map<String, dynamic> json) =>
    _$PricingBreakdownImpl(
      basePrice: (json['basePrice'] as num).toDouble(),
      fabricCost: (json['fabricCost'] as num?)?.toDouble() ?? 0,
      stitchingCost: (json['stitchingCost'] as num?)?.toDouble() ?? 0,
      designCost: (json['designCost'] as num?)?.toDouble() ?? 0,
      urgencyCharge: (json['urgencyCharge'] as num?)?.toDouble() ?? 0,
      deliveryCharge: (json['deliveryCharge'] as num?)?.toDouble() ?? 0,
      discount: (json['discount'] as num?)?.toDouble() ?? 0,
      totalAmount: (json['totalAmount'] as num).toDouble(),
      priceLocked: json['priceLocked'] as bool? ?? false,
    );

Map<String, dynamic> _$$PricingBreakdownImplToJson(
        _$PricingBreakdownImpl instance) =>
    <String, dynamic>{
      'basePrice': instance.basePrice,
      'fabricCost': instance.fabricCost,
      'stitchingCost': instance.stitchingCost,
      'designCost': instance.designCost,
      'urgencyCharge': instance.urgencyCharge,
      'deliveryCharge': instance.deliveryCharge,
      'discount': instance.discount,
      'totalAmount': instance.totalAmount,
      'priceLocked': instance.priceLocked,
    };

_$StatusHistoryImpl _$$StatusHistoryImplFromJson(Map<String, dynamic> json) =>
    _$StatusHistoryImpl(
      status: json['status'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      note: json['note'] as String?,
    );

Map<String, dynamic> _$$StatusHistoryImplToJson(_$StatusHistoryImpl instance) =>
    <String, dynamic>{
      'status': instance.status,
      'timestamp': instance.timestamp.toIso8601String(),
      'note': instance.note,
    };
