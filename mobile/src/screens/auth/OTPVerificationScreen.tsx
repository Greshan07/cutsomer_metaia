import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { authAPI } from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export function OTPVerificationScreen({ navigation, route }: Props) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authAPI.verifyOTP({ phone, otp });
      navigation.replace('Login');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.goldLight, '#EDD9B8', colors.gold]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView 
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>We sent a code to {phone}</Text>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor={colors.mutedLight}
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <PrimaryButton label={isLoading ? 'Verifying...' : 'Verify'} onPress={handleVerify} disabled={isLoading} />

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1 },
  content: {
    padding: 24,
    paddingTop: 80,
    gap: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.maroon,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  inputWrap: {
    borderWidth: 2,
    borderColor: colors.borderGold,
    borderRadius: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    fontSize: 20,
    color: colors.maroon,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '700',
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
  backText: {
    textAlign: 'center',
    color: colors.maroon,
    fontWeight: '700',
    fontSize: 15,
  },
});
