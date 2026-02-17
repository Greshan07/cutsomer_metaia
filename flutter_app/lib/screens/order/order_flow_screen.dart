import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/theme/app_animations.dart';
import '../../widgets/custom_button.dart';

class OrderFlowScreen extends StatefulWidget {
  final String initialCategory;
  final String initialStyle;

  const OrderFlowScreen({
    Key? key,
    required this.initialCategory,
    required this.initialStyle,
  }) : super(key: key);

  @override
  State<OrderFlowScreen> createState() => _OrderFlowScreenState();
}

class _OrderFlowScreenState extends State<OrderFlowScreen> {
  int _currentStep = 0;

  final List<String> _steps = [
    'Order Type',
    'Design Details',
    'Measurements',
    'Tailor Selection',
    'Price Estimation',
    'Price Breakdown',
    'Payment',
    'Order Placement',
    'Order Success',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'New Order - ${widget.initialStyle}',
          style: AppTextStyles.h4.copyWith(fontSize: 18),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
        backgroundColor: AppColors.backgroundCream,
        elevation: 0,
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.tanGradient),
        child: Column(
          children: [
            // Progress Bar
            _buildProgressBar(),

            // Content
            Expanded(child: _buildStepContent()),

            // Navigation Buttons
            _buildNavigationButtons(),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressBar() {
    return Container(
      padding: const EdgeInsets.all(AppDimensions.paddingL),
      child: Column(
        children: [
          Row(
            children: List.generate(_steps.length, (index) {
              final isActive = index <= _currentStep;
              final isCompleted = index < _currentStep;

              return Expanded(
                child: Row(
                  children: [
                    Expanded(
                      child: AnimatedContainer(
                        duration: AppAnimations.normal,
                        height: 4,
                        decoration: BoxDecoration(
                          gradient: isActive ? AppColors.goldGradient : null,
                          color: isActive
                              ? null
                              : AppColors.primaryBrown.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                    if (index < _steps.length - 1) const SizedBox(width: 2),
                  ],
                ),
              );
            }),
          ),

          const SizedBox(height: 12),

          Text(
            'Step ${_currentStep + 1} of ${_steps.length}: ${_steps[_currentStep]}',
            style: AppTextStyles.bodyMedium.copyWith(
              fontWeight: FontWeight.w600,
              color: AppColors.primaryBrown,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppDimensions.paddingL),
      child: TweenAnimationBuilder<double>(
        key: ValueKey(_currentStep),
        tween: Tween(begin: 0.0, end: 1.0),
        duration: AppAnimations.medium,
        builder: (context, value, child) {
          return Opacity(
            opacity: value,
            child: Transform.translate(
              offset: Offset(0, 20 * (1 - value)),
              child: child,
            ),
          );
        },
        child: _getStepWidget(),
      ),
    );
  }

  Widget _getStepWidget() {
    switch (_currentStep) {
      case 0:
        return _buildOrderTypeStep();
      case 1:
        return _buildDesignDetailsStep();
      case 2:
        return _buildMeasurementsStep();
      case 3:
        return _buildTailorSelectionStep();
      case 4:
        return _buildPriceEstimationStep();
      case 5:
        return _buildPriceBreakdownStep();
      case 6:
        return _buildPaymentStep();
      case 7:
        return _buildOrderPlacementStep();
      case 8:
        return _buildOrderSuccessStep();
      default:
        return Container();
    }
  }

  Widget _buildOrderTypeStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Select Order Type', style: AppTextStyles.h3),
        const SizedBox(height: 24),

        _buildOrderTypeCard(
          icon: Icons.add_circle,
          title: 'Fresh Order',
          description: 'Create a brand new outfit from scratch',
          onTap: () {},
        ),

        const SizedBox(height: 16),

        _buildOrderTypeCard(
          icon: Icons.edit,
          title: 'Alteration',
          description: 'Modify an existing garment',
          onTap: () {},
        ),
      ],
    );
  }

  Widget _buildOrderTypeCard({
    required IconData icon,
    required String title,
    required String description,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppDimensions.paddingL),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(AppDimensions.radiusL),
          border: Border.all(color: AppColors.primaryGold.withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: AppColors.goldGradient,
                borderRadius: BorderRadius.circular(AppDimensions.radiusM),
              ),
              child: Icon(icon, color: AppColors.white, size: 32),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTextStyles.bodyLarge.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: AppTextStyles.bodySmall.copyWith(
                      color: AppColors.textLight,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 18),
          ],
        ),
      ),
    );
  }

  Widget _buildDesignDetailsStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Design Details', style: AppTextStyles.h3),
        const SizedBox(height: 8),
        Text(
          'Selected: ${widget.initialStyle} (${widget.initialCategory})',
          style: AppTextStyles.bodyMedium.copyWith(
            color: AppColors.primaryGold,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 24),
        Text(
          'Add your design preferences and special requirements here.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildMeasurementsStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Enter Measurements', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Enter your body measurements for the perfect fit.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildTailorSelectionStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Select Your Tailor', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Browse and choose from expert tailors near you.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildPriceEstimationStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Price Estimation', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Estimated price for your order based on selected options.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildPriceBreakdownStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Price Breakdown', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Detailed breakdown of all costs.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildPaymentStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Payment', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Select your payment method and complete the order.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildOrderPlacementStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Review & Place Order', style: AppTextStyles.h3),
        const SizedBox(height: 24),
        Text(
          'Review all details before placing your order.',
          style: AppTextStyles.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildOrderSuccessStep() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0.0, end: 1.0),
            duration: const Duration(milliseconds: 600),
            curve: Curves.elasticOut,
            builder: (context, value, child) {
              return Transform.scale(
                scale: value,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: AppColors.goldGradient,
                  ),
                  child: const Icon(
                    Icons.check,
                    size: 60,
                    color: AppColors.white,
                  ),
                ),
              );
            },
          ),

          const SizedBox(height: 24),

          Text(
            'Order Placed Successfully!',
            style: AppTextStyles.h3.copyWith(color: AppColors.success),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 12),

          Text(
            'Your order has been confirmed. We\'ll notify you once the tailor starts working on it.',
            style: AppTextStyles.bodyMedium.copyWith(
              color: AppColors.textLight,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildNavigationButtons() {
    return Container(
      padding: const EdgeInsets.all(AppDimensions.paddingL),
      decoration: BoxDecoration(
        color: AppColors.white,
        boxShadow: [
          BoxShadow(
            color: AppColors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            if (_currentStep > 0)
              Expanded(
                child: CustomButton(
                  text: 'Back',
                  onPressed: () {
                    setState(() => _currentStep--);
                  },
                  backgroundColor: AppColors.white,
                  textColor: AppColors.primaryBrown,
                ),
              ),

            if (_currentStep > 0) const SizedBox(width: 16),

            Expanded(
              child: CustomButton(
                text: _currentStep == _steps.length - 1 ? 'Done' : 'Continue',
                onPressed: () {
                  if (_currentStep == _steps.length - 1) {
                    Navigator.of(context).pop();
                  } else {
                    setState(() => _currentStep++);
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
