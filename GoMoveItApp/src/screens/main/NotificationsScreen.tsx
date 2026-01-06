/**
 * Notifications Screen
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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'challenge' | 'reward' | 'friend' | 'system';
}

interface NotificationsScreenProps {
  onBack: () => void;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Challenge Completed!',
    message: 'You completed the Marathon Challenge and earned 500 XP!',
    time: '2m ago',
    read: false,
    type: 'challenge',
  },
  {
    id: '2',
    title: 'Daily Reward Available',
    message: 'Claim your daily login bonus now!',
    time: '1h ago',
    read: false,
    type: 'reward',
  },
  {
    id: '3',
    title: 'New Friend Request',
    message: 'Sarah Johnson wants to connect with you',
    time: '3h ago',
    read: true,
    type: 'friend',
  },
  {
    id: '4',
    title: 'Level Up!',
    message: 'Congratulations! You reached Level 4',
    time: 'Yesterday',
    read: true,
    type: 'reward',
  },
  {
    id: '5',
    title: 'New Challenge Available',
    message: 'Weekly Sprint Challenge is now open for registration',
    time: '2 days ago',
    read: true,
    type: 'challenge',
  },
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [notifs, setNotifs] = useState(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'challenge': return 'trophy';
      case 'reward': return 'gift';
      case 'friend': return 'people';
      case 'system': return 'notifications';
      default: return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'challenge': return Colors.primary;
      case 'reward': return Colors.warning;
      case 'friend': return Colors.accent;
      case 'system': return Colors.text.secondary;
      default: return Colors.text.secondary;
    }
  };

  const markAsRead = (id: string) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

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
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={markAllAsRead}>
            <Ionicons name="checkmark-done" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {notifs.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationCardUnread
              ]}
              onPress={() => markAsRead(notification.id)}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: `${getNotificationColor(notification.type)}20` }
              ]}>
                <Ionicons
                  name={getNotificationIcon(notification.type) as any}
                  size={24}
                  color={getNotificationColor(notification.type)}
                />
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {notifs.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off-outline" size={64} color={Colors.text.tertiary} />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptyText}>You're all caught up!</Text>
            </View>
          )}
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
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  unreadBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadBadgeText: {
    ...Typography.caption,
    color: Colors.text.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  notificationCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  notificationTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.xs,
  },
  notificationMessage: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
});
