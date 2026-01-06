/**
 * Devices Screen - Smartwatch Management
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { Button } from '../../components/common';

interface Device {
  id: string;
  name: string;
  type: 'apple-watch' | 'fitbit' | 'garmin' | 'samsung';
  model: string;
  connected: boolean;
  lastSync: string;
  battery?: number;
}

interface DevicesScreenProps {
  onBack: () => void;
}

const connectedDevices: Device[] = [
  {
    id: '1',
    name: 'Apple Watch Series 8',
    type: 'apple-watch',
    model: 'Series 8',
    connected: true,
    lastSync: '2 minutes ago',
    battery: 85,
  },
];

const availableDevices = [
  { type: 'apple-watch', name: 'Apple Watch', icon: 'watch' },
  { type: 'fitbit', name: 'Fitbit', icon: 'fitness' },
  { type: 'garmin', name: 'Garmin', icon: 'watch' },
  { type: 'samsung', name: 'Samsung Galaxy Watch', icon: 'watch' },
];

export const DevicesScreen: React.FC<DevicesScreenProps> = ({ onBack }) => {
  const [devices, setDevices] = useState<Device[]>(connectedDevices);

  const handleDisconnect = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const handleSync = (deviceId: string) => {
    // Simulate sync
    console.log('Syncing device:', deviceId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.background.primary, Colors.background.secondary]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Devices</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Connected Devices */}
          {devices.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connected Devices</Text>
              {devices.map((device) => (
                <View key={device.id} style={styles.deviceCard}>
                  <View style={styles.deviceIconContainer}>
                    <LinearGradient
                      colors={Colors.gradients.primary}
                      style={styles.deviceIcon}
                    >
                      <Ionicons name="watch" size={28} color={Colors.text.primary} />
                    </LinearGradient>
                    {device.connected && (
                      <View style={styles.connectedBadge}>
                        <View style={styles.connectedDot} />
                      </View>
                    )}
                  </View>

                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceModel}>{device.model}</Text>
                    <Text style={styles.deviceSync}>Last sync: {device.lastSync}</Text>
                  </View>

                  {device.battery && (
                    <View style={styles.batteryContainer}>
                      <Ionicons
                        name="battery-half"
                        size={20}
                        color={device.battery > 20 ? Colors.success : Colors.error}
                      />
                      <Text style={styles.batteryText}>{device.battery}%</Text>
                    </View>
                  )}

                  <View style={styles.deviceActions}>
                    <TouchableOpacity
                      onPress={() => handleSync(device.id)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="sync" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDisconnect(device.id)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="trash-outline" size={20} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Add New Device */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add New Device</Text>
            <Text style={styles.sectionDescription}>
              Connect your smartwatch or fitness tracker to automatically track your steps and activities.
            </Text>

            {availableDevices.map((device, index) => (
              <TouchableOpacity key={index} style={styles.availableDevice}>
                <View style={styles.availableIconContainer}>
                  <Ionicons name={device.icon as any} size={24} color={Colors.primary} />
                </View>
                <View style={styles.availableInfo}>
                  <Text style={styles.availableName}>{device.name}</Text>
                  <Text style={styles.availableDesc}>Tap to connect</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Permissions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Permissions</Text>
            <View style={styles.permissionCard}>
              <Ionicons name="fitness" size={24} color={Colors.primary} />
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Health & Fitness Access</Text>
                <Text style={styles.permissionDesc}>
                  Required to read step count and activity data
                </Text>
              </View>
              <View style={styles.permissionBadge}>
                <Text style={styles.permissionBadgeText}>Granted</Text>
              </View>
            </View>

            <View style={styles.permissionCard}>
              <Ionicons name="location" size={24} color={Colors.primary} />
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Location Access</Text>
                <Text style={styles.permissionDesc}>
                  For tracking outdoor activities and routes
                </Text>
              </View>
              <View style={styles.permissionBadge}>
                <Text style={styles.permissionBadgeText}>Granted</Text>
              </View>
            </View>
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Ionicons name="help-circle-outline" size={24} color={Colors.text.secondary} />
            <Text style={styles.helpText}>
              Having trouble connecting your device?{' '}
              <Text style={styles.helpLink}>View Setup Guide</Text>
            </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  sectionDescription: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  deviceIconContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  deviceIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectedDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  deviceModel: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  deviceSync: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginRight: Spacing.md,
  },
  batteryText: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  deviceActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  availableIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  availableInfo: {
    flex: 1,
  },
  availableName: {
    ...Typography.body,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  availableDesc: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  permissionInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  permissionTitle: {
    ...Typography.body,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  permissionDesc: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  permissionBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  permissionBadgeText: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: '600',
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  helpText: {
    ...Typography.body,
    color: Colors.text.secondary,
    flex: 1,
  },
  helpLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
