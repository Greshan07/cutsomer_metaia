export type RootStackParamList = {
  Splash: undefined;
  AuthStack: undefined;
  MainTabs: undefined;
  OrderFlow: { category?: string; style?: string } | undefined;
  OrderHistory: undefined;
  Reviews: undefined;
  Settings: undefined;
  About: undefined;
  AuthSuccess: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTP: { phone: string };
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};
