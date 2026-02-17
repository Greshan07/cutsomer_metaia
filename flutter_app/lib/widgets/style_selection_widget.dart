import 'package:flutter/material.dart';
import '../core/theme/app_theme.dart';

class StyleSelectionWidget extends StatefulWidget {
  final String orderType;
  final Function(Map<String, dynamic>) onStyleSelected;

  const StyleSelectionWidget({
    Key? key,
    required this.orderType,
    required this.onStyleSelected,
  }) : super(key: key);

  @override
  State<StyleSelectionWidget> createState() => _StyleSelectionWidgetState();
}

class _StyleSelectionWidgetState extends State<StyleSelectionWidget> {
  String? selectedStyleId;

  final Map<String, List<Map<String, dynamic>>> styles = {
    'suit': [
      {
        'id': '1',
        'name': 'Classic Two-Piece',
        'description': 'Traditional formal'
      },
      {
        'id': '2',
        'name': 'Modern Slim Fit',
        'description': 'Contemporary style'
      },
      {'id': '3', 'name': 'Double-Breasted', 'description': 'Bold and elegant'},
    ],
    'shirt': [
      {'id': '1', 'name': 'Formal', 'description': 'Business wear'},
      {'id': '2', 'name': 'Casual', 'description': 'Everyday comfort'},
      {'id': '3', 'name': 'Party Wear', 'description': 'Special occasions'},
    ],
  };

  @override
  Widget build(BuildContext context) {
    final styleList = styles[widget.orderType] ?? styles['suit']!;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppDimensions.paddingLarge),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Select Style', style: AppTextStyles.headingMedium),
          const SizedBox(height: AppDimensions.paddingLarge),
          ...styleList.map((style) => _buildStyleCard(style)),
        ],
      ),
    );
  }

  Widget _buildStyleCard(Map<String, dynamic> style) {
    final isSelected = selectedStyleId == style['id'];

    return GestureDetector(
      onTap: () {
        setState(() {
          selectedStyleId = style['id'];
        });
        widget.onStyleSelected(style);
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
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    style['name'],
                    style: AppTextStyles.bodyLarge
                        .copyWith(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    style['description'],
                    style: AppTextStyles.bodySmall
                        .copyWith(color: AppColors.textSecondary),
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
