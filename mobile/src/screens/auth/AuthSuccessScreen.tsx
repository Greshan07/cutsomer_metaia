import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { CheckCircle } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthSuccess'>;

export function AuthSuccessScreen({ navigation }: Props) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <LinearGradient colors={[colors.goldLight, colors.gold, colors.goldDark]} style={styles.container}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconCircle}>
          <CheckCircle color={colors.white} size={48} fill={colors.success} strokeWidth={0} />
        </View>
        <Text style={styles.title}>Authentication Successful</Text>
        <Text style={styles.subtitle}>Taking you to your dashboard...</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.white,
    padding: 32,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.maroon,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
});
