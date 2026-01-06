/**
 * Profile Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Card, ProgressBar } from '../../components/common';

interface MenuItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  badge?: string;
  danger?: boolean;
}

interface ProfileScreenProps {
  onEditProfile: () => void;
  onLevel: () => void;
  onDevices: () => void;
  onSettings: () => void;
  onSupport: () => void;
  onFaq: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onEditProfile,
  onLevel,
  onDevices,
  onSettings,
  onSupport,
  onFaq,
  onLogout,
}) => {
  const user = {
    name: 'Mason Mount',
    email: 'mason.mount@gmail.com',
    tokenBalance: 1000,
    level: 3,
    xp: 450,
    xpToNextLevel: 600,
    stamina: 95,
    maxStamina: 100,
    dailySteps: 2000,
    targetSteps: 5000,
  };

  const menuItems: MenuItem[] = [
    {
      id: 'level',
      icon: 'trending-up',
      title: 'Levels',
      subtitle: `Level ${user.level} • ${user.xp}/${user.xpToNextLevel} XP`,
      onPress: onLevel,
      showArrow: true,
    },
    {
      id: 'stamina',
      icon: 'flash',
      title: 'Stamina',
      subtitle: `${user.stamina}/${user.maxStamina} remaining`,
      onPress: () => {},
      showArrow: true,
    },
    {
      id: 'devices',
      icon: 'watch-outline',
      title: 'My Devices',
      subtitle: '2 devices connected',
      onPress: onDevices,
      showArrow: true,
    },
    {
      id: 'addDevice',
      icon: 'add-circle-outline',
      title: 'Add New Device',
      onPress: onDevices,
      showArrow: true,
    },
  ];

  const settingsItems: MenuItem[] = [
    {
      id: 'settings',
      icon: 'settings-outline',
      title: 'Settings',
      onPress: onSettings,
      showArrow: true,
    },
    {
      id: 'support',
      icon: 'help-circle-outline',
      title: 'Support & Help',
      onPress: onSupport,
      showArrow: true,
    },
    {
      id: 'faq',
      icon: 'chatbox-ellipses-outline',
      title: 'FAQ',
      onPress: onFaq,
      showArrow: true,
    },
    {
      id: 'logout',
      icon: 'log-out-outline',
      title: 'Logout',
      onPress: onLogout,
      danger: true,
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.menuIconContainer,
        item.danger && styles.menuIconDanger
      ]}>
        <Ionicons
          name={item.icon}
          size={IconSizes.md}
          color={item.danger ? Colors.error : Colors.primary}
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, item.danger && styles.menuTitleDanger]}>
          {item.title}
        </Text>
        {item.subtitle && (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.badge && (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{item.badge}</Text>
        </View>
      )}
      {item.showArrow && (
        <Ionicons
          name="chevron-forward"
          size={IconSizes.md}
          color={Colors.text.tertiary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <TouchableOpacity
            style={styles.profileHeader}
            onPress={onEditProfile}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.avatarContainer}
            >
              <Text style={styles.avatarText}>
                {user.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </LinearGradient>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
              <Ionicons name="pencil" size={IconSizes.sm} color={Colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="diamond" size={IconSizes.md} color={Colors.warning} />
              <Text style={styles.statValue}>{user.tokenBalance}</Text>
              <Text style={styles.statLabel}>Tokens</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="footsteps" size={IconSizes.md} color={Colors.primary} />
              <Text style={styles.statValue}>{user.dailySteps.toLocaleString()}</Text>
              <Text style={styles.statLabel}>/{user.targetSteps}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star" size={IconSizes.md} color={Colors.accent} />
              <Text style={styles.statValue}>Level {user.level}</Text>
              <Text style={styles.statLabel}>Current</Text>
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          {menuItems.map(renderMenuItem)}
        </Card>

        {/* Settings Section */}
        <Card style={styles.menuCard}>
          {settingsItems.map(renderMenuItem)}
        </Card>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: 60,
    paddingBottom: Spacing.base,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  profileCard: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...Typography.h4,
    color: Colors.text.inverse,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  profileName: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  profileEmail: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.surface.border,
  },
  statValue: {
    ...Typography.captionBold,
    color: Colors.text.primary,
    marginTop: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  menuCard: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
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
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconDanger: {
    backgroundColor: `${Colors.error}15`,
  },
  menuContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  menuTitle: {
    ...Typography.body,
    color: Colors.text.primary,
  },
  menuTitleDanger: {
    color: Colors.error,
  },
  menuSubtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  menuBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  menuBadgeText: {
    ...Typography.label,
    fontSize: 10,
    color: Colors.text.inverse,
  },
  versionText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});

export default ProfileScreen;
