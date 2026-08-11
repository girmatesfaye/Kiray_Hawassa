import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function SearchFilters() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Search & Filters</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLsUjfG6VAe8q_cL83x3wdrJFizQc-PrNq92Ywgs2Ijag-M0mGwT4xNcgKHiVfRMpe4bswFSF-RVJIJkRy62s3aQ6b_yjxvaaUzyWRaAgCco94SoAX7Ia69GD4e4ofC4NNYnnS_Xf0tHDTbFmC7vYDTYMJeUrcGIOV4azsbdJgsMZZyQ3mgivf5bu3PCI97Eg8dZqkrE_v8Yz2huvcsWPbbuN8eqsShHdjSW6llHG2eQ5nH4KNUS8o1JyDo' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
