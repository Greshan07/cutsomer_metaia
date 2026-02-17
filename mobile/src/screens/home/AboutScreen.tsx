import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { Info, Award, Users, TrendingUp } from 'lucide-react-native';

export function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Info color={colors.maroon} size={32} />
          <Text style={styles.title}>About METAIA</Text>
        </View>
        <Text style={styles.subtitle}>Premium tailoring experiences powered by technology.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            METAIA connects customers with skilled tailors, making custom-fitted clothing accessible and convenient for everyone.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Users color={colors.maroon} size={28} />
            <Text style={styles.statValue}>10K+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statCard}>
            <Award color={colors.maroon} size={28} />
            <Text style={styles.statValue}>500+</Text>
            <Text style={styles.statLabel}>Expert Tailors</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <TrendingUp color={colors.maroon} size={28} />
          <Text style={styles.statValue}>4.8 ★</Text>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.maroon,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.maroon,
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
});
