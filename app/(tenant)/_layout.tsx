import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';

export default function TenantLayout() {
  const { role, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

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
      {/* ── 4 visible tabs ─────────────────────────────────────────── */}
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="interests"
        options={{
          title: 'Interests',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* ── Hidden routes — navigable but never in the tab bar ─────── */}
      {/* listing/[id] is a detail screen reached by tapping a card, not a top-level destination */}
      <Tabs.Screen name="listing/[id]" options={{ href: null }} />
    </Tabs>
  );
}
