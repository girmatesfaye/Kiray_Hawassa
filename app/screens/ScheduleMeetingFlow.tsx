import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function ScheduleMeetingFlow() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Schedule Meeting Flow</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvCLzDgnFvQpWs7FpIxhxbZip1CRtX4iXGlea8NoGr384LuI1_w8md0ZGo0H3XraOsspeasSaNriAK8MU-97EiX_mpzCZoNy0nmhJGWZEzhli2rPCkkotpcqLJyU-tTBd_Nt8bOC5dLi0MVKU_4uFfyuEcsYhVEQlDXbwwLQCO-giZLYZj-_0lUEvcioqPqLYS6eXEIF81Lr5MDUX_RKDx7pP8YCHrZK-SozRQPdWHYX7FH-FBfT-mr7z_e' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
