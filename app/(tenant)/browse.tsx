import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Animated, { FadeIn, SlideInUp, SlideOutDown, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchListings, getCoverUrl } from '@/features/listings/api';
import type { ListingWithPhotos } from '@/lib/supabase/types';
import { StatusStamp } from '@/components/ui/StatusStamp';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Shop', value: 'shop' },
];

export default function BrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Inline search — stays in the header always
  const [search, setSearch] = useState('');
  // Filter state — lives in the sheet
  const [subcity, setSubcity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // Draft filter state while sheet is open (committed on Apply)
  const [draftSubcity, setDraftSubcity] = useState('');
  const [draftMaxPrice, setDraftMaxPrice] = useState('');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const [listings, setListings] = useState<ListingWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadListingsWithParams = async (
    searchVal: string,
    subcityVal: string,
    maxPriceVal: string,
  ) => {
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

  const hasActiveFilters = subcity.trim().length > 0 || maxPrice.trim().length > 0;

  const openFilterSheet = () => {
    // Seed draft with currently applied filters
    setDraftSubcity(subcity);
    setDraftMaxPrice(maxPrice);
    setFilterSheetOpen(true);
  };

  const applyFilters = () => {
    setSubcity(draftSubcity);
    setMaxPrice(draftMaxPrice);
    setFilterSheetOpen(false);
    loadListingsWithParams(search, draftSubcity, draftMaxPrice);
  };

  const clearFilters = () => {
    setDraftSubcity('');
    setDraftMaxPrice('');
    setSubcity('');
    setMaxPrice('');
    setFilterSheetOpen(false);
    loadListingsWithParams(search, '', '');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* ── Header ── */}
      <View className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Location</Text>
            <Text className="text-gray-900 text-xl font-bold">Hawassa, Ethiopia</Text>
          </View>
          <View className="flex-row gap-2 items-center">
            {/* Filter button with active indicator */}
            <TouchableOpacity
              onPress={openFilterSheet}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                hasActiveFilters ? 'bg-blue-600' : 'bg-gray-100'
              }`}
            >
              <Ionicons name="options-outline" size={20} color={hasActiveFilters ? '#ffffff' : '#374151'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="notifications-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Inline search bar — always visible */}
        <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center gap-2">
          <Ionicons name="search-outline" size={16} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-gray-900 text-sm"
            placeholder="Search villas, apartments, shops..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={(newVal) => {
              setSearch(newVal);
              debouncedLoad(newVal, subcity, maxPrice);
            }}
            onSubmitEditing={loadListings}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => { setSearch(''); debouncedLoad('', subcity, maxPrice); }}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Active filter pill summary */}
        {hasActiveFilters && (
          <View className="flex-row flex-wrap gap-2 mt-3">
            {subcity.trim().length > 0 && (
              <View className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center">
                <Text className="text-blue-700 text-xs font-semibold mr-1">📍 {subcity}</Text>
              </View>
            )}
            {maxPrice.trim().length > 0 && (
              <View className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center">
                <Text className="text-blue-700 text-xs font-semibold mr-1">
                  Max {Number(maxPrice.replace(/,/g, '')).toLocaleString()} ETB
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={clearFilters} className="bg-gray-200 px-3 py-1 rounded-full">
              <Text className="text-gray-600 text-xs font-semibold">Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ── Category chips ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-4">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full mr-2 ${
              selectedCategory === cat.value ? 'bg-blue-600' : 'bg-white border border-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedCategory === cat.value ? 'text-white' : 'text-gray-700'
              }`}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Listings ── */}
      <View className="px-4 pb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-900">Featured Listings</Text>
          <TouchableOpacity onPress={loadListings}>
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
            <Text className="text-base font-bold text-gray-700 mb-1">No listings found</Text>
            <Text className="text-sm text-gray-400 text-center">
              {hasActiveFilters ? 'Try adjusting your filters.' : 'No listings available yet.'}
            </Text>
          </Animated.View>
        ) : (
          listings.map((item) => {
            const rentedOut = item.status === 'rented_out';
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/(tenant)/listing/${item.id}`)}
                activeOpacity={0.9}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 ${
                  rentedOut ? 'opacity-55' : ''
                }`}
              >
                <Image source={{ uri: getCoverUrl(item) }} className="w-full h-48" resizeMode="cover" />
                <StatusStamp status={rentedOut ? 'Rented Out' : 'Available'} />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.title}</Text>
                    <Text className="text-base font-extrabold text-blue-700">
                      {Number(item.price).toLocaleString()} ETB
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500 mb-2">
                    {item.location_text || item.location || item.subcity}
                  </Text>
                  <Text className="text-xs text-gray-600 font-medium">
                    {item.type || 'house'} · {item.rooms ?? item.bedrooms ?? 0} rooms ·{' '}
                    {item.bathroom_type || `${item.bathrooms ?? 0} bath`}
                  </Text>
                  {rentedOut && <Text className="text-xs font-bold text-gray-500 mt-2">Rented out</Text>}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* ── Filter Bottom Sheet ── */}
      <Modal
        visible={filterSheetOpen}
        transparent
        animationType="none"
        onRequestClose={() => setFilterSheetOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
          onPress={() => setFilterSheetOpen(false)}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Animated.View
              entering={SlideInUp.duration(320).easing(Easing.out(Easing.cubic))}
              exiting={SlideOutDown.duration(220).easing(Easing.in(Easing.cubic))}
              style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                paddingBottom: 40,
              }}
              // Prevent tap-through to backdrop
              onStartShouldSetResponder={() => true}
            >
              {/* Sheet handle */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 2,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              />
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 20 }}>
                Filter Listings
              </Text>

              {/* Subcity */}
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Subcity / Area
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#F9FAFB',
                  marginBottom: 16,
                }}
                placeholder="e.g. Tabor, Mehal Ketema"
                placeholderTextColor="#9CA3AF"
                value={draftSubcity}
                onChangeText={setDraftSubcity}
                returnKeyType="next"
              />

              {/* Max price */}
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Max Rent (ETB / month)
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#F9FAFB',
                  marginBottom: 24,
                }}
                placeholder="e.g. 25000"
                placeholderTextColor="#9CA3AF"
                value={draftMaxPrice}
                onChangeText={setDraftMaxPrice}
                keyboardType="numeric"
                returnKeyType="done"
              />

              {/* Buttons */}
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  onPress={clearFilters}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#6B7280' }}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={applyFilters}
                  style={{
                    flex: 2,
                    backgroundColor: '#1d4ed8',
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#ffffff' }}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
