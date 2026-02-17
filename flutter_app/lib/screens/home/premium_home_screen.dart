import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:shimmer/shimmer.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:iconly/iconly.dart';
import '../../core/theme/app_theme.dart';
import '../../widgets/custom_search_bar.dart';
import '../../widgets/category_chip.dart';
import '../../widgets/premium_product_card.dart';
import '../../widgets/banner_card.dart';
import '../../providers/auth_provider.dart';
import '../../providers/notification_provider.dart';

class PremiumHomeScreen extends ConsumerStatefulWidget {
  const PremiumHomeScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<PremiumHomeScreen> createState() => _PremiumHomeScreenState();
}

class _PremiumHomeScreenState extends ConsumerState<PremiumHomeScreen>
    with SingleTickerProviderStateMixin {
  int _currentBannerIndex = 0;
  final CarouselController _carouselController = CarouselController();
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  String selectedCategory = 'All';

  final List<String> categories = [
    'All',
    'Suits',
    'Shirts',
    'Kurtas',
    'Sherwanis',
    'Blazers',
    'Traditional',
  ];

  final List<Map<String, String>> banners = [
    {
      'image':
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
      'title': 'Premium Tailoring',
      'subtitle': 'Custom Made Just For You',
    },
    {
      'image':
          'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
      'title': 'Wedding Special',
      'subtitle': 'Exclusive Designs',
    },
    {
      'image':
          'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'title': 'Business Formals',
      'subtitle': 'Sharp & Professional',
    },
  ];

  final List<Map<String, dynamic>> styles = [
    {
      'name': 'Royal Sherwani',
      'price': 15999,
      'image':
          'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400',
      'rating': 4.8,
      'reviews': 234,
      'tag': 'Bestseller',
    },
    {
      'name': 'Premium Suit',
      'price': 12999,
      'image':
          'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
      'rating': 4.9,
      'reviews': 456,
      'tag': 'New',
    },
    {
      'name': 'Designer Kurta',
      'price': 4999,
      'image':
          'https://images.unsplash.com/photo-1622495894445-07af62ced4d4?w=400',
      'rating': 4.7,
      'reviews': 189,
      'tag': 'Trending',
    },
    {
      'name': 'Wedding Blazer',
      'price': 18999,
      'image':
          'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
      'rating': 4.9,
      'reviews': 312,
      'tag': 'Premium',
    },
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeIn),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authStateProvider);
    final notificationState = ref.watch(notificationProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: CustomScrollView(
            slivers: [
              // App Bar
              _buildSliverAppBar(authState, notificationState.unreadCount),

              // Search Bar
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(AppDimensions.paddingMedium),
                  child: CustomSearchBar(
                    hintText: 'Search styles, fabrics, tailors...',
                    onSearch: (query) {
                      // Implement search
                    },
                  ),
                ),
              ),

              // Hero Banners
              SliverToBoxAdapter(child: _buildHeroBanners()),

              // Categories
              SliverToBoxAdapter(child: _buildCategories()),

              // Flash Deals Section
              SliverToBoxAdapter(child: _buildFlashDeals()),

              // Trending Styles
              SliverToBoxAdapter(
                child: _buildSectionHeader('Trending Styles', onViewAll: () {}),
              ),

              // Products Grid
              SliverPadding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppDimensions.paddingMedium,
                ),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.65,
                    crossAxisSpacing: AppDimensions.paddingMedium,
                    mainAxisSpacing: AppDimensions.paddingMedium,
                  ),
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final style = styles[index % styles.length];
                      return PremiumProductCard(
                        name: style['name'],
                        price: style['price'],
                        image: style['image'],
                        rating: style['rating'],
                        reviews: style['reviews'],
                        tag: style['tag'],
                        onTap: () {
                          // Navigate to product details
                        },
                      );
                    },
                    childCount: styles.length,
                  ),
                ),
              ),

              // Bottom Spacing
              const SliverToBoxAdapter(
                child: SizedBox(height: AppDimensions.paddingLarge * 2),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _buildBottomNavBar(),
    );
  }

  Widget _buildSliverAppBar(AuthState authState, int unreadCount) {
    return SliverAppBar(
      floating: true,
      backgroundColor: AppColors.background,
      elevation: 0,
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hello, ${authState.user?.name?.split(' ').first ?? 'Guest'}',
            style: AppTextStyles.bodySmall.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          const Text(
            'METAIA',
            style: AppTextStyles.headingMedium,
          ),
        ],
      ),
      actions: [
        // Notification Icon
        Stack(
          children: [
            IconButton(
              icon: const Icon(IconlyBold.notification,
                  color: AppColors.textPrimary),
              onPressed: () {
                // Navigate to notifications
              },
            ),
            if (unreadCount > 0)
              Positioned(
                right: 8,
                top: 8,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: AppColors.error,
                    shape: BoxShape.circle,
                  ),
                  constraints: const BoxConstraints(
                    minWidth: 18,
                    minHeight: 18,
                  ),
                  child: Text(
                    unreadCount > 9 ? '9+' : unreadCount.toString(),
                    style: AppTextStyles.bodySmall.copyWith(
                      color: Colors.white,
                      fontSize: 10,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
          ],
        ),

        // Wishlist Icon
        IconButton(
          icon: const Icon(IconlyBold.heart, color: AppColors.textPrimary),
          onPressed: () {
            // Navigate to wishlist
          },
        ),
      ],
    );
  }

  Widget _buildHeroBanners() {
    return Column(
      children: [
        CarouselSlider(
          carouselController: _carouselController,
          options: CarouselOptions(
            height: 200,
            viewportFraction: 0.9,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 4),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            autoPlayCurve: Curves.fastOutSlowIn,
            enlargeCenterPage: true,
            onPageChanged: (index, reason) {
              setState(() {
                _currentBannerIndex = index;
              });
            },
          ),
          items: banners.map((banner) {
            return BannerCard(
              image: banner['image']!,
              title: banner['title']!,
              subtitle: banner['subtitle']!,
              onTap: () {},
            );
          }).toList(),
        ),
        const SizedBox(height: AppDimensions.paddingMedium),
        AnimatedSmoothIndicator(
          activeIndex: _currentBannerIndex,
          count: banners.length,
          effect: ExpandingDotsEffect(
            dotWidth: 8,
            dotHeight: 8,
            activeDotColor: AppColors.primaryGold,
            dotColor: AppColors.textSecondary.withOpacity(0.3),
          ),
        ),
      ],
    );
  }

  Widget _buildCategories() {
    return Container(
      height: 50,
      margin: const EdgeInsets.symmetric(vertical: AppDimensions.paddingMedium),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(
          horizontal: AppDimensions.paddingMedium,
        ),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          return CategoryChip(
            label: categories[index],
            isSelected: selectedCategory == categories[index],
            onTap: () {
              setState(() {
                selectedCategory = categories[index];
              });
            },
          );
        },
      ),
    );
  }

  Widget _buildFlashDeals() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: AppDimensions.paddingMedium),
      padding: const EdgeInsets.all(AppDimensions.paddingMedium),
      decoration: BoxDecoration(
        gradient: AppColors.premiumGradient,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '⚡ Flash Deals',
                style: AppTextStyles.headingSmall.copyWith(color: Colors.white),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.timer, color: Colors.white, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      '23:59:45',
                      style: AppTextStyles.bodySmall.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppDimensions.paddingMedium),
          SizedBox(
            height: 280,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 3,
              itemBuilder: (context, index) {
                final style = styles[index];
                return Container(
                  width: 160,
                  margin:
                      const EdgeInsets.only(right: AppDimensions.paddingMedium),
                  child: PremiumProductCard(
                    name: style['name'],
                    price: style['price'],
                    image: style['image'],
                    rating: style['rating'],
                    reviews: style['reviews'],
                    tag: '40% OFF',
                    originalPrice: (style['price'] * 1.4).toInt(),
                    onTap: () {},
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, {VoidCallback? onViewAll}) {
    return Padding(
      padding: const EdgeInsets.all(AppDimensions.paddingMedium),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: AppTextStyles.headingSmall),
          if (onViewAll != null)
            TextButton(
              onPressed: onViewAll,
              child: Text(
                'View All',
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.primaryGold,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildBottomNavBar() {
    return Container(
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
      child: BottomNavigationBar(
        currentIndex: 0,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppColors.primaryGold,
        unselectedItemColor: AppColors.textSecondary,
        selectedLabelStyle: AppTextStyles.bodySmall.copyWith(
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: AppTextStyles.bodySmall,
        elevation: 0,
        backgroundColor: Colors.transparent,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(IconlyLight.home),
            activeIcon: Icon(IconlyBold.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(IconlyLight.category),
            activeIcon: Icon(IconlyBold.category),
            label: 'Categories',
          ),
          BottomNavigationBarItem(
            icon: Icon(IconlyLight.bag),
            activeIcon: Icon(IconlyBold.bag),
            label: 'Orders',
          ),
          BottomNavigationBarItem(
            icon: Icon(IconlyLight.profile),
            activeIcon: Icon(IconlyBold.profile),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
