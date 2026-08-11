import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingIndexScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-amber-900 justify-between p-6 pt-12">
      <View className="items-center mt-8">
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLu5MEA3o7dlYko3jvy4dGfZtWwTE82oWJVsqqXAZNS1u3WHU1LxYb7GFbDVUoYnkTOq5xEwATmA078j3YQSx5UUmW8nk1rChJWv6BzT4N4FX3b0PnDr6y4s8UMN3L474n01c_Q--snf0ZS2S3sGHDIC0j1AotNFvlVyEOtm1wSIT5alc9xtce07eOv0pq1OBVaGVDt8JqT1VqnSt3PPYJ-PxYxc8LMsL3Sus9GpnnmmgJz9eiFIy6R3X1gQ' }}
          className="w-full h-80 rounded-2xl mb-8"
          resizeMode="cover"
        />
        <Text className="text-3xl font-extrabold text-white text-center mb-3">
          Find Your Ideal Home in Hawassa
        </Text>
        <Text className="text-base text-amber-100 text-center px-4 leading-6">
          Connect directly with property owners and verified local agents. Simple, fast, and transparent.
        </Text>
      </View>

      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.push('/(onboarding)/role-choice')}
          activeOpacity={0.9}
          className="py-4 bg-amber-500 rounded-xl items-center justify-center shadow-lg"
        >
          <Text className="text-lg font-bold text-gray-900">Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/phone')}
          className="mt-4 py-2 items-center"
        >
          <Text className="text-sm text-amber-200 font-semibold">Sign In with Phone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
