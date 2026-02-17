import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'screens/splash/splash_screen.dart';
import 'core/theme/app_theme.dart';
import 'services/socket_service.dart';
import 'services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase (optional - can be configured later)
  // await Firebase.initializeApp();

  // Initialize Notification Service
  await NotificationService().initialize();

  // Set preferred orientations
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: AppColors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(const ProviderScope(child: MetaiaApp()));
}

class MetaiaApp extends ConsumerStatefulWidget {
  const MetaiaApp({Key? key}) : super(key: key);

  @override
  ConsumerState<MetaiaApp> createState() => _MetaiaAppState();
}

class _MetaiaAppState extends ConsumerState<MetaiaApp> {
  final SocketService _socketService = SocketService();

  @override
  void initState() {
    super.initState();
    // Connect to socket when app starts
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _socketService.connect();
    });
  }

  @override
  void dispose() {
    _socketService.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'METAIA Tailor App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primaryGold,
          primary: AppColors.primaryGold,
          secondary: AppColors.primaryBrown,
        ),
        scaffoldBackgroundColor: AppColors.backgroundCream,
        appBarTheme: const AppBarTheme(
          elevation: 0,
          backgroundColor: Colors.transparent,
          iconTheme: IconThemeData(color: AppColors.primaryBrown),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primaryGold,
            foregroundColor: AppColors.white,
            elevation: AppDimensions.elevationM,
            padding: const EdgeInsets.symmetric(
              horizontal: AppDimensions.paddingL,
              vertical: AppDimensions.paddingM,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppDimensions.radiusXL),
            ),
            textStyle: AppTextStyles.buttonLarge,
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.white.withOpacity(0.8),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: AppDimensions.paddingL,
            vertical: AppDimensions.paddingM,
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(AppDimensions.radiusXL),
            borderSide: BorderSide(
              color: AppColors.primaryGold.withOpacity(0.3),
              width: 2,
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(AppDimensions.radiusXL),
            borderSide: BorderSide(
              color: AppColors.primaryGold.withOpacity(0.3),
              width: 2,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(AppDimensions.radiusXL),
            borderSide: const BorderSide(
              color: AppColors.primaryGold,
              width: 2,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(AppDimensions.radiusXL),
            borderSide: const BorderSide(color: AppColors.error, width: 2),
          ),
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
