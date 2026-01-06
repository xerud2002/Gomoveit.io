/**
 * Challenges Screen
 */

import React, { useState } from 'react';
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
import { Card, Button, ProgressBar } from '../../components/common';

interface Challenge {
  id: string;
  name: string;
  type: 'upcoming' | 'ongoing' | 'past';
  entryFee: number;
  poolPrize: number;
  participants: number;
  participantLimit: number;
  stepsGoal: number;
  currentSteps?: number;
  startDate: string;
  endDate: string;
  completed?: boolean;
  rewardType: 'STA' | 'XP';
  rewardAmount: number;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Monthly Challenge',
    type: 'ongoing',
    entryFee: 10,
    poolPrize: 1700,
    participants: 125,
    participantLimit: 200,
    stepsGoal: 10000,
    currentSteps: 4500,
    startDate: 'July 1, 2022',
    endDate: 'July 31, 2022',
    rewardType: 'STA',
    rewardAmount: 50,
  },
  {
    id: '2',
    name: 'Weekly Sprint',
    type: 'ongoing',
    entryFee: 5,
    poolPrize: 500,
    participants: 89,
    participantLimit: 100,
    stepsGoal: 7000,
    currentSteps: 3200,
    startDate: 'July 25, 2022',
    endDate: 'July 31, 2022',
    rewardType: 'XP',
    rewardAmount: 50,
  },
  {
    id: '3',
    name: 'August Marathon',
    type: 'upcoming',
    entryFee: 15,
    poolPrize: 2500,
    participants: 45,
    participantLimit: 150,
    stepsGoal: 15000,
    startDate: 'Aug 1, 2022',
    endDate: 'Aug 31, 2022',
    rewardType: 'STA',
    rewardAmount: 100,
  },
  {
    id: '4',
    name: 'June Challenge',
    type: 'past',
    entryFee: 10,
    poolPrize: 1500,
    participants: 180,
    participantLimit: 200,
    stepsGoal: 10000,
    currentSteps: 10000,
    startDate: 'June 1, 2022',
    endDate: 'June 30, 2022',
    completed: true,
    rewardType: 'STA',
    rewardAmount: 50,
  },
];

type TabType = 'ongoing' | 'upcoming' | 'past';

interface ChallengesScreenProps {
  onChallengePress: (challenge: Challenge) => void;
  onJoinChallenge: (challenge: Challenge) => void;
}

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({
  onChallengePress,
  onJoinChallenge,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');

  const filteredChallenges = mockChallenges.filter((c) => c.type === activeTab);

  const renderChallengeCard = (challenge: Challenge) => {
    const progress = challenge.currentSteps
      ? (challenge.currentSteps / challenge.stepsGoal) * 100
      : 0;

    return (
      <TouchableOpacity
        key={challenge.id}
        activeOpacity={0.8}
        onPress={() => onChallengePress(challenge)}
      >
        <Card style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeName}>{challenge.name}</Text>
              <View style={styles.rewardBadge}>
                <Ionicons
                  name={challenge.rewardType === 'STA' ? 'flash' : 'sparkles'}
                  size={IconSizes.xs}
                  color={challenge.rewardType === 'STA' ? Colors.secondary : Colors.accent}
                />
                <Text style={styles.rewardText}>
                  {challenge.rewardAmount} {challenge.rewardType}
                </Text>
              </View>
            </View>
            <View style={styles.participantsContainer}>
              <Text style={styles.participantsCount}>
                {challenge.participants}/{challenge.participantLimit}
              </Text>
              <Ionicons name="people" size={IconSizes.sm} color={Colors.text.tertiary} />
            </View>
          </View>

          {/* Goal */}
          <View style={styles.goalContainer}>
            <Ionicons name="flag" size={IconSizes.sm} color={Colors.primary} />
            <Text style={styles.goalText}>
              Steps Goal: {challenge.stepsGoal.toLocaleString()}
            </Text>
          </View>

          {/* Progress (for ongoing challenges) */}
          {challenge.type === 'ongoing' && challenge.currentSteps !== undefined && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Current Steps</Text>
                <Text style={styles.progressValue}>
                  {challenge.currentSteps.toLocaleString()}
                </Text>
              </View>
              <ProgressBar
                progress={progress}
                gradientColors={[...Colors.gradients.primary]}
                height={8}
              />
            </View>
          )}

          {/* Past challenge status */}
          {challenge.type === 'past' && (
            <View style={[
              styles.statusBanner,
              challenge.completed ? styles.statusCompleted : styles.statusFailed
            ]}>
              <Ionicons
                name={challenge.completed ? 'checkmark-circle' : 'close-circle'}
                size={IconSizes.md}
                color={Colors.text.inverse}
              />
              <Text style={styles.statusText}>
                Challenge {challenge.completed ? 'Completed!' : 'Failed'}
              </Text>
            </View>
          )}

          {/* Details Row */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Entry Fee</Text>
              <View style={styles.detailValue}>
                <Ionicons name="diamond" size={IconSizes.xs} color={Colors.warning} />
                <Text style={styles.detailValueText}>{challenge.entryFee}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pool Prize</Text>
              <View style={styles.detailValue}>
                <Ionicons name="diamond" size={IconSizes.xs} color={Colors.warning} />
                <Text style={styles.detailValueText}>{challenge.poolPrize}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>End Date</Text>
              <Text style={styles.detailValueText}>{challenge.endDate}</Text>
            </View>
          </View>

          {/* Join Button (for upcoming) */}
          {challenge.type === 'upcoming' && (
            <Button
              title="Join Now"
              onPress={() => onJoinChallenge(challenge)}
              fullWidth
              style={styles.joinButton}
            />
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Challenges</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['ongoing', 'upcoming', 'past'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Challenges List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map(renderChallengeCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={IconSizes['4xl']} color={Colors.text.tertiary} />
            <Text style={styles.emptyTitle}>No {activeTab} challenges</Text>
            <Text style={styles.emptySubtitle}>
              Check back later for new challenges
            </Text>
          </View>
        )}
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
    paddingHorizontal: Spacing.base,
    paddingTop: 60,
    paddingBottom: Spacing.base,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.surface.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  tabActive: {
    backgroundColor: Colors.background.tertiary,
  },
  tabText: {
    ...Typography.button,
    color: Colors.text.tertiary,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 100,
  },
  challengeCard: {
    marginBottom: Spacing.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  rewardText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsCount: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginRight: Spacing.xs,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  progressValue: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  statusCompleted: {
    backgroundColor: Colors.success,
  },
  statusFailed: {
    backgroundColor: Colors.error,
  },
  statusText: {
    ...Typography.button,
    color: Colors.text.inverse,
    marginLeft: Spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValueText: {
    ...Typography.captionBold,
    color: Colors.text.primary,
    marginLeft: 2,
  },
  joinButton: {
    marginTop: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
  },
  emptyTitle: {
    ...Typography.h5,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
});

export default ChallengesScreen;
