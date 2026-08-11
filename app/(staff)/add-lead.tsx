import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffAddLeadScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Add Manual Lead" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Lead Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Solomon Tekle"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Phone Number</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="+251 911 000 000"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-700 mb-2">Initial Notes / Requirements</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 h-24"
              placeholder="Looking for 2-3 bed villa in Piassa under 35,000 ETB..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.replace('/(staff)/leads')}
          activeOpacity={0.8}
          className="py-4 bg-blue-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Create Lead Record</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
