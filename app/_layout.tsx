import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { AuthContextType, Profile, Role } from '@/lib/supabase/types';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

// ---------------------------------------------------------------------------
// MOCK AUTH — swap this file's contents back to the Supabase version when
// you're ready to connect real data. Everything else in the app stays the same.
// ---------------------------------------------------------------------------

const MOCK_PROFILES: Record<Role, Profile> = {
  landlord: {
    id: 'landlord-001',
    role: 'landlord',
    full_name: 'Kebede Tassew',
    phone: '+251 922 887 766',
    avatar_url: null,
    is_complete: true,
    created_at: '2026-08-01',
    updated_at: '2026-08-01',
    fayida_id: null,
    occupation: null,
    id_photo_url: null,
    subcity: 'Haile Resort Area',
  },
  tenant: {
    id: 'tenant-001',
    role: 'tenant',
    full_name: 'Abebe Bikila',
    phone: '+251 911 234 567',
    avatar_url: null,
    is_complete: true,
    created_at: '2026-08-01',
    updated_at: '2026-08-01',
    fayida_id: 'ET-9821-3412-8841',
    occupation: 'Civil Engineer',
    id_photo_url: null,
    subcity: 'Tabor Sub-City',
  },
  staff: {
    id: 'staff-001',
    role: 'staff',
    full_name: 'Dawit (Connector)',
    phone: '+251 930 112 233',
    avatar_url: null,
    is_complete: true,
    created_at: '2026-08-01',
    updated_at: '2026-08-01',
    fayida_id: null,
    occupation: 'Connector',
    id_photo_url: null,
    subcity: 'Hawassa Center',
  },
};

// Fake session object — enough for any screen that reads session.user.id
function makeMockSession(profile: Profile) {
  return { user: { id: profile.id } } as any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [FontFamily.regular]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    [FontFamily.medium]: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    [FontFamily.semiBold]: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    [FontFamily.bold]: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
  });

  const [session, setSession] = useState<AuthContextType['session']>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // No Supabase call — start unauthenticated
    SplashScreen.hideAsync().catch(() => {});
    setIsLoading(false);
  }, []);

  // Called from the mock phone screen — just pick a role directly
  const signIn = async (_phone: string, roleOrOtp: string) => {
    const r = roleOrOtp as Role;
    const p = MOCK_PROFILES[r] ?? MOCK_PROFILES.tenant;
    setProfile(p);
    setRole(p.role);
    setSession(makeMockSession(p));
  };

  const signOut = async () => {
    setSession(null);
    setRole(null);
    setProfile(null);
  };

  const updateRole = async (newRole: Role) => {
    const p = { ...MOCK_PROFILES[newRole], role: newRole, is_complete: false };
    setRole(newRole);
    setProfile(p);
    setSession(makeMockSession(p));
  };

  if (!fontsLoaded && !fontError) return null;

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <Text style={{ color: Colors.error }}>Failed to load fonts</Text>
      </View>
    );
  }

  if (isLoading) return null;

  const authContextValue: AuthContextType = {
    session,
    role,
    profile,
    isLoading,
    signIn,
    signOut,
    updateRole,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(landlord)" />
        <Stack.Screen name="(tenant)" />
        <Stack.Screen name="(staff)" />
        <Stack.Screen name="notifications" />
      </Stack>
    </AuthContext.Provider>
  );
}
