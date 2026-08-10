import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { supabase } from '@/lib/supabase/client';
import { AuthContextType, Profile, Role } from '@/lib/supabase/types';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({    
    [FontFamily.regular]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    [FontFamily.medium]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    [FontFamily.semiBold]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    [FontFamily.bold]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    [FontFamily.extraBold]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    // [FontFamily.regular]: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    // [FontFamily.medium]: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    // [FontFamily.semiBold]: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    // [FontFamily.bold]: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    // [FontFamily.extraBold]: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

  const [session, setSession] = useState<AuthContextType['session']>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);

        if (currentSession?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .maybeSingle();
          
          if (data) {
            setRole(data.role);
            setProfile(data as Profile);
          }
        }

        const { data: listener } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            setSession(session);
            if (session?.user) {
              const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (data) {
                setRole(data.role);
                setProfile(data as Profile);
              }
            } else {
              setRole(null);
              setProfile(null);
            }
          }
        );

        return () => {
          listener.subscription.unsubscribe();
        };
      } catch (e) {
        console.error('Auth prepare error:', e);
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const signIn = async (phone: string, otp: string) => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    setRole(null);
    setProfile(null);
  };

  const updateRole = async (newRole: Role) => {
    if (!session?.user) throw new Error('No session');
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, role: newRole, is_complete: false })
      .select()
      .single();
    if (error) throw error;
    setRole(newRole);
    setProfile(data as Profile);
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <Text style={{ color: Colors.error }}>Failed to load fonts</Text>
      </View>
    );
  }

  if (isLoading) {
    return null;
  }

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
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(landlord)" />
        <Stack.Screen name="(tenant)" />
        <Stack.Screen name="(staff)" />
      </Stack>
      <RootRedirect />
    </AuthContext.Provider>
  );
}

function RootRedirect() {
  const { session, role, profile, isLoading } = useAuth();

  if (isLoading) return null;

  if (!session) {
    return <Redirect href="/(auth)/phone" />;
  }

  if (!role) {
    return <Redirect href="/(onboarding)/role-choice" />;
  }

  if (role && !profile?.is_complete) {
    return <Redirect href="/(onboarding)/profile-setup" />;
  }

  if (role === 'landlord') {
    return <Redirect href="/(landlord)/home" />;
  }

  if (role === 'tenant') {
    return <Redirect href="/(tenant)/browse" />;
  }

  if (role === 'staff') {
    return <Redirect href="/(staff)/leads" />;
  }

  return null;
}
