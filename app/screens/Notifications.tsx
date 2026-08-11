import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function Notifications() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Notifications</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLsVRFcDtZtar06rDEkuMZDlnByjhDyjWS7yNp42xTZe1vJuXqXS1aHMzKSmWW9b-qSRhYmb9RKnItMz1Vby2XNtrcFCObDDvS_xa_oy9L3qbwKBru6sIWas6XayDeAdorQzRb0wGwOQL2VUPKFqjPHONCsJKaMI-jTW_DwHTyex1a6w_fjogF-wozdTcOOAukb-thx8UyKfg6AJQoVsQj8vdvgPvktBJFa-a5zCrs5PKCfcWO-GAVjiSIY' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
