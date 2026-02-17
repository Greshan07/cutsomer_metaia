import 'package:flutter/material.dart';
import 'dart:async';
import '../../core/theme/app_theme.dart';
import '../../core/theme/app_animations.dart';
import '../auth/login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _fadeController;
  late AnimationController _bounceController;
  late AnimationController _shimmerController;

  late Animation<double> _logoScale;
  late Animation<double> _logoRotation;
  late Animation<double> _fadeAnimation;
  late Animation<double> _bounceAnimation;
  late Animation<double> _shimmerAnimation;

  @override
  void initState() {
    super.initState();

    // Logo animation controller
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _logoScale = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.elasticOut),
    );

    _logoRotation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoController, curve: Curves.easeInOut),
    );

    // Fade animation
    _fadeController = AnimationController(
      duration: AppAnimations.slow,
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _fadeController, curve: Curves.easeIn));

    // Bounce animation for dots
    _bounceController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _bounceAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _bounceController, curve: Curves.bounceOut),
    );

    // Shimmer effect
    _shimmerController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _shimmerAnimation = Tween<double>(begin: -2.0, end: 2.0).animate(
      CurvedAnimation(parent: _shimmerController, curve: Curves.easeInOut),
    );

    // Start animations
    _logoController.forward();

    Timer(const Duration(milliseconds: 300), () {
      if (mounted) {
        _fadeController.forward();
      }
    });

    Timer(const Duration(milliseconds: 800), () {
      if (mounted) {
        _bounceController.repeat();
        _shimmerController.repeat();
      }
    });

    // Navigate to Login after 2.5 seconds
    Timer(AppAnimations.splash, () {
      if (mounted) {
        Navigator.of(
          context,
        ).pushReplacement(FadePageRoute(page: const LoginScreen()));
      }
    });
  }

  @override
  void dispose() {
    _logoController.dispose();
    _fadeController.dispose();
    _bounceController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppColors.backgroundCream,
              AppColors.primaryGold,
              Color(0xFFC5A028),
            ],
          ),
        ),
        child: Stack(
          children: [
            // Animated background elements
            AnimatedBuilder(
              animation: _shimmerAnimation,
              builder: (context, child) {
                return Positioned(
                  top:
                      MediaQuery.of(context).size.height * 0.25 +
                      _shimmerAnimation.value * 10,
                  left: MediaQuery.of(context).size.width * 0.25,
                  child: Container(
                    width: 250,
                    height: 250,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          AppColors.white.withOpacity(0.1),
                          AppColors.white.withOpacity(0.0),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),

            AnimatedBuilder(
              animation: _shimmerAnimation,
              builder: (context, child) {
                return Positioned(
                  bottom:
                      MediaQuery.of(context).size.height * 0.25 -
                      _shimmerAnimation.value * 10,
                  right: MediaQuery.of(context).size.width * 0.25,
                  child: Container(
                    width: 350,
                    height: 350,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: RadialGradient(
                        colors: [
                          AppColors.primaryBrown.withOpacity(0.1),
                          AppColors.primaryBrown.withOpacity(0.0),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),

            // Radial gradient overlay
            Center(
              child: Container(
                decoration: BoxDecoration(
                  gradient: RadialGradient(
                    colors: [
                      AppColors.primaryGold.withOpacity(0.2),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
            ),

            // Main content
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Animated Logo
                  AnimatedBuilder(
                    animation: _logoController,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _logoScale.value,
                        child: Transform.rotate(
                          angle: _logoRotation.value * 0.2,
                          child: Container(
                            width: 180,
                            height: 180,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: AppColors.primaryGold.withOpacity(0.6),
                                  blurRadius: 40,
                                  spreadRadius: 10,
                                ),
                              ],
                            ),
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                // Glow effect
                                AnimatedBuilder(
                                  animation: _shimmerController,
                                  builder: (context, child) {
                                    return Container(
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        gradient: RadialGradient(
                                          colors: [
                                            AppColors.primaryGold.withOpacity(
                                              0.4 +
                                                  _shimmerAnimation.value
                                                          .abs() *
                                                      0.2,
                                            ),
                                            Colors.transparent,
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                                // Logo (replace with actual logo)
                                Container(
                                  width: 150,
                                  height: 150,
                                  decoration: const BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: AppColors.white,
                                  ),
                                  child: const Icon(
                                    Icons.checkroom_rounded,
                                    size: 80,
                                    color: AppColors.primaryGold,
                                  ),
                                ),
                                // Sparkles
                                Positioned(
                                  top: -10,
                                  right: -10,
                                  child: AnimatedBuilder(
                                    animation: _bounceAnimation,
                                    builder: (context, child) {
                                      return Transform.scale(
                                        scale:
                                            0.5 + _bounceAnimation.value * 0.5,
                                        child: const Icon(
                                          Icons.auto_awesome,
                                          color: AppColors.white,
                                          size: 30,
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                Positioned(
                                  bottom: -5,
                                  left: -5,
                                  child: AnimatedBuilder(
                                    animation: _bounceAnimation,
                                    builder: (context, child) {
                                      return Transform.scale(
                                        scale:
                                            0.5 +
                                            (1 - _bounceAnimation.value) * 0.5,
                                        child: Icon(
                                          Icons.auto_awesome,
                                          color: AppColors.white.withOpacity(
                                            0.7,
                                          ),
                                          size: 24,
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 32),

                  // Brand Name
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0, 0.5),
                        end: Offset.zero,
                      ).animate(_fadeController),
                      child: ShaderMask(
                        shaderCallback: (bounds) => const LinearGradient(
                          colors: [
                            AppColors.primaryBrown,
                            AppColors.primaryGold,
                          ],
                        ).createShader(bounds),
                        child: const Text(
                          'METAIA',
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                            color: AppColors.white,
                            letterSpacing: 3,
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),

                  // Tagline
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0, 0.8),
                        end: Offset.zero,
                      ).animate(_fadeController),
                      child: Text(
                        'Your Perfect Fit Awaits',
                        style: AppTextStyles.bodyLarge.copyWith(
                          color: AppColors.primaryBrown.withOpacity(0.8),
                          fontSize: 18,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 40),

                  // Loading dots
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: _buildLoadingDots(),
                  ),

                  const SizedBox(height: 48),

                  // Trust indicators
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0, 1),
                        end: Offset.zero,
                      ).animate(_fadeController),
                      child: _buildTrustIndicators(),
                    ),
                  ),
                ],
              ),
            ),

            // Bottom decorative gradient
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                height: 120,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      AppColors.primaryBrown.withOpacity(0.2),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLoadingDots() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(3, (index) {
        return AnimatedBuilder(
          animation: _bounceAnimation,
          builder: (context, child) {
            final delay = index * 0.2;
            final value = (_bounceAnimation.value - delay).clamp(0.0, 1.0);

            return Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              child: Transform.translate(
                offset: Offset(0, -10 * value),
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppColors.primaryBrown,
                  ),
                ),
              ),
            );
          },
        );
      }),
    );
  }

  Widget _buildTrustIndicators() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildTrustItem('10K+', 'Happy\nCustomers'),
          Container(
            width: 1,
            height: 32,
            color: AppColors.white.withOpacity(0.3),
          ),
          _buildTrustItem('500+', 'Expert\nTailors'),
          Container(
            width: 1,
            height: 32,
            color: AppColors.white.withOpacity(0.3),
          ),
          _buildTrustItem('4.8★', 'Rating'),
        ],
      ),
    );
  }

  Widget _buildTrustItem(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: AppTextStyles.h4.copyWith(
            color: AppColors.white,
            fontSize: 22,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          textAlign: TextAlign.center,
          style: AppTextStyles.bodySmall.copyWith(
            color: AppColors.white.withOpacity(0.8),
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}
