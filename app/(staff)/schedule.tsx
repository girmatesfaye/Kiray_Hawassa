import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { MOCK_SCHEDULES, MOCK_INTERESTS } from '@/lib/mock/data';

export default function StaffScheduleScreen() {
  const router = useRouter();
  const { leadId } = useLocalSearchParams<{ leadId: string }>();
  const [date, setDate] = useState('Tomorrow, 10:00 AM');
  const [location, setLocation] = useState('Haile Resort Gate, Hawassa');

  const handleSave = () => {
    if (!date.trim() || !location.trim()) {
      Alert.alert('Missing Information', 'Please enter both a date/time and a meeting location.');
      return;
    }

    if (leadId) {
      // Persist schedule to mock store
      MOCK_SCHEDULES[leadId] = {
        date: date.trim(),
        location: location.trim(),
        savedAt: new Date().toISOString(),
      };

      // Update matching interest status to visit_scheduled
      const idx = MOCK_INTERESTS.findIndex((i) => i.id === leadId);
      if (idx !== -1) {
        MOCK_INTERESTS[idx] = {
          ...MOCK_INTERESTS[idx],
          status: 'visit_scheduled',
          updated_at: new Date().toISOString(),
        };
      }
    }

    Alert.alert('Visit Scheduled', 'The schedule has been saved and invites will be sent.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

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
          onPress={handleSave}
          activeOpacity={0.8}
          className="py-4 bg-blue-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Save & Send Invites 📅</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
