import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchListings, getCoverUrl } from '@/features/listings/api';
import type { ListingWithPhotos } from '@/lib/supabase/types';
import { StatusStamp } from '@/components/ui/StatusStamp';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Shop', value: 'shop' },
];

export default function BrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [subcity, setSubcity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [listings, setListings] = useState<ListingWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadListingsWithParams = async (searchVal: string, subcityVal: string, maxPriceVal: string) => {
    setLoading(true);
    try {
      const data = await fetchListings({
        type: selectedCategory,
        search: searchVal.trim() || undefined,
        subcity: subcityVal.trim() || undefined,
        maxPrice: maxPriceVal ? Number(maxPriceVal.replace(/,/g, '')) : undefined,
      });
      setListings(data);
    } finally {
      setLoading(false);
    }
  };

  const loadListings = () => loadListingsWithParams(search, subcity, maxPrice);

  const debouncedLoad = (newSearch: string, newSubcity: string, newMaxPrice: string) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      loadListingsWithParams(newSearch, newSubcity, newMaxPrice);
    }, 250);
  };

  useEffect(() => {
    loadListings();
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);



  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-amber-900 p-6 pt-12 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-amber-200 text-xs font-semibold uppercase">Location</Text>
            <Text className="text-white text-xl font-bold">Hawassa, Ethiopia</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            className="w-10 h-10 bg-amber-800 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg">!</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-xl px-4 py-3 shadow-sm">
          <TextInput
            className="text-gray-900 text-sm"
            placeholder="Search villas, apartments, shops..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={(newVal) => { setSearch(newVal); debouncedLoad(newVal, subcity, maxPrice); }}
            onSubmitEditing={loadListings}
            returnKeyType="search"
          />
        </View>
        <View className="bg-white rounded-xl px-4 py-3 shadow-sm mt-3">
          <TextInput
            className="text-gray-900 text-sm"
            placeholder="Filter by subcity"
            placeholderTextColor="#9CA3AF"
            value={subcity}
            onChangeText={(newVal) => { setSubcity(newVal); debouncedLoad(search, newVal, maxPrice); }}
            onSubmitEditing={loadListings}
            returnKeyType="search"
          />
        </View>
        <View className="bg-white rounded-xl px-4 py-3 shadow-sm mt-3">
          <TextInput
            className="text-gray-900 text-sm"
            placeholder="Max rent e.g. 25000 ETB"
            placeholderTextColor="#9CA3AF"
            value={maxPrice}
            onChangeText={(newVal) => { setMaxPrice(newVal); debouncedLoad(search, subcity, newVal); }}
            onSubmitEditing={loadListings}
            returnKeyType="search"
            keyboardType="numeric"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-4">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full mr-2 ${
              selectedCategory === cat.value ? 'bg-amber-700' : 'bg-white border border-gray-200'
            }`}
          >
            <Text className={`text-sm font-semibold ${selectedCategory === cat.value ? 'text-white' : 'text-gray-700'}`}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-4 pb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-900">Featured Listings</Text>
          <TouchableOpacity onPress={loadListings}>
            <Text className="text-xs font-bold text-amber-700">Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="py-12"><ActivityIndicator color="#b45309" /></View>
        ) : listings.length === 0 ? (
          <View className="bg-white p-5 rounded-xl border border-gray-100">
            <Text className="text-sm text-gray-500">No matching listings yet.</Text>
          </View>
        ) : (
          listings.map((item) => {
            const rentedOut = item.status === 'rented_out';
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/(tenant)/listing/${item.id}`)}
                activeOpacity={0.9}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 ${rentedOut ? 'opacity-55' : ''}`}
              >
                <Image source={{ uri: getCoverUrl(item) }} className="w-full h-48" resizeMode="cover" />
                <StatusStamp status={rentedOut ? 'Rented Out' : 'Available'} />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.title}</Text>
                    <Text className="text-base font-extrabold text-amber-700">{Number(item.price).toLocaleString()} ETB</Text>
                  </View>
                  <Text className="text-xs text-gray-500 mb-2">{item.location_text || item.location || item.subcity}</Text>
                  <Text className="text-xs text-gray-600 font-medium">
                    {item.type || 'house'} · {item.rooms ?? item.bedrooms ?? 0} rooms · {item.bathroom_type || `${item.bathrooms ?? 0} bath`}
                  </Text>
                  {rentedOut && <Text className="text-xs font-bold text-gray-500 mt-2">Rented out</Text>}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
