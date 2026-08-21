import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  subtitle?: string;
}

export default function HeaderBar({ title, showBack = false, rightAction, subtitle }: HeaderBarProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="mr-3 p-1 rounded-full bg-gray-100 active:bg-gray-200"
          >
            <Ionicons name="chevron-back" size={22} color="#374151" />
          </TouchableOpacity>
        )}
        <View>
          <Text className="text-xl font-bold text-gray-900">{title}</Text>
          {subtitle && <Text className="text-xs text-gray-500">{subtitle}</Text>}
        </View>
      </View>
      {rightAction && <View>{rightAction}</View>}
    </View>
  );
}
