/**
 * Shop Screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, BorderRadius, IconSizes } from '../../theme/spacing';
import { Card, Button } from '../../components/common';

interface ShopItem {
  id: string;
  amount: number;
  price: number;
  popular?: boolean;
  usersBought: number;
}

const xpItems: ShopItem[] = [
  { id: 'xp1', amount: 100, price: 5, usersBought: 150 },
  { id: 'xp2', amount: 500, price: 20, popular: true, usersBought: 320 },
  { id: 'xp3', amount: 1000, price: 35, usersBought: 89 },
  { id: 'xp4', amount: 2500, price: 80, usersBought: 45 },
];

const staminaItems: ShopItem[] = [
  { id: 'sta1', amount: 10, price: 5, usersBought: 200 },
  { id: 'sta2', amount: 50, price: 20, popular: true, usersBought: 180 },
  { id: 'sta3', amount: 100, price: 35, usersBought: 95 },
  { id: 'sta4', amount: 250, price: 80, usersBought: 32 },
];

interface ShopScreenProps {
  onPurchase: (item: ShopItem, type: 'xp' | 'stamina') => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ onPurchase }) => {
  const [activeTab, setActiveTab] = useState<'xp' | 'stamina'>('xp');

  const items = activeTab === 'xp' ? xpItems : staminaItems;

  const renderItem = ({ item }: { item: ShopItem }) => (
    <Card style={styles.itemCard}>
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>POPULAR</Text>
        </View>
      )}
      
      <View style={styles.itemContent}>
        <LinearGradient
          colors={activeTab === 'xp' ? Colors.gradients.accent : Colors.gradients.secondary}
          style={styles.itemIconContainer}
        >
          <Ionicons
            name={activeTab === 'xp' ? 'sparkles' : 'flash'}
            size={IconSizes.lg}
            color={Colors.text.inverse}
          />
        </LinearGradient>

        <View style={styles.itemInfo}>
          <Text style={styles.itemAmount}>
            {item.amount} {activeTab === 'xp' ? 'XP' : 'STA'}
          </Text>
          <Text style={styles.itemBuyers}>
            {item.usersBought}+ Users bought this
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Ionicons name="diamond" size={IconSizes.sm} color={Colors.warning} />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => onPurchase(item, activeTab)}
          >
            <Text style={styles.buyButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'xp' && styles.tabActive]}
          onPress={() => setActiveTab('xp')}
        >
          <Ionicons
            name="sparkles"
            size={IconSizes.md}
            color={activeTab === 'xp' ? Colors.primary : Colors.text.tertiary}
          />
          <Text style={[styles.tabText, activeTab === 'xp' && styles.tabTextActive]}>
            XP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'stamina' && styles.tabActive]}
          onPress={() => setActiveTab('stamina')}
        >
          <Ionicons
            name="flash"
            size={IconSizes.md}
            color={activeTab === 'stamina' ? Colors.primary : Colors.text.tertiary}
          />
          <Text style={[styles.tabText, activeTab === 'stamina' && styles.tabTextActive]}>
            Stamina
          </Text>
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item: ShopItem) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    flexDirection: 'row',
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
    marginLeft: Spacing.sm,
  },
  tabTextActive: {
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: 100,
  },
  itemCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.sm,
  },
  popularText: {
    ...Typography.label,
    fontSize: 9,
    color: Colors.text.inverse,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  itemAmount: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  itemBuyers: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  priceText: {
    ...Typography.h5,
    color: Colors.warning,
    marginLeft: Spacing.xs,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  buyButtonText: {
    ...Typography.buttonSmall,
    color: Colors.text.inverse,
  },
});

export default ShopScreen;
