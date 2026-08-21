import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import ConnectorContactSheet from '@/components/ui/ConnectorContactSheet';
import { supabase } from '@/lib/supabase/client';
import { createInterest } from '@/features/interests/api';
import { fetchListingById, getCoverUrl, isListingSaved, setListingSaved } from '@/features/listings/api';
import type { ListingWithPhotos } from '@/lib/supabase/types';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { session } = useAuth();
  const listingId = String(id || '');

  const [listing, setListing] = useState<ListingWithPhotos | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [connectorInfo, setConnectorInfo] = useState<{ name: string; phone: string | undefined }>({
    name: 'Hawassa Connector',
    phone: undefined,
  });

  const loadListing = async () => {
    if (!listingId) return;
    setLoading(true);
    try {
      const data = await fetchListingById(listingId);
      setListing(data);
      const tenantId = session?.user?.id;
      if (tenantId) setSaved(await isListingSaved(tenantId, listingId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListing();
  }, [listingId, session?.user?.id]);

  useEffect(() => {
    if (!listingId) return;
    const channel = supabase
      .channel(`tenant-listing-${listingId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'listings', filter: `id=eq.${listingId}` }, loadListing)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [listingId, session?.user?.id]);

  const handleSave = async () => {
    const tenantId = session?.user?.id;
    if (!tenantId || !listing) return;
    setSaving(true);
    try {
      await setListingSaved(tenantId, listing.id, !saved);
      setSaved(!saved);
    } catch (error) {
      Alert.alert('Save failed', (error as Error).message || 'Could not update saved listing.');
    } finally {
      setSaving(false);
    }
  };

  const handleExpressInterest = async () => {
    const tenantId = session?.user?.id;
    if (!tenantId || !listing) return;

    setInterestLoading(true);
    try {
      const result = await createInterest({
        tenantId,
        listingId: listing.id,
        landlordId: listing.landlord_id,
      });

      setConnectorInfo({
        name: result.connector?.full_name || 'Hawassa Connector',
        phone: result.connector?.phone || undefined,
      });
      setShowContactSheet(true);
    } catch (error) {
      Alert.alert('Interest failed', (error as Error).message || 'Could not express interest.');
    } finally {
      setInterestLoading(false);
    }
  };

  const handleCloseSheet = () => {
    setShowContactSheet(false);
    router.push('/(tenant)/interests');
  };

  if (loading) {
    return <View className="flex-1 bg-white items-center justify-center"><ActivityIndicator color="#1d4ed8" /></View>;
  }

  if (!listing) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Text className="text-gray-500 text-sm">Listing not found.</Text>
      </View>
    );
  }

  const coverUrl = getCoverUrl(listing);
  const rentedOut = listing.status === 'rented_out';

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image source={{ uri: coverUrl }} className="w-full h-72" resizeMode="cover" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className="absolute top-12 right-4 bg-white/90 px-3 py-2 rounded-full"
          >
            <Text className="text-xs font-bold text-blue-800">{saved ? 'Saved ♥' : 'Save'}</Text>
          </TouchableOpacity>
        </View>

        <View className="p-6">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 mr-2">
              <Text className="text-2xl font-bold text-gray-900">{listing.title}</Text>
              <Text className="text-sm text-gray-500 mt-1">{listing.location_text || listing.location || listing.subcity}</Text>
            </View>
            <Text className="text-2xl font-extrabold text-blue-700">{Number(listing.price).toLocaleString()} ETB</Text>
          </View>

          {rentedOut && (
            <View className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl my-3">
              <Text className="text-xs font-bold text-gray-600">This listing has been rented out.</Text>
            </View>
          )}

          <View className="flex-row justify-between bg-gray-50 p-4 rounded-xl my-4">
            <View className="items-center">
              <Text className="text-xs text-gray-500">Type</Text>
              <Text className="text-base font-bold text-gray-900 capitalize">{listing.type || 'house'}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Rooms</Text>
              <Text className="text-base font-bold text-gray-900">{listing.rooms ?? listing.bedrooms ?? 0}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Bathroom</Text>
              <Text className="text-base font-bold text-gray-900">{listing.bathroom_type || listing.bathrooms || 'N/A'}</Text>
            </View>
          </View>

          <Text className="text-base font-bold text-gray-900 mb-2">Description</Text>
          <Text className="text-sm text-gray-600 leading-6 mb-6">{listing.description || 'No description provided.'}</Text>

          <Text className="text-base font-bold text-gray-900 mb-2">Amenities</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {[
              listing.has_water ? 'Water access' : null,
              listing.has_electric ? 'Electricity' : null,
              ...(listing.amenities || []),
            ].filter(Boolean).map((feat) => (
              <View key={String(feat)} className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
                <Text className="text-xs font-semibold text-blue-800">{feat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-100 bg-white flex-row items-center">
        <TouchableOpacity
          onPress={handleExpressInterest}
          disabled={interestLoading || rentedOut}
          activeOpacity={0.8}
          className={`flex-1 py-4 rounded-xl items-center justify-center shadow-sm ${rentedOut ? 'bg-gray-200' : 'bg-blue-600'}`}
        >
          {interestLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className={`text-base font-bold ${rentedOut ? 'text-gray-400' : 'text-white'}`}>
              {rentedOut ? 'Rented Out' : "I'm Interested"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <ConnectorContactSheet
        visible={showContactSheet}
        onClose={handleCloseSheet}
        connectorName={connectorInfo.name}
        connectorPhone={connectorInfo.phone}
      />
    </View>
  );
}
