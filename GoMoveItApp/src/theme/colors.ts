/**
 * GoMoveIt Design System - Colors
 * Dark theme with vibrant fitness/gaming accents
 */

export const Colors = {
  // Primary Brand Colors
  primary: '#00D9FF',        // Cyan - main accent
  primaryDark: '#00A8CC',    // Darker cyan
  primaryLight: '#4DE8FF',   // Lighter cyan
  
  // Secondary Colors
  secondary: '#FF6B35',      // Orange - energy/stamina
  secondaryDark: '#E55A2B',
  secondaryLight: '#FF8F66',
  
  // Accent Colors
  accent: '#A855F7',         // Purple - XP/level
  accentDark: '#9333EA',
  accentLight: '#C084FC',
  
  success: '#22C55E',        // Green - completed/success
  successDark: '#16A34A',
  successLight: '#4ADE80',
  
  warning: '#FBBF24',        // Yellow/Gold - rewards
  warningDark: '#F59E0B',
  warningLight: '#FCD34D',
  
  error: '#EF4444',          // Red - errors/failed
  errorDark: '#DC2626',
  errorLight: '#F87171',
  
  // Background Colors (Dark Theme)
  background: {
    primary: '#0A0E17',      // Main dark background
    secondary: '#111827',    // Card/surface background
    tertiary: '#1F2937',     // Elevated surfaces
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Surface Colors
  surface: {
    card: '#151C2C',         // Card background
    cardHover: '#1E2640',
    input: '#1A2332',        // Input field background
    inputFocused: '#212D42',
    border: '#2D3748',       // Border color
    borderLight: '#4A5568',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',      // Main text
    secondary: '#94A3B8',    // Secondary/muted text
    tertiary: '#64748B',     // Disabled/hint text
    inverse: '#0A0E17',      // Text on light backgrounds
    link: '#00D9FF',         // Links
  },
  
  // Gradient Presets
  gradients: {
    primary: ['#00D9FF', '#00A8CC'] as const,
    secondary: ['#FF6B35', '#E55A2B'] as const,
    accent: ['#A855F7', '#7C3AED'] as const,
    success: ['#22C55E', '#16A34A'] as const,
    gold: ['#FBBF24', '#F59E0B'] as const,
    dark: ['#1F2937', '#111827'] as const,
    cardShine: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0)'] as const,
  },
  
  // Specific UI Elements
  ui: {
    tabBarActive: '#00D9FF',
    tabBarInactive: '#64748B',
    progressBar: '#00D9FF',
    progressBarBg: '#2D3748',
    divider: '#2D3748',
    shadow: '#000000',
  },
  
  // Status Colors
  status: {
    online: '#22C55E',
    offline: '#64748B',
    busy: '#EF4444',
    away: '#FBBF24',
  },
  
  // Level Colors (for gamification)
  levels: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
  },
};

export default Colors;
