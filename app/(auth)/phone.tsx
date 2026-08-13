import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhoneScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.length >= 9) {
      router.push('/(auth)/otp');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white justify-between p-6"
    >
      <View className="pt-12">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome to Kira</Text>
        <Text className="text-base text-gray-600 mb-8">
          Hawassa&apos;s premier real estate & rental marketplace. Enter your phone number to proceed.
        </Text>

        <Text className="text-sm font-semibold text-gray-700 mb-2">Phone Number</Text>
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 mb-6">
          <Text className="text-base font-bold text-gray-700 mr-2">+251</Text>
          <View className="h-5 w-[1px] bg-gray-300 mr-3" />
          <TextInput
            className="flex-1 text-base text-gray-900 font-medium"
            placeholder="912 345 678"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>
      </View>

      <View className="pb-6">
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.8}
          className={`py-4 rounded-xl items-center justify-center ${
            phoneNumber.length >= 9 ? 'bg-amber-700' : 'bg-gray-200'
          }`}
        >
          <Text className={`text-base font-bold ${phoneNumber.length >= 9 ? 'text-white' : 'text-gray-400'}`}>
            Send Verification Code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/(auth)/sign-in')}
          className="mt-4 py-2 items-center"
        >
          <Text className="text-sm text-amber-700 font-semibold">Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
