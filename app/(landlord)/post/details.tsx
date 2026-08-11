import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function PostListingStep2Details() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Post Property - Step 2/3" subtitle="Property Specs & Price" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Property Title</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Luxury 3BR Villa near Lake Hawassa"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Monthly Rent (ETB)</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 font-bold"
              placeholder="e.g. 25000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Specific Location / Neighborhood</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Piassa, Haile Resort Area, Tabor"
              placeholderTextColor="#9CA3AF"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-700 mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 h-28"
              placeholder="Describe amenities, water access, parking, furnished status..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/commission')}
          activeOpacity={0.8}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Next: Terms & Commission →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
