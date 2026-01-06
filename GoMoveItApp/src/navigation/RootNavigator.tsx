/**
 * Root Navigator
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { ConnectDeviceScreen } from '../screens/main/ConnectDeviceScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    // Check if device is already connected (in real app, check from storage/API)
    const hasConnectedDevice = false; // Change this based on actual device status
    setDeviceConnected(hasConnectedDevice);
  };

  const handleDeviceSetupComplete = () => {
    setDeviceConnected(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {() => (
              <AuthNavigator onAuthComplete={handleAuthComplete} />
            )}
          </Stack.Screen>
        ) : !deviceConnected ? (
          <Stack.Screen name="ConnectDevice">
            {() => (
              <ConnectDeviceScreen
                onSkip={handleDeviceSetupComplete}
                onConnectSuccess={handleDeviceSetupComplete}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {() => (
              <MainNavigator onLogout={() => setIsAuthenticated(false)} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
