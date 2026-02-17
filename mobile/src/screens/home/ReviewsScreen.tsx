import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { Star } from 'lucide-react-native';

export function ReviewsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Star color={colors.maroon} size={32} />
          <Text style={styles.title}>My Reviews</Text>
        </View>
        <Text style={styles.subtitle}>Share your feedback on past orders.</Text>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No reviews yet</Text>
          <Text style={styles.emptySubtext}>Complete an order to leave your first review!</Text>
        </View>
      </ScrollView>
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
  emptyCard: {
    backgroundColor: colors.white,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.maroon,
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
  },
});
