import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function MyListings() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">My Listings</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLtYNcYQO33lc9kqjUxvj6ROvhX9iyHD40u_PWUTDEvpgk5SYtHC2WXcBMU3p_XDQd9TNEa4Mvkh66AzYVKlwm48rdKSah-eAOdcyx8RKiN8X_0R-Ren1zFmKz6MDohL448rLnJz5a1swDbC0DtZVS522JnCr7we7WuAVLmi92o46fVnCv3iQEcaUsDaEoE2Swq6lBonUybJuXmqTG9Gn3L7EIcXJ105krwh8hLnZnPcXY4M5CkAHOZ03HeN' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
