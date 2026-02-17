import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, ShoppingBag, User } from 'lucide-react-native';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OTPVerificationScreen } from '../screens/auth/OTPVerificationScreen';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { AuthSuccessScreen } from '../screens/auth/AuthSuccessScreen';
import { CustomerHomeScreen } from '../screens/home/CustomerHomeScreen';
import { OrdersScreen } from '../screens/home/OrdersScreen';
import { ProfileScreen } from '../screens/home/ProfileScreen';
import { OrderHistoryScreen } from '../screens/home/OrderHistoryScreen';
import { ReviewsScreen } from '../screens/home/ReviewsScreen';
import { SettingsScreen } from '../screens/home/SettingsScreen';
import { AboutScreen } from '../screens/home/AboutScreen';
import { OrderFlowScreen } from '../screens/order/OrderFlowScreen';
import { colors } from '../theme/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OTP" component={OTPVerificationScreen} />
      <AuthStack.Screen name="Register" component={RegistrationScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.maroon,
        tabBarInactiveTintColor: 'rgba(122,31,31,0.4)',
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.98)',
          borderTopColor: colors.borderGold,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="OrderFlow" component={OrderFlowScreen} />
        <RootStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <RootStack.Screen name="Reviews" component={ReviewsScreen} />
        <RootStack.Screen name="Settings" component={SettingsScreen} />
        <RootStack.Screen name="About" component={AboutScreen} />
        <RootStack.Screen name="AuthSuccess" component={AuthSuccessScreen} />
      </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
