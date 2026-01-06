/**
 * GoMoveIt Design System - Typography
 */

import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'System',      // Will be replaced with custom font
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const LineHeights = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
  loose: 2,
};

export const FontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extraBold: '800' as TextStyle['fontWeight'],
};

// Pre-built text styles
export const Typography = {
  // Headings
  h1: {
    fontSize: FontSizes['5xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
  } as TextStyle,
  
  h2: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
  } as TextStyle,
  
  h3: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
  } as TextStyle,
  
  h4: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes['2xl'] * LineHeights.normal,
  } as TextStyle,
  
  h5: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.xl * LineHeights.normal,
  } as TextStyle,
  
  h6: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.lg * LineHeights.normal,
  } as TextStyle,
  
  // Body text
  bodyLarge: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.lg * LineHeights.relaxed,
  } as TextStyle,
  
  body: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.base * LineHeights.relaxed,
  } as TextStyle,
  
  bodySmall: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.md * LineHeights.relaxed,
  } as TextStyle,
  
  // Captions and labels
  caption: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * LineHeights.normal,
  } as TextStyle,
  
  captionBold: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.sm * LineHeights.normal,
  } as TextStyle,
  
  label: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.xs * LineHeights.normal,
    textTransform: 'uppercase',
    letterSpacing: 1,
  } as TextStyle,
  
  // Numbers and stats
  statLarge: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
  } as TextStyle,
  
  statMedium: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
  } as TextStyle,
  
  statSmall: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.lg * LineHeights.tight,
  } as TextStyle,
  
  // Buttons
  buttonLarge: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.lg * LineHeights.tight,
  } as TextStyle,
  
  button: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.base * LineHeights.tight,
  } as TextStyle,
  
  buttonSmall: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    lineHeight: FontSizes.md * LineHeights.tight,
  } as TextStyle,
};

export default Typography;
