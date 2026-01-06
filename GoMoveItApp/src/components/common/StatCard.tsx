/**
 * StatCard Component - For displaying stats like steps, XP, level etc.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { BorderRadius, Spacing, Shadows, IconSizes } from '../../theme/spacing';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  gradientColors?: string[];
  trend?: {
    value: number;
    isPositive: boolean;
  };
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = Colors.primary,
  gradientColors,
  trend,
  size = 'md',
  style,
}) => {
  const getValueStyle = () => {
    switch (size) {
      case 'sm': return Typography.statSmall;
      case 'lg': return Typography.statLarge;
      default: return Typography.statMedium;
    }
  };

  const content = (
    <>
      <View style={styles.header}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
            <Ionicons name={icon} size={IconSizes.md} color={iconColor} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[getValueStyle(), styles.value]}>{value}</Text>
        {trend && (
          <View style={[styles.trendBadge, trend.isPositive ? styles.trendPositive : styles.trendNegative]}>
            <Ionicons
              name={trend.isPositive ? 'trending-up' : 'trending-down'}
              size={IconSizes.xs}
              color={trend.isPositive ? Colors.success : Colors.error}
            />
            <Text style={[styles.trendText, { color: trend.isPositive ? Colors.success : Colors.error }]}>
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </>
  );

  if (gradientColors) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, styles.gradientContainer, style]}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface.card,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    ...Shadows.md,
  },
  gradientContainer: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  title: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: Colors.text.primary,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  trendPositive: {
    backgroundColor: `${Colors.success}20`,
  },
  trendNegative: {
    backgroundColor: `${Colors.error}20`,
  },
  trendText: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
});

export default StatCard;
