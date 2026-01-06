/**
 * FAQ Screen
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

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQScreenProps {
  onBack: () => void;
}

const faqs: FAQ[] = [
  {
    category: 'Getting Started',
    question: 'How do I connect my smartwatch?',
    answer: 'Go to Profile > Devices and select your smartwatch brand. Follow the on-screen instructions to grant permissions and pair your device.',
  },
  {
    category: 'Getting Started',
    question: 'How are steps counted?',
    answer: 'Steps are tracked automatically through your connected smartwatch or fitness tracker. Make sure to keep your device connected and permissions enabled.',
  },
  {
    category: 'Points & Rewards',
    question: 'How do I earn XP?',
    answer: 'You earn XP by completing daily step goals, finishing challenges, maintaining login streaks, and participating in community events.',
  },
  {
    category: 'Points & Rewards',
    question: 'What can I buy with my credits?',
    answer: 'Credits can be used to purchase XP boosts, stamina refills, enter premium challenges, and unlock exclusive items in the shop.',
  },
  {
    category: 'Challenges',
    question: 'How do challenges work?',
    answer: 'Join a challenge by paying the entry fee. Complete the required steps within the time limit to win prizes. Top performers earn bigger rewards!',
  },
  {
    category: 'Challenges',
    question: 'What happens if I don\'t complete a challenge?',
    answer: 'Entry fees are non-refundable, but you keep any progress you made. You can always try again with new challenges!',
  },
  {
    category: 'Account',
    question: 'How do I change my password?',
    answer: 'Go to Profile > Edit Profile > Security > Change Password. You\'ll need your current password to set a new one.',
  },
  {
    category: 'Account',
    question: 'Can I delete my account?',
    answer: 'Yes, go to Settings > Account > Delete Account. Please note this action is permanent and all your data will be deleted.',
  },
];

export const FAQScreen: React.FC<FAQScreenProps> = ({ onBack }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const categories = Array.from(new Set(faqs.map(f => f.category)));

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
          <Text style={styles.headerTitle}>FAQ</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.text.secondary} />
            <Text style={styles.searchPlaceholder}>Search questions...</Text>
          </View>

          {/* Categories */}
          {categories.map((category, catIndex) => (
            <View key={catIndex} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index) => {
                  const globalIndex = faqs.findIndex(f => f === faq);
                  const isExpanded = expandedIndex === globalIndex;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.faqItem}
                      onPress={() => toggleExpand(globalIndex)}
                    >
                      <View style={styles.faqHeader}>
                        <Text style={styles.faqQuestion}>{faq.question}</Text>
                        <Ionicons
                          name={isExpanded ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={Colors.primary}
                        />
                      </View>
                      {isExpanded && (
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
            </View>
          ))}

          {/* Contact Support */}
          <View style={styles.supportSection}>
            <Ionicons name="help-circle-outline" size={48} color={Colors.primary} />
            <Text style={styles.supportTitle}>Still need help?</Text>
            <Text style={styles.supportText}>
              Our support team is here to help you 24/7
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Ionicons name="chatbubble" size={20} color={Colors.text.primary} />
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  categorySection: {
    marginBottom: Spacing.xl,
  },
  categoryTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  faqItem: {
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    ...Typography.body,
    color: Colors.text.primary,
    fontWeight: '600',
    flex: 1,
    marginRight: Spacing.md,
  },
  faqAnswer: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
    lineHeight: 22,
  },
  supportSection: {
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing['2xl'],
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.lg,
  },
  supportTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  supportText: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  supportButtonText: {
    ...Typography.body,
    color: Colors.text.primary,
    fontWeight: '600',
  },
});
