import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { authAPI } from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!phone || !otp || !newPassword) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authAPI.resetPassword({ phone, otp, newPassword });
      navigation.navigate('Login');
    } catch (err: any) {
      setError(err.message || 'Reset failed');
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
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your phone and OTP to reset your password</Text>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Phone"
              placeholderTextColor={colors.mutedLight}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="OTP"
              placeholderTextColor={colors.mutedLight}
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={colors.mutedLight}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <PrimaryButton label={isLoading ? 'Resetting...' : 'Reset Password'} onPress={handleReset} disabled={isLoading} />

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
    marginBottom: 8,
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
    fontSize: 16,
    color: colors.maroon,
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
