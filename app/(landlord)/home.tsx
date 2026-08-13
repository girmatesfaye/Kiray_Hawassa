import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandlordHomeScreen() {
  const router = useRouter();

  const myProperties = [
    {
      id: '1',
      title: 'Modern 2BR Lakeside Villa',
      location: 'Haile Resort Area, Hawassa',
      price: '25,000 ETB/mo',
      status: 'Available',
      leadsCount: 4,
      connectorAssigned: 'Abebe (Hawassa Connector)',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw',
    },
    {
      id: '2',
      title: 'Commercial Storefront Piassa',
      location: 'Piassa Main Street, Hawassa',
      price: '40,000 ETB/mo',
      status: 'Rented Out',
      leadsCount: 2,
      connectorAssigned: 'Hawassa Support Agent',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Banner */}
      <View className="bg-emerald-900 p-6 pt-12 rounded-b-3xl">
        <Text className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">Owner Dashboard</Text>
        <Text className="text-white text-2xl font-bold mb-4">My Property Listings 🔑</Text>

        {/* Stats Row */}
        <View className="flex-row justify-between bg-emerald-800/60 p-4 rounded-2xl">
          <View className="items-center">
            <Text className="text-emerald-200 text-xs font-medium">Active Listings</Text>
            <Text className="text-white text-xl font-bold mt-1">1</Text>
          </View>
          <View className="h-8 w-[1px] bg-emerald-700 self-center" />
          <View className="items-center">
            <Text className="text-emerald-200 text-xs font-medium">Total Inquiries</Text>
            <Text className="text-white text-xl font-bold mt-1">6</Text>
          </View>
          <View className="h-8 w-[1px] bg-emerald-700 self-center" />
          <View className="items-center">
            <Text className="text-emerald-200 text-xs font-medium">Deals Closed</Text>
            <Text className="text-white text-xl font-bold mt-1">1</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="p-4">
        {/* Post New Property CTA */}
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/photos')}
          activeOpacity={0.9}
          className="bg-emerald-700 p-4 rounded-2xl flex-row items-center justify-between mb-6 shadow-sm"
        >
          <View>
            <Text className="text-white text-lg font-bold">Post New Property</Text>
            <Text className="text-emerald-100 text-xs mt-0.5">List a villa, apartment, or shop in 3 steps</Text>
          </View>
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-white text-xl font-bold">+</Text>
          </View>
        </TouchableOpacity>

        {/* Properties List */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Your Properties</Text>
        {myProperties.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/(landlord)/listing/${item.id}`)}
            activeOpacity={0.9}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4"
          >
            <Image source={{ uri: item.image }} className="w-full h-40" resizeMode="cover" />
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.title}</Text>
                <Text className="text-base font-extrabold text-emerald-700">{item.price}</Text>
              </View>
              <Text className="text-xs text-gray-500 mb-2">{item.location}</Text>

              {/* Task 4: Passive one-line interest & connector status */}
              {item.leadsCount > 0 && (
                <View className="bg-emerald-50/80 px-3 py-1.5 rounded-lg mb-3">
                  <Text className="text-xs font-semibold text-emerald-900">
                    👥 {item.leadsCount} people interested · assigned to connector ({item.connectorAssigned})
                  </Text>
                </View>
              )}

              <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <View className={`px-2.5 py-1 rounded-full ${item.status === 'Available' ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                  <Text className={`text-xs font-bold ${item.status === 'Available' ? 'text-emerald-800' : 'text-gray-700'}`}>
                    {item.status === 'Available' ? '🟢 Available' : '🔒 Rented Out'}
                  </Text>
                </View>
                <View className="bg-gray-100 px-3 py-1.5 rounded-lg">
                  <Text className="text-xs font-bold text-gray-700">Manage & Leads ({item.leadsCount}) →</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
