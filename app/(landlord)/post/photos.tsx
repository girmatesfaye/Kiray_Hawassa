import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function PostListingStep1Photos() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View>
        <HeaderBar title="Post Property - Step 1/3" subtitle="Upload High Quality Photos" showBack />

        <ScrollView className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-1">Upload Photos & Media</Text>
          <Text className="text-sm text-gray-500 mb-6">
            Listings with clear photos get up to 5x more tenant inquiries in Hawassa.
          </Text>

          {/* Upload Area */}
          <TouchableOpacity 
            activeOpacity={0.8}
            className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-2xl p-8 items-center justify-center mb-6"
          >
            <Text className="text-4xl mb-2">📸</Text>
            <Text className="text-base font-bold text-emerald-800">Tap to Select Photos</Text>
            <Text className="text-xs text-emerald-600 mt-1">Upload exterior, living room, bedrooms & bathrooms</Text>
          </TouchableOpacity>

          {/* Preview grid */}
          <Text className="text-sm font-bold text-gray-700 mb-2">Cover Photo Preview</Text>
          <View className="relative rounded-2xl overflow-hidden mb-4">
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw' }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="absolute top-2 right-2 bg-emerald-700 px-2.5 py-1 rounded-md">
              <Text className="text-xs font-bold text-white">Cover Image</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/details')}
          activeOpacity={0.8}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Next: Property Details →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
