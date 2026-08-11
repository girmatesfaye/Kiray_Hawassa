import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function ConnectorDashboard() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Connector Dashboard</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLu7SNxbBWXxz3qihSL-KcWpu-0hqHSeuw42GVrP5O50ioYIleEw1fhGMYPi0iuNAAac66kSlj_DpPAJ05d126sUYxaB_evi4kjqKHyrU_RvOEpVwAHmNRdegpAM3OoxMv3KCdWlmpBxZS-cbeFtEhlPFNxWPXrogLxkTUM8S704WVre-YQ5cuCUfTdRrerpnZTYF5mh_NrPaYBq0yRHtCOmg9r1QcaoZUOBkcSvFiUxBwc8ESr27_wzIR0W' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
