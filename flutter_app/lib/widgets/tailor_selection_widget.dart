import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/theme/app_theme.dart';
import '../services/api_service.dart';

class TailorSelectionWidget extends ConsumerStatefulWidget {
  final Function(String) onTailorSelected;

  const TailorSelectionWidget({
    Key? key,
    required this.onTailorSelected,
  }) : super(key: key);

  @override
  ConsumerState<TailorSelectionWidget> createState() =>
      _TailorSelectionWidgetState();
}

class _TailorSelectionWidgetState extends ConsumerState<TailorSelectionWidget> {
  String? selectedTailorId;
  List<Map<String, dynamic>> tailors = [];

  @override
  void initState() {
    super.initState();
    _loadTailors();
  }

  Future<void> _loadTailors() async {
    // Mock data for now
    setState(() {
      tailors = [
        {
          'id': '1',
          'name': 'Master Tailor Singh',
          'rating': 4.9,
          'reviews': 234,
          'specialization': 'Suits & Sherwanis',
          'avatar':
              'https://ui-avatars.com/api/?name=Master+Singh&background=D4AF37',
        },
        {
          'id': '2',
          'name': 'Expert Kumar',
          'rating': 4.8,
          'reviews': 189,
          'specialization': 'Traditional Wear',
          'avatar':
              'https://ui-avatars.com/api/?name=Expert+Kumar&background=7A1F1F',
        },
        {
          'id': '3',
          'name': 'Designer Patel',
          'rating': 4.7,
          'reviews': 156,
          'specialization': 'Modern Designs',
          'avatar':
              'https://ui-avatars.com/api/?name=Designer+Patel&background=D4AF37',
        },
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppDimensions.paddingLarge),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Select Tailor', style: AppTextStyles.headingMedium),
          const SizedBox(height: AppDimensions.paddingLarge),
          ...tailors.map((tailor) => _buildTailorCard(tailor)),
        ],
      ),
    );
  }

  Widget _buildTailorCard(Map<String, dynamic> tailor) {
    final isSelected = selectedTailorId == tailor['id'];

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedTailorId = tailor['id'];
        });
        widget.onTailorSelected(tailor['id']);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primaryGold.withOpacity(0.1)
              : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.primaryGold : AppColors.border,
            width: 2,
          ),
        ),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundImage: NetworkImage(tailor['avatar']),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    tailor['name'],
                    style: AppTextStyles.bodyLarge
                        .copyWith(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    tailor['specialization'],
                    style: AppTextStyles.bodySmall
                        .copyWith(color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.star, color: Colors.amber, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        '${tailor['rating']} (${tailor['reviews']} reviews)',
                        style: AppTextStyles.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            if (isSelected)
              const Icon(Icons.check_circle, color: AppColors.primaryGold),
          ],
        ),
      ),
    );
  }
}
