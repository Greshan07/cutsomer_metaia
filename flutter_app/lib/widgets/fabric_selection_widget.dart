import 'package:flutter/material.dart';
import '../core/theme/app_theme.dart';

class FabricSelectionWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onFabricSelected;

  const FabricSelectionWidget({
    Key? key,
    required this.onFabricSelected,
  }) : super(key: key);

  @override
  State<FabricSelectionWidget> createState() => _FabricSelectionWidgetState();
}

class _FabricSelectionWidgetState extends State<FabricSelectionWidget> {
  String? selectedFabricId;

  final List<Map<String, dynamic>> fabrics = [
    {
      'id': '1',
      'name': 'Premium Cotton',
      'price': 1500,
      'image':
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200',
      'description': 'Breathable and comfortable',
    },
    {
      'id': '2',
      'name': 'Silk Blend',
      'price': 3500,
      'image':
          'https://images.unsplash.com/photo-1592582882615-92d15e7f7c7c?w=200',
      'description': 'Luxurious and elegant',
    },
    {
      'id': '3',
      'name': 'Wool',
      'price': 2500,
      'image':
          'https://images.unsplash.com/photo-1558689908-8af5e72349b8?w=200',
      'description': 'Warm and durable',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppDimensions.paddingLarge),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Select Fabric', style: AppTextStyles.headingMedium),
          const SizedBox(height: AppDimensions.paddingLarge),
          ...fabrics.map((fabric) => _buildFabricCard(fabric)),
        ],
      ),
    );
  }

  Widget _buildFabricCard(Map<String, dynamic> fabric) {
    final isSelected = selectedFabricId == fabric['id'];

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedFabricId = fabric['id'];
        });
        widget.onFabricSelected(fabric);
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
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                fabric['image'],
                width: 60,
                height: 60,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    fabric['name'],
                    style: AppTextStyles.bodyLarge
                        .copyWith(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    fabric['description'],
                    style: AppTextStyles.bodySmall
                        .copyWith(color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '₹${fabric['price']}',
                    style: AppTextStyles.bodyMedium.copyWith(
                      color: AppColors.primaryGold,
                      fontWeight: FontWeight.w600,
                    ),
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
