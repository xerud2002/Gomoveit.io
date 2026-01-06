/**
 * Card Component
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing, Shadows } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'gradient' | 'outlined';
  gradientColors?: readonly string[] | string[];
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  gradientColors,
  noPadding = false,
}) => {
  const cardStyle: ViewStyle = {
    borderRadius: BorderRadius.base,
    padding: noPadding ? 0 : Spacing.base,
    ...Shadows.md,
  };

  const getContent = () => {
    if (variant === 'gradient') {
      return (
        <LinearGradient
          colors={gradientColors || Colors.gradients.dark}
          style={[cardStyle, styles.gradientCard, style]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      );
    }

    if (variant === 'outlined') {
      return (
        <View style={[cardStyle, styles.outlinedCard, style]}>
          {children}
        </View>
      );
    }

    return (
      <View style={[cardStyle, styles.defaultCard, style]}>
        {children}
      </View>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {getContent()}
      </TouchableOpacity>
    );
  }

  return getContent();
};

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: Colors.surface.card,
  },
  gradientCard: {
    overflow: 'hidden',
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.surface.border,
  },
});

export default Card;
