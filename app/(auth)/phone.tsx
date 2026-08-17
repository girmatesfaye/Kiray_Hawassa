import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { Role } from '@/lib/supabase/types';

// ---------------------------------------------------------------------------
// MOCK LOGIN — tap any role to jump straight into that role's home screen.
// Replace with real OTP flow when connecting Supabase.
// ---------------------------------------------------------------------------

const ROLES: { role: Role; label: string; emoji: string; color: string; bg: string }[] = [
  { role: 'tenant',   label: 'Enter as Tenant',   emoji: '🏠', color: 'bg-amber-700',  bg: 'bg-amber-50'  },
  { role: 'landlord', label: 'Enter as Landlord',  emoji: '🔑', color: 'bg-emerald-700', bg: 'bg-emerald-50' },
  { role: 'staff',    label: 'Enter as Staff',     emoji: '🎯', color: 'bg-blue-700',   bg: 'bg-blue-50'   },
];

export default function PhoneScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState<Role | null>(null);

  const handleEnter = async (role: Role) => {
    setLoading(role);
    // signIn(phone, roleOrOtp) — in mock mode the second arg is the role string
    await signIn('mock', role);
    router.replace('/');
    setLoading(null);
  };

  return (
    <View className="flex-1 bg-white justify-between p-6 pt-14">
      <View>
        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome to Kiray</Text>
        <Text className="text-base text-gray-500 mb-2">
          Hawassa&apos;s rental marketplace
        </Text>
        <View className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-8">
          <Text className="text-xs font-bold text-amber-800">🧪 Mock Mode — pick a role to explore</Text>
        </View>

        {ROLES.map(({ role, label, emoji, color, bg }) => (
          <TouchableOpacity
            key={role}
            onPress={() => handleEnter(role)}
            disabled={loading !== null}
            activeOpacity={0.85}
            className={`${bg} border border-gray-200 rounded-2xl p-5 mb-4 flex-row items-center justify-between`}
          >
            <View className="flex-row items-center">
              <Text className="text-3xl mr-4">{emoji}</Text>
              <Text className="text-base font-bold text-gray-900">{label}</Text>
            </View>
            {loading === role ? (
              <ActivityIndicator color="#374151" />
            ) : (
              <Text className="text-gray-400 text-lg">→</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-center text-xs text-gray-400 pb-4">
        Mock data — no Supabase connection required
      </Text>
    </View>
  );
}
