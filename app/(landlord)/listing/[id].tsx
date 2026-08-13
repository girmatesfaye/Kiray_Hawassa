import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { getStaffPayouts } from '@/lib/supabase/api';
import { Payout } from '@/lib/supabase/types';

export default function LandlordListingDetailScreen() {
  const { id } = useLocalSearchParams();

  const listingId = (id as string) || '1';
  const isRentedOut = listingId === '2'; // Listing 2 simulated as Rented Out / Deal Closed

  const [payouts, setPayouts] = useState<Payout[]>([]);

  useEffect(() => {
    getStaffPayouts('staff-01').then((res) => setPayouts(res));
  }, []);

  // Find paid payout associated with this listing deal
  const paidPayout = payouts.find(
    (p) => p.status === 'paid' && (p.link?.listing_id === listingId || listingId === '2')
  );

  const connectorPhone = '+251 930 112 233';

  const handleCallConnector = () => {
    Linking.openURL(`tel:${connectorPhone.replace(/\s+/g, '')}`);
  };

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Property Overview" showBack subtitle={`Listing ID: #${listingId}`} />

      <ScrollView className="flex-1 p-4">
        {/* Listing Banner Card */}
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4">
          <Image
            source={{
              uri: isRentedOut
                ? 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600'
                : 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw',
            }}
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="p-4">
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-xl font-bold text-gray-900 flex-1 mr-2">
                {isRentedOut ? 'Commercial Storefront Piassa' : 'Modern 2BR Lakeside Villa'}
              </Text>
              <View
                className={`px-3 py-1 rounded-full ${
                  isRentedOut ? 'bg-gray-200' : 'bg-emerald-100'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isRentedOut ? 'text-gray-700' : 'text-emerald-800'
                  }`}
                >
                  {isRentedOut ? '🔒 Rented Out' : '🟢 Available'}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-extrabold text-emerald-700 mb-2">
              {isRentedOut ? '40,000 ETB / month' : '25,000 ETB / month'}
            </Text>
            <Text className="text-xs text-gray-500">
              {isRentedOut ? 'Piassa Main Street, Hawassa' : 'Haile Resort Area, Hawassa'}
            </Text>
          </View>
        </View>

        {/* Task 4: Connector Contact Point */}
        <Text className="text-sm font-bold text-gray-700 mb-2">Assigned Agent & Connector</Text>
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base font-bold text-gray-900">Abebe (Hawassa Connector)</Text>
              <Text className="text-xs text-gray-500">Dedicated staff handling inquiries for this listing</Text>
            </View>
            <TouchableOpacity
              onPress={handleCallConnector}
              className="bg-emerald-700 px-3.5 py-2 rounded-xl flex-row items-center"
            >
              <Text className="text-xs font-bold text-white mr-1">📞</Text>
              <Text className="text-xs font-bold text-white">Call Connector</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task 4 & Task 7: Commission Receipt Line */}
        {paidPayout ? (
          <View className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-lg mr-2">🧾</Text>
              <Text className="text-sm font-extrabold text-emerald-950">
                Commission Receipt Confirmed
              </Text>
            </View>
            <Text className="text-sm font-bold text-emerald-800">
              Commission paid: {paidPayout.amount.toLocaleString()} ETB · {new Date(paidPayout.paid_at || paidPayout.created_at).toLocaleDateString()}
            </Text>
            <Text className="text-xs text-emerald-700 mt-1">
              Thank you for trusting Kiray Hawassa. Your deal has been officially settled.
            </Text>
          </View>
        ) : isRentedOut ? (
          <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-4">
            <Text className="text-xs font-bold text-amber-900">Deal Closed (Commission Pending)</Text>
            <Text className="text-xs text-amber-800 mt-0.5">
              Staff is processing the payout for this closed deal.
            </Text>
          </View>
        ) : null}

        {/* Activity Leads Overview */}
        <Text className="text-sm font-bold text-gray-700 mb-2">Tenant Interest Activity</Text>
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-semibold text-gray-500">Active Tenant Inquiries</Text>
            <Text className="text-sm font-bold text-gray-900">{isRentedOut ? '2 leads' : '4 leads'}</Text>
          </View>
          <Text className="text-xs text-gray-500 leading-5">
            Your assigned connector contacts all interested tenants, verifies their credentials, and arranges property viewings.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
