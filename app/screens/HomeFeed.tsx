// app/screens/HomeFeed.tsx
import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

// NativeWind (Tailwind) classes via `className`
export default function HomeFeed() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Home Feed</Text>
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw"
        }}
        className="w-full h-64 rounded-lg mb-4"
        resizeMode="cover"
      />
    </ScrollView>
  );
}

