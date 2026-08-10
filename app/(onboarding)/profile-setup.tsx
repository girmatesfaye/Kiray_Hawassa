import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/app/_layout';

export default function ProfileSetupScreen() {
  const { role, profile, isLoading } = useAuth();

  if (isLoading) return <View />;
  if (!role) return <Redirect href="/(onboarding)/role-choice" />;
  if (profile?.is_complete) {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9ff', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#151c27', marginBottom: 8 }}>Setup Profile</Text>
      <Text style={{ fontSize: 16, color: '#5a4139', textAlign: 'center' }}>
        Tell us a bit about yourself to complete your profile.
      </Text>
    </View>
  );
}
