import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';

export default function InterestsScreen() {
  const inquiries = [
    {
      id: '101',
      propertyTitle: 'Modern 2BR Lakeside Villa',
      date: 'Aug 10, 2026',
      status: 'Connected',
      statusColor: 'bg-emerald-100 text-emerald-800',
      agentName: 'Abebe (Hawassa Connector)',
    },
    {
      id: '102',
      propertyTitle: 'Spacious Commercial Shop',
      date: 'Aug 08, 2026',
      status: 'In Progress',
      statusColor: 'bg-amber-100 text-amber-800',
      agentName: 'Pending Agent Assignment',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="My Expressed Interests" subtitle="Track your active rental inquiries" />

      <ScrollView className="flex-1 p-4">
        {inquiries.map((item) => (
          <View key={item.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-bold text-gray-900 flex-1 mr-2">{item.propertyTitle}</Text>
              <View className={`px-2.5 py-1 rounded-full ${item.statusColor}`}>
                <Text className="text-xs font-bold">{item.status}</Text>
              </View>
            </View>

            <Text className="text-xs text-gray-500 mb-3">Submitted on {item.date}</Text>

            <View className="bg-gray-50 p-3 rounded-xl flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-gray-400 font-medium">Assigned Agent</Text>
                <Text className="text-sm font-semibold text-gray-800">{item.agentName}</Text>
              </View>
              <TouchableOpacity className="bg-amber-700 px-3 py-1.5 rounded-lg">
                <Text className="text-xs font-bold text-white">Call Agent</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
