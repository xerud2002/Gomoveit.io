# GoMoveIt - Fitness & Rewards App

A React Native mobile app built with Expo that gamifies fitness tracking with rewards, challenges, and progression systems.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Yarn or npm
- Expo Go app on your phone (iOS/Android)

### Installation

```bash
# Navigate to project directory
cd "c:\Users\Cip\Desktop\Gomoveit.io\GoMoveItApp"

# Install dependencies (already done)
yarn install
# or
npm install
```

### Running the App

#### Option 1: Start Expo Development Server
```bash
yarn start
# or
npm start
```

This will:
1. Start the Metro bundler
2. Show a QR code in your terminal
3. Open Expo DevTools in your browser

#### Option 2: Run on Specific Platform
```bash
# Android
yarn android

# iOS (Mac only)
yarn ios

# Web (for testing)
yarn web
```

### Testing on Your Phone

1. Install **Expo Go** from:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
   - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)

2. Run `yarn start` in your project

3. Scan the QR code:
   - **Android**: Use Expo Go app's QR scanner
   - **iOS**: Use Camera app, it will open in Expo Go

## 📱 Features Implemented

### ✅ Design System
- Dark theme with vibrant accents (Cyan/Orange/Purple)
- Typography system with predefined text styles
- Spacing & layout constants
- Gradient presets
- Color palette for consistency

### ✅ UI Components
- **Button**: Primary, Secondary, Outline, Ghost, Danger variants with gradient support
- **Input**: Labels, icons, password toggle, error states
- **Card**: Default, Gradient, Outlined variants
- **ProgressBar**: Animated progress with gradient fill
- **StatCard**: Stats display with icons and trends

### ✅ Authentication Screens
- **SplashScreen**: Animated logo and loading
- **OnboardingScreen**: 4-slide carousel intro
- **WelcomeScreen**: Google sign-in + email options
- **SignUpScreen**: Registration form with validation
- **SignInScreen**: Login with forgot password
- **OTPScreen**: 6-digit verification code

### ✅ Main Screens
- **HomeScreen**: Dashboard with token balance, stats (Stamina/Level/XP), steps progress, challenges carousel
- **WalletScreen**: Balance display, deposit/withdraw, transaction history
- **ShopScreen**: Buy XP/Stamina items with tabbed interface
- **ChallengesScreen**: Ongoing/Upcoming/Past challenges with join functionality

### ✅ Profile Screens
- **ProfileScreen**: User profile with stats, menu items
- **SettingsScreen**: App settings and preferences

### ✅ Navigation
- Bottom tab navigator (Home, Shop, Challenges, Wallet)
- Stack navigators for auth flow and main app
- Custom tab bar with animated icons
- Screen transitions

## 🎨 Design Highlights

- **Dark Mode**: #0A0E17 background with elevated surfaces
- **Gradients**: Cyan (#00D9FF), Orange (#FF6B35), Purple (#A855F7)
- **Gamification**: XP, Levels, Stamina, Points/Credits (simplified, no blockchain)
- **Typography**: Hierarchical text styles (h1-h6, body, captions)
- **Icons**: Ionicons from @expo/vector-icons

## 🏗️ Project Structure

```
GoMoveItApp/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   ├── navigation/          # Navigation setup
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   ├── CustomTabBar.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   ├── main/            # Main app screens
│   │   └── profile/         # Profile & settings
│   └── theme/               # Design system
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
├── App.tsx                  # Entry point
├── package.json
└── tsconfig.json

```

## 📦 Dependencies

- **React Native**: 0.81.5
- **Expo**: ~54.0.30
- **React Navigation**: v7 (native, stack, bottom-tabs)
- **Expo Linear Gradient**: UI gradients
- **Expo Vector Icons**: Ionicons
- **TypeScript**: Type safety

## 🔧 Configuration

### TypeScript
- JSX: React Native
- ES Module Interop: Enabled
- Synthetic Default Imports: Enabled

### Expo
- SDK Version: 54
- Supports iOS, Android, and Web

## 🎯 Next Steps

### Immediate
- [ ] Connect to backend API
- [ ] Add authentication (Firebase/Custom)
- [ ] Implement step tracking (HealthKit/Google Fit)
- [ ] Add push notifications

### Future Features
- [ ] Social features (friends, leaderboards)
- [ ] More challenge types
- [ ] Rewards redemption
- [ ] Device management (smartwatch sync)
- [ ] Admin panel

## 🐛 Troubleshooting

### Clear Cache
```bash
yarn start --clear
```

### Reset Metro Bundler
```bash
yarn start --reset-cache
```

### Reinstall Dependencies
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Port Already in Use
```bash
# Kill process on port 8081
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

## 📝 Notes

- App currently uses mock data for user info, challenges, transactions
- Points/Credits system (no blockchain/crypto as per requirements)
- Navigation flow: Splash → Onboarding → Welcome → Sign In/Up → Main App
- Dark theme optimized for OLED displays

## 🤝 Development

Built with ❤️ using React Native & Expo

For questions or issues, refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)
