import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { fetchListings, getCoverUrl } from '@/features/listings/api';
import { MOCK_INTERESTS } from '@/lib/mock/data';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import type { ListingWithPhotos } from '@/lib/supabase/types';

export default function LandlordHomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [listings, setListings] = useState<ListingWithPhotos[]>([]);
  const [interestCounts, setInterestCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const landlordId = session?.user?.id;
    if (!landlordId) return;
    setLoading(true);
    try {
      const data = await fetchListings({ landlordId });
      setListings(data);
      const ids = data.map((listing) => listing.id);
      const counts = MOCK_INTERESTS
        .filter((i) => ids.includes(i.listing_id))
        .reduce<Record<string, number>>((acc, i) => {
          acc[i.listing_id] = (acc[i.listing_id] || 0) + 1;
          return acc;
        }, {});
      setInterestCounts(counts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [session?.user?.id]);



  const activeCount = listings.filter((item) => item.status === 'available').length;
  const rentedCount = listings.filter((item) => item.status === 'rented_out').length;
  const totalInterests = Object.values(interestCounts).reduce((sum, count) => sum + count, 0);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Owner Dashboard</Text>
        <Text className="text-gray-900 text-2xl font-bold mb-4">My Property Listings</Text>

        <View className="flex-row justify-between bg-gray-100 p-4 rounded-2xl">
          <View className="items-center">
            <Text className="text-gray-500 text-xs font-medium">Active Listings</Text>
            <Text className="text-gray-900 text-xl font-bold mt-1">{activeCount}</Text>
          </View>
          <View className="h-8 w-[1px] bg-gray-300 self-center" />
          <View className="items-center">
            <Text className="text-gray-500 text-xs font-medium">Total Inquiries</Text>
            <Text className="text-gray-900 text-xl font-bold mt-1">{totalInterests}</Text>
          </View>
          <View className="h-8 w-[1px] bg-gray-300 self-center" />
          <View className="items-center">
            <Text className="text-gray-500 text-xs font-medium">Deals Closed</Text>
            <Text className="text-gray-900 text-xl font-bold mt-1">{rentedCount}</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/photos')}
          activeOpacity={0.9}
          className="bg-blue-600 p-4 rounded-2xl flex-row items-center justify-between mb-6 shadow-sm"
        >
          <View>
            <Text className="text-white text-lg font-bold">Post New Property</Text>
            <Text className="text-blue-100 text-xs mt-0.5">List a house, apartment, or shop</Text>
          </View>
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-white text-xl font-bold">+</Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-900">Your Properties</Text>
          <TouchableOpacity onPress={loadData}>
            <Text className="text-xs font-bold text-blue-600">Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <>
            <SkeletonLoader.Card />
            <SkeletonLoader.Card />
          </>
        ) : listings.length === 0 ? (
          <Animated.View entering={FadeIn.duration(400)} className="items-center py-14">
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🏠</Text>
            <Text className="text-base font-bold text-gray-700 mb-1">No listings yet</Text>
            <Text className="text-sm text-gray-400 text-center">Post your first property to go live.</Text>
          </Animated.View>
        ) : (
          listings.map((item) => {
            const rentedOut = item.status === 'rented_out';
            const count = interestCounts[item.id] || 0;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/(landlord)/listing/${item.id}`)}
                activeOpacity={0.9}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 ${rentedOut ? 'opacity-70' : ''}`}
              >
                <Image source={{ uri: getCoverUrl(item) }} className="w-full h-40" resizeMode="cover" />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.title}</Text>
                    <Text className="text-base font-extrabold text-blue-700">{Number(item.price).toLocaleString()} ETB</Text>
                  </View>
                  <Text className="text-xs text-gray-500 mb-2">{item.location_text || item.location || item.subcity}</Text>

                  {count > 0 && (
                    <View className="bg-blue-50 px-3 py-1.5 rounded-lg mb-3">
                      <Text className="text-xs font-semibold text-blue-900">
                        {count} tenant{count === 1 ? '' : 's'} interested
                      </Text>
                    </View>
                  )}

                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <View className={`px-2.5 py-1 rounded-full ${rentedOut ? 'bg-gray-100' : 'bg-blue-50'}`}>
                      <Text className={`text-xs font-bold ${rentedOut ? 'text-gray-700' : 'text-blue-800'}`}>
                        {rentedOut ? 'Rented Out' : 'Available'}
                      </Text>
                    </View>
                    <View className="bg-gray-100 px-3 py-1.5 rounded-lg">
                      <Text className="text-xs font-bold text-gray-700">Manage & Leads ({count})</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
