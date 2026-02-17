import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

const steps = [
  'Order Type',
  'Outfit Design',
  'Measurements',
  'Tailor Selection',
  'Price Estimate',
  'Price Breakdown',
  'Payment',
  'Order Placement',
  'Success',
];

type Props = NativeStackScreenProps<RootStackParamList, 'OrderFlow'>;

export function OrderFlowScreen({ navigation, route }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const category = route.params?.category || 'Men';
  const style = route.params?.style || 'Shirt';

  const stepName = useMemo(() => steps[stepIndex], [stepIndex]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      navigation.goBack();
    } else {
      setStepIndex((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Flow</Text>
          <Text style={styles.subtitle}>Step {stepIndex + 1} of {steps.length}</Text>
        </View>

        <View style={styles.progressBar}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= stepIndex && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{stepName}</Text>
            <Text style={styles.cardMeta}>Category: {category}</Text>
            <Text style={styles.cardMeta}>Style: {style}</Text>
            <Text style={styles.cardText}>
              This screen is ready for the native port of the {stepName.toLowerCase()} step.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.actionButton, styles.secondary]} onPress={handleBack}>
            <ArrowLeft color={colors.maroon} size={20} />
            <Text style={[styles.actionText, styles.secondaryText]}>Back</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleNext}>
            <Text style={styles.actionText}>{stepIndex === steps.length - 1 ? 'Finish' : 'Next'}</Text>
            {stepIndex !== steps.length - 1 && <ArrowRight color={colors.white} size={20} />}
          </Pressable>
        </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.maroon,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: colors.muted,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(122,31,31,0.2)',
  },
  progressDotActive: {
    backgroundColor: colors.maroon,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.maroon,
  },
  cardMeta: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    fontWeight: '600',
  },
  cardText: {
    marginTop: 16,
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.maroon,
    paddingVertical: 16,
    borderRadius: 20,
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
