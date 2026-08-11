import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function ManualSearchAddLead() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Manual Search / Add Lead</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvF-lZ7R_BnoCTjk2CArtqqWhKBvRVonk64HBpXYBtCnsTq-2a4F7Oc5a_r2uPGMYeliRsI-RJsKMHYjyrwX4LhGGC1WoD4f4MYCAUAjk7Ht_c80G1U9zrZJHwHpQpa2JI0WIm6JYpoVXwqZf8bEyS0JjuMpkfxbT295e6o3yEL25a7j4ptERx8aTL-8hT-U9KTuVV_QWKugzU6syYvkiOgKffliYiu92-Xpz3C-hqRW6TsuHbRy8pu8H4R' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
