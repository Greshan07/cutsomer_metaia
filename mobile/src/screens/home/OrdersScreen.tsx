import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ShoppingBag } from 'lucide-react-native';

export function OrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ShoppingBag color={colors.maroon} size={32} />
          <Text style={styles.title}>My Orders</Text>
        </View>
        <Text style={styles.subtitle}>Track and manage your orders.</Text>

      <Pressable style={styles.actionButton} onPress={() => navigation.navigate('OrderHistory')}>
        <Text style={styles.actionText}>View Order History</Text>
      </Pressable>

        <Pressable style={[styles.actionButton, styles.secondary]} onPress={() => navigation.navigate('OrderFlow')}>
          <Text style={[styles.actionText, styles.secondaryText]}>Start New Order</Text>
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
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.maroon,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    fontSize: 15,
    color: colors.muted,
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: colors.maroon,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  secondaryText: {
    color: colors.maroon,
  },
});
