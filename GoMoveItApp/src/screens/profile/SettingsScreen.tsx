/**
 * Settings Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Card } from '../../components/common';

interface SettingsScreenProps {
  onBack: () => void;
  onNotifications: () => void;
  onPermissions: () => void;
  onUnit: () => void;
  onAbout: () => void;
  onLegal: () => void;
  onRating: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onNotifications,
  onPermissions,
  onUnit,
  onAbout,
  onLegal,
  onRating,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsItems = [
    {
      id: 'notifications',
      icon: 'notifications-outline',
      title: 'Notifications',
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: 'permissions',
      icon: 'shield-checkmark-outline',
      title: 'Permissions',
      onPress: onPermissions,
    },
    {
      id: 'unit',
      icon: 'speedometer-outline',
      title: 'Unit',
      subtitle: 'Metric (m, Km)',
      onPress: onUnit,
    },
    {
      id: 'about',
      icon: 'information-circle-outline',
      title: 'About Us',
      onPress: onAbout,
    },
    {
      id: 'rating',
      icon: 'star-outline',
      title: 'Ratings & Review',
      onPress: onRating,
    },
    {
      id: 'legal',
      icon: 'document-text-outline',
      title: 'Legal Terms',
      onPress: onLegal,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={IconSizes.base} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.menuCard}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === settingsItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
              disabled={item.hasSwitch}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={IconSizes.md}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              {item.hasSwitch ? (
                <Switch
                  value={item.switchValue}
                  onValueChange={item.onSwitchChange}
                  trackColor={{ false: Colors.surface.border, true: Colors.primary }}
                  thumbColor={Colors.text.primary}
                />
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={IconSizes.md}
                  color={Colors.text.tertiary}
                />
              )}
            </TouchableOpacity>
          ))}
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>App Version 1.0.0</Text>
          <TouchableOpacity>
            <Text style={styles.updateLink}>Check for Updates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: 60,
    paddingBottom: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 40,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  menuTitle: {
    ...Typography.body,
    color: Colors.text.primary,
  },
  menuSubtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: Spacing['2xl'],
  },
  appVersion: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
  },
  updateLink: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
});

export default SettingsScreen;
