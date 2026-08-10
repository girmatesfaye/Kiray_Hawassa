import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { Colors, Typography } from '@/constants/colors';

export default function ProfileSetupScreen() {
  const { role, profile, isLoading } = useAuth();

  if (isLoading) return <View />;
  if (!role) return <Redirect href="/(onboarding)/role-choice" />;
  if (profile?.is_complete) {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={[Typography.headlineLg, { color: Colors.onSurface, marginBottom: 8 }]}>Setup Profile</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, textAlign: 'center' }]}>
        Tell us a bit about yourself to complete your profile.
      </Text>
    </View>
  );
}
