import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffLeadsListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const leads = [
    {
      id: '1',
      name: 'Abebe Bikila',
      roleType: 'Tenant',
      interest: '2BR Villa - Haile Resort Area',
      status: 'Meeting Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      phone: '+251 911 *** 456',
    },
    {
      id: '2',
      name: 'Kebede Tassew',
      roleType: 'Landlord',
      interest: 'Commercial Shop - Piassa',
      status: 'New Lead',
      statusColor: 'bg-amber-100 text-amber-800',
      phone: '+251 922 *** 789',
    },
  ];

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
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          {['All', 'New', 'Meeting Scheduled', 'Deal Closed'].map((f) => (
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

      <ScrollView className="flex-1 p-4">
        {leads.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/(staff)/lead/${item.id}`)}
            activeOpacity={0.9}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3"
          >
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-base font-bold text-gray-900">{item.name}</Text>
                <Text className="text-xs text-gray-500">{item.roleType} • {item.phone}</Text>
              </View>
              <View className={`px-2.5 py-1 rounded-full ${item.statusColor}`}>
                <Text className="text-xs font-bold">{item.status}</Text>
              </View>
            </View>

            <Text className="text-xs text-gray-700 font-medium mb-3">Target: {item.interest}</Text>

            <View className="flex-row gap-2">
              <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg items-center">
                <Text className="text-xs font-bold text-gray-700">Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/(staff)/schedule')}
                className="flex-1 bg-blue-700 py-2 rounded-lg items-center"
              >
                <Text className="text-xs font-bold text-white">Schedule Visit</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
