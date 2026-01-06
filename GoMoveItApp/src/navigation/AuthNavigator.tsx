/**
 * Auth Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import {
  SplashScreen,
  OnboardingScreen,
  WelcomeScreen,
  SignUpScreen,
  SignInScreen,
  OTPScreen,
} from '../screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type SplashScreenProps = NativeStackScreenProps<AuthStackParamList, 'Splash'>;
type OnboardingScreenProps = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;
type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
type SignInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
type OTPScreenProps = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

interface AuthNavigatorProps {
  onAuthComplete: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthComplete }) => {
  return (
    <Stack.Navigator
      id="AuthStack"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash">
        {(props: SplashScreenProps) => (
          <SplashScreen
            onFinish={() => props.navigation.replace('Onboarding')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Onboarding">
        {(props: OnboardingScreenProps) => (
          <OnboardingScreen
            onComplete={() => props.navigation.replace('Welcome')}
            onSkip={() => props.navigation.replace('Welcome')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Welcome">
        {(props: WelcomeScreenProps) => (
          <WelcomeScreen
            onGoogleSignIn={onAuthComplete}
            onEmailSignUp={() => props.navigation.navigate('SignUp')}
            onSignIn={() => props.navigation.navigate('SignIn')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignUp">
        {(props: SignUpScreenProps) => (
          <SignUpScreen
            onSignUp={(email: string, password: string) => {
              props.navigation.navigate('OTP', { email });
            }}
            onSignIn={() => props.navigation.navigate('SignIn')}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignIn">
        {(props: SignInScreenProps) => (
          <SignInScreen
            onSignIn={(email: string, password: string) => {
              onAuthComplete();
            }}
            onSignUp={() => props.navigation.navigate('SignUp')}
            onForgotPassword={() => props.navigation.navigate('ForgotPassword')}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="OTP">
        {(props: OTPScreenProps) => (
          <OTPScreen
            email={props.route.params?.email || ''}
            onVerify={(otp: string) => {
              onAuthComplete();
            }}
            onResend={() => {}}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
