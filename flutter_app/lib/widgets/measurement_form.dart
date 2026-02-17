import 'package:flutter/material.dart';
import '../core/theme/app_theme.dart';
import 'custom_text_field.dart';

class MeasurementForm extends StatefulWidget {
  final String orderType;
  final Function(Map<String, dynamic>) onMeasurementsChanged;

  const MeasurementForm({
    Key? key,
    required this.orderType,
    required this.onMeasurementsChanged,
  }) : super(key: key);

  @override
  State<MeasurementForm> createState() => _MeasurementFormState();
}

class _MeasurementFormState extends State<MeasurementForm> {
  final Map<String, TextEditingController> _controllers = {};

  final Map<String, List<String>> measurementFields = {
    'suit': [
      'Chest',
      'Waist',
      'Shoulder',
      'Sleeve Length',
      'Pant Length',
      'Hip'
    ],
    'shirt': ['Chest', 'Waist', 'Shoulder', 'Sleeve Length', 'Neck'],
    'kurta': ['Chest', 'Length', 'Shoulder', 'Sleeve Length'],
    'sherwani': ['Chest', 'Waist', 'Length', 'Shoulder', 'Sleeve Length'],
  };

  @override
  void initState() {
    super.initState();
    final fields = measurementFields[widget.orderType] ?? [];
    for (var field in fields) {
      _controllers[field] = TextEditingController();
      _controllers[field]!.addListener(_updateMeasurements);
    }
  }

  void _updateMeasurements() {
    final measurements = <String, dynamic>{};
    _controllers.forEach((key, controller) {
      if (controller.text.isNotEmpty) {
        measurements[key.toLowerCase().replaceAll(' ', '_')] = controller.text;
      }
    });
    widget.onMeasurementsChanged(measurements);
  }

  @override
  void dispose() {
    _controllers.forEach((_, controller) => controller.dispose());
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final fields = measurementFields[widget.orderType] ?? [];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppDimensions.paddingLarge),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Enter Measurements', style: AppTextStyles.headingMedium),
          const SizedBox(height: 8),
          Text(
            'All measurements in inches',
            style: AppTextStyles.bodySmall.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: AppDimensions.paddingLarge),
          ...fields.map((field) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: CustomTextField(
                  controller: _controllers[field]!,
                  label: field,
                  keyboardType: TextInputType.number,
                  suffixText: 'in',
                ),
              )),
        ],
      ),
    );
  }
}
