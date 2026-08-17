import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import HeaderBar from '@/components/ui/HeaderBar';

export default function LandlordProfileScreen() {
  const router = useRouter();
  const { signOut, profile } = useAuth();

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/phone');
    } catch (e) {
      router.replace('/(auth)/phone');
    }
  };

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Landlord Profile" />

      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-2xl p-5 items-center shadow-sm border border-gray-100 mb-6">
          <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mb-3">
            <Text className="text-3xl font-bold text-emerald-800">{initials}</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900">{profile?.full_name ?? 'Landlord'}</Text>
          <Text className="text-sm text-gray-500 mb-2">Verified Property Owner</Text>
          <View className="bg-emerald-100 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-emerald-800">Landlord Mode</Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <TouchableOpacity
            onPress={() => router.push('/(onboarding)/role-choice')}
            className="p-4 border-b border-gray-100 flex-row justify-between items-center"
          >
            <Text className="text-base font-semibold text-gray-800">🔄 Switch Mode / Role</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.8}
          className="bg-red-50 border border-red-200 py-4 rounded-xl items-center justify-center"
        >
          <Text className="text-base font-bold text-red-600">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
