import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { useListingPostWizard, ListingType } from '@/features/listings/postWizard';

const listingTypes: { label: string; value: ListingType }[] = [
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Shop', value: 'shop' },
];

export default function PostListingStep2Details() {
  const router = useRouter();
  const { draft, updateDraft } = useListingPostWizard();

  const isValid =
    draft.title.trim().length > 2 &&
    Number(draft.price) > 0 &&
    draft.subcity.trim().length > 1 &&
    draft.locationText.trim().length > 2;

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Post Property - Step 2/4" subtitle="Property specs & price" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Property Title</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. 2BR apartment near Lake Hawassa"
              placeholderTextColor="#9CA3AF"
              value={draft.title}
              onChangeText={(title) => updateDraft({ title })}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Property Type</Text>
            <View className="flex-row gap-2">
              {listingTypes.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => updateDraft({ type: item.value })}
                  className={`flex-1 py-3 rounded-xl items-center ${
                    draft.type === item.value ? 'bg-emerald-700' : 'bg-gray-100'
                  }`}
                >
                  <Text className={`text-xs font-bold ${draft.type === item.value ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-700 mb-2">Monthly Rent (ETB)</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 font-bold"
                placeholder="25000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={draft.price}
                onChangeText={(price) => updateDraft({ price })}
              />
            </View>
            <View className="w-24">
              <Text className="text-sm font-bold text-gray-700 mb-2">Rooms</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
                placeholder="2"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={draft.rooms}
                onChangeText={(rooms) => updateDraft({ rooms })}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Bathroom Type</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="Private, shared, or number of bathrooms"
              placeholderTextColor="#9CA3AF"
              value={draft.bathroomType}
              onChangeText={(bathroomType) => updateDraft({ bathroomType })}
            />
          </View>

          <View className="flex-row gap-3 mb-4">
            {[
              ['hasWater', 'Water access'],
              ['hasElectric', 'Electricity'],
            ].map(([key, label]) => {
              const enabled = Boolean(draft[key as 'hasWater' | 'hasElectric']);
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => updateDraft({ [key]: !enabled })}
                  className={`flex-1 py-3 rounded-xl items-center border ${
                    enabled ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text className={`text-xs font-bold ${enabled ? 'text-emerald-800' : 'text-gray-600'}`}>
                    {enabled ? 'Yes' : 'No'} - {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Subcity</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Tabor, Piassa, Haile Resort Area"
              placeholderTextColor="#9CA3AF"
              value={draft.subcity}
              onChangeText={(subcity) => updateDraft({ subcity })}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Specific Location</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="Street, landmark, or neighborhood"
              placeholderTextColor="#9CA3AF"
              value={draft.locationText}
              onChangeText={(locationText) => updateDraft({ locationText })}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-700 mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 h-28"
              placeholder="Describe amenities, access, parking, and lease notes..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={draft.description}
              onChangeText={(description) => updateDraft({ description })}
            />
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/commission')}
          disabled={!isValid}
          activeOpacity={0.8}
          className={`py-4 rounded-xl items-center justify-center shadow-sm ${isValid ? 'bg-emerald-700' : 'bg-gray-200'}`}
        >
          <Text className={`text-base font-bold ${isValid ? 'text-white' : 'text-gray-400'}`}>
            Next: Terms & Commission
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
