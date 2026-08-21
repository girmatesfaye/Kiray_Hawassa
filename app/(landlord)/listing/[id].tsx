import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { MOCK_LISTINGS, MOCK_INTERESTS, MOCK_CONNECTOR, MOCK_PAYOUTS } from '@/lib/mock/data';

export default function LandlordListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const listingId = (id as string) || '';
  const listing = MOCK_LISTINGS.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <View className="flex-1 bg-gray-50 pt-8">
        <HeaderBar title="Property Overview" showBack />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-bold text-gray-900 mb-2">Listing not found</Text>
          <Text className="text-sm text-gray-500 text-center mb-6">
            This listing may have been removed or the link is stale.
          </Text>
          <TouchableOpacity
            onPress={() => router.replace('/(landlord)/home')}
            className="bg-blue-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-sm font-bold text-white">Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isRentedOut = listing.status === 'rented_out';

  const interestCount = MOCK_INTERESTS.filter((i) => i.listing_id === listingId).length;

  const paidPayout = MOCK_PAYOUTS.find(
    (p) => p.status === 'paid' && p.link?.listing_id === listingId
  );

  const connectorPhone = MOCK_CONNECTOR.phone ?? '';

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
            source={{ uri: listing.image_url ?? undefined }}
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {listing.title}
            </Text>
            <Text className="text-sm font-extrabold text-primary mb-2" style={{ color: '#a93200' }}>
              {listing.price.toLocaleString()} ETB / month
            </Text>
            <View className="flex-row items-center gap-2 mb-1">
              <Text
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isRentedOut ? 'bg-gray-100 text-gray-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isRentedOut ? 'Rented Out' : 'Available'}
              </Text>
            </View>
            <Text className="text-xs text-gray-500">
              {listing.location_text ?? listing.location}
            </Text>
          </View>
        </View>

        {/* Task 4: Connector Contact Point */}
        <Text className="text-sm font-bold text-gray-700 mb-2">Assigned Agent & Connector</Text>
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base font-bold text-gray-900">{MOCK_CONNECTOR.full_name}</Text>
              <Text className="text-xs text-gray-500">Dedicated staff handling inquiries for this listing</Text>
            </View>
            <TouchableOpacity
              onPress={handleCallConnector}
              className="bg-blue-600 px-3.5 py-2 rounded-xl flex-row items-center"
            >
              <Text className="text-xs font-bold text-white mr-1">📞</Text>
              <Text className="text-xs font-bold text-white">Call Connector</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task 4 & Task 7: Commission Receipt Line */}
        {paidPayout ? (
          <View className="bg-blue-50 border border-blue-300 p-4 rounded-2xl mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-lg mr-2">🧾</Text>
              <Text className="text-sm font-extrabold text-blue-950">
                Commission Receipt Confirmed
              </Text>
            </View>
            <Text className="text-sm font-bold text-blue-800">
              Commission paid: {paidPayout.amount.toLocaleString()} ETB · {new Date(paidPayout.paid_at || paidPayout.created_at).toLocaleDateString()}
            </Text>
            <Text className="text-xs text-blue-700 mt-1">
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
            <Text className="text-sm font-bold text-gray-900">
              {interestCount} {interestCount === 1 ? 'lead' : 'leads'}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 leading-5">
            Your assigned connector contacts all interested tenants, verifies their credentials, and arranges property viewings.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
