/**
 * Edit Profile Screen
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
import { Button, Input } from '../../components/common';

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  onBack,
  onSave,
}) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [bio, setBio] = useState('Fitness enthusiast | Marathon runner');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSave();
    }, 1000);
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.photoGradient}
              >
                <Text style={styles.photoText}>JD</Text>
              </LinearGradient>
              <TouchableOpacity style={styles.editPhotoButton}>
                <Ionicons name="camera" size={20} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <Input
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                leftIcon={<Ionicons name="person-outline" size={20} color={Colors.text.secondary} />}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.text.secondary} />}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <Input
                placeholder="Enter your phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                leftIcon={<Ionicons name="call-outline" size={20} color={Colors.text.secondary} />}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <Input
                placeholder="Tell us about yourself"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={3}
                style={styles.bioInput}
                leftIcon={<Ionicons name="document-text-outline" size={20} color={Colors.text.secondary} />}
              />
            </View>

            {/* Password Section */}
            <View style={styles.passwordSection}>
              <Text style={styles.sectionTitle}>Security</Text>
              <TouchableOpacity style={styles.passwordButton}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.text.secondary} />
                <Text style={styles.passwordButtonText}>Change Password</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
              </TouchableOpacity>
            </View>

            {/* Save Button */}
            <Button
              title="Save Changes"
              onPress={handleSave}
              loading={loading}
              style={styles.saveButton}
            />
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
  photoSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  photoContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  photoGradient: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    ...Typography.h1,
    color: Colors.text.primary,
    fontSize: 48,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background.primary,
  },
  changePhotoText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  form: {
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    color: Colors.text.secondary,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  passwordSection: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  passwordButtonText: {
    ...Typography.body,
    color: Colors.text.primary,
    flex: 1,
  },
  saveButton: {
    marginTop: Spacing.xl,
  },
});
