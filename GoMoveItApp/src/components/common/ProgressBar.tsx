/**
 * ProgressBar Component
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';
import { BorderRadius, Layout, Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  showLabel?: boolean;
  label?: string;
  showPercentage?: boolean;
  gradientColors?: readonly string[] | string[];
  backgroundColor?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = Layout.progressBarHeight,
  showLabel = false,
  label,
  showPercentage = false,
  gradientColors = Colors.gradients.primary,
  backgroundColor = Colors.ui.progressBarBg,
  animated = true,
  style,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: clampedProgress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(clampedProgress);
    }
  }, [clampedProgress, animated]);

  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, style]}>
      {(showLabel || showPercentage) && (
        <View style={styles.labelContainer}>
          {showLabel && label && (
            <Text style={styles.label}>{label}</Text>
          )}
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
          )}
        </View>
      )}
      
      <View style={[styles.track, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.progressContainer,
            { width: widthInterpolate, height },
          ]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.progress}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.captionBold,
    color: Colors.text.secondary,
  },
  percentage: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
  track: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressContainer: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    flex: 1,
    borderRadius: BorderRadius.full,
  },
});

export default ProgressBar;
