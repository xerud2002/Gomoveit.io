/**
 * Wallet Screen
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
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Card, Button } from '../../components/common';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'purchase' | 'reward';
  amount: number;
  description: string;
  date: string;
  status: 'confirmed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'reward',
    amount: 200,
    description: 'Daily Step Reward',
    date: 'July 28, 2022 at 11:15 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    type: 'purchase',
    amount: -20,
    description: 'Purchased 500 XP Bundle',
    date: 'July 28, 2022 at 10:30 AM',
    status: 'confirmed',
  },
  {
    id: '3',
    type: 'withdraw',
    amount: -100,
    description: 'Withdraw to rewards',
    date: 'July 27, 2022 at 3:45 PM',
    status: 'confirmed',
  },
  {
    id: '4',
    type: 'reward',
    amount: 50,
    description: 'Challenge Completed',
    date: 'July 27, 2022 at 2:00 PM',
    status: 'confirmed',
  },
];

interface WalletScreenProps {
  onWithdraw: () => void;
  onDeposit: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  onWithdraw,
  onDeposit,
}) => {
  const tokenBalance = 500;
  const tokensEarned = 1000;

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'arrow-down-circle';
      case 'withdraw': return 'arrow-up-circle';
      case 'purchase': return 'cart';
      case 'reward': return 'gift';
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return Colors.success;
      case 'withdraw': return Colors.secondary;
      case 'purchase': return Colors.accent;
      case 'reward': return Colors.warning;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity style={styles.qrButton}>
            <Ionicons name="qr-code-outline" size={IconSizes.base} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#1E3A5F', '#0D1B2A']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Token Balance</Text>
              <View style={styles.balanceValueRow}>
                <Ionicons name="diamond" size={IconSizes.lg} color={Colors.warning} />
                <Text style={styles.balanceValue}>{tokenBalance}</Text>
              </View>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Tokens Earned</Text>
              <View style={styles.balanceValueRow}>
                <Ionicons name="trending-up" size={IconSizes.lg} color={Colors.success} />
                <Text style={styles.balanceValue}>{tokensEarned}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={onDeposit}>
              <View style={[styles.actionIconContainer, { backgroundColor: `${Colors.success}20` }]}>
                <Ionicons name="arrow-down" size={IconSizes.md} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={onWithdraw}>
              <View style={[styles.actionIconContainer, { backgroundColor: `${Colors.secondary}20` }]}>
                <Ionicons name="arrow-up" size={IconSizes.md} color={Colors.secondary} />
              </View>
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Transaction History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {mockTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={[
                  styles.transactionIconContainer,
                  { backgroundColor: `${getTransactionColor(transaction.type)}20` }
                ]}>
                  <Ionicons
                    name={getTransactionIcon(transaction.type) as any}
                    size={IconSizes.md}
                    color={getTransactionColor(transaction.type)}
                  />
                </View>
                
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>

                <View style={styles.transactionAmountContainer}>
                  <Text style={[
                    styles.transactionAmount,
                    { color: transaction.amount > 0 ? Colors.success : Colors.text.primary }
                  ]}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} Token
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: `${Colors.success}20` }
                  ]}>
                    <Text style={[styles.statusText, { color: Colors.success }]}>
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
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
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  qrButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    marginHorizontal: Spacing.base,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  balanceRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  balanceItem: {
    flex: 1,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: Colors.surface.border,
    marginHorizontal: Spacing.base,
  },
  balanceLabel: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  balanceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValue: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    ...Typography.captionBold,
    color: Colors.text.secondary,
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
  transactionList: {
    paddingHorizontal: Spacing.base,
  },
  transactionCard: {
    marginBottom: Spacing.sm,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    ...Typography.bodySmall,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  transactionDate: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...Typography.captionBold,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  statusText: {
    ...Typography.label,
    fontSize: 9,
  },
});

export default WalletScreen;
