/**
 * Main Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import { ProfileScreen, SettingsScreen } from '../screens/profile';

const Stack = createNativeStackNavigator<MainStackParamList>();

type MainTabsScreenProps = NativeStackScreenProps<MainStackParamList, 'MainTabs'>;
type ProfileScreenProps = NativeStackScreenProps<MainStackParamList, 'Profile'>;
type SettingsScreenProps = NativeStackScreenProps<MainStackParamList, 'Settings'>;

interface MainNavigatorProps {
  onLogout: () => void;
}

export const MainNavigator: React.FC<MainNavigatorProps> = ({ onLogout }) => {
  return (
    <Stack.Navigator
      id="MainStack"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs">
        {(props: MainTabsScreenProps) => (
          <MainTabNavigator
            onNavigateToProfile={() => props.navigation.navigate('Profile')}
            onNavigateToNotifications={() => props.navigation.navigate('Notifications')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {(props: ProfileScreenProps) => (
          <ProfileScreen
            onEditProfile={() => props.navigation.navigate('EditProfile')}
            onLevel={() => props.navigation.navigate('Level')}
            onDevices={() => props.navigation.navigate('Devices')}
            onSettings={() => props.navigation.navigate('Settings')}
            onSupport={() => {}}
            onFaq={() => {}}
            onLogout={onLogout}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Settings">
        {(props: SettingsScreenProps) => (
          <SettingsScreen
            onBack={() => props.navigation.goBack()}
            onNotifications={() => {}}
            onPermissions={() => {}}
            onUnit={() => {}}
            onAbout={() => {}}
            onLegal={() => {}}
            onRating={() => {}}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;
