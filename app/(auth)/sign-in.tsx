import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    router.replace('/(onboarding)/role-choice');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-12">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className="text-xl text-gray-700 font-bold">← Back</Text>
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Sign In</Text>
      <Text className="text-base text-gray-600 mb-8">Access your Hawassa rental account.</Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Email or Phone Number</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="example@domain.com"
          placeholderTextColor="#9CA3AF"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        activeOpacity={0.8}
        className="py-4 bg-amber-700 rounded-xl items-center justify-center mb-4"
      >
        <Text className="text-base font-bold text-white">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push('/(auth)/sign-up')}
        className="py-2 items-center"
      >
        <Text className="text-sm text-amber-700 font-semibold">Don&apos;t have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
