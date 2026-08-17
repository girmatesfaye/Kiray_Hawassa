import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { useAuth } from '@/app/_layout';
import { fetchSavedListings, getCoverUrl } from '@/features/listings/api';
import type { ListingWithPhotos } from '@/lib/supabase/types';

export default function SavedListingsScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [savedItems, setSavedItems] = useState<ListingWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    const tenantId = session?.user?.id;
    if (!tenantId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setSavedItems(await fetchSavedListings(tenantId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, [session?.user?.id]);

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Saved Listings" subtitle={`${savedItems.length} properties bookmarked`} />

      <ScrollView className="flex-1 p-4">
        {loading ? (
          <View className="py-10"><ActivityIndicator color="#b45309" /></View>
        ) : savedItems.length === 0 ? (
          <View className="bg-white p-5 rounded-xl border border-gray-100">
            <Text className="text-sm text-gray-500">No saved listings yet.</Text>
          </View>
        ) : (
          savedItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/(tenant)/listing/${item.id}`)}
              activeOpacity={0.9}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 flex-row"
            >
              <Image source={{ uri: getCoverUrl(item) }} className="w-32 h-32" resizeMode="cover" />
              <View className="p-3 flex-1 justify-between">
                <View>
                  <Text className="text-base font-bold text-gray-900 mb-1">{item.title}</Text>
                  <Text className="text-xs text-gray-500 mb-2">{item.location_text || item.location || item.subcity}</Text>
                </View>
                <Text className="text-base font-extrabold text-amber-700">{Number(item.price).toLocaleString()} ETB</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
