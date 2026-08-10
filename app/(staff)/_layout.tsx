import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';

export default function StaffLayout() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  if (role !== 'staff') {
    if (role === 'landlord') return <Redirect href="/(landlord)/home" />;
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
    return <Redirect href="/(auth)/phone" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
      <Tabs.Screen name="leads" options={{ title: 'Leads' }} />
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="earnings" options={{ title: 'Earnings' }} />
    </Tabs>
  );
}
