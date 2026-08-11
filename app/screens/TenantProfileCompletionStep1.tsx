import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function TenantProfileCompletionStep1() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Tenant Profile Completion - Step 1</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLskFaEyv_RG4YqVukhtvIVdlsdvT6a1Dvhst2IrNe5Jv8OOrnci8PqtxYMXpRZKKKX45WNu1PBCLsr6-AIT9_QxEQ2qDGz5JWRSPMYo-igCOVt7Tewer8PuIgTEZYAK4Lur5muHiT780Hc-lCmH4QTKYnetXmVjhZjpmWMcCYJtMhxDCIPJfNS1jCiMEKDhnCKs9CYqH4ih7wDPyh3OoKEsOrzEGtJmMLkyx_miiqdTMyV_O2Evzm3kKNx8' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
