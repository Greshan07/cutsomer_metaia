import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:iconly/iconly.dart';
import '../../core/theme/app_theme.dart';
import '../../widgets/animated_step_indicator.dart';
import '../../widgets/measurement_form.dart';
import '../../widgets/tailor_selection_widget.dart';
import '../../widgets/fabric_selection_widget.dart';
import '../../widgets/style_selection_widget.dart';
import '../../widgets/payment_widget.dart';
import '../../providers/order_provider.dart';

class CompleteOrderFlowScreen extends ConsumerStatefulWidget {
  final String orderType;

  const CompleteOrderFlowScreen({
    Key? key,
    required this.orderType,
  }) : super(key: key);

  @override
  ConsumerState<CompleteOrderFlowScreen> createState() =>
      _CompleteOrderFlowScreenState();
}

class _CompleteOrderFlowScreenState
    extends ConsumerState<CompleteOrderFlowScreen>
    with SingleTickerProviderStateMixin {
  int _currentStep = 0;
  late AnimationController _animationController;
  late Animation<Offset> _slideAnimation;

  final PageController _pageController = PageController();

  // Order data
  Map<String, dynamic> orderData = {};

  final List<String> steps = [
    'Order Type',
    'Measurements',
    'Fabric',
    'Style',
    'Tailor',
    'Summary',
    'Payment',
    'Confirm',
  ];

  @override
  void initState() {
    super.initState();
    orderData['orderType'] = widget.orderType;

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(1.0, 0.0),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < steps.length - 1) {
      setState(() {
        _currentStep++;
      });
      _pageController.animateToPage(
        _currentStep,
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
      _animationController.reset();
      _animationController.forward();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() {
        _currentStep--;
      });
      _pageController.animateToPage(
        _currentStep,
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    }
  }

  Future<void> _submitOrder() async {
    final success =
        await ref.read(orderProvider.notifier).createOrder(orderData);

    if (success && mounted) {
      // Navigate to success screen
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => const OrderSuccessScreen(),
        ),
      );
    } else {
      // Show error
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Failed to create order. Please try again.'),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Place Order'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed:
              _currentStep == 0 ? () => Navigator.pop(context) : _previousStep,
        ),
      ),
      body: Column(
        children: [
          // Step Indicator
          AnimatedStepIndicator(
            currentStep: _currentStep,
            steps: steps,
          ),

          // Page Content
          Expanded(
            child: PageView(
              controller: _pageController,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildOrderTypeStep(),
                _buildMeasurementStep(),
                _buildFabricStep(),
                _buildStyleStep(),
                _buildTailorStep(),
                _buildSummaryStep(),
                _buildPaymentStep(),
                _buildConfirmationStep(),
              ],
            ),
          ),

          // Bottom Navigation
          _buildBottomNavigation(),
        ],
      ),
    );
  }

  Widget _buildOrderTypeStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: Padding(
        padding: const EdgeInsets.all(AppDimensions.paddingLarge),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select Order Type',
              style: AppTextStyles.headingMedium,
            ),
            const SizedBox(height: AppDimensions.paddingMedium),
            Text(
              'You have selected: ${widget.orderType.toUpperCase()}',
              style: AppTextStyles.bodyLarge.copyWith(
                color: AppColors.primaryGold,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: AppDimensions.paddingLarge),
            _buildOrderTypeCard('Suit', Icons.checkroom),
            _buildOrderTypeCard('Shirt', Icons.checkroom_outlined),
            _buildOrderTypeCard('Kurta', Icons.accessibility_new),
            _buildOrderTypeCard('Sherwani', Icons.accessibility),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderTypeCard(String type, IconData icon) {
    final isSelected = orderData['orderType'] == type.toLowerCase();

    return GestureDetector(
      onTap: () {
        setState(() {
          orderData['orderType'] = type.toLowerCase();
        });
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: AppDimensions.paddingMedium),
        padding: const EdgeInsets.all(AppDimensions.paddingMedium),
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
            Icon(icon,
                color: isSelected
                    ? AppColors.primaryGold
                    : AppColors.textSecondary),
            const SizedBox(width: 16),
            Text(
              type,
              style: AppTextStyles.bodyLarge.copyWith(
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                color:
                    isSelected ? AppColors.primaryGold : AppColors.textPrimary,
              ),
            ),
            const Spacer(),
            if (isSelected)
              const Icon(Icons.check_circle, color: AppColors.primaryGold),
          ],
        ),
      ),
    );
  }

  Widget _buildMeasurementStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: MeasurementForm(
        orderType: orderData['orderType'],
        onMeasurementsChanged: (measurements) {
          orderData['measurements'] = measurements;
        },
      ),
    );
  }

  Widget _buildFabricStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: FabricSelectionWidget(
        onFabricSelected: (fabric) {
          orderData['fabricDetails'] = fabric;
        },
      ),
    );
  }

  Widget _buildStyleStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: StyleSelectionWidget(
        orderType: orderData['orderType'],
        onStyleSelected: (style) {
          orderData['stylePreferences'] = style;
        },
      ),
    );
  }

  Widget _buildTailorStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: TailorSelectionWidget(
        onTailorSelected: (tailorId) {
          orderData['tailorId'] = tailorId;
        },
      ),
    );
  }

  Widget _buildSummaryStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(AppDimensions.paddingLarge),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Order Summary', style: AppTextStyles.headingMedium),
            const SizedBox(height: AppDimensions.paddingLarge),
            _buildSummarySection('Order Type',
                orderData['orderType']?.toString().toUpperCase() ?? 'N/A'),
            _buildSummarySection(
                'Fabric', orderData['fabricDetails']?['name'] ?? 'N/A'),
            _buildSummarySection(
                'Style', orderData['stylePreferences']?['name'] ?? 'N/A'),
            const Divider(height: 32),
            Text('Price Breakdown', style: AppTextStyles.headingSmall),
            const SizedBox(height: 16),
            _buildPriceRow('Base Price', 5000),
            _buildPriceRow(
                'Fabric Cost', orderData['fabricDetails']?['price'] ?? 0),
            _buildPriceRow('Stitching Cost', 2000),
            _buildPriceRow('Design Cost', 1500),
            const Divider(height: 24),
            _buildPriceRow('Total', 8500, isTotal: true),
          ],
        ),
      ),
    );
  }

  Widget _buildSummarySection(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label,
              style: AppTextStyles.bodyMedium
                  .copyWith(color: AppColors.textSecondary)),
          Text(value,
              style: AppTextStyles.bodyMedium
                  .copyWith(fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }

  Widget _buildPriceRow(String label, dynamic amount, {bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: isTotal
                ? AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold)
                : AppTextStyles.bodyMedium,
          ),
          Text(
            '₹${amount.toString()}',
            style: isTotal
                ? AppTextStyles.bodyLarge.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppColors.primaryGold,
                  )
                : AppTextStyles.bodyMedium
                    .copyWith(fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: PaymentWidget(
        amount: 8500,
        onPaymentComplete: (paymentData) {
          orderData['paymentData'] = paymentData;
          _nextStep();
        },
      ),
    );
  }

  Widget _buildConfirmationStep() {
    return SlideTransition(
      position: _slideAnimation,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(AppDimensions.paddingLarge),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: AppColors.premiumGradient,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.check,
                  size: 60,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 32),
              Text(
                'Review Your Order',
                style: AppTextStyles.headingMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                'Please review all the details before confirming your order.',
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBottomNavigation() {
    final orderState = ref.watch(orderProvider);

    return Container(
      padding: const EdgeInsets.all(AppDimensions.paddingMedium),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          if (_currentStep > 0)
            Expanded(
              child: OutlinedButton(
                onPressed: _previousStep,
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.primaryGold),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text('Back'),
              ),
            ),
          if (_currentStep > 0) const SizedBox(width: 16),
          Expanded(
            flex: _currentStep == 0 ? 1 : 2,
            child: ElevatedButton(
              onPressed: orderState.isLoading
                  ? null
                  : () {
                      if (_currentStep == steps.length - 1) {
                        _submitOrder();
                      } else {
                        _nextStep();
                      }
                    },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryGold,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: orderState.isLoading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : Text(
                      _currentStep == steps.length - 1
                          ? 'Confirm Order'
                          : 'Continue',
                    ),
            ),
          ),
        ],
      ),
    );
  }
}

class OrderSuccessScreen extends StatelessWidget {
  const OrderSuccessScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppDimensions.paddingLarge),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  gradient: AppColors.premiumGradient,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.check,
                  size: 80,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 32),
              Text(
                'Order Placed Successfully!',
                style: AppTextStyles.headingLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                'You will receive a confirmation notification shortly.',
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryGold,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 48,
                    vertical: 16,
                  ),
                ),
                child: const Text('Back to Home'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
