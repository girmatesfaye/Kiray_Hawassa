import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/_layout';
import { supabase } from '@/lib/supabase/client';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { role, session } = useAuth();
  
  // Common fields
  const [name, setName] = useState('');
  const [subcity, setSubcity] = useState('');
  const [idPhotoUrl, setIdPhotoUrl] = useState<string | null>(null);
  
  // Tenant-only fields
  const [occupation, setOccupation] = useState('');
  const [fayidaIdRaw, setFayidaIdRaw] = useState('');

  const [saving, setSaving] = useState(false);

  // Masking logic for FAYIDA ID: ET-XXXX-XXXX-XXXX (12 digits)
  const formatFayidaId = (input: string) => {
    const cleaned = input.replace(/[^0-9]/g, '').slice(0, 12);
    setFayidaIdRaw(cleaned);
  };

  const getMaskedFayidaDisplay = () => {
    if (!fayidaIdRaw) return '';
    const digits = fayidaIdRaw.padEnd(12, '•');
    const p1 = digits.slice(0, 4);
    const p2 = digits.slice(4, 8);
    const p3 = digits.slice(8, 12);
    return `ET-${p1}-${p2}-${p3}`;
  };

  const handleMockUploadId = () => {
    // Mock image upload
    setIdPhotoUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?w=400');
    Alert.alert('ID Photo Attached', 'ID card image selected successfully.');
  };

  const handleFinish = async () => {
    if (!name.trim()) {
      Alert.alert('Required Field', 'Please enter your full name.');
      return;
    }

    if (role === 'tenant' && !fayidaIdRaw) {
      Alert.alert('Required Field', 'Please enter your FAYIDA ID number.');
      return;
    }

    setSaving(true);
    try {
      if (session?.user?.id) {
        const updateData: Record<string, any> = {
          full_name: name,
          subcity: subcity || 'Hawassa Central',
          is_complete: true,
          updated_at: new Date().toISOString(),
        };

        if (role === 'tenant') {
          updateData.occupation = occupation;
          updateData.fayida_id = `ET-${fayidaIdRaw}`;
          updateData.id_photo_url = idPhotoUrl;
        } else if (role === 'landlord') {
          updateData.id_photo_url = idPhotoUrl;
        }

        await supabase.from('profiles').update(updateData).eq('id', session.user.id);
      }

      if (role === 'landlord') {
        router.replace('/(landlord)/home');
      } else if (role === 'staff') {
        router.replace('/(staff)/leads');
      } else {
        router.replace('/(tenant)/browse');
      }
    } catch (e) {
      console.error('Error saving profile:', e);
      // Fallback redirect for mock flow
      if (role === 'landlord') {
        router.replace('/(landlord)/home');
      } else {
        router.replace('/(tenant)/browse');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-12">
      <Text className="text-3xl font-extrabold text-gray-900 mb-2">
        {role === 'landlord' ? 'Landlord Onboarding' : 'Tenant Verification'}
      </Text>
      <Text className="text-base text-gray-600 mb-6">
        {role === 'landlord'
          ? 'Set up your owner profile to list properties in Hawassa.'
          : 'Complete your profile to unlock instant house viewings.'}
      </Text>

      {/* Common Full Name */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name *</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
          placeholder="e.g. Dawit Girma"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Role-Specific Form Body */}
      {role === 'tenant' ? (
        <>
          {/* Occupation */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Occupation</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Software Engineer, NGO Staff, Business Owner"
              placeholderTextColor="#9CA3AF"
              value={occupation}
              onChangeText={setOccupation}
            />
          </View>

          {/* FAYIDA ID Number */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">FAYIDA National ID Number *</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base font-mono text-gray-900"
              placeholder="Enter 12-digit FAYIDA number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={fayidaIdRaw}
              onChangeText={formatFayidaId}
              maxLength={12}
            />
            {fayidaIdRaw ? (
              <Text className="text-xs font-mono text-amber-800 mt-1 font-semibold">
                Formatted: {getMaskedFayidaDisplay()}
              </Text>
            ) : null}
          </View>

          {/* Sub-city / Neighborhood */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Current Sub-city / Neighborhood</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Tabor, Piassa, Chefe"
              placeholderTextColor="#9CA3AF"
              value={subcity}
              onChangeText={setSubcity}
            />
          </View>

          {/* ID Photo Upload */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">ID Photo Upload</Text>
            <TouchableOpacity
              onPress={handleMockUploadId}
              className="border border-dashed border-amber-600 rounded-xl p-4 bg-amber-50 items-center justify-center"
            >
              <Text className="text-amber-900 font-semibold text-sm">
                {idPhotoUrl ? '✓ Photo Attached (Tap to change)' : '📷 Upload FAYIDA / Kebele ID Card'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trust Callout */}
          <View className="bg-amber-100/60 p-4 rounded-xl mb-6 border border-amber-200">
            <Text className="text-xs text-amber-950 font-medium leading-5">
              🛡️ <Text className="font-bold">Trust Guarantee:</Text> Only shared with our team once you confirm interest in a house — never shown to landlords directly.
            </Text>
          </View>
        </>
      ) : (
        <>
          {/* Landlord Sub-city / Kebele */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Sub-city / Kebele</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900"
              placeholder="e.g. Tabor Sub-City, Kebele 04"
              placeholderTextColor="#9CA3AF"
              value={subcity}
              onChangeText={setSubcity}
            />
          </View>

          {/* Optional ID Photo Upload for Landlord */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">ID Photo Upload (Optional)</Text>
            <TouchableOpacity
              onPress={handleMockUploadId}
              className="border border-dashed border-emerald-600 rounded-xl p-4 bg-emerald-50 items-center justify-center"
            >
              <Text className="text-emerald-900 font-semibold text-sm">
                {idPhotoUrl ? '✓ Photo Attached (Tap to change)' : '📷 Upload Kebele ID / Passport'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Helper line for Landlord */}
          <View className="bg-emerald-50 p-4 rounded-xl mb-6 border border-emerald-200">
            <Text className="text-xs text-emerald-900 leading-5">
              ℹ️ <Text className="font-semibold">Note:</Text> You can list a house without this, but it must be added before your first listing is shown to tenants.
            </Text>
          </View>
        </>
      )}

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleFinish}
        disabled={saving}
        activeOpacity={0.8}
        className={`py-4 rounded-xl items-center justify-center mb-10 shadow-sm ${
          role === 'landlord' ? 'bg-emerald-700' : 'bg-amber-700'
        }`}
      >
        <Text className="text-base font-bold text-white">
          {saving ? 'Saving Profile...' : 'Save & Continue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
