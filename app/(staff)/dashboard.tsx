import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function StaffConnectorDashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Banner */}
      <View className="bg-blue-900 p-6 pt-12 rounded-b-3xl">
        <Text className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Staff / Connector Portal</Text>
        <Text className="text-white text-2xl font-bold mb-4">Connector Dashboard 💼</Text>

        {/* Stats Grid */}
        <View className="grid grid-cols-2 gap-3">
          <View className="bg-blue-800/70 p-4 rounded-2xl">
            <Text className="text-blue-200 text-xs font-medium">Total Earnings</Text>
            <Text className="text-white text-2xl font-extrabold mt-1">18,500 ETB</Text>
          </View>
          <View className="bg-blue-800/70 p-4 rounded-2xl">
            <Text className="text-blue-200 text-xs font-medium">Active Leads</Text>
            <Text className="text-white text-2xl font-extrabold mt-1">8</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        {/* Quick Actions */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Quick Actions</Text>
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={() => router.push('/(staff)/add-lead')}
            activeOpacity={0.8}
            className="flex-1 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm items-center"
          >
            <Text className="text-2xl mb-1">➕</Text>
            <Text className="text-sm font-bold text-gray-900">Add Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(staff)/schedule')}
            activeOpacity={0.8}
            className="flex-1 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm items-center"
          >
            <Text className="text-2xl mb-1">📅</Text>
            <Text className="text-sm font-bold text-gray-900">Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(staff)/activity')}
            activeOpacity={0.8}
            className="flex-1 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm items-center"
          >
            <Text className="text-2xl mb-1">📋</Text>
            <Text className="text-sm font-bold text-gray-900">Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Priority Leads */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-900">High Priority Leads</Text>
          <TouchableOpacity onPress={() => router.push('/(staff)/leads')}>
            <Text className="text-xs font-bold text-blue-700">View All →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(staff)/lead/1')}
          activeOpacity={0.9}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3"
        >
          <View className="flex-row justify-between items-start mb-2">
            <View>
              <Text className="text-base font-bold text-gray-900">Abebe Bikila (Tenant)</Text>
              <Text className="text-xs text-gray-500">Interested in 2BR Villa (Haile Resort)</Text>
            </View>
            <View className="bg-amber-100 px-2.5 py-1 rounded-full">
              <Text className="text-xs font-bold text-amber-800">Meeting Today</Text>
            </View>
          </View>
          <Text className="text-xs text-gray-600 font-medium">Budget: Up to 30,000 ETB/mo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
