/**
 * OTP Verification Screen
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Button } from '../../components/common';

interface OTPScreenProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  email,
  onVerify,
  onResend,
  onBack,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    onVerify(otpValue);
  };

  const handleResend = () => {
    setTimer(300);
    setOtp(['', '', '', '', '', '']);
    setError('');
    onResend();
  };

  const maskedEmail = email.replace(/(.{3})(.*)(@.*)/, '$1****$3');

  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={IconSizes.base} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Icon */}
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="mail-open" size={IconSizes['2xl']} color={Colors.text.inverse} />
        </LinearGradient>

        {/* Title */}
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>
          Enter 6-Digit OTP sent to the email id{'\n'}
          <Text style={styles.email}>{maskedEmail}</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                error && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.messageContainer}>
            <Ionicons name="alert-circle" size={IconSizes.sm} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Success Message */}
        {success && (
          <View style={styles.messageContainer}>
            <Ionicons name="checkmark-circle" size={IconSizes.sm} color={Colors.success} />
            <Text style={styles.successText}>Email has been verified successfully</Text>
          </View>
        )}

        {/* Timer */}
        <Text style={styles.timer}>{formatTime(timer)}</Text>

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={timer > 0}
          style={styles.resendButton}
        >
          <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
            Resend Code
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <Button
          title="Continue"
          onPress={handleVerify}
          fullWidth
          style={styles.verifyButton}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing['2xl'],
  },
  email: {
    color: Colors.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.input,
    borderWidth: 1.5,
    borderColor: Colors.surface.border,
    marginHorizontal: 6,
    textAlign: 'center',
    ...Typography.h4,
    color: Colors.text.primary,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface.inputFocused,
  },
  otpInputError: {
    borderColor: Colors.error,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    marginLeft: Spacing.xs,
  },
  successText: {
    ...Typography.bodySmall,
    color: Colors.success,
    marginLeft: Spacing.xs,
  },
  timer: {
    ...Typography.h4,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  resendButton: {
    marginBottom: Spacing['2xl'],
  },
  resendText: {
    ...Typography.body,
    color: Colors.primary,
  },
  resendTextDisabled: {
    color: Colors.text.tertiary,
  },
  verifyButton: {
    width: '100%',
  },
});

export default OTPScreen;
