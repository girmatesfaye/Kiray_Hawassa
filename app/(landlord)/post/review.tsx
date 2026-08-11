import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function PostListingReviewScreen() {
  const router = useRouter();

  const handlePublish = () => {
    router.replace('/(landlord)/home');
  };

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Review & Publish" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="bg-emerald-100 p-3 rounded-xl mb-4">
            <Text className="text-xs font-bold text-emerald-800 text-center">
              Preview how your listing will appear to tenants in Hawassa
            </Text>
          </View>

          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-6">
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw' }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-xl font-bold text-gray-900 mb-1">Modern 2BR Lakeside Villa</Text>
              <Text className="text-sm text-gray-500 mb-2">Haile Resort Area, Hawassa</Text>
              <Text className="text-2xl font-extrabold text-emerald-700">25,000 ETB / month</Text>
            </View>
          </View>

          <Text className="text-sm font-bold text-gray-700 mb-2">Agreement Summary</Text>
          <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
            <Text className="text-xs text-gray-600 mb-1">✓ Status: Ready to publish</Text>
            <Text className="text-xs text-gray-600 mb-1">✓ Connector Rate: 10% on deal close</Text>
            <Text className="text-xs text-gray-600">✓ Visibility: Public on Hawassa Rental Connect</Text>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={handlePublish}
          activeOpacity={0.9}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-lg"
        >
          <Text className="text-base font-bold text-white">Publish Listing Now 🎉</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
