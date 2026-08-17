import { Tabs, Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';

import { FontFamily } from '@/constants/typography';

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#b45309',
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
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔖</Text>,
        }}
      />
      <Tabs.Screen
        name="interests"
        options={{
          title: 'Interests',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>❤️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
      {/* Non-tab routes — hidden from tab bar */}

    </Tabs>
  );
}
