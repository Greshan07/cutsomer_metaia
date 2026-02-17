import React from 'react';
import { ScrollView, StyleSheet, Text, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { Settings as SettingsIcon, Bell, Moon, Globe } from 'lucide-react-native';

export function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <SettingsIcon color={colors.maroon} size={32} />
          <Text style={styles.title}>Settings</Text>
        </View>
        <Text style={styles.subtitle}>Manage your preferences.</Text>

        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell color={colors.maroon} size={22} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.borderGold, true: colors.gold }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon color={colors.maroon} size={22} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.borderGold, true: colors.gold }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Globe color={colors.maroon} size={22} />
              <View>
                <Text style={styles.settingText}>Language</Text>
                <Text style={styles.settingSubtext}>English</Text>
              </View>
            </View>
          </View>
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
  section: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  settingSubtext: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
});
