import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { Role } from '@/lib/supabase/types';

export default function RoleChoiceScreen() {
  const router = useRouter();
  const { updateRole } = useAuth();

  const handleSelectRole = async (selectedRole: Role) => {
    try {
      await updateRole(selectedRole);
      router.push('/(onboarding)/profile-setup');
    } catch (e) {
      console.error('Failed to set role:', e);
      // Fallback router push if backend/supabase is pending
      router.push('/(onboarding)/profile-setup');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6 pt-12">
      <Text className="text-3xl font-extrabold text-gray-900 mb-2">Choose Your Role</Text>
      <Text className="text-base text-gray-600 mb-8">
        Select how you plan to use Kiray Hawassa today.
      </Text>

      {/* Tenant Card */}
      <TouchableOpacity
        onPress={() => handleSelectRole('tenant')}
        activeOpacity={0.8}
        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-4 active:border-amber-600"
      >
        <View className="w-12 h-12 rounded-full bg-amber-100 items-center justify-center mb-3">
          <Text className="text-2xl">🏠</Text>
        </View>
        <Text className="text-xl font-bold text-gray-900 mb-1">Property Seeker (Tenant)</Text>
        <Text className="text-sm text-gray-600">
          Search for apartments, villas, and commercial spaces to rent in Hawassa.
        </Text>
      </TouchableOpacity>

      {/* Landlord Card */}
      <TouchableOpacity
        onPress={() => handleSelectRole('landlord')}
        activeOpacity={0.8}
        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-4 active:border-amber-600"
      >
        <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mb-3">
          <Text className="text-2xl">🔑</Text>
        </View>
        <Text className="text-xl font-bold text-gray-900 mb-1">Property Owner (Landlord)</Text>
        <Text className="text-sm text-gray-600">
          List your rental properties, reach verified tenants, and manage inquiries.
        </Text>
      </TouchableOpacity>

      {/* Staff accounts are provisioned out-of-band (Supabase Studio / admin). 
           No self-service staff enrollment. */}
    </ScrollView>
  );
}
