import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function SavedListings() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Saved Listings</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLsgPEdWbpCI-IUO3aM5vVgCziu_aaLizcu1vrKrcP20R-87FQayCRSnX-4kaMLPjBVB63E_JaPWEYQuSXVIS4kxUJdDDI6JsI38_jniJeb_YE0gr5z-q666-00L-9_WiUa9R-Qhnn3Vfw6tXLJvCUgcTXvmWifLCfntxlCATBm9pSbanHIeRYjDJyBr8cX7IEbU_UOAtdbXDkXyQCA_d5raj7CDhVslMNlFPF0Iq-XZQT5ZP--J-SqxnBH_' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
