import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function LeadsList() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Leads List</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLsemUhX8sidMuofoXTns5hlPSis3O1sGQf4LUnE3uXAZItwU2zH7T7dC9JRlnle3DDNdp3XqGywUefozgndBKEAyXBCsWak8115OSI7gHxnGL1dJwAPSXpG5gfWfmwrwQBENn_sTrwkfZ8aJyFjwW_PPIY3yPmTMmlXBB4gho9Dox_PWLvvGJaoqVV8pDS5enJMWbCfTTTS-TNQ0cxq8mrStHMruxMxNXYzuEl3VPn4jK8RSkT4wiKpoIU' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
