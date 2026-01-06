/**
 * Main Tab Navigator
 */

import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { CustomTabBar } from './CustomTabBar';
import {
  HomeScreen,
  ShopScreen,
  ChallengesScreen,
  WalletScreen,
} from '../screens/main';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface MainTabNavigatorProps {
  onNavigateToProfile: () => void;
  onNavigateToNotifications: () => void;
}

export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({
  onNavigateToProfile,
  onNavigateToNotifications,
}) => {
  return (
    <Tab.Navigator
      id="MainTabs"
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home">
        {() => (
          <HomeScreen
            onProfile={onNavigateToProfile}
            onNotifications={onNavigateToNotifications}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Shop">
        {() => (
          <ShopScreen
            onPurchase={(item, type) => {
              console.log('Purchase:', item, type);
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Challenge">
        {() => (
          <ChallengesScreen
            onChallengePress={(challenge) => {
              console.log('Challenge:', challenge);
            }}
            onJoinChallenge={(challenge) => {
              console.log('Join:', challenge);
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Wallet">
        {() => (
          <WalletScreen
            onWithdraw={() => {
              console.log('Withdraw');
            }}
            onDeposit={() => {
              console.log('Deposit');
            }}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
