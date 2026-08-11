import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';

export default function StaffLeadDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Lead Detail" showBack />

        <ScrollView className="p-4 flex-1">
          {/* Lead Contact Card */}
          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-xl font-bold text-gray-900">Abebe Bikila</Text>
                <Text className="text-xs text-gray-500">Tenant Lead • Verified</Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-xs font-bold text-blue-800">Meeting Scheduled</Text>
              </View>
            </View>

            {/* Masked Phone Number Card */}
            <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex-row items-center justify-between my-3">
              <View>
                <Text className="text-xs text-blue-700 font-semibold">Phone Contact</Text>
                <Text className="text-base font-bold text-blue-950">+251 911 234 567</Text>
              </View>
              <TouchableOpacity className="bg-blue-700 px-4 py-2 rounded-lg">
                <Text className="text-xs font-bold text-white">📞 Call Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Target Property */}
          <Text className="text-sm font-bold text-gray-700 mb-2">Target Property</Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <Text className="text-base font-bold text-gray-900 mb-1">Modern 2BR Lakeside Villa</Text>
            <Text className="text-xs text-gray-500 mb-2">Haile Resort Area, Hawassa</Text>
            <Text className="text-base font-extrabold text-blue-800">25,000 ETB / month</Text>
          </View>

          {/* Notes / Timeline */}
          <Text className="text-sm font-bold text-gray-700 mb-2">Connector Notes</Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <Text className="text-xs text-gray-600 leading-5">
              • Aug 10, 2:30 PM: Tenant expressed interest via app.
            </Text>
            <Text className="text-xs text-gray-600 leading-5 mt-1">
              • Aug 10, 3:15 PM: Connector scheduled property viewing for tomorrow at 10:00 AM.
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View className="p-4 border-t border-gray-100 bg-white flex-row space-x-3">
        <TouchableOpacity
          onPress={() => router.push('/(staff)/schedule')}
          activeOpacity={0.8}
          className="flex-1 py-4 bg-gray-100 rounded-xl items-center justify-center"
        >
          <Text className="text-sm font-bold text-gray-800">Reschedule Visit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/(staff)/close-deal/${id}`)}
          activeOpacity={0.8}
          className="flex-1 py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-sm font-bold text-white">Close Deal 🤝</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
