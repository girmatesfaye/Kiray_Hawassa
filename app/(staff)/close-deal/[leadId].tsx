import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { closeDeal } from '@/lib/supabase/api';
import { useAuth } from '@/app/_layout';

export default function CloseDealScreen() {
  const { leadId } = useLocalSearchParams();
  const router = useRouter();
  const { session } = useAuth();

  const [agreedRent, setAgreedRent] = useState('25000');
  const [loading, setLoading] = useState(false);

  const rentNum = parseFloat(agreedRent.replace(/,/g, '')) || 0;
  const calculatedCommission = Math.round(rentNum * 0.1);

  const handleConfirmCloseDeal = async () => {
    if (rentNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid agreed rent amount.');
      return;
    }

    setLoading(true);
    try {
      const staffId = session?.user?.id || 'staff-01';
      
      // Task 6: Trigger atomic close_deal transaction
      await closeDeal({
        lead_id: (leadId as string) || '1',
        tenant_id: 'tenant-101',
        landlord_id: 'landlord-201',
        listing_id: '1',
        staff_id: staffId,
        commission_amount: calculatedCommission,
      });

      Alert.alert(
        'Deal Closed Successfully! 🎉',
        `Commission of ${calculatedCommission.toLocaleString()} ETB created as PENDING payout.`,
        [
          {
            text: 'View Earnings',
            onPress: () => router.replace('/(staff)/earnings'),
          },
        ]
      );
    } catch (e) {
      console.error('Error closing deal:', e);
      Alert.alert('Transaction Failed', (e as Error).message || 'Could not close deal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Close Deal & Claim Payout" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-6">
            <Text className="text-sm font-bold text-amber-900 mb-1">High Stakes Transaction</Text>
            <Text className="text-xs text-amber-800 leading-5">
              Confirming deal closure will atomically flip listing status to "Rented Out", generate a pending payout record (Task 7), unlock tenant/landlord contacts, and send notifications.
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 mb-2">Agreed Monthly Rent (ETB)</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 font-bold"
              value={agreedRent}
              onChangeText={setAgreedRent}
              keyboardType="numeric"
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-700 mb-2">Calculated Connector Commission (10%)</Text>
            <View className="border border-emerald-300 rounded-xl px-4 py-3 bg-emerald-50">
              <Text className="text-base text-emerald-950 font-extrabold">
                {calculatedCommission.toLocaleString()} ETB
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Transaction Details Summary
            </Text>
            <Text className="text-xs text-gray-700 mb-1">• Tenant: Abebe Bikila</Text>
            <Text className="text-xs text-gray-700 mb-1">• Landlord: Kebede Tassew</Text>
            <Text className="text-xs text-gray-700">• Property: Modern 2BR Lakeside Villa</Text>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={handleConfirmCloseDeal}
          disabled={loading}
          activeOpacity={0.9}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-lg"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-bold text-white">Confirm Deal Closure 🤝</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
