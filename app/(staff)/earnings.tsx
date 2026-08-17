import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';
import { getStaffPayouts, markPayoutAsPaid } from '@/lib/supabase/api';
import { useAuth } from '@/app/_layout';
import { Payout } from '@/lib/supabase/types';

export default function StaffEarningsScreen() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'paid'>('pending');
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const staffId = session?.user?.id || 'staff-001';

  const loadPayouts = async () => {
    const data = await getStaffPayouts(staffId);
    setPayouts(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadPayouts();
  }, []);

  const handleMarkAsPaid = (payout: Payout) => {
    Alert.alert(
      'Confirm Payout Collection',
      `Mark payout of ${payout.amount.toLocaleString()} ETB for "${
        payout.link?.listing?.title || 'Closed Deal'
      }" as PAID? This will update the landlord's receipt dashboard.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark as Paid',
          onPress: async () => {
            await markPayoutAsPaid(payout.id);
            await loadPayouts();
            Alert.alert('Payout Updated', 'Commission payout has been marked as PAID.');
          },
        },
      ]
    );
  };

  const pendingPayouts = payouts.filter((p) => p.status === 'pending');
  const paidPayouts = payouts.filter((p) => p.status === 'paid');

  const totalPaidSum = paidPayouts.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPendingSum = pendingPayouts.reduce((acc, curr) => acc + curr.amount, 0);

  const currentList = activeTab === 'pending' ? pendingPayouts : paidPayouts;

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar
        title="Commission Payouts"
        subtitle={`Total Earned: ${totalPaidSum.toLocaleString()} ETB`}
      />

      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadPayouts(); }} />}
      >
        {/* Balance Stats Banner */}
        <View className="bg-blue-900 p-5 rounded-2xl mb-5 shadow-sm">
          <View className="flex-row justify-between items-start mb-2">
            <View>
              <Text className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                Pending Collection
              </Text>
              <Text className="text-white text-3xl font-extrabold mt-0.5">
                {totalPendingSum.toLocaleString()} ETB
              </Text>
            </View>
            <View className="bg-blue-800/80 px-3 py-1.5 rounded-xl border border-blue-700">
              <Text className="text-blue-200 text-xs font-medium">
                Paid: {totalPaidSum.toLocaleString()} ETB
              </Text>
            </View>
          </View>
          <Text className="text-blue-200 text-xs mt-1">
            Manual payout verification. Staff marks payout as collected upon receiving Telebirr / CBE transfer.
          </Text>
        </View>

        {/* Task 7: Filter Toggle (Pending vs Paid) */}
        <View className="flex-row bg-gray-200 p-1 rounded-xl mb-4">
          <TouchableOpacity
            onPress={() => setActiveTab('pending')}
            className={`flex-1 py-2.5 rounded-lg items-center ${
              activeTab === 'pending' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === 'pending' ? 'text-blue-900' : 'text-gray-600'
              }`}
            >
              Pending Payouts ({pendingPayouts.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('paid')}
            className={`flex-1 py-2.5 rounded-lg items-center ${
              activeTab === 'paid' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === 'paid' ? 'text-emerald-900' : 'text-gray-600'
              }`}
            >
              Paid / Collected ({paidPayouts.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payout List */}
        {currentList.map((item) => (
          <View
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 flex-col"
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 mr-2">
                <Text className="text-base font-bold text-gray-900">
                  {item.link?.listing?.title || 'Rental Commission Payout'}
                </Text>
                <Text className="text-xs text-gray-500">
                  Closed on {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-lg font-extrabold text-emerald-700">
                  +{item.amount.toLocaleString()} ETB
                </Text>
                <View
                  className={`px-2.5 py-0.5 rounded-full mt-0.5 ${
                    item.status === 'paid' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      item.status === 'paid' ? 'text-emerald-800' : 'text-amber-800'
                    }`}
                  >
                    {item.status === 'paid' ? 'Paid' : 'Pending Payment'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Task 7: Manual "Mark as Paid" action button for pending payouts */}
            {item.status === 'pending' && (
              <View className="pt-3 mt-2 border-t border-gray-100 flex-row justify-between items-center">
                <Text className="text-xs text-gray-500">Action: Collect commission from landlord</Text>
                <TouchableOpacity
                  onPress={() => handleCallOrMark(item)}
                  className="bg-emerald-700 px-4 py-2 rounded-lg shadow-sm"
                >
                  <Text className="text-xs font-bold text-white">Mark as Paid ✓</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === 'paid' && item.paid_at && (
              <Text className="text-xs text-emerald-700 italic mt-1 border-t border-gray-100 pt-2">
                Collected on {new Date(item.paid_at).toLocaleDateString()} • Landlord receipt updated
              </Text>
            )}
          </View>
        ))}

        {currentList.length === 0 && (
          <View className="py-12 items-center justify-center">
            <Text className="text-gray-400 text-sm font-medium">
              No {activeTab} payouts found.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  function handleCallOrMark(item: Payout) {
    handleMarkAsPaid(item);
  }
}
