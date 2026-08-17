import { Redirect } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function Index() {
  const { session, role, profile, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  if (!session) {
    return <Redirect href="/(auth)/phone" />;
  }

  if (!role) {
    return <Redirect href="/(onboarding)/role-choice" />;
  }

  if (!profile?.is_complete) {
    return <Redirect href="/(onboarding)/profile-setup" />;
  }

  if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
  if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
  if (role === 'staff') return <Redirect href="/(staff)/leads" />;

  return <Redirect href="/(auth)/phone" />;
}
