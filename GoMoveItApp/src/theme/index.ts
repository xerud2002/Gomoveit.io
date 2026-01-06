/**
 * GoMoveIt Design System - Main Export
 */

export { Colors } from './colors';
export { Typography, FontSizes, FontWeights, FontFamily, LineHeights } from './typography';
export { Spacing, BorderRadius, IconSizes, Layout, Shadows } from './spacing';

// Theme object for easy access
import { Colors } from './colors';
import { Typography, FontSizes, FontWeights } from './typography';
import { Spacing, BorderRadius, IconSizes, Layout, Shadows } from './spacing';

export const Theme = {
  colors: Colors,
  typography: Typography,
  fontSizes: FontSizes,
  fontWeights: FontWeights,
  spacing: Spacing,
  borderRadius: BorderRadius,
  iconSizes: IconSizes,
  layout: Layout,
  shadows: Shadows,
};

export default Theme;
