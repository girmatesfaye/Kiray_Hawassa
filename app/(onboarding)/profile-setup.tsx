import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { role } = useAuth();
  const [name, setName] = useState('');
  const [city, setCity] = useState('Hawassa');
  const [preferredLocation, setPreferredLocation] = useState('');

  const handleFinish = () => {
    if (role === 'landlord') {
      router.replace('/(landlord)/home');
    } else if (role === 'staff') {
      router.replace('/(staff)/leads');
    } else {
      router.replace('/(tenant)/browse');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-12">
      <Text className="text-3xl font-extrabold text-gray-900 mb-2">Complete Profile</Text>
      <Text className="text-base text-gray-600 mb-8">
        Tell us a little more about yourself to personalize your experience.
      </Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="e.g. Dawit Girma"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">City</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          value={city}
          onChangeText={setCity}
        />
      </View>

      <View className="mb-8">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Preferred Neighborhood in Hawassa</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="e.g. Piassa, Tabor, Chefe, Arab Sefer"
          placeholderTextColor="#9CA3AF"
          value={preferredLocation}
          onChangeText={setPreferredLocation}
        />
      </View>

      <TouchableOpacity
        onPress={handleFinish}
        activeOpacity={0.8}
        className="py-4 bg-amber-700 rounded-xl items-center justify-center mb-6 shadow-sm"
      >
        <Text className="text-base font-bold text-white">Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
