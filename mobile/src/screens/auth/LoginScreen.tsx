import React, { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Mail } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { authAPI } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'> &
  NativeStackNavigationProp<RootStackParamList>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = { emailOrPhone: '', password: '' };
    let isValid = true;

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Mobile number or email is required';
      isValid = false;
    } else {
      const isPhone = /^\d{10}$/.test(emailOrPhone);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
      if (!isPhone && !isEmail) {
        newErrors.emailOrPhone = 'Enter a valid 10 digit phone or email';
        isValid = false;
      }
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    try {
      await authAPI.login({ phone: emailOrPhone, password });
      navigation.replace('MainTabs');
    } catch (error: any) {
      setApiError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const oauthBase = (process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

  useEffect(() => {
    // Handle deep link callback from OAuth
    const handleUrl = async (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      if (path === 'auth/success' && queryParams?.token) {
        try {
          await authAPI.setAuthToken(queryParams.token as string);
          navigation.replace('MainTabs');
        } catch (error) {
          Alert.alert('Login Error', 'Failed to complete login. Please try again.');
        }
      } else if (queryParams?.error) {
        Alert.alert('Login Failed', 'OAuth authentication failed. Please try again.');
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    
    // Check if app was opened with a URL
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });

    return () => subscription.remove();
  }, [navigation]);

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = Linking.createURL('auth/success');
      const authUrl = `${oauthBase}/api/auth/google?redirect_uri=${encodeURIComponent(redirectUrl)}`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
      
      if (result.type === 'success' && result.url) {
        const { queryParams } = Linking.parse(result.url);
        if (queryParams?.token) {
          await authAPI.setAuthToken(queryParams.token as string);
          navigation.replace('MainTabs');
        }
      }
    } catch (error) {
      Alert.alert('Login Error', 'Failed to open Google login. Please try again.');
    }
  };

  const handleAppleLogin = async () => {
    try {
      const redirectUrl = Linking.createURL('auth/success');
      const authUrl = `${oauthBase}/api/auth/apple/callback?redirect_uri=${encodeURIComponent(redirectUrl)}`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
      
      if (result.type === 'success' && result.url) {
        const { queryParams } = Linking.parse(result.url);
        if (queryParams?.token) {
          await authAPI.setAuthToken(queryParams.token as string);
          navigation.replace('MainTabs');
        }
      }
    } catch (error) {
      Alert.alert('Login Error', 'Failed to open Apple login. Please try again.');
    }
  };

  return (
    <LinearGradient colors={[colors.goldLight, '#EDD9B8', colors.gold]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoWrap}>
            <View style={styles.logoGlow} />
            <Image source={require('../../../assets/metaia-logo.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome to METAIA</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Mail color={colors.maroon} size={18} style={styles.inputIcon} />
              <TextInput
                placeholder="Mobile number or Email"
                placeholderTextColor={colors.mutedLight}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.emailOrPhone ? <Text style={styles.errorText}>{errors.emailOrPhone}</Text> : null}

            <View style={styles.inputWrap}>
              <Lock color={colors.maroon} size={18} style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.mutedLight}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>

            {apiError ? (
              <View style={styles.apiErrorBox}>
                <Text style={styles.apiErrorText}>⚠️ {apiError}</Text>
              </View>
            ) : null}

            <PrimaryButton label={isLoading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={isLoading} />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <Pressable onPress={handleGoogleLogin} style={styles.socialButton}>
                <Text style={styles.socialLabel}>Google</Text>
              </Pressable>
              <Pressable onPress={handleAppleLogin} style={styles.socialButton}>
                <Text style={styles.socialLabel}>Apple</Text>
              </Pressable>
            </View>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>New user? </Text>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    flexGrow: 1,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212,175,55,0.35)',
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.maroon,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderGold,
    borderRadius: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.maroon,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginLeft: 4,
    marginTop: -8,
  },
  forgotText: {
    textAlign: 'right',
    color: colors.maroon,
    fontSize: 14,
    fontWeight: '600',
  },
  apiErrorBox: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(211,47,47,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(211,47,47,0.3)',
  },
  apiErrorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(122,31,31,0.2)',
  },
  dividerText: {
    fontSize: 11,
    color: colors.mutedLight,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.borderGold,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    color: colors.maroon,
    fontWeight: '600',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerText: {
    color: colors.muted,
  },
  registerLink: {
    color: colors.maroon,
    fontWeight: '700',
  },
});
