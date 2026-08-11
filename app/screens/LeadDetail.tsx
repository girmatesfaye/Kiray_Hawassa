import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function LeadDetail() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Lead Detail</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvLhIjplLBV9sDJVQzaNkQjoMTnx4DH184iT9Ta4vl21JfI8vOn6pJiVkKtv2f7ZUxCKGF_OHDPMn1wSyWrJpteCJ7mLinoA_JTDvHtbo6TkCi1vdNhkDSOJL7Kob4WY1J93Yv7_Huc56Zoo3H6iaqkOiGjHy_h1jtTiyLgFm5AhsyS3bWkq5eEfFNKIABBTJu1_d2ss_NixCcUFm9IjTtnGoWaa_K0iIZV4yJZBxLkxweBXf2nDlIMLr0' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
