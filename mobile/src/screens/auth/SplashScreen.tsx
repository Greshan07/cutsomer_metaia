import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { authAPI, initAuthToken } from '../../services/api';

type SplashNavigation = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export function SplashScreen() {
  const navigation = useNavigation<SplashNavigation>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      await initAuthToken();
      const user = await authAPI.getCurrentUser();

      setTimeout(() => {
        if (!isActive) return;
        navigation.replace(user ? 'MainTabs' : 'AuthStack');
      }, 2500);
    };

    bootstrap();

    return () => {
      isActive = false;
    };
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.goldLight, colors.gold, colors.goldDark]} style={styles.container}>
      <View style={styles.backgroundGlow} />
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoWrap}>
          <View style={styles.logoGlow} />
          <Image source={require('../../../assets/metaia-logo.png')} style={styles.logo} resizeMode="contain" />
          <Sparkles color={colors.white} size={24} style={styles.sparkleTop} />
          <Sparkles color="rgba(255,255,255,0.7)" size={18} style={styles.sparkleBottom} />
        </View>
        <Text style={styles.title}>METAIA</Text>
        <Text style={styles.subtitle}>Your Perfect Fit Awaits</Text>
        <View style={styles.loadingRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotDelay]} />
          <View style={[styles.dot, styles.dotDelay2]} />
        </View>
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <Text style={styles.trustValue}>10K+</Text>
            <Text style={styles.trustLabel}>Happy Customers</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustValue}>500+</Text>
            <Text style={styles.trustLabel}>Expert Tailors</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustValue}>4.8★</Text>
            <Text style={styles.trustLabel}>Rating</Text>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(212,175,55,0.4)',
  },
  logo: {
    width: 160,
    height: 160,
  },
  sparkleTop: {
    position: 'absolute',
    right: -8,
    top: -6,
  },
  sparkleBottom: {
    position: 'absolute',
    left: -6,
    bottom: -4,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.maroon,
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 20,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loadingRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.maroon,
  },
  dotDelay: {
    opacity: 0.6,
  },
  dotDelay2: {
    opacity: 0.4,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  trustItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  trustValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  trustLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  trustDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
