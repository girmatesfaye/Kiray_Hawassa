import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function SignIn() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Sign In</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLv4PibnQ696e3gzpjRFl86VPXkbWjq6c5Su9ILbKES5ktbCvU9Ep8TZJeDa5vXzxWPZg6wBKcfI_b14WwUT9xulkgUSSdibyf-o-LJzAishPgp3vtBB5YALsEzSPku9diAgVOkuMvmeZsDIs69gmBaAo0_B-GSdanYlDLclPLk5DL7xIG0UchxZucra3zW-oDfmlcvKlBJt9lJFJNSmGUA8hGYW1nMk3cn1z4stp56j26HA9uxCuQVGBXce' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
