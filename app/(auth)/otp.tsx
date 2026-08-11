import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function OtpScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleVerify = () => {
    // Proceed to onboarding / role choice after OTP check
    router.replace('/(onboarding)/role-choice');
  };

  return (
    <View className="flex-1 bg-white justify-between p-6 pt-12">
      <View>
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-xl text-gray-700 font-bold">← Back</Text>
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-900 mb-2">Verification Code</Text>
        <Text className="text-base text-gray-600 mb-8">
          We sent a 6-digit code to your phone number. Enter it below to verify.
        </Text>

        <View className="flex-row justify-between mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-bold bg-gray-50 text-gray-900 focus:border-amber-700"
              keyboardType="number-pad"
              maxLength={1}
              value={code[index]}
              onChangeText={(val) => {
                const newCode = [...code];
                newCode[index] = val;
                setCode(newCode);
              }}
            />
          ))}
        </View>

        <TouchableOpacity className="items-center py-2">
          <Text className="text-sm text-amber-700 font-semibold">Didn't receive code? Resend Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleVerify}
        activeOpacity={0.8}
        className="py-4 bg-amber-700 rounded-xl items-center justify-center mb-6"
      >
        <Text className="text-base font-bold text-white">Verify & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
