import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl, Linking } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { getStaffLeads } from '@/lib/supabase/api';
import { Lead } from '@/lib/supabase/types';


export default function StaffLeadsListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchLeads = async () => {
    const data = await getStaffLeads(filter);
    setLeads(data);
    setRefreshing(false);
    setInitialLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [filter]);



  const filteredLeads = leads.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = item.tenant?.full_name?.toLowerCase() || '';
    const title = item.listing?.title?.toLowerCase() || '';
    const phone = item.tenant?.phone?.toLowerCase() || '';
    return name.includes(q) || title.includes(q) || phone.includes(q);
  });

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'linked':
        return { label: 'Deal Closed', color: 'bg-emerald-100 text-emerald-800' };
      case 'visit_scheduled':
        return { label: 'Meeting Scheduled', color: 'bg-blue-100 text-blue-800' };
      case 'not_selected':
        return { label: 'Dropped / Not Interested', color: 'bg-gray-200 text-gray-700' };
      case 'waiting_for_call':
      default:
        return { label: 'New Lead', color: 'bg-amber-100 text-amber-800' };
    }
  };

  const handleCallPhone = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar
        title="Leads Management"
        subtitle="Manage inquiries & deal closures"
        rightAction={
          <TouchableOpacity onPress={() => router.push('/(staff)/add-lead')} className="bg-blue-700 px-3 py-1.5 rounded-lg">
            <Text className="text-xs font-bold text-white">+ Add Lead</Text>
          </TouchableOpacity>
        }
      />

      <View className="p-4 bg-white border-b border-gray-100">
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-2.5 bg-gray-50 text-sm"
          placeholder="Search leads by name, phone or property..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Task 5: 4th filter chip "Dropped" added */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          {['All', 'New', 'Meeting Scheduled', 'Deal Closed', 'Dropped'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full mr-2 ${
                filter === f ? 'bg-blue-700' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-xs font-bold ${filter === f ? 'text-white' : 'text-gray-700'}`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchLeads(); }} />}
      >
        {initialLoading ? (
          <>
            <SkeletonLoader.Row />
            <SkeletonLoader.Row />
            <SkeletonLoader.Row />
          </>
        ) : filteredLeads.length === 0 ? (
          <Animated.View entering={FadeIn.duration(350)} style={{ paddingVertical: 48, alignItems: 'center' }}>
            <Text style={{ fontSize: 36, marginBottom: 12 }}>📋</Text>
            <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: '600' }}>
              No leads found for "{filter}"
            </Text>
          </Animated.View>
        ) : filteredLeads.map((item) => {
          const badge = getStatusBadge(item.status);
          const isDropped = item.status === 'not_selected';

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/(staff)/lead/${item.id}`)}
              activeOpacity={0.9}
              className={`bg-white p-4 rounded-2xl shadow-sm border mb-3 ${
                isDropped ? 'border-gray-300 opacity-75' : 'border-gray-100'
              }`}
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-base font-bold text-gray-900">
                    {item.tenant?.full_name || 'Tenant Lead'}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Tenant • {item.tenant?.phone || '+251 911 *** 456'}
                  </Text>
                </View>
                <View className={`px-2.5 py-1 rounded-full ${badge.color}`}>
                  <Text className="text-xs font-bold">{badge.label}</Text>
                </View>
              </View>

              <Text className="text-xs text-gray-700 font-medium mb-3">
                Target: {item.listing?.title || 'Hawassa Property'}
              </Text>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleCallPhone(item.tenant?.phone || '+251 911 234 567')}
                  className="flex-1 bg-gray-100 py-2 rounded-lg items-center"
                >
                  <Text className="text-xs font-bold text-gray-700">📞 Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push(`/(staff)/lead/${item.id}`)}
                  className="flex-1 bg-blue-700 py-2 rounded-lg items-center"
                >
                  <Text className="text-xs font-bold text-white">View Details →</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
