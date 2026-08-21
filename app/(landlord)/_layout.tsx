import { Tabs, Redirect } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/app/_layout';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { ListingPostWizardProvider } from '@/features/listings/postWizard';

export default function LandlordLayout() {
  const { role, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

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
          name="home"
          options={{
            title: 'Property',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: 'Post',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={22} color={color} />
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
        <Tabs.Screen name="listing/[id]" options={{ href: null }} />
        {/* Post wizard sub-steps — reached by navigating forward, not the tab bar */}
        <Tabs.Screen name="post/photos" options={{ href: null }} />
        <Tabs.Screen name="post/details" options={{ href: null }} />
        <Tabs.Screen name="post/commission" options={{ href: null }} />
        <Tabs.Screen name="post/review" options={{ href: null }} />
        <Tabs.Screen name="post/success" options={{ href: null }} />
      </Tabs>
    </ListingPostWizardProvider>
  );
}
