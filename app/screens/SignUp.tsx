import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function SignUp() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Sign Up</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLucZzwFC5_g3lcFZxvEnKX6rKsW2SJUCtM0Zi43PHcmh2GsWThh4UiF9Si8GOIFfsUZb0cr-0GIWl-lstaFYBIozkmoUMRp-8ViBwMeTi1QUngX1siHlihYzy91wMdgMFhgmaTBDzZe3EdkF0anfOADxY6NCB5Vha7jMDpogQ9smzGvusOQMZql8-1HyL-8seYwKE9BNjfCrXlUcOWi0dQV55ZHfVgTp5fVtow35jhAiiBzr1PSdOFbsiHV' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
