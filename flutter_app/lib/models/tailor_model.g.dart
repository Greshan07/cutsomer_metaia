// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tailor_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TailorModelImpl _$$TailorModelImplFromJson(Map<String, dynamic> json) =>
    _$TailorModelImpl(
      id: json['_id'] as String,
      name: json['name'] as String,
      avatar: json['avatar'] as String?,
      shopName: json['shopName'] as String?,
      email: json['email'] as String,
      phone: json['phone'] as String?,
      specializations: (json['specializations'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      rating: (json['rating'] as num).toDouble(),
      totalReviews: (json['totalReviews'] as num?)?.toInt() ?? 0,
      completedOrders: (json['completedOrders'] as num?)?.toInt() ?? 0,
      bio: json['bio'] as String?,
      address: json['address'] == null
          ? null
          : Address.fromJson(json['address'] as Map<String, dynamic>),
      isAvailable: json['isAvailable'] as bool? ?? true,
      isVerified: json['isVerified'] as bool? ?? false,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$$TailorModelImplToJson(_$TailorModelImpl instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
      'avatar': instance.avatar,
      'shopName': instance.shopName,
      'email': instance.email,
      'phone': instance.phone,
      'specializations': instance.specializations,
      'rating': instance.rating,
      'totalReviews': instance.totalReviews,
      'completedOrders': instance.completedOrders,
      'bio': instance.bio,
      'address': instance.address,
      'isAvailable': instance.isAvailable,
      'isVerified': instance.isVerified,
      'createdAt': instance.createdAt?.toIso8601String(),
    };

_$AddressImpl _$$AddressImplFromJson(Map<String, dynamic> json) =>
    _$AddressImpl(
      street: json['street'] as String,
      city: json['city'] as String,
      state: json['state'] as String,
      country: json['country'] as String,
      zipCode: json['zipCode'] as String?,
    );

Map<String, dynamic> _$$AddressImplToJson(_$AddressImpl instance) =>
    <String, dynamic>{
      'street': instance.street,
      'city': instance.city,
      'state': instance.state,
      'country': instance.country,
      'zipCode': instance.zipCode,
    };
