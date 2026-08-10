import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';

export default function TenantLayout() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  if (role !== 'tenant') {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'staff') return <Redirect href="/(staff)/leads" />;
    return <Redirect href="/(auth)/phone" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
      <Tabs.Screen name="browse" options={{ title: 'Browse' }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
      <Tabs.Screen name="interests" options={{ title: 'Interests' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
