import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function Onboarding() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Onboarding</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLu5MEA3o7dlYko3jvy4dGfZtWwTE82oWJVsqqXAZNS1u3WHU1LxYb7GFbDVUoYnkTOq5xEwATmA078j3YQSx5UUmW8nk1rChJWv6BzT4N4FX3b0PnDr6y4s8UMN3L474n01c_Q--snf0ZS2S3sGHDIC0j1AotNFvlVyEOtm1wSIT5alc9xtce07eOv0pq1OBVaGVDt8JqT1VqnSt3PPYJ-PxYxc8LMsL3Sus9GpnnmmgJz9eiFIy6R3X1gQ' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
