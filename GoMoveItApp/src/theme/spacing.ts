/**
 * GoMoveIt Design System - Spacing & Layout
 */

// Base spacing unit (4px)
const BASE = 4;

export const Spacing = {
  // Spacing scale
  none: 0,
  xs: BASE,           // 4
  sm: BASE * 2,       // 8
  md: BASE * 3,       // 12
  base: BASE * 4,     // 16
  lg: BASE * 5,       // 20
  xl: BASE * 6,       // 24
  '2xl': BASE * 8,    // 32
  '3xl': BASE * 10,   // 40
  '4xl': BASE * 12,   // 48
  '5xl': BASE * 16,   // 64
  '6xl': BASE * 20,   // 80
};

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  base: 24,
  lg: 28,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

// Layout constants
export const Layout = {
  screenPadding: Spacing.base,           // 16
  cardPadding: Spacing.base,             // 16
  sectionSpacing: Spacing['2xl'],        // 32
  itemSpacing: Spacing.md,               // 12
  
  // Component heights
  buttonHeight: {
    sm: 36,
    md: 44,
    lg: 52,
  },
  inputHeight: 52,
  tabBarHeight: 80,
  headerHeight: 56,
  
  // Card dimensions
  cardMinHeight: 100,
  
  // Progress bar
  progressBarHeight: 8,
  progressBarHeightLarge: 12,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export default { Spacing, BorderRadius, IconSizes, Layout, Shadows };
