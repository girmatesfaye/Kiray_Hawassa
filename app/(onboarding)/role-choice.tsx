import { View, Text, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { Colors, Typography, Spacing } from '@/constants/colors';
import { Radius } from '@/constants/spacing';
import { Role } from '@/lib/supabase/types';

export default function RoleChoiceScreen() {
  const { updateRole, role, profile, isLoading } = useAuth();

  if (isLoading) return <View />;
  if (role && profile?.is_complete) {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
  }
  if (role && !profile?.is_complete) return <Redirect href="/(onboarding)/profile-setup" />;

  const handleSelectRole = async (selectedRole: Role) => {
    try {
      await updateRole(selectedRole);
    } catch (e) {
      console.error('Failed to set role:', e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: Spacing.sectionPadding }}>
      <Text style={[Typography.headlineLg, { color: Colors.onSurface, marginBottom: Spacing.stackGap }]}>
        I want to...
      </Text>

      <TouchableOpacity
        onPress={() => handleSelectRole('landlord')}
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radius.md,
          width: '100%',
          marginBottom: Spacing.stackGap,
        }}>
        <Text style={[Typography.labelLg, { color: Colors.onPrimary, textAlign: 'center' }]}>
          Rent out my property
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSelectRole('tenant')}
        style={{
          backgroundColor: Colors.surfaceContainer,
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radius.md,
          width: '100%',
        }}>
        <Text style={[Typography.labelLg, { color: Colors.primary, textAlign: 'center' }]}>
          Find a place to rent
        </Text>
      </TouchableOpacity>
    </View>
  );
}
