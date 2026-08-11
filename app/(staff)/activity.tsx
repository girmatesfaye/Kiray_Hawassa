import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffActivityLogScreen() {
  const logs = [
    { id: '1', action: 'Lead Assigned', text: 'Abebe Bikila assigned to you.', time: '10 mins ago' },
    { id: '2', action: 'Viewing Scheduled', text: 'Meeting set for 2BR Villa at 10:00 AM tomorrow.', time: '1 hour ago' },
    { id: '3', action: 'Deal Closed', text: 'Commission 4,000 ETB logged for Commercial Shop.', time: '2 days ago' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Activity Log" showBack />

      <ScrollView className="flex-1 p-4">
        {logs.map((log) => (
          <View key={log.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-sm font-bold text-blue-900">{log.action}</Text>
              <Text className="text-xs text-gray-400">{log.time}</Text>
            </View>
            <Text className="text-xs text-gray-700 leading-5">{log.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
