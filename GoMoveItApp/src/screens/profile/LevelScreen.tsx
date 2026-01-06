/**
 * Level Screen - XP and Level Details
 */

import React from 'react';
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
import { ProgressBar, Card } from '../../components/common';

interface LevelScreenProps {
  onBack: () => void;
}

const levelPerks = [
  { level: 1, perk: 'Welcome Bonus: 100 XP', unlocked: true },
  { level: 2, perk: 'Access to Basic Challenges', unlocked: true },
  { level: 3, perk: 'Daily Rewards Unlocked', unlocked: true },
  { level: 4, perk: 'Premium Challenges Access', unlocked: false },
  { level: 5, perk: 'Friend Referral Bonus', unlocked: false },
  { level: 10, perk: 'VIP Badge & Exclusive Items', unlocked: false },
];

const xpHistory = [
  { date: 'Today', activity: 'Completed 10,000 steps', xp: 150, type: 'earn' },
  { date: 'Today', activity: 'Daily login bonus', xp: 50, type: 'earn' },
  { date: 'Yesterday', activity: 'Completed Marathon Challenge', xp: 500, type: 'earn' },
  { date: 'Yesterday', activity: 'Purchased Stamina Boost', xp: -100, type: 'spend' },
  { date: '2 days ago', activity: 'Level Up Bonus', xp: 300, type: 'earn' },
];

export const LevelScreen: React.FC<LevelScreenProps> = ({ onBack }) => {
  const currentLevel = 3;
  const currentXP = 450;
  const xpToNextLevel = 600;
  const progress = (currentXP / xpToNextLevel) * 100;

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
          <Text style={styles.headerTitle}>Level & XP</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Level Card */}
          <Card variant="gradient" gradientColors={Colors.gradients.accent as any} style={styles.levelCard}>
            <View style={styles.levelContent}>
              <View style={styles.levelBadge}>
                <Ionicons name="star" size={40} color={Colors.warning} />
                <Text style={styles.levelNumber}>{currentLevel}</Text>
              </View>
              <View style={styles.levelInfo}>
                <Text style={styles.levelTitle}>Level {currentLevel}</Text>
                <Text style={styles.levelSubtitle}>Champion</Text>
              </View>
            </View>
            
            <View style={styles.xpSection}>
              <View style={styles.xpRow}>
                <Text style={styles.xpLabel}>Current XP</Text>
                <Text style={styles.xpValue}>{currentXP}/{xpToNextLevel}</Text>
              </View>
              <ProgressBar
                progress={progress}
                height={12}
                gradientColors={[...Colors.gradients.gold]}
                style={styles.progressBar}
                showPercentage={false}
              />
              <Text style={styles.xpRemaining}>{xpToNextLevel - currentXP} XP to Level {currentLevel + 1}</Text>
            </View>
          </Card>

          {/* Level Perks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Level Perks</Text>
            {levelPerks.map((perk, index) => (
              <View key={index} style={styles.perkItem}>
                <View style={[
                  styles.perkIcon,
                  perk.unlocked && styles.perkIconUnlocked
                ]}>
                  <Ionicons
                    name={perk.unlocked ? 'checkmark-circle' : 'lock-closed'}
                    size={24}
                    color={perk.unlocked ? Colors.success : Colors.text.tertiary}
                  />
                </View>
                <View style={styles.perkContent}>
                  <Text style={[
                    styles.perkText,
                    !perk.unlocked && styles.perkTextLocked
                  ]}>
                    {perk.perk}
                  </Text>
                  <Text style={styles.perkLevel}>
                    {perk.unlocked ? 'Unlocked' : `Unlock at Level ${perk.level}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* XP History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>XP History</Text>
            {xpHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={[
                  styles.historyIcon,
                  item.type === 'earn' ? styles.historyIconEarn : styles.historyIconSpend
                ]}>
                  <Ionicons
                    name={item.type === 'earn' ? 'arrow-up' : 'arrow-down'}
                    size={20}
                    color={item.type === 'earn' ? Colors.success : Colors.error}
                  />
                </View>
                <View style={styles.historyContent}>
                  <Text style={styles.historyActivity}>{item.activity}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <Text style={[
                  styles.historyXP,
                  item.type === 'earn' ? styles.historyXPEarn : styles.historyXPSpend
                ]}>
                  {item.type === 'earn' ? '+' : ''}{item.xp} XP
                </Text>
              </View>
            ))}
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
  levelCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  levelBadge: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  levelNumber: {
    ...Typography.h1,
    color: Colors.text.primary,
    position: 'absolute',
    fontSize: 32,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
  },
  levelSubtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  xpSection: {
    gap: Spacing.sm,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpLabel: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  xpValue: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  progressBar: {
    marginVertical: Spacing.xs,
  },
  xpRemaining: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  perkIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  perkIconUnlocked: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  perkContent: {
    flex: 1,
  },
  perkText: {
    ...Typography.body,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  perkTextLocked: {
    color: Colors.text.tertiary,
  },
  perkLevel: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  historyIconEarn: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  historyIconSpend: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  historyContent: {
    flex: 1,
  },
  historyActivity: {
    ...Typography.body,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  historyDate: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  historyXP: {
    ...Typography.h4,
    fontWeight: '700',
  },
  historyXPEarn: {
    color: Colors.success,
  },
  historyXPSpend: {
    color: Colors.error,
  },
});
