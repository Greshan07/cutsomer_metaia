import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { authAPI } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { User, Settings, Star, Info, LogOut } from 'lucide-react-native';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const load = async () => {
      const user = await authAPI.getCurrentUser();
      setUserName(user?.name || 'METAIA User');
    };

    load();
  }, []);

  const handleLogout = async () => {
    await authAPI.logout();
    navigation.replace('AuthStack');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <User color={colors.white} size={32} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <Settings color={colors.maroon} size={22} />
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Reviews')}>
            <Star color={colors.maroon} size={22} />
            <Text style={styles.menuText}>My Reviews</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('About')}>
            <Info color={colors.maroon} size={22} />
            <Text style={styles.menuText}>About METAIA</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <LogOut color={colors.danger} size={20} />
          <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.goldLight,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.maroon,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.muted,
  },
  menuSection: {
    gap: 12,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.borderGold,
  },
  logoutButton: {
    borderColor: 'rgba(211,47,47,0.3)',
    backgroundColor: 'rgba(211,47,47,0.05)',
  },
  actionText: {
    fontWeight: '700',
    fontSize: 16,
  },
  logoutText: {
    color: colors.danger,
  },
});
