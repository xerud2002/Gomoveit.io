/**
 * Connect Device Screen - First time device setup
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { Button } from '../../components/common';

interface ConnectDeviceScreenProps {
  onSkip: () => void;
  onConnectSuccess: () => void;
}

const popularDevices = [
  { type: 'oneplus', name: 'OnePlus Watch 2', icon: 'watch', description: 'Most popular' },
  { type: 'apple-watch', name: 'Apple Watch', icon: 'watch', description: 'Series 4 or later' },
  { type: 'samsung', name: 'Samsung Galaxy Watch', icon: 'watch', description: 'All models' },
  { type: 'fitbit', name: 'Fitbit', icon: 'fitness', description: 'Charge 5 & Sense' },
  { type: 'garmin', name: 'Garmin', icon: 'watch', description: 'All models' },
  { type: 'google', name: 'Google Pixel Watch', icon: 'watch', description: 'Pixel Watch 1 & 2' },
];

export const ConnectDeviceScreen: React.FC<ConnectDeviceScreenProps> = ({
  onSkip,
  onConnectSuccess,
}) => {
  const [connecting, setConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleConnectDevice = async (deviceType: string, deviceName: string) => {
    setSelectedDevice(deviceType);
    setConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      Alert.alert(
        'Device Connected!',
        `${deviceName} has been successfully connected. You can now track your steps and activities.`,
        [
          {
            text: 'Great!',
            onPress: onConnectSuccess,
          },
        ]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background.primary, Colors.background.secondary]}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.iconGradient}
            >
              <Ionicons name="watch" size={48} color={Colors.text.primary} />
            </LinearGradient>
          </View>

          {/* Title */}
          <Text style={styles.title}>Connect Your Device</Text>
          <Text style={styles.subtitle}>
            Connect your smartwatch or fitness tracker to automatically track your steps and earn rewards
          </Text>

          {/* Device List */}
          <View style={styles.deviceList}>
            <Text style={styles.sectionTitle}>Select Your Device</Text>
            {popularDevices.map((device, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.deviceCard,
                  selectedDevice === device.type && connecting && styles.deviceCardConnecting,
                ]}
                onPress={() => handleConnectDevice(device.type, device.name)}
                disabled={connecting}
              >
                <View style={styles.deviceIconContainer}>
                  <LinearGradient
                    colors={
                      device.type === 'oneplus'
                        ? ['#FF6B6B', '#EE5A6F']
                        : Colors.gradients.primary
                    }
                    style={styles.deviceIcon}
                  >
                    <Ionicons
                      name={device.icon as any}
                      size={28}
                      color={Colors.text.primary}
                    />
                  </LinearGradient>
                  {device.type === 'oneplus' && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>★</Text>
                    </View>
                  )}
                </View>

                <View style={styles.deviceInfo}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceDescription}>{device.description}</Text>
                </View>

                {connecting && selectedDevice === device.type ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.connectingText}>Connecting...</Text>
                  </View>
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.text.tertiary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Benefits */}
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.benefitText}>Automatic step tracking</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.benefitText}>Real-time activity sync</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.benefitText}>Earn XP while you move</Text>
            </View>
          </View>

          {/* Skip Button */}
          <Button
            title="I'll Connect Later"
            variant="outline"
            onPress={onSkip}
            style={styles.skipBottomButton}
          />

          {/* Help Text */}
          <Text style={styles.helpText}>
            Don't see your device? You can manually connect it later from Settings → Devices
          </Text>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.xl,
  },
  skipButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  skipText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.md,
  },
  deviceList: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  deviceCardConnecting: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  deviceIconContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  deviceIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularText: {
    ...Typography.caption,
    color: Colors.text.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  deviceDescription: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  loadingContainer: {
    paddingHorizontal: Spacing.md,
  },
  connectingText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  benefitsContainer: {
    backgroundColor: Colors.surface.card,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  benefitText: {
    ...Typography.body,
    color: Colors.text.primary,
  },
  skipBottomButton: {
    marginBottom: Spacing.lg,
  },
  helpText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
});
