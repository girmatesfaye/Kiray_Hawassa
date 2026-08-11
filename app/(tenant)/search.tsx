import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function SearchScreen() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState('Villa');
  const [maxPrice, setMaxPrice] = useState('30,000');

  return (
    <View className="flex-1 bg-white pt-8">
      <HeaderBar title="Search & Filter" showBack />

      <ScrollView className="flex-1 p-4">
        {/* Search Input */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-700 mb-2">Keyword / Neighborhood</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
            placeholder="e.g. Haile Resort, Piassa, Tabor"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Property Type Selection */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-700 mb-2">Property Type</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Villa', 'Apartment', 'Condo', 'Commercial Shop', 'Studio'].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setPropertyType(type)}
                className={`px-4 py-2.5 rounded-xl border ${
                  propertyType === type
                    ? 'bg-amber-700 border-amber-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    propertyType === type ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bedrooms */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-700 mb-2">Bedrooms</Text>
          <View className="flex-row justify-between">
            {['Any', '1', '2', '3', '4+'].map((beds, i) => (
              <TouchableOpacity
                key={beds}
                className={`flex-1 mx-1 py-2.5 rounded-xl border items-center ${
                  i === 2 ? 'bg-amber-700 border-amber-700' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Text className={`text-sm font-bold ${i === 2 ? 'text-white' : 'text-gray-700'}`}>
                  {beds}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Max Monthly Rent */}
        <View className="mb-8">
          <Text className="text-sm font-bold text-gray-700 mb-2">Max Monthly Rent (ETB)</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 font-bold"
            value={maxPrice}
            onChangeText={setMaxPrice}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="py-4 bg-amber-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
