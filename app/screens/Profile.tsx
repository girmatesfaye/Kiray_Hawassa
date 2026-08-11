import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Profile</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLvN-mkXlRQoKLoLKFXOFxcBYnrPwQ7E6tq3jx4IwnhnVn9RNkjJVEoImSpVYr8OHT_6B6Eor_PpP0qvPwwKRmj_NOHf3QSQ5yutpl2KAPyFcky1NQfmmyhVWyiwkJh85RaFrxp19ppWZGZoGL0-lr75tIFS2vgKbRfsvcwGeBEH6G25jTCWNJ6RS14jczWWFbEEznAAIMIhfSc2d1EeaEc7mlLzNrtY8DeI3ziQ0zPuGOWUTQT4RTEwJxGc' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
