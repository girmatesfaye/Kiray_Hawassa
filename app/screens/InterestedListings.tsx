import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function InterestedListings() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Interested Listings</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvPoYvUG1d5GfXQS_SMKXxQGt5r8sB9IrWdn5p2_vxbewwevZnkfjBrLkC5OpJCJEvsYGZ9CYqdlMpinhdEe0sBajqUKulnE93maU0eykkPOBWlFY-HFTchJQWl0vukUDFNplTBf--jf4eVYUu0wgYmDveOsHpzX4EJdX-42c4cYGMZHjw-3EdDbPp9XWkN9aVkHfqdntinDS2cd2zpbQIx6yYInJ5rNwFjF8wbhiM8mXrZpAHsTBHQOalh' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
