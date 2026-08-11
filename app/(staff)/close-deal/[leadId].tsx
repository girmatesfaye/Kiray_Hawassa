import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function CloseDealScreen() {
  const { leadId } = useLocalSearchParams();
  const router = useRouter();
  const [agreedRent, setAgreedRent] = useState('25,000');
  const [commissionAmount, setCommissionAmount] = useState('2,500');

  const handleConfirmCloseDeal = () => {
    router.replace('/(staff)/earnings');
  };

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Close Deal & Claim Payout" showBack />

        <ScrollView className="p-4 flex-1">
          <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-6">
            <Text className="text-sm font-bold text-amber-900 mb-1">High Stakes Transaction</Text>
            <Text className="text-xs text-amber-800 leading-5">
              Confirming deal closure will flip listing status to "Rented Out", generate payout records, and notify the landlord.
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
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 bg-emerald-50 text-base text-emerald-900 font-extrabold"
              value={commissionAmount}
              onChangeText={setCommissionAmount}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={handleConfirmCloseDeal}
          activeOpacity={0.9}
          className="py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-lg"
        >
          <Text className="text-base font-bold text-white">Confirm Deal Closure 🤝</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
