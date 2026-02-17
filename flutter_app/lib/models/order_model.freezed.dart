// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'order_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

OrderModel _$OrderModelFromJson(Map<String, dynamic> json) {
  return _OrderModel.fromJson(json);
}

/// @nodoc
mixin _$OrderModel {
  @JsonKey(name: '_id')
  String get id => throw _privateConstructorUsedError;
  String get orderNumber => throw _privateConstructorUsedError;
  String get customerId => throw _privateConstructorUsedError;
  String? get tailorId => throw _privateConstructorUsedError;
  String get orderType => throw _privateConstructorUsedError;
  Map<String, dynamic> get measurements => throw _privateConstructorUsedError;
  Map<String, dynamic>? get fabricDetails => throw _privateConstructorUsedError;
  Map<String, dynamic>? get stylePreferences =>
      throw _privateConstructorUsedError;
  PricingBreakdown get pricingBreakdown => throw _privateConstructorUsedError;
  String get status => throw _privateConstructorUsedError;
  List<StatusHistory>? get statusHistory => throw _privateConstructorUsedError;
  String? get specialInstructions => throw _privateConstructorUsedError;
  DateTime? get expectedDeliveryDate => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $OrderModelCopyWith<OrderModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderModelCopyWith<$Res> {
  factory $OrderModelCopyWith(
          OrderModel value, $Res Function(OrderModel) then) =
      _$OrderModelCopyWithImpl<$Res, OrderModel>;
  @useResult
  $Res call(
      {@JsonKey(name: '_id') String id,
      String orderNumber,
      String customerId,
      String? tailorId,
      String orderType,
      Map<String, dynamic> measurements,
      Map<String, dynamic>? fabricDetails,
      Map<String, dynamic>? stylePreferences,
      PricingBreakdown pricingBreakdown,
      String status,
      List<StatusHistory>? statusHistory,
      String? specialInstructions,
      DateTime? expectedDeliveryDate,
      DateTime? createdAt,
      DateTime? updatedAt});

  $PricingBreakdownCopyWith<$Res> get pricingBreakdown;
}

/// @nodoc
class _$OrderModelCopyWithImpl<$Res, $Val extends OrderModel>
    implements $OrderModelCopyWith<$Res> {
  _$OrderModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? orderNumber = null,
    Object? customerId = null,
    Object? tailorId = freezed,
    Object? orderType = null,
    Object? measurements = null,
    Object? fabricDetails = freezed,
    Object? stylePreferences = freezed,
    Object? pricingBreakdown = null,
    Object? status = null,
    Object? statusHistory = freezed,
    Object? specialInstructions = freezed,
    Object? expectedDeliveryDate = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      orderNumber: null == orderNumber
          ? _value.orderNumber
          : orderNumber // ignore: cast_nullable_to_non_nullable
              as String,
      customerId: null == customerId
          ? _value.customerId
          : customerId // ignore: cast_nullable_to_non_nullable
              as String,
      tailorId: freezed == tailorId
          ? _value.tailorId
          : tailorId // ignore: cast_nullable_to_non_nullable
              as String?,
      orderType: null == orderType
          ? _value.orderType
          : orderType // ignore: cast_nullable_to_non_nullable
              as String,
      measurements: null == measurements
          ? _value.measurements
          : measurements // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
      fabricDetails: freezed == fabricDetails
          ? _value.fabricDetails
          : fabricDetails // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>?,
      stylePreferences: freezed == stylePreferences
          ? _value.stylePreferences
          : stylePreferences // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>?,
      pricingBreakdown: null == pricingBreakdown
          ? _value.pricingBreakdown
          : pricingBreakdown // ignore: cast_nullable_to_non_nullable
              as PricingBreakdown,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      statusHistory: freezed == statusHistory
          ? _value.statusHistory
          : statusHistory // ignore: cast_nullable_to_non_nullable
              as List<StatusHistory>?,
      specialInstructions: freezed == specialInstructions
          ? _value.specialInstructions
          : specialInstructions // ignore: cast_nullable_to_non_nullable
              as String?,
      expectedDeliveryDate: freezed == expectedDeliveryDate
          ? _value.expectedDeliveryDate
          : expectedDeliveryDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      updatedAt: freezed == updatedAt
          ? _value.updatedAt
          : updatedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $PricingBreakdownCopyWith<$Res> get pricingBreakdown {
    return $PricingBreakdownCopyWith<$Res>(_value.pricingBreakdown, (value) {
      return _then(_value.copyWith(pricingBreakdown: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$OrderModelImplCopyWith<$Res>
    implements $OrderModelCopyWith<$Res> {
  factory _$$OrderModelImplCopyWith(
          _$OrderModelImpl value, $Res Function(_$OrderModelImpl) then) =
      __$$OrderModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: '_id') String id,
      String orderNumber,
      String customerId,
      String? tailorId,
      String orderType,
      Map<String, dynamic> measurements,
      Map<String, dynamic>? fabricDetails,
      Map<String, dynamic>? stylePreferences,
      PricingBreakdown pricingBreakdown,
      String status,
      List<StatusHistory>? statusHistory,
      String? specialInstructions,
      DateTime? expectedDeliveryDate,
      DateTime? createdAt,
      DateTime? updatedAt});

  @override
  $PricingBreakdownCopyWith<$Res> get pricingBreakdown;
}

/// @nodoc
class __$$OrderModelImplCopyWithImpl<$Res>
    extends _$OrderModelCopyWithImpl<$Res, _$OrderModelImpl>
    implements _$$OrderModelImplCopyWith<$Res> {
  __$$OrderModelImplCopyWithImpl(
      _$OrderModelImpl _value, $Res Function(_$OrderModelImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? orderNumber = null,
    Object? customerId = null,
    Object? tailorId = freezed,
    Object? orderType = null,
    Object? measurements = null,
    Object? fabricDetails = freezed,
    Object? stylePreferences = freezed,
    Object? pricingBreakdown = null,
    Object? status = null,
    Object? statusHistory = freezed,
    Object? specialInstructions = freezed,
    Object? expectedDeliveryDate = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(_$OrderModelImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      orderNumber: null == orderNumber
          ? _value.orderNumber
          : orderNumber // ignore: cast_nullable_to_non_nullable
              as String,
      customerId: null == customerId
          ? _value.customerId
          : customerId // ignore: cast_nullable_to_non_nullable
              as String,
      tailorId: freezed == tailorId
          ? _value.tailorId
          : tailorId // ignore: cast_nullable_to_non_nullable
              as String?,
      orderType: null == orderType
          ? _value.orderType
          : orderType // ignore: cast_nullable_to_non_nullable
              as String,
      measurements: null == measurements
          ? _value._measurements
          : measurements // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
      fabricDetails: freezed == fabricDetails
          ? _value._fabricDetails
          : fabricDetails // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>?,
      stylePreferences: freezed == stylePreferences
          ? _value._stylePreferences
          : stylePreferences // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>?,
      pricingBreakdown: null == pricingBreakdown
          ? _value.pricingBreakdown
          : pricingBreakdown // ignore: cast_nullable_to_non_nullable
              as PricingBreakdown,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      statusHistory: freezed == statusHistory
          ? _value._statusHistory
          : statusHistory // ignore: cast_nullable_to_non_nullable
              as List<StatusHistory>?,
      specialInstructions: freezed == specialInstructions
          ? _value.specialInstructions
          : specialInstructions // ignore: cast_nullable_to_non_nullable
              as String?,
      expectedDeliveryDate: freezed == expectedDeliveryDate
          ? _value.expectedDeliveryDate
          : expectedDeliveryDate // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      updatedAt: freezed == updatedAt
          ? _value.updatedAt
          : updatedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$OrderModelImpl implements _OrderModel {
  const _$OrderModelImpl(
      {@JsonKey(name: '_id') required this.id,
      required this.orderNumber,
      required this.customerId,
      this.tailorId,
      required this.orderType,
      required final Map<String, dynamic> measurements,
      final Map<String, dynamic>? fabricDetails,
      final Map<String, dynamic>? stylePreferences,
      required this.pricingBreakdown,
      required this.status,
      final List<StatusHistory>? statusHistory,
      this.specialInstructions,
      this.expectedDeliveryDate,
      this.createdAt,
      this.updatedAt})
      : _measurements = measurements,
        _fabricDetails = fabricDetails,
        _stylePreferences = stylePreferences,
        _statusHistory = statusHistory;

  factory _$OrderModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$OrderModelImplFromJson(json);

  @override
  @JsonKey(name: '_id')
  final String id;
  @override
  final String orderNumber;
  @override
  final String customerId;
  @override
  final String? tailorId;
  @override
  final String orderType;
  final Map<String, dynamic> _measurements;
  @override
  Map<String, dynamic> get measurements {
    if (_measurements is EqualUnmodifiableMapView) return _measurements;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_measurements);
  }

  final Map<String, dynamic>? _fabricDetails;
  @override
  Map<String, dynamic>? get fabricDetails {
    final value = _fabricDetails;
    if (value == null) return null;
    if (_fabricDetails is EqualUnmodifiableMapView) return _fabricDetails;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(value);
  }

  final Map<String, dynamic>? _stylePreferences;
  @override
  Map<String, dynamic>? get stylePreferences {
    final value = _stylePreferences;
    if (value == null) return null;
    if (_stylePreferences is EqualUnmodifiableMapView) return _stylePreferences;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(value);
  }

  @override
  final PricingBreakdown pricingBreakdown;
  @override
  final String status;
  final List<StatusHistory>? _statusHistory;
  @override
  List<StatusHistory>? get statusHistory {
    final value = _statusHistory;
    if (value == null) return null;
    if (_statusHistory is EqualUnmodifiableListView) return _statusHistory;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  final String? specialInstructions;
  @override
  final DateTime? expectedDeliveryDate;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'OrderModel(id: $id, orderNumber: $orderNumber, customerId: $customerId, tailorId: $tailorId, orderType: $orderType, measurements: $measurements, fabricDetails: $fabricDetails, stylePreferences: $stylePreferences, pricingBreakdown: $pricingBreakdown, status: $status, statusHistory: $statusHistory, specialInstructions: $specialInstructions, expectedDeliveryDate: $expectedDeliveryDate, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$OrderModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.orderNumber, orderNumber) ||
                other.orderNumber == orderNumber) &&
            (identical(other.customerId, customerId) ||
                other.customerId == customerId) &&
            (identical(other.tailorId, tailorId) ||
                other.tailorId == tailorId) &&
            (identical(other.orderType, orderType) ||
                other.orderType == orderType) &&
            const DeepCollectionEquality()
                .equals(other._measurements, _measurements) &&
            const DeepCollectionEquality()
                .equals(other._fabricDetails, _fabricDetails) &&
            const DeepCollectionEquality()
                .equals(other._stylePreferences, _stylePreferences) &&
            (identical(other.pricingBreakdown, pricingBreakdown) ||
                other.pricingBreakdown == pricingBreakdown) &&
            (identical(other.status, status) || other.status == status) &&
            const DeepCollectionEquality()
                .equals(other._statusHistory, _statusHistory) &&
            (identical(other.specialInstructions, specialInstructions) ||
                other.specialInstructions == specialInstructions) &&
            (identical(other.expectedDeliveryDate, expectedDeliveryDate) ||
                other.expectedDeliveryDate == expectedDeliveryDate) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      orderNumber,
      customerId,
      tailorId,
      orderType,
      const DeepCollectionEquality().hash(_measurements),
      const DeepCollectionEquality().hash(_fabricDetails),
      const DeepCollectionEquality().hash(_stylePreferences),
      pricingBreakdown,
      status,
      const DeepCollectionEquality().hash(_statusHistory),
      specialInstructions,
      expectedDeliveryDate,
      createdAt,
      updatedAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$OrderModelImplCopyWith<_$OrderModelImpl> get copyWith =>
      __$$OrderModelImplCopyWithImpl<_$OrderModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$OrderModelImplToJson(
      this,
    );
  }
}

abstract class _OrderModel implements OrderModel {
  const factory _OrderModel(
      {@JsonKey(name: '_id') required final String id,
      required final String orderNumber,
      required final String customerId,
      final String? tailorId,
      required final String orderType,
      required final Map<String, dynamic> measurements,
      final Map<String, dynamic>? fabricDetails,
      final Map<String, dynamic>? stylePreferences,
      required final PricingBreakdown pricingBreakdown,
      required final String status,
      final List<StatusHistory>? statusHistory,
      final String? specialInstructions,
      final DateTime? expectedDeliveryDate,
      final DateTime? createdAt,
      final DateTime? updatedAt}) = _$OrderModelImpl;

  factory _OrderModel.fromJson(Map<String, dynamic> json) =
      _$OrderModelImpl.fromJson;

  @override
  @JsonKey(name: '_id')
  String get id;
  @override
  String get orderNumber;
  @override
  String get customerId;
  @override
  String? get tailorId;
  @override
  String get orderType;
  @override
  Map<String, dynamic> get measurements;
  @override
  Map<String, dynamic>? get fabricDetails;
  @override
  Map<String, dynamic>? get stylePreferences;
  @override
  PricingBreakdown get pricingBreakdown;
  @override
  String get status;
  @override
  List<StatusHistory>? get statusHistory;
  @override
  String? get specialInstructions;
  @override
  DateTime? get expectedDeliveryDate;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get updatedAt;
  @override
  @JsonKey(ignore: true)
  _$$OrderModelImplCopyWith<_$OrderModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PricingBreakdown _$PricingBreakdownFromJson(Map<String, dynamic> json) {
  return _PricingBreakdown.fromJson(json);
}

/// @nodoc
mixin _$PricingBreakdown {
  double get basePrice => throw _privateConstructorUsedError;
  double get fabricCost => throw _privateConstructorUsedError;
  double get stitchingCost => throw _privateConstructorUsedError;
  double get designCost => throw _privateConstructorUsedError;
  double get urgencyCharge => throw _privateConstructorUsedError;
  double get deliveryCharge => throw _privateConstructorUsedError;
  double get discount => throw _privateConstructorUsedError;
  double get totalAmount => throw _privateConstructorUsedError;
  bool get priceLocked => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PricingBreakdownCopyWith<PricingBreakdown> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PricingBreakdownCopyWith<$Res> {
  factory $PricingBreakdownCopyWith(
          PricingBreakdown value, $Res Function(PricingBreakdown) then) =
      _$PricingBreakdownCopyWithImpl<$Res, PricingBreakdown>;
  @useResult
  $Res call(
      {double basePrice,
      double fabricCost,
      double stitchingCost,
      double designCost,
      double urgencyCharge,
      double deliveryCharge,
      double discount,
      double totalAmount,
      bool priceLocked});
}

/// @nodoc
class _$PricingBreakdownCopyWithImpl<$Res, $Val extends PricingBreakdown>
    implements $PricingBreakdownCopyWith<$Res> {
  _$PricingBreakdownCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? basePrice = null,
    Object? fabricCost = null,
    Object? stitchingCost = null,
    Object? designCost = null,
    Object? urgencyCharge = null,
    Object? deliveryCharge = null,
    Object? discount = null,
    Object? totalAmount = null,
    Object? priceLocked = null,
  }) {
    return _then(_value.copyWith(
      basePrice: null == basePrice
          ? _value.basePrice
          : basePrice // ignore: cast_nullable_to_non_nullable
              as double,
      fabricCost: null == fabricCost
          ? _value.fabricCost
          : fabricCost // ignore: cast_nullable_to_non_nullable
              as double,
      stitchingCost: null == stitchingCost
          ? _value.stitchingCost
          : stitchingCost // ignore: cast_nullable_to_non_nullable
              as double,
      designCost: null == designCost
          ? _value.designCost
          : designCost // ignore: cast_nullable_to_non_nullable
              as double,
      urgencyCharge: null == urgencyCharge
          ? _value.urgencyCharge
          : urgencyCharge // ignore: cast_nullable_to_non_nullable
              as double,
      deliveryCharge: null == deliveryCharge
          ? _value.deliveryCharge
          : deliveryCharge // ignore: cast_nullable_to_non_nullable
              as double,
      discount: null == discount
          ? _value.discount
          : discount // ignore: cast_nullable_to_non_nullable
              as double,
      totalAmount: null == totalAmount
          ? _value.totalAmount
          : totalAmount // ignore: cast_nullable_to_non_nullable
              as double,
      priceLocked: null == priceLocked
          ? _value.priceLocked
          : priceLocked // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PricingBreakdownImplCopyWith<$Res>
    implements $PricingBreakdownCopyWith<$Res> {
  factory _$$PricingBreakdownImplCopyWith(_$PricingBreakdownImpl value,
          $Res Function(_$PricingBreakdownImpl) then) =
      __$$PricingBreakdownImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {double basePrice,
      double fabricCost,
      double stitchingCost,
      double designCost,
      double urgencyCharge,
      double deliveryCharge,
      double discount,
      double totalAmount,
      bool priceLocked});
}

/// @nodoc
class __$$PricingBreakdownImplCopyWithImpl<$Res>
    extends _$PricingBreakdownCopyWithImpl<$Res, _$PricingBreakdownImpl>
    implements _$$PricingBreakdownImplCopyWith<$Res> {
  __$$PricingBreakdownImplCopyWithImpl(_$PricingBreakdownImpl _value,
      $Res Function(_$PricingBreakdownImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? basePrice = null,
    Object? fabricCost = null,
    Object? stitchingCost = null,
    Object? designCost = null,
    Object? urgencyCharge = null,
    Object? deliveryCharge = null,
    Object? discount = null,
    Object? totalAmount = null,
    Object? priceLocked = null,
  }) {
    return _then(_$PricingBreakdownImpl(
      basePrice: null == basePrice
          ? _value.basePrice
          : basePrice // ignore: cast_nullable_to_non_nullable
              as double,
      fabricCost: null == fabricCost
          ? _value.fabricCost
          : fabricCost // ignore: cast_nullable_to_non_nullable
              as double,
      stitchingCost: null == stitchingCost
          ? _value.stitchingCost
          : stitchingCost // ignore: cast_nullable_to_non_nullable
              as double,
      designCost: null == designCost
          ? _value.designCost
          : designCost // ignore: cast_nullable_to_non_nullable
              as double,
      urgencyCharge: null == urgencyCharge
          ? _value.urgencyCharge
          : urgencyCharge // ignore: cast_nullable_to_non_nullable
              as double,
      deliveryCharge: null == deliveryCharge
          ? _value.deliveryCharge
          : deliveryCharge // ignore: cast_nullable_to_non_nullable
              as double,
      discount: null == discount
          ? _value.discount
          : discount // ignore: cast_nullable_to_non_nullable
              as double,
      totalAmount: null == totalAmount
          ? _value.totalAmount
          : totalAmount // ignore: cast_nullable_to_non_nullable
              as double,
      priceLocked: null == priceLocked
          ? _value.priceLocked
          : priceLocked // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PricingBreakdownImpl implements _PricingBreakdown {
  const _$PricingBreakdownImpl(
      {required this.basePrice,
      this.fabricCost = 0,
      this.stitchingCost = 0,
      this.designCost = 0,
      this.urgencyCharge = 0,
      this.deliveryCharge = 0,
      this.discount = 0,
      required this.totalAmount,
      this.priceLocked = false});

  factory _$PricingBreakdownImpl.fromJson(Map<String, dynamic> json) =>
      _$$PricingBreakdownImplFromJson(json);

  @override
  final double basePrice;
  @override
  @JsonKey()
  final double fabricCost;
  @override
  @JsonKey()
  final double stitchingCost;
  @override
  @JsonKey()
  final double designCost;
  @override
  @JsonKey()
  final double urgencyCharge;
  @override
  @JsonKey()
  final double deliveryCharge;
  @override
  @JsonKey()
  final double discount;
  @override
  final double totalAmount;
  @override
  @JsonKey()
  final bool priceLocked;

  @override
  String toString() {
    return 'PricingBreakdown(basePrice: $basePrice, fabricCost: $fabricCost, stitchingCost: $stitchingCost, designCost: $designCost, urgencyCharge: $urgencyCharge, deliveryCharge: $deliveryCharge, discount: $discount, totalAmount: $totalAmount, priceLocked: $priceLocked)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PricingBreakdownImpl &&
            (identical(other.basePrice, basePrice) ||
                other.basePrice == basePrice) &&
            (identical(other.fabricCost, fabricCost) ||
                other.fabricCost == fabricCost) &&
            (identical(other.stitchingCost, stitchingCost) ||
                other.stitchingCost == stitchingCost) &&
            (identical(other.designCost, designCost) ||
                other.designCost == designCost) &&
            (identical(other.urgencyCharge, urgencyCharge) ||
                other.urgencyCharge == urgencyCharge) &&
            (identical(other.deliveryCharge, deliveryCharge) ||
                other.deliveryCharge == deliveryCharge) &&
            (identical(other.discount, discount) ||
                other.discount == discount) &&
            (identical(other.totalAmount, totalAmount) ||
                other.totalAmount == totalAmount) &&
            (identical(other.priceLocked, priceLocked) ||
                other.priceLocked == priceLocked));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      basePrice,
      fabricCost,
      stitchingCost,
      designCost,
      urgencyCharge,
      deliveryCharge,
      discount,
      totalAmount,
      priceLocked);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$PricingBreakdownImplCopyWith<_$PricingBreakdownImpl> get copyWith =>
      __$$PricingBreakdownImplCopyWithImpl<_$PricingBreakdownImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PricingBreakdownImplToJson(
      this,
    );
  }
}

abstract class _PricingBreakdown implements PricingBreakdown {
  const factory _PricingBreakdown(
      {required final double basePrice,
      final double fabricCost,
      final double stitchingCost,
      final double designCost,
      final double urgencyCharge,
      final double deliveryCharge,
      final double discount,
      required final double totalAmount,
      final bool priceLocked}) = _$PricingBreakdownImpl;

  factory _PricingBreakdown.fromJson(Map<String, dynamic> json) =
      _$PricingBreakdownImpl.fromJson;

  @override
  double get basePrice;
  @override
  double get fabricCost;
  @override
  double get stitchingCost;
  @override
  double get designCost;
  @override
  double get urgencyCharge;
  @override
  double get deliveryCharge;
  @override
  double get discount;
  @override
  double get totalAmount;
  @override
  bool get priceLocked;
  @override
  @JsonKey(ignore: true)
  _$$PricingBreakdownImplCopyWith<_$PricingBreakdownImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

StatusHistory _$StatusHistoryFromJson(Map<String, dynamic> json) {
  return _StatusHistory.fromJson(json);
}

/// @nodoc
mixin _$StatusHistory {
  String get status => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;
  String? get note => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $StatusHistoryCopyWith<StatusHistory> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $StatusHistoryCopyWith<$Res> {
  factory $StatusHistoryCopyWith(
          StatusHistory value, $Res Function(StatusHistory) then) =
      _$StatusHistoryCopyWithImpl<$Res, StatusHistory>;
  @useResult
  $Res call({String status, DateTime timestamp, String? note});
}

/// @nodoc
class _$StatusHistoryCopyWithImpl<$Res, $Val extends StatusHistory>
    implements $StatusHistoryCopyWith<$Res> {
  _$StatusHistoryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? timestamp = null,
    Object? note = freezed,
  }) {
    return _then(_value.copyWith(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
      note: freezed == note
          ? _value.note
          : note // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$StatusHistoryImplCopyWith<$Res>
    implements $StatusHistoryCopyWith<$Res> {
  factory _$$StatusHistoryImplCopyWith(
          _$StatusHistoryImpl value, $Res Function(_$StatusHistoryImpl) then) =
      __$$StatusHistoryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String status, DateTime timestamp, String? note});
}

/// @nodoc
class __$$StatusHistoryImplCopyWithImpl<$Res>
    extends _$StatusHistoryCopyWithImpl<$Res, _$StatusHistoryImpl>
    implements _$$StatusHistoryImplCopyWith<$Res> {
  __$$StatusHistoryImplCopyWithImpl(
      _$StatusHistoryImpl _value, $Res Function(_$StatusHistoryImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? timestamp = null,
    Object? note = freezed,
  }) {
    return _then(_$StatusHistoryImpl(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
      note: freezed == note
          ? _value.note
          : note // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$StatusHistoryImpl implements _StatusHistory {
  const _$StatusHistoryImpl(
      {required this.status, required this.timestamp, this.note});

  factory _$StatusHistoryImpl.fromJson(Map<String, dynamic> json) =>
      _$$StatusHistoryImplFromJson(json);

  @override
  final String status;
  @override
  final DateTime timestamp;
  @override
  final String? note;

  @override
  String toString() {
    return 'StatusHistory(status: $status, timestamp: $timestamp, note: $note)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$StatusHistoryImpl &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.note, note) || other.note == note));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, status, timestamp, note);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$StatusHistoryImplCopyWith<_$StatusHistoryImpl> get copyWith =>
      __$$StatusHistoryImplCopyWithImpl<_$StatusHistoryImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$StatusHistoryImplToJson(
      this,
    );
  }
}

abstract class _StatusHistory implements StatusHistory {
  const factory _StatusHistory(
      {required final String status,
      required final DateTime timestamp,
      final String? note}) = _$StatusHistoryImpl;

  factory _StatusHistory.fromJson(Map<String, dynamic> json) =
      _$StatusHistoryImpl.fromJson;

  @override
  String get status;
  @override
  DateTime get timestamp;
  @override
  String? get note;
  @override
  @JsonKey(ignore: true)
  _$$StatusHistoryImplCopyWith<_$StatusHistoryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
