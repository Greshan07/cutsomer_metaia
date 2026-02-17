import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ScreenContainer({ children, style }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
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
  },
});
