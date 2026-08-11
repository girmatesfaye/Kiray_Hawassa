import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function BrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Apartment', 'Villa', 'Condo', 'Commercial'];

  const listings = [
    {
      id: '1',
      title: 'Modern 2BR Lakeside Villa',
      location: 'Hawassa, Haile Resort Area',
      price: '25,000 ETB/mo',
      specs: '2 Beds • 2 Baths • 120 sqm',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw',
      status: 'Available',
    },
    {
      id: '2',
      title: 'Spacious Commercial Shop',
      location: 'Piassa Main Street, Hawassa',
      price: '40,000 ETB/mo',
      specs: 'Storefront • 85 sqm',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLuOfzfiNjLI7GT--JYyarK5yY46fthA16YkA4nM6w8yD4bB5JoqQYkh4tNzZFDGIyUuA7gfIuXG7aGAC5GG1d5e-4TNTOPDWZ2SKNiGfYR3Ni49x1cRQE7DYzBngUlzLONAirUc6mhSIVooJ-fIhEiXzNeJaE9cIpK238TaEVlleePB4zNIsp52z8_lm0XX7NhYo4qr56JS1Vz04ZkgZfWQAMH4r32TPcIDHd-gociBwMAig_JkICv9Nje2',
      status: 'Available',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Bar */}
      <View className="bg-amber-900 p-6 pt-12 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-amber-200 text-xs font-semibold uppercase tracking-wider">Location</Text>
            <Text className="text-white text-xl font-bold">Hawassa, Ethiopia 📍</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/notifications')}
            className="w-10 h-10 bg-amber-800 rounded-full items-center justify-center"
          >
            <Text className="text-lg">🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          onPress={() => router.push('/(tenant)/search')}
          activeOpacity={0.9}
          className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm"
        >
          <Text className="text-gray-400 mr-2">🔍</Text>
          <Text className="text-gray-400 text-sm flex-1">Search villas, apartments, shops...</Text>
          <View className="bg-amber-100 px-2 py-1 rounded-md">
            <Text className="text-xs font-bold text-amber-800">Filter</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-4">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full mr-2 ${
              selectedCategory === cat ? 'bg-amber-700' : 'bg-white border border-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedCategory === cat ? 'text-white' : 'text-gray-700'
              }`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Listings */}
      <View className="px-4 pb-8">
        <Text className="text-lg font-bold text-gray-900 mb-3">Featured Listings</Text>
        {listings.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/(tenant)/listing/${item.id}`)}
            activeOpacity={0.9}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4"
          >
            <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.title}</Text>
                <Text className="text-base font-extrabold text-amber-700">{item.price}</Text>
              </View>
              <Text className="text-xs text-gray-500 mb-2">{item.location}</Text>
              <Text className="text-xs text-gray-600 font-medium">{item.specs}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
