/**
 * Welcome Screen - Choose login method
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Button } from '../../components/common';

interface WelcomeScreenProps {
  onGoogleSignIn: () => void;
  onEmailSignUp: () => void;
  onSignIn: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGoogleSignIn,
  onEmailSignUp,
  onSignIn,
}) => {
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.logoContainer}
        >
          <Ionicons
            name="footsteps"
            size={IconSizes['3xl']}
            color={Colors.text.inverse}
          />
        </LinearGradient>
        <Text style={styles.appName}>GoMoveIt</Text>
        <Text style={styles.tagline}>Your journey to a healthier you starts here</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsSection}>
        {/* Google Sign In */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGoogleSignIn}
          activeOpacity={0.8}
        >
          <View style={styles.socialIconContainer}>
            <Ionicons name="logo-google" size={IconSizes.base} color="#DB4437" />
          </View>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email Sign Up */}
        <Button
          title="Sign up with Email"
          onPress={onEmailSignUp}
          fullWidth
          icon={<Ionicons name="mail-outline" size={IconSizes.md} color={Colors.text.inverse} />}
        />

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignIn}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  appName: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  tagline: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  buttonsSection: {
    paddingBottom: Spacing['2xl'],
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface.card,
    height: 52,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  socialButtonText: {
    ...Typography.button,
    color: Colors.text.primary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surface.border,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginHorizontal: Spacing.base,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  signInText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  signInLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  termsContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  termsText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
  },
});

export default WelcomeScreen;
