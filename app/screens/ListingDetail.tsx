import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function ListingDetail() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Listing Detail</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLuOfzfiNjLI7GT--JYyarK5yY46fthA16YkA4nM6w8yD4bB5JoqQYkh4tNzZFDGIyUuA7gfIuXG7aGAC5GG1d5e-4TNTOPDWZ2SKNiGfYR3Ni49x1cRQE7DYzBngUlzLONAirUc6mhSIVooJ-fIhEiXzNeJaE9cIpK238TaEVlleePB4zNIsp52z8_lm0XX7NhYo4qr56JS1Vz04ZkgZfWQAMH4r32TPcIDHd-gociBwMAig_JkICv9Nje2' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
