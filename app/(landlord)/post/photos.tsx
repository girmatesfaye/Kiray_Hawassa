import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { useAuth } from '@/app/_layout';
import { uploadListingPhoto } from '@/features/listings/api';
import { useListingPostWizard, WizardPhoto } from '@/features/listings/postWizard';

export default function PostListingStep1Photos() {
  const router = useRouter();
  const { session } = useAuth();
  const { draft, updateDraft } = useListingPostWizard();
  const [uploading, setUploading] = useState(false);

  const pickPhotos = async () => {
    const landlordId = session?.user?.id;
    if (!landlordId) {
      Alert.alert('Sign in required', 'Please sign in as a landlord before uploading listing photos.');
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photos permission needed', 'Allow photo access to upload listing images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.85,
      selectionLimit: 8,
    });

    if (result.canceled) return;

    setUploading(true);
    const currentPhotos = draft.photos.map((photo) => ({ ...photo, isCover: false }));
    const nextPhotos: WizardPhoto[] = [...currentPhotos];

    try {
      for (const [index, asset] of result.assets.entries()) {
        const photo: WizardPhoto = {
          id: `${Date.now()}-${index}`,
          uri: asset.uri,
          name: asset.fileName || `listing-photo-${index}.jpg`,
          type: asset.mimeType || 'image/jpeg',
          progress: 15,
          isCover: nextPhotos.length === 0,
        };

        nextPhotos.push(photo);
        updateDraft({ photos: [...nextPhotos] });

        const uploaded = await uploadListingPhoto(landlordId, draft.id, photo, nextPhotos.length - 1);
        nextPhotos[nextPhotos.length - 1] = {
          ...photo,
          uploadedPath: uploaded.storagePath,
          publicUrl: uploaded.publicUrl,
          progress: 100,
        };
        updateDraft({ photos: [...nextPhotos] });
      }
    } catch (error) {
      Alert.alert('Upload failed', (error as Error).message || 'Could not upload that photo.');
    } finally {
      setUploading(false);
    }
  };

  const setCover = (photoId: string) => {
    updateDraft({
      photos: draft.photos.map((photo) => ({ ...photo, isCover: photo.id === photoId })),
    });
  };

  const removePhoto = (photoId: string) => {
    const remaining = draft.photos.filter((p) => p.id !== photoId);
    const wascover = draft.photos.find((p) => p.id === photoId)?.isCover;
    const updated =
      wascover && remaining.length > 0
        ? remaining.map((p, i) => ({ ...p, isCover: i === 0 }))
        : remaining;
    updateDraft({ photos: updated });
  };

  const photoCount = draft.photos.length;
  const canProceed = photoCount >= 3 && !uploading;

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Post Property - Step 1/4" subtitle="Upload high quality photos" showBack />

        <ScrollView className="p-4 flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1">Upload Photos & Media</Text>
          <Text className="text-sm text-gray-500 mb-6">
            Listings with clear photos get more tenant inquiries in Hawassa.
          </Text>

          <TouchableOpacity
            onPress={pickPhotos}
            disabled={uploading}
            activeOpacity={0.8}
            className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-2xl p-8 items-center justify-center mb-6"
          >
            {uploading ? <ActivityIndicator color="#047857" /> : <Text className="text-3xl mb-2">+</Text>}
            <Text className="text-base font-bold text-emerald-800">
              {uploading ? 'Uploading photos...' : 'Tap to Select Photos'}
            </Text>
            <Text className="text-xs text-emerald-600 mt-1">Exterior, rooms, bathroom, and utilities</Text>
          </TouchableOpacity>

          <Text className="text-sm font-bold text-gray-700 mb-1">Selected Photos</Text>
          {photoCount < 3 && (
            <Text className="text-xs text-amber-700 mb-2">
              Minimum 3 photos required ({photoCount}/3)
            </Text>
          )}
          {photoCount === 0 ? (
            <View className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <Text className="text-sm text-gray-500">No photos selected yet.</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap -mx-1">
              {draft.photos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  onPress={() => setCover(photo.id)}
                  activeOpacity={0.85}
                  className="w-1/2 px-1 mb-2"
                >
                  <View className="relative rounded-xl overflow-hidden bg-gray-100">
                    <Image source={{ uri: photo.publicUrl || photo.uri }} className="w-full h-36" resizeMode="cover" />
                    <View className="absolute left-2 top-2 bg-black/60 px-2 py-1 rounded-md">
                      <Text className="text-[10px] font-bold text-white">
                        {photo.progress === 100 ? 'Uploaded' : `${photo.progress}%`}
                      </Text>
                    </View>
                    {photo.isCover && (
                      <View className="absolute right-2 top-2 bg-emerald-700 px-2 py-1 rounded-md">
                        <Text className="text-[10px] font-bold text-white">Cover</Text>
                      </View>
                    )}
                    {/* Delete button — bottom-right to avoid overlap with top badges */}
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removePhoto(photo.id);
                      }}
                      activeOpacity={0.8}
                      className="absolute right-2 bottom-2 bg-black/70 w-7 h-7 rounded-full items-center justify-center"
                    >
                      <Text className="text-white text-xs font-bold">×</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/details')}
          disabled={!canProceed}
          activeOpacity={0.8}
          className={`py-4 rounded-xl items-center justify-center shadow-sm ${
            !canProceed ? 'bg-gray-200' : 'bg-emerald-700'
          }`}
        >
          <Text className={`text-base font-bold ${!canProceed ? 'text-gray-400' : 'text-white'}`}>
            {photoCount < 3
              ? `Add at least 3 photos (${photoCount}/3)`
              : 'Next: Property Details'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
