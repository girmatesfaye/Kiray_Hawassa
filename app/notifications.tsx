import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: '1',
      title: 'New Rental Inquiry',
      message: 'A tenant is interested in your 2BR Villa near Haile Resort.',
      time: '15 mins ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Meeting Confirmed',
      message: 'Connector Abebe confirmed property viewing for tomorrow at 10:00 AM.',
      time: '2 hours ago',
      unread: false,
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Notifications" showBack />

      <ScrollView className="flex-1 p-4">
        {notifications.map((n) => (
          <TouchableOpacity
            key={n.id}
            activeOpacity={0.8}
            className={`p-4 rounded-2xl mb-3 border ${
              n.unread ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-gray-100'
            }`}
          >
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-base font-bold text-gray-900">{n.title}</Text>
              <Text className="text-xs text-gray-400">{n.time}</Text>
            </View>
            <Text className="text-xs text-gray-600 leading-5">{n.message}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
