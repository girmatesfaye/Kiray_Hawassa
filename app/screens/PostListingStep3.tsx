import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function PostListingStep3() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Post a Listing - Step 3</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLtMFP3StQXHtzlZNXrO5BnXZCNiAkVoozDm3NCCKHpZENhfFC3qjm0CmZ9spfoEeNRswTWthGUf9uh0mBh2TUbJIs55iuvispvlehrhCN-givIi74bdcEANI1RoPjcLyH6-V1t05hblJkGQbknd54V5bzNmlggEQ0oxugP2CEIAEwukADnTjsHBPd9Q9FC2KZGlAwWAkjfLBpniufstF51w1Km60sRohzNy6nlxAS4L923SrV_3QOjjO7XK' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
