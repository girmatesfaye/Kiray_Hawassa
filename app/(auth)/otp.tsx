import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/app/_layout';

export default function OtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { signIn } = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    // Auto-advance
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length < 6) {
      Alert.alert('Invalid Code', 'Please enter all 6 digits.');
      return;
    }
    if (!phone) {
      Alert.alert('Error', 'Phone number missing. Please go back and try again.');
      return;
    }

    setLoading(true);
    try {
      await signIn(phone, otp);
      // Auth state change in _layout will update session/role.
      // index.tsx will pick up the new state and redirect correctly.
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Verification Failed', e.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white justify-between p-6 pt-12">
      <View>
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Text className="text-xl text-gray-700 font-bold">← Back</Text>
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-900 mb-2">Verification Code</Text>
        <Text className="text-base text-gray-600 mb-2">
          We sent a 6-digit code to your phone number.
        </Text>
        {phone ? (
          <Text className="text-sm font-bold text-amber-700 mb-8">{phone}</Text>
        ) : null}

        <View className="flex-row justify-between mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-bold bg-gray-50 text-gray-900"
              keyboardType="number-pad"
              maxLength={1}
              value={code[index]}
              onChangeText={(val) => handleChange(val, index)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleVerify}
        disabled={loading}
        activeOpacity={0.8}
        className="py-4 bg-amber-700 rounded-xl items-center justify-center mb-6"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-bold text-white">Verify & Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
