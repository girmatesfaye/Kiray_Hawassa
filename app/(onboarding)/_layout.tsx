import { Stack, Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';

export default function OnboardingLayout() {
  const { session, role, profile, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  // Not signed in — back to auth
  if (!session) {
    return <Redirect href="/(auth)/phone" />;
  }

  // Already fully onboarded — send to their home
  if (role && profile?.is_complete) {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
    if (role === 'staff') return <Redirect href="/(staff)/leads" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
