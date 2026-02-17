import 'package:flutter/material.dart';

// App Color Scheme - METAIA Brand Colors (Original React Native colors)
class AppColors {
  // Original React Native Colors
  static const Color goldLight = Color(0xFFF5E6D3);
  static const Color gold = Color(0xFFD4AF37);
  static const Color goldDark = Color(0xFFC5A028);
  static const Color maroon = Color(0xFF7A1F1F);
  static const Color maroonDark = Color(0xFF1A0A0A);
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static Color muted = const Color(0xFF7A1F1F).withOpacity(0.7);
  static Color mutedLight = const Color(0xFF7A1F1F).withOpacity(0.4);
  static Color borderGold = const Color(0xFFD4AF37).withOpacity(0.3);
  static Color surface = const Color(0xFFFFFFFF).withOpacity(0.9);
  static const Color danger = Color(0xFFD32F2F);
  static const Color success = Color(0xFF2E7D32);

  // Legacy naming for compatibility (pointing to original colors)
  static const Color primaryGold = gold;
  static const Color secondaryGold = goldDark;
  static const Color primaryBrown = maroon;
  static const Color backgroundCream = goldLight;

  // Background Colors
  static const Color backgroundLightCream = Color(0xFFEDD9B8);
  static const Color backgroundGold = gold;
  static const Color backgroundTan = Color(0xFFB8A890);
  static const Color backgroundBeige = Color(0xFFE5D4B8);

  // Dark Mode Colors
  static const Color darkBackground = Color(0xFF2D1A1A);
  static const Color darkSurface = maroonDark;
  static const Color darkCard = Color(0xFF3D2A2A);

  // Accent Colors
  static const Color error = danger;
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);

  // Text Colors
  static const Color textPrimary = maroon;
  static const Color textSecondary = maroon;
  static Color textLight = muted;
  static Color textMuted = mutedLight;

  // Gradients (matching original React Native LinearGradient)
  static const LinearGradient heroGradient = LinearGradient(
    colors: [goldLight, gold],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient goldGradient = LinearGradient(
    colors: [gold, goldDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient creamGradient = LinearGradient(
    colors: [goldLight, backgroundLightCream, gold],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkGradient = LinearGradient(
    colors: [darkBackground, darkSurface],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient tanGradient = LinearGradient(
    colors: [backgroundTan, backgroundBeige],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

// Animation Durations
class AppAnimations {
  static const Duration fast = Duration(milliseconds: 200);
  static const Duration normal = Duration(milliseconds: 300);
  static const Duration medium = Duration(milliseconds: 400);
  static const Duration slow = Duration(milliseconds: 500);
  static const Duration verySlow = Duration(milliseconds: 800);
  static const Duration splash = Duration(milliseconds: 2500);

  // Animation Curves
  static const Curve defaultCurve = Curves.easeInOut;
  static const Curve bounceCurve = Curves.bounceOut;
  static const Curve elasticCurve = Curves.elasticOut;
  static const Curve fastOutSlowIn = Curves.fastOutSlowIn;
}

// Text Styles
class AppTextStyles {
  // Headings
  static const TextStyle h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle h2 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle h3 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  static const TextStyle h4 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  // Body Text
  static const TextStyle bodyLarge = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );

  static const TextStyle bodySmall = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );

  // Button Text
  static const TextStyle buttonLarge = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );

  static const TextStyle buttonMedium = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );

  // Caption & Labels
  static TextStyle caption = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    color: AppColors.textMuted,
  );

  static const TextStyle label = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
  );
}

// Spacing & Dimensions
class AppDimensions {
  // Padding
  static const double paddingXS = 4.0;
  static const double paddingS = 8.0;
  static const double paddingM = 16.0;
  static const double paddingL = 24.0;
  static const double paddingXL = 32.0;

  // Border Radius
  static const double radiusS = 8.0;
  static const double radiusM = 12.0;
  static const double radiusL = 16.0;
  static const double radiusXL = 24.0;
  static const double radiusCircle = 999.0;

  // Icon Sizes
  static const double iconS = 16.0;
  static const double iconM = 24.0;
  static const double iconL = 32.0;
  static const double iconXL = 48.0;

  // Button Heights
  static const double buttonHeightS = 40.0;
  static const double buttonHeightM = 48.0;
  static const double buttonHeightL = 56.0;

  // Elevation
  static const double elevationS = 2.0;
  static const double elevationM = 4.0;
  static const double elevationL = 8.0;
  static const double elevationXL = 16.0;
}
