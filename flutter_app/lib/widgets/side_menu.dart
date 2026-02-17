import 'package:flutter/material.dart';
import '../core/theme/app_theme.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppColors.backgroundCream, AppColors.backgroundLightCream],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Container(
                padding: const EdgeInsets.all(AppDimensions.paddingL),
                child: Column(
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: AppColors.primaryGold,
                          width: 3,
                        ),
                      ),
                      child: const CircleAvatar(
                        backgroundColor: AppColors.white,
                        child: Icon(
                          Icons.person,
                          size: 40,
                          color: AppColors.primaryGold,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'John Doe',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primaryBrown,
                      ),
                    ),
                    Text(
                      'john.doe@email.com',
                      style: AppTextStyles.bodySmall.copyWith(
                        color: AppColors.textLight,
                      ),
                    ),
                  ],
                ),
              ),

              const Divider(),

              // Menu Items
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  children: [
                    _buildMenuItem(
                      icon: Icons.home_outlined,
                      title: 'Home',
                      onTap: () => Navigator.pop(context),
                    ),
                    _buildMenuItem(
                      icon: Icons.receipt_long_outlined,
                      title: 'My Orders',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.history,
                      title: 'Order History',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.star_outline,
                      title: 'My Reviews',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.person_outline,
                      title: 'My Profile',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.settings_outlined,
                      title: 'Settings',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.help_outline,
                      title: 'Help & Support',
                      onTap: () {},
                    ),
                    _buildMenuItem(
                      icon: Icons.info_outline,
                      title: 'About',
                      onTap: () {},
                    ),
                    const Divider(),
                    _buildMenuItem(
                      icon: Icons.logout,
                      title: 'Logout',
                      onTap: () {},
                      textColor: AppColors.error,
                    ),
                  ],
                ),
              ),

              // App Version
              Padding(
                padding: const EdgeInsets.all(AppDimensions.paddingM),
                child: Text(
                  'Version 1.0.0',
                  style: AppTextStyles.bodySmall.copyWith(
                    color: AppColors.textMuted,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    Color? textColor,
  }) {
    return ListTile(
      leading: Icon(icon, color: textColor ?? AppColors.primaryBrown),
      title: Text(
        title,
        style: AppTextStyles.bodyMedium.copyWith(
          color: textColor ?? AppColors.primaryBrown,
          fontWeight: FontWeight.w500,
        ),
      ),
      onTap: onTap,
      hoverColor: AppColors.primaryGold.withOpacity(0.1),
    );
  }
}
