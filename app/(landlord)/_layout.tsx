import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { ListingPostWizardProvider } from '@/features/listings/postWizard';

export default function LandlordLayout() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  if (role !== 'landlord') {
    if (role === 'tenant') return <Redirect href="/(tenant)/browse" />;
    if (role === 'staff') return <Redirect href="/(staff)/leads" />;
    return <Redirect href="/(auth)/phone" />;
  }

  return (
    <ListingPostWizardProvider>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="post" options={{ title: 'Post' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        {/* Hidden route for listing details */}
        <Tabs.Screen name="listing/[id]" options={{ href: null }} />
      </Tabs>
    </ListingPostWizardProvider>
  );
}
