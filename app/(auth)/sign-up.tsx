import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    router.replace('/(onboarding)/role-choice');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-12">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className="text-xl text-gray-700 font-bold">← Back</Text>
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
      <Text className="text-base text-gray-600 mb-8">Join Kiray Hawassa to find or rent properties.</Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="Abebe Bikila"
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Phone Number</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="+251 912 345 678"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
        onPress={handleSignUp}
        activeOpacity={0.8}
        className="py-4 bg-amber-700 rounded-xl items-center justify-center mb-4"
      >
        <Text className="text-base font-bold text-white">Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push('/(auth)/sign-in')}
        className="py-2 items-center"
      >
        <Text className="text-sm text-amber-700 font-semibold">Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
