import { Tabs, Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1d4ed8',
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
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📅</Text>,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💰</Text>,
        }}
      />
      {/* Hidden screens — navigable but not shown in tab bar */}
      <Tabs.Screen name="add-lead" options={{ href: null }} />
      <Tabs.Screen name="close-deal/[leadId]" options={{ href: null }} />
    </Tabs>
  );
}
