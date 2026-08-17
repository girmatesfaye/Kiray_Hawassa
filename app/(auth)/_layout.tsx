import { Stack, Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';

export default function AuthLayout() {
  const { session, role, profile, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  // Already signed in — send them to the right place
  if (session && role && profile?.is_complete) {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
    if (role === 'staff') return <Redirect href="/(staff)/leads" />;
  }

  if (session && !role) {
    return <Redirect href="/(onboarding)/role-choice" />;
  }

  if (session && role && !profile?.is_complete) {
    return <Redirect href="/(onboarding)/profile-setup" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
