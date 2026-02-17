import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { PrimaryButton } from '../../components/PrimaryButton';
import { authAPI } from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegistrationScreen({ navigation }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authAPI.register(form);
      navigation.replace('Login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join METAIA today</Text>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={colors.mutedLight}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.mutedLight}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Phone"
              placeholderTextColor={colors.mutedLight}
              value={form.phone}
              onChangeText={(value) => setForm({ ...form, phone: value })}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.mutedLight}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              style={styles.input}
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <PrimaryButton label={isLoading ? 'Creating...' : 'Register'} onPress={handleRegister} disabled={isLoading} />

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backText}>Back to Login</Text>
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
    paddingTop: 60,
    flexGrow: 1,
    gap: 16,
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
    marginBottom: 16,
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
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.maroon,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: -8,
  },
  backText: {
    textAlign: 'center',
    color: colors.maroon,
    fontWeight: '700',
    fontSize: 15,
  },
});
