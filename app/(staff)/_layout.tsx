import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';

export default function StaffLayout() {
  const { role, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

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
          height: 56 + insets.bottom,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingBottom: insets.bottom + 6,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
        },
        tabBarItemStyle: { minHeight: 48, justifyContent: 'center' },
        tabBarLabelStyle: { fontSize: 11, fontFamily: FontFamily.semiBold, fontWeight: '600' },
      }}
    >
      {/* ── 3 visible tabs ─────────────────────────────────────────── */}
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cash' : 'cash-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* ── Hidden routes — navigable but never in the tab bar ─────── */}
      {/* lead/[id] is a detail screen reached by tapping a row, not a top-level destination */}
      <Tabs.Screen name="lead/[id]" options={{ href: null }} />
      <Tabs.Screen name="add-lead" options={{ href: null }} />
      <Tabs.Screen name="close-deal/[leadId]" options={{ href: null }} />
      {/* activity.tsx exists in the file system — hide it so it never leaks into the tab bar */}
      <Tabs.Screen name="activity" options={{ href: null }} />
    </Tabs>
  );
}
