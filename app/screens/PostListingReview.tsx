import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function PostListingReview() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Post a Listing - Review</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLuEXXOZ9IGiyiwNSB18DKT6smNlbhAmzUVYk3KxD8-ANJVrSKe41ZbWxRRN51UOjdWwav1oKi_x3kiU73mZasWOwPhJ18XDygb3Y0ELfqKX0DfFjiWVq6xp0qdpnmLow_2VKFhRyaaAIAuXq6AUgsvGXYAo1Odg0ufrN4ERSvCBOy5QHDyEWoTJM9nSZHPU113r7HWhZgJCt00e87J_RbNiN96zHWtVyXDBSIwMxgswJy5nAE9qtL4-YKw' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
