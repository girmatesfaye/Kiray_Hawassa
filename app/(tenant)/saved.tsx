import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function SavedListingsScreen() {
  const router = useRouter();

  const savedItems = [
    {
      id: '1',
      title: 'Modern 2BR Lakeside Villa',
      location: 'Haile Resort Area, Hawassa',
      price: '25,000 ETB/mo',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Saved Listings" subtitle={`${savedItems.length} properties bookmarked`} />

      <ScrollView className="flex-1 p-4">
        {savedItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/(tenant)/listing/${item.id}`)}
            activeOpacity={0.9}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 flex-row"
          >
            <Image source={{ uri: item.image }} className="w-32 h-32" resizeMode="cover" />
            <View className="p-3 flex-1 justify-between">
              <View>
                <Text className="text-base font-bold text-gray-900 mb-1">{item.title}</Text>
                <Text className="text-xs text-gray-500 mb-2">{item.location}</Text>
              </View>
              <Text className="text-base font-extrabold text-amber-700">{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
