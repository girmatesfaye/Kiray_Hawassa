import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { closeDeal, getStaffLeads } from '@/lib/supabase/api';
import { useAuth } from '@/app/_layout';
import type { Lead } from '@/lib/supabase/types';

export default function CloseDealScreen() {
  const { leadId } = useLocalSearchParams();
  const router = useRouter();
  const { session } = useAuth();
  const selectedLeadId = String(leadId || '');

  const [agreedRent, setAgreedRent] = useState('25000');
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);

  const rentNum = parseFloat(agreedRent.replace(/,/g, '')) || 0;
  const calculatedCommission = Math.round(rentNum * 0.1);

  useEffect(() => {
    getStaffLeads('All').then((items) => {
      const match = items.find((item) => item.id === selectedLeadId);
      if (match) {
        setLead(match);
        setAgreedRent(String(match.listing?.price || 25000));
      }
    });
  }, [selectedLeadId]);

  const handleConfirmCloseDeal = async () => {
    if (rentNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid agreed rent amount.');
      return;
    }

    if (!lead?.tenant_id || !lead?.listing_id || !lead?.landlord_id) {
      Alert.alert('Missing Details', 'Could not load the selected lead details.');
      return;
    }

    setLoading(true);
    try {
      await closeDeal({
        lead_id: selectedLeadId,
        tenant_id: lead.tenant_id,
        landlord_id: lead.landlord_id,
        listing_id: lead.listing_id,
        staff_id: session?.user?.id || lead.staff_id || lead.connector_id || '',
        commission_amount: calculatedCommission,
      });

      Alert.alert(
        'Deal Closed Successfully',
        `Commission of ${calculatedCommission.toLocaleString()} ETB created as pending payout.`,
        [{ text: 'View Earnings', onPress: () => router.replace('/(staff)/earnings') }]
      );
    } catch (e) {
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
              Confirming deal closure flips the listing to rented out, creates a pending payout, unlocks contacts, and updates the tenant interest.
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
            <Text className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Transaction Details Summary
            </Text>
            <Text className="text-xs text-gray-700 mb-1">Tenant: {lead?.tenant?.full_name || 'Tenant'}</Text>
            <Text className="text-xs text-gray-700 mb-1">Landlord: {lead?.landlord?.full_name || 'Landlord'}</Text>
            <Text className="text-xs text-gray-700">Property: {lead?.listing?.title || 'Selected listing'}</Text>
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={handleConfirmCloseDeal}
          disabled={loading || !lead}
          activeOpacity={0.9}
          className={`py-4 rounded-xl items-center justify-center shadow-lg ${lead ? 'bg-emerald-700' : 'bg-gray-200'}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className={`text-base font-bold ${lead ? 'text-white' : 'text-gray-400'}`}>
              Confirm Deal Closure
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
