import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';
import { getTenantInterests } from '@/lib/supabase/api';
import { useAuth } from '@/app/_layout';
import { Lead } from '@/lib/supabase/types';


export default function InterestsScreen() {
  const { session } = useAuth();
  const [interests, setInterests] = useState<Lead[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const tenantId = session?.user?.id || 'tenant-001';
    const data = await getTenantInterests(tenantId);
    setInterests(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [session?.user?.id]);



  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'linked':
        return { label: 'Deal Closed 🎉', color: 'bg-emerald-100 text-emerald-800' };
      case 'visit_scheduled':
        return { label: 'Visit Scheduled 📅', color: 'bg-blue-100 text-blue-800' };
      case 'not_selected':
        return { label: 'Not Selected', color: 'bg-gray-200 text-gray-700' };
      case 'waiting_for_call':
      default:
        return { label: 'Waiting for Call ⏳', color: 'bg-amber-100 text-amber-800' };
    }
  };

  const handleCall = (phoneNumber?: string) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber.replace(/\s+/g, '')}`);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="My Expressed Interests" subtitle="Track your active rental inquiries" />

      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} />}
      >
        {interests.map((item) => {
          const badge = getStatusBadge(item.status);
          const isLinked = item.status === 'linked';
          const isDropped = item.status === 'not_selected';

          return (
            <View
              key={item.id}
              className={`bg-white rounded-2xl p-4 mb-4 shadow-sm border ${
                isDropped ? 'border-gray-200 opacity-80' : 'border-gray-100'
              }`}
            >
              {/* Title & Status Badge */}
              <View className="flex-row justify-between items-start mb-2">
                <Text className={`text-base font-bold flex-1 mr-2 ${isDropped ? 'text-gray-500' : 'text-gray-900'}`}>
                  {item.listing?.title || 'Property Rental Inquiry'}
                </Text>
                <View className={`px-2.5 py-1 rounded-full ${badge.color}`}>
                  <Text className="text-xs font-bold">{badge.label}</Text>
                </View>
              </View>

              <Text className="text-xs text-gray-500 mb-3">
                Submitted on {new Date(item.created_at).toLocaleDateString()}
              </Text>

              {/* Task 2: Linked State - Unlocks & reveals Landlord Direct Contact inline */}
              {isLinked ? (
                <View className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-2">
                  <View className="flex-row items-center mb-2">
                    <Text className="text-base mr-1.5">🔑</Text>
                    <Text className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Landlord Contact Unlocked
                    </Text>
                  </View>
                  <Text className="text-base font-extrabold text-emerald-950">
                    {item.landlord?.full_name || 'Landlord Owner'}
                  </Text>
                  <Text className="text-sm font-bold text-emerald-800 mb-3">
                    Phone: {item.landlord?.phone || '+251 922 887 766'}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleCall(item.landlord?.phone || '+251 922 887 766')}
                    className="bg-emerald-700 py-2.5 rounded-lg items-center justify-center flex-row shadow-sm"
                  >
                    <Text className="text-white text-xs font-bold mr-1">📞</Text>
                    <Text className="text-white text-xs font-bold">Call Landlord Directly</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* Assigned Connector Box */}
              <View className="bg-gray-50 p-3 rounded-xl flex-row items-center justify-between mt-1">
                <View className="flex-1 mr-2">
                  <Text className="text-xs text-gray-400 font-medium">Assigned Connector</Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    {item.connector?.full_name || 'Hawassa Support Agent'}
                  </Text>
                </View>
                {!isDropped && (
                  <TouchableOpacity
                    onPress={() => handleCall(item.connector?.phone || '+251 930 112 233')}
                    className="bg-amber-700 px-3 py-2 rounded-lg flex-row items-center"
                  >
                    <Text className="text-xs font-bold text-white">Call Connector</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Explicit Dropped state message */}
              {isDropped && (
                <Text className="text-xs text-gray-500 italic mt-2">
                  Inquiry status: Not Selected by staff. You can browse other available properties.
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
