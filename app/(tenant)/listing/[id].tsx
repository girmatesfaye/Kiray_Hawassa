import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createInterest } from '@/lib/supabase/api';
import { useAuth } from '@/app/_layout';
import ConnectorContactSheet from '@/components/ui/ConnectorContactSheet';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [connectorInfo, setConnectorInfo] = useState<{ name: string; phone: string }>({
    name: 'Abebe (Hawassa Connector)',
    phone: '+251 930 112 233',
  });

  const handleExpressInterest = async () => {
    setLoading(true);
    try {
      const tenantId = session?.user?.id || 'tenant-101';
      const listingId = (id as string) || '1';
      const result = await createInterest(tenantId, listingId);
      
      if (result?.connector) {
        setConnectorInfo({
          name: result.connector.full_name || 'Hawassa Connector',
          phone: result.connector.phone || '+251 930 112 233',
        });
      }
      setShowContactSheet(true);
    } catch (e) {
      console.error('Error expressing interest:', e);
      setShowContactSheet(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSheet = () => {
    setShowContactSheet(false);
    router.push('/(tenant)/interests');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvOfzfiNjLI7GT--JYyarK5yY46fthA16YkA4nM6w8yD4bB5JoqQYkh4tNzZFDGIyUuA7gfIuXG7aGAC5GG1d5e-4TNTOPDWZ2SKNiGfYR3Ni49x1cRQE7DYzBngUlzLONAirUc6mhSIVooJ-fIhEiXzNeJaE9cIpK238TaEVlleePB4zNIsp52z8_lm0XX7NhYo4qr56JS1Vz04ZkgZfWQAMH4r32TPcIDHd-gociBwMAig_JkICv9Nje2' }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">←</Text>
          </TouchableOpacity>
        </View>

        <View className="p-6">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 mr-2">
              <Text className="text-2xl font-bold text-gray-900">Modern 2BR Lakeside Villa</Text>
              <Text className="text-sm text-gray-500 mt-1">Haile Resort Area, Hawassa</Text>
            </View>
            <Text className="text-2xl font-extrabold text-amber-700">25,000 ETB</Text>
          </View>

          {/* Quick Specs */}
          <View className="flex-row justify-between bg-gray-50 p-4 rounded-xl my-4">
            <View className="items-center">
              <Text className="text-xs text-gray-500">Bedrooms</Text>
              <Text className="text-base font-bold text-gray-900">2</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Bathrooms</Text>
              <Text className="text-base font-bold text-gray-900">2</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-gray-500">Area</Text>
              <Text className="text-base font-bold text-gray-900">120 sqm</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-base font-bold text-gray-900 mb-2">Description</Text>
          <Text className="text-sm text-gray-600 leading-6 mb-6">
            Beautifully furnished 2-bedroom villa located within walking distance of Lake Hawassa and Haile Resort. Features a spacious living room, modern kitchen, private compound, and 24/7 security.
          </Text>

          {/* Features */}
          <Text className="text-base font-bold text-gray-900 mb-2">Amenities</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {['Water Tank', 'Parking Space', 'Furnished', 'Balcony View', 'Security Guard'].map((feat) => (
              <View key={feat} className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                <Text className="text-xs font-semibold text-amber-800">✓ {feat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="p-4 border-t border-gray-100 bg-white flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={handleExpressInterest}
          disabled={loading}
          activeOpacity={0.8}
          className="flex-1 py-4 bg-amber-700 rounded-xl items-center justify-center shadow-sm"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-bold text-white">I&apos;m Interested</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Task 3 Connector Contact Reveal Sheet */}
      <ConnectorContactSheet
        visible={showContactSheet}
        onClose={handleCloseSheet}
        connectorName={connectorInfo.name}
        connectorPhone={connectorInfo.phone}
      />
    </View>
  );
}
