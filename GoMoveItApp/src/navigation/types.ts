/**
 * Navigation Types
 */

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  SignUp: undefined;
  SignIn: undefined;
  OTP: { email: string };
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Challenge: undefined;
  Wallet: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Level: undefined;
  Devices: undefined;
  AddDevice: undefined;
  FAQ: undefined;
  ChallengeDetail: { challengeId: string };
  Withdraw: undefined;
  Deposit: undefined;
  TransactionHistory: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  ConnectDevice: undefined;
  Main: undefined;
};
