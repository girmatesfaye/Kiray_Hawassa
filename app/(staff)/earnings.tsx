import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffEarningsScreen() {
  const payouts = [
    {
      id: '1',
      title: 'Modern 2BR Lakeside Villa',
      date: 'Aug 10, 2026',
      amount: '2,500 ETB',
      status: 'Paid',
    },
    {
      id: '2',
      title: 'Commercial Storefront Piassa',
      date: 'Aug 05, 2026',
      amount: '4,000 ETB',
      status: 'Paid',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Commission Payouts" subtitle="Total earned: 18,500 ETB" />

      <ScrollView className="flex-1 p-4">
        {/* Balance Card */}
        <View className="bg-blue-900 p-6 rounded-2xl mb-6 shadow-sm">
          <Text className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Available Payout Balance</Text>
          <Text className="text-white text-3xl font-extrabold my-1">6,500 ETB</Text>
          <Text className="text-blue-200 text-xs">Direct Telebirr / CBE Transfer ready</Text>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-3">Payout History</Text>
        {payouts.map((item) => (
          <View key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 flex-row justify-between items-center">
            <View>
              <Text className="text-base font-bold text-gray-900">{item.title}</Text>
              <Text className="text-xs text-gray-500">{item.date}</Text>
            </View>
            <View className="items-end">
              <Text className="text-base font-extrabold text-emerald-700">+{item.amount}</Text>
              <Text className="text-xs font-semibold text-emerald-600">{item.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
