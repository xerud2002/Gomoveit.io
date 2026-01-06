/**
 * Home Screen - Main Dashboard
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes, Shadows } from '../../theme/spacing';
import { Card, ProgressBar, StatCard } from '../../components/common';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNotifications: () => void;
  onProfile: () => void;
}

// Mock data - will be replaced with real data
const userData = {
  name: 'John',
  tokenBalance: 1000,
  currentSteps: 2000,
  targetSteps: 5000,
  level: 3,
  xp: 450,
  xpToNextLevel: 600,
  stamina: 95,
  maxStamina: 100,
};

const challenges = [
  {
    id: '1',
    name: 'Monthly Challenge',
    reward: 50,
    rewardType: 'STA',
    isNew: false,
  },
  {
    id: '2',
    name: 'Weekly Challenge',
    reward: 50,
    rewardType: 'XP',
    isNew: true,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNotifications,
  onProfile,
}) => {
  const stepsProgress = (userData.currentSteps / userData.targetSteps) * 100;
  const xpProgress = (userData.xp / userData.xpToNextLevel) * 100;
  const staminaProgress = (userData.stamina / userData.maxStamina) * 100;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onProfile} style={styles.profileButton}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>
                {userData.name.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onNotifications} style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={IconSizes.base} color={Colors.text.primary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Token Balance Card */}
        <Card
          variant="gradient"
          gradientColors={['#1a2a4a', '#0f1829']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Token Balance</Text>
            <View style={styles.tokenIconContainer}>
              <Ionicons name="diamond" size={IconSizes.sm} color={Colors.warning} />
            </View>
          </View>
          <Text style={styles.balanceValue}>{userData.tokenBalance.toLocaleString()}</Text>
        </Card>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Stamina */}
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="flash" size={IconSizes.md} color={Colors.secondary} />
              <Text style={styles.statLabel}>Stamina</Text>
            </View>
            <Text style={styles.statValue}>
              {userData.stamina}/{userData.maxStamina}
            </Text>
            <Text style={styles.statSubtext}>used</Text>
          </Card>

          {/* Level */}
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="star" size={IconSizes.md} color={Colors.warning} />
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <Text style={styles.statValue}>{userData.level}</Text>
            <Text style={styles.statSubtext}>Current</Text>
          </Card>

          {/* XP */}
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="sparkles" size={IconSizes.md} color={Colors.accent} />
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <Text style={styles.statValue}>{userData.xp}</Text>
            <Text style={styles.statSubtext}>/{userData.xpToNextLevel}</Text>
          </Card>
        </View>

        {/* Steps Progress Card */}
        <Card style={styles.stepsCard}>
          <View style={styles.stepsHeader}>
            <Text style={styles.stepsTitle}>Daily Steps</Text>
            <View style={styles.stepsTargetBadge}>
              <Ionicons name="flag" size={IconSizes.xs} color={Colors.primary} />
              <Text style={styles.stepsTargetText}>{userData.targetSteps.toLocaleString()}</Text>
            </View>
          </View>
          
          <View style={styles.stepsValueContainer}>
            <Text style={styles.stepsValue}>{userData.currentSteps.toLocaleString()}</Text>
            <Text style={styles.stepsLabel}>steps</Text>
          </View>

          <ProgressBar
            progress={stepsProgress}
            height={12}
            showPercentage
            gradientColors={[...Colors.gradients.primary]}
            style={styles.stepsProgress}
          />

          {/* Circular progress indicator */}
          <View style={styles.circularProgressContainer}>
            <View style={styles.circularProgress}>
              <View style={styles.circularProgressInner}>
                <Ionicons name="footsteps" size={IconSizes.lg} color={Colors.primary} />
              </View>
            </View>
          </View>
        </Card>

        {/* Challenges Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.challengesScroll}
        >
          {challenges.map((challenge) => (
            <TouchableOpacity key={challenge.id} activeOpacity={0.8}>
              <LinearGradient
                colors={challenge.isNew ? Colors.gradients.accent : Colors.gradients.dark}
                style={styles.challengeCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {challenge.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
                <Text style={styles.challengeName}>{challenge.name}</Text>
                <View style={styles.challengeReward}>
                  <Ionicons 
                    name={challenge.rewardType === 'STA' ? 'flash' : 'sparkles'} 
                    size={IconSizes.sm} 
                    color={challenge.rewardType === 'STA' ? Colors.secondary : Colors.accent} 
                  />
                  <Text style={styles.challengeRewardText}>
                    {challenge.reward} {challenge.rewardType}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: 60,
    paddingBottom: Spacing.base,
  },
  profileButton: {
    width: 44,
    height: 44,
  },
  avatarGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...Typography.h5,
    color: Colors.text.inverse,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  balanceCard: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.surface.border,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  balanceLabel: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tokenIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${Colors.warning}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceValue: {
    ...Typography.statLarge,
    color: Colors.text.primary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  statValue: {
    ...Typography.statMedium,
    color: Colors.text.primary,
  },
  statSubtext: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  stepsCard: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepsTitle: {
    ...Typography.h6,
    color: Colors.text.primary,
  },
  stepsTargetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  stepsTargetText: {
    ...Typography.captionBold,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
  stepsValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.base,
  },
  stepsValue: {
    ...Typography.h1,
    color: Colors.text.primary,
  },
  stepsLabel: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
  },
  stepsProgress: {
    marginBottom: Spacing.md,
  },
  circularProgressContainer: {
    position: 'absolute',
    right: Spacing.base,
    top: '50%',
    marginTop: -40,
    opacity: 0.3,
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  seeAllText: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
  challengesScroll: {
    paddingHorizontal: Spacing.base,
  },
  challengeCard: {
    width: 160,
    height: 120,
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginRight: Spacing.md,
    justifyContent: 'space-between',
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  newBadgeText: {
    ...Typography.label,
    fontSize: 8,
    color: Colors.text.inverse,
  },
  challengeName: {
    ...Typography.captionBold,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeRewardText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
});

export default HomeScreen;
