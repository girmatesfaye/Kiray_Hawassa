import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { useAuth } from '@/app/_layout';
import { createListingFromDraft } from '@/features/listings/api';
import { useListingPostWizard } from '@/features/listings/postWizard';

export default function PostListingReviewScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const { draft, resetDraft } = useListingPostWizard();
  const [publishing, setPublishing] = useState(false);

  const cover = draft.photos.find((photo) => photo.isCover) || draft.photos[0];

  const handlePublish = async () => {
    const landlordId = session?.user?.id;
    if (!landlordId) {
      Alert.alert('Sign in required', 'Please sign in again before publishing.');
      return;
    }

    setPublishing(true);
    try {
      await createListingFromDraft(landlordId, draft);
      resetDraft();
      router.replace('/(landlord)/post/success');
    } catch (error) {
      Alert.alert('Publish failed', (error as Error).message || 'Could not publish this listing.');
    } finally {
      setPublishing(false);
    }
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
            {cover ? (
              <Image source={{ uri: cover.publicUrl || cover.uri }} className="w-full h-48" resizeMode="cover" />
            ) : (
              <View className="w-full h-48 bg-gray-100 items-center justify-center">
                <Text className="text-gray-400 text-sm">No cover photo</Text>
              </View>
            )}
            <View className="p-4">
              <Text className="text-xl font-bold text-gray-900 mb-1">{draft.title || 'Untitled listing'}</Text>
              <Text className="text-sm text-gray-500 mb-2">{draft.locationText || draft.subcity}</Text>
              <Text className="text-2xl font-extrabold text-emerald-700">
                {(Number(draft.price) || 0).toLocaleString()} ETB / month
              </Text>
              <Text className="text-xs text-gray-600 mt-2">
                {draft.type} · {draft.rooms || 0} rooms · {draft.bathroomType || 'Bathroom not specified'}
              </Text>
              <Text className="text-sm text-gray-600 mt-3 leading-5">{draft.description}</Text>
            </View>
          </View>

          <Text className="text-sm font-bold text-gray-700 mb-2">Agreement Summary</Text>
          <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
            <Text className="text-xs text-gray-600 mb-1">Status: Ready to publish</Text>
            <Text className="text-xs text-gray-600 mb-1">Connector Rate: 10% on deal close</Text>
            <Text className="text-xs text-gray-600">Visibility: Public on Hawassa Rental Connect</Text>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={handlePublish}
          disabled={publishing}
          activeOpacity={0.9}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-lg"
        >
          {publishing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-bold text-white">Publish Listing Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
