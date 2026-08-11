import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function ActivityLog() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Activity Log</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLtJM6GePkiIabS2x_jjgn3IytKQ_vwhPuHTHCfAwsyNwakSVvYTcZmV07NwXx63coa30su3V5pDEb6ne9hM4aWCxLKU7vR-FHGhRNL4nWpLMdaxaLNx7ebsM-ooF3Ri-S9rdCxw5GtcUo3hUgT63X2l45NcCeSZ47vyFp9rcJUdg43pElL1pNQ8sOXGKDVOuwr_H-VJ3lmB8HWowqevl1N6POYk1D8MTmKEkDAeer_ykDVlWtFZxKY60pMz' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
