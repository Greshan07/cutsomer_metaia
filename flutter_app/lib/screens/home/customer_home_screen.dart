import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../core/theme/app_theme.dart';

class CustomerHomeScreen extends ConsumerStatefulWidget {
  const CustomerHomeScreen({super.key});

  @override
  ConsumerState<CustomerHomeScreen> createState() => _CustomerHomeScreenState();
}

class _CustomerHomeScreenState extends ConsumerState<CustomerHomeScreen>
    with SingleTickerProviderStateMixin {
  String selectedCategory = 'Men';
  late AnimationController _animationController;

  final List<String> categories = ['Men', 'Women', 'Kids'];

  final Map<String, List<Map<String, dynamic>>> stylesByCategory = {
    'Men': [
      {
        'id': '1',
        'name': 'Classic Suit',
        'category': 'Formal Wear',
        'image':
            'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400',
      },
      {
        'id': '2',
        'name': 'Business Casual',
        'category': 'Office Wear',
        'image':
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
      },
      {
        'id': '3',
        'name': 'Traditional Sherwani',
        'category': 'Ethnic Wear',
        'image':
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
      },
    ],
    'Women': [
      {
        'id': '4',
        'name': 'Designer Saree',
        'category': 'Ethnic Wear',
        'image':
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      },
      {
        'id': '5',
        'name': 'Formal Blazer',
        'category': 'Office Wear',
        'image':
            'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
      },
      {
        'id': '6',
        'name': 'Evening Gown',
        'category': 'Party Wear',
        'image':
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
      },
    ],
    'Kids': [
      {
        'id': '7',
        'name': 'Party Suit',
        'category': 'Formal Wear',
        'image':
            'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400',
      },
      {
        'id': '8',
        'name': 'Ethnic Kurta',
        'category': 'Traditional',
        'image':
            'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
      },
      {
        'id': '9',
        'name': 'Casual Wear',
        'category': 'Daily Wear',
        'image':
            'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400',
      },
    ],
  };

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: AppAnimations.normal,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get stylesForCategory =>
      stylesByCategory[selectedCategory] ?? [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hero Section with Gradient
              _buildHeroSection(),

              const SizedBox(height: 32),

              // Category Selection
              _buildCategorySection(),

              const SizedBox(height: 32),

              // Popular Styles Horizontal List
              _buildPopularStylesSection(),

              const SizedBox(height: 32),

              // Why METAIA Section
              _buildWhyMetaiaSection(),

              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: AppColors.heroGradient,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: AppColors.gold.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Container(
        padding: const EdgeInsets.all(28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title with Sparkles Icon
            Row(
              children: [
                Text(
                  'METAIA Tailor',
                  style: AppTextStyles.h2.copyWith(
                    color: AppColors.maroon,
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 8),
                Icon(
                  Icons.auto_awesome,
                  color: AppColors.maroon,
                  size: 24,
                ),
              ],
            )
                .animate()
                .fadeIn(duration: 600.ms, delay: 200.ms)
                .slideX(begin: -0.2, end: 0),

            const SizedBox(height: 12),

            // Subtitle
            Text(
              'Crafted fits. Effortless ordering.',
              style: AppTextStyles.bodyMedium.copyWith(
                color: AppColors.muted,
                fontSize: 15,
              ),
            )
                .animate()
                .fadeIn(duration: 600.ms, delay: 400.ms)
                .slideX(begin: -0.2, end: 0),

            const SizedBox(height: 24),

            // CTA Button
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/new-order');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.maroon,
                foregroundColor: AppColors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(24),
                ),
                elevation: 0,
              ),
              child: const Text(
                'Start an Order',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ).animate().fadeIn(duration: 600.ms, delay: 600.ms).scale(
                begin: const Offset(0.8, 0.8), end: const Offset(1.0, 1.0)),
          ],
        ),
      ),
    ).animate().fadeIn(duration: 800.ms).slideY(begin: -0.3, end: 0);
  }

  Widget _buildCategorySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'Choose Category',
            style: AppTextStyles.h3.copyWith(
              fontSize: 20,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Category Tabs
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: categories.map((category) {
              final isSelected = selectedCategory == category;
              return Padding(
                padding: const EdgeInsets.only(right: 12),
                child: AnimatedContainer(
                  duration: AppAnimations.normal,
                  curve: AppAnimations.defaultCurve,
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        selectedCategory = category;
                      });
                      _animationController.forward(from: 0);
                    },
                    borderRadius: BorderRadius.circular(24),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.maroon : AppColors.white,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(
                          color: isSelected
                              ? AppColors.maroon
                              : AppColors.borderGold,
                          width: 2,
                        ),
                      ),
                      child: Text(
                        category,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color:
                              isSelected ? AppColors.white : AppColors.maroon,
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        )
            .animate()
            .fadeIn(duration: 600.ms, delay: 800.ms)
            .slideX(begin: -0.2, end: 0),
      ],
    );
  }

  Widget _buildPopularStylesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'Popular Styles',
            style: AppTextStyles.h3.copyWith(
              fontSize: 20,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Horizontal Style Cards
        SizedBox(
          height: 240,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: stylesForCategory.length,
            itemBuilder: (context, index) {
              final style = stylesForCategory[index];
              return _buildStyleCard(style, index);
            },
          ),
        )
            .animate()
            .fadeIn(duration: 600.ms, delay: 1000.ms)
            .slideX(begin: 0.2, end: 0),
      ],
    );
  }

  Widget _buildStyleCard(Map<String, dynamic> style, int index) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 16),
      child: Material(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(20),
        elevation: 2,
        shadowColor: AppColors.black.withOpacity(0.1),
        child: InkWell(
          onTap: () {
            // Navigate to style details
          },
          borderRadius: BorderRadius.circular(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Style Image
              ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
                child: Container(
                  height: 140,
                  decoration: BoxDecoration(
                    color: AppColors.goldLight,
                  ),
                  child: Stack(
                    children: [
                      Image.network(
                        style['image'],
                        width: double.infinity,
                        height: 140,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            color: AppColors.goldLight,
                            child: Center(
                              child: Icon(
                                Icons.checkroom,
                                size: 48,
                                color: AppColors.gold,
                              ),
                            ),
                          );
                        },
                      ),
                      // Gradient overlay for better text visibility
                      Positioned(
                        bottom: 0,
                        left: 0,
                        right: 0,
                        child: Container(
                          height: 60,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                Colors.transparent,
                                AppColors.black.withOpacity(0.3),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Style Info
              Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      style['name'],
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: AppColors.maroon,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      style['category'],
                      style: TextStyle(
                        fontSize: 13,
                        color: AppColors.muted,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    )
        .animate()
        .fadeIn(duration: 400.ms, delay: (1200 + index * 100).ms)
        .scale(begin: const Offset(0.8, 0.8), end: const Offset(1.0, 1.0));
  }

  Widget _buildWhyMetaiaSection() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: AppColors.borderGold,
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.auto_awesome,
                color: AppColors.gold,
                size: 28,
              ),
              const SizedBox(width: 12),
              Text(
                'Why METAIA?',
                style: AppTextStyles.h3.copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Experience the perfect blend of traditional craftsmanship and modern convenience. Our expert tailors bring your style vision to life with precision measurements and premium fabrics.',
            style: AppTextStyles.bodyMedium.copyWith(
              fontSize: 14,
              color: AppColors.muted,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),

          // Features
          _buildFeatureRow(Icons.verified, 'Expert Craftsmanship'),
          const SizedBox(height: 12),
          _buildFeatureRow(Icons.access_time, 'Quick Turnaround'),
          const SizedBox(height: 12),
          _buildFeatureRow(Icons.local_shipping, 'Doorstep Delivery'),
        ],
      ),
    )
        .animate()
        .fadeIn(duration: 600.ms, delay: 1400.ms)
        .slideY(begin: 0.3, end: 0);
  }

  Widget _buildFeatureRow(IconData icon, String text) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.goldLight,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            icon,
            color: AppColors.maroon,
            size: 18,
          ),
        ),
        const SizedBox(width: 12),
        Text(
          text,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: AppColors.maroon,
          ),
        ),
      ],
    );
  }
}
