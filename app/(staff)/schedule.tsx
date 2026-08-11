import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffScheduleScreen() {
  const router = useRouter();
  const [date, setDate] = useState('Tomorrow, 10:00 AM');
  const [location, setLocation] = useState('Haile Resort Gate, Hawassa');

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Schedule Meeting / Visit" showBack />

        <ScrollView className="p-4 flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-2">Property Viewing Details</Text>
          <Text className="text-sm text-gray-500 mb-6">
            Set a time and meeting point for the tenant and landlord to inspect the property.
          </Text>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Meeting Date & Time</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 font-semibold"
              value={date}
              onChangeText={setDate}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-700 mb-2">Meeting Point Location</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <Text className="text-xs font-bold text-blue-900 mb-1">SMS Reminder Notification</Text>
            <Text className="text-xs text-blue-800">
              An SMS invite with location details will be sent automatically to both parties.
            </Text>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="py-4 bg-blue-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Save & Send Invites 📅</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
