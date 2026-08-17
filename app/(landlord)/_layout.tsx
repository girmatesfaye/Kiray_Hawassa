import { Tabs, Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#047857',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            height: 62,
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: '#FFFFFF',
          },
          tabBarItemStyle: { minHeight: 48, justifyContent: 'center' },
          tabBarLabelStyle: { fontSize: 11, fontFamily: FontFamily.semiBold, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Properties',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔑</Text>,
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: 'Post New',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>➕</Text>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
          }}
        />
        {/* Hidden route for listing details */}
        <Tabs.Screen name="listing/[id]" options={{ href: null }} />
      </Tabs>
    </ListingPostWizardProvider>
  );
}
