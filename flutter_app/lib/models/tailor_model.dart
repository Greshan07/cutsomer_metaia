import 'package:freezed_annotation/freezed_annotation.dart';

part 'tailor_model.freezed.dart';
part 'tailor_model.g.dart';

@freezed
class TailorModel with _$TailorModel {
  const factory TailorModel({
    @JsonKey(name: '_id') required String id,
    required String name,
    String? avatar,
    String? shopName,
    required String email,
    String? phone,
    List<String>? specializations,
    required double rating,
    @Default(0) int totalReviews,
    @Default(0) int completedOrders,
    String? bio,
    Address? address,
    @Default(true) bool isAvailable,
    @Default(false) bool isVerified,
    DateTime? createdAt,
  }) = _TailorModel;

  factory TailorModel.fromJson(Map<String, dynamic> json) =>
      _$TailorModelFromJson(json);
}

@freezed
class Address with _$Address {
  const factory Address({
    required String street,
    required String city,
    required String state,
    required String country,
    String? zipCode,
  }) = _Address;

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);
}
