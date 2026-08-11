import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function PostListingStep1() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Post a Listing - Step 1</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvvvRwh7iJHBRJcf24jII5paG1AnJEVi6qZM6lKNRjexIxdnt_dYeLlN1Up-Hz0spynkx68Hh4o5SM2dsa63OQkW7-T4AiIr8u9NJ01HIe_hrqr51bikLsLvjTBBfQhLbtBbvhTjomuccwMmrH2U3LWh43ciD6-65im0D3AMxZFV-j2NQt1SIqZO-8t6xs8ADoPCPuSiZA6sx_FDfQcci6YXwvhr1du0p-gaaasGlG7UqUuNsxRXrIkg7M' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
