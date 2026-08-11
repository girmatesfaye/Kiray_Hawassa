import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function RoleSelection() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Role Selection</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLtF6xToouh-OrQ4wODmejPxQwSljdh53kWiNO5vaoW7yIvC9dWzfMR8AGBjIV0U_yVrryZiQv_DB7qRVz854m59bU3MYZd2lOerEUR6b3OZxgGZ-aDRAOqpQVoLcnwlwc7xCpIw-F_MSQQcvwh_sbUsB_22amrpK0td-_9_3BxyhsKuLIHyVV55teeQKBjgQE1CCw1lMYHsClxZ9YfuA-aAznTh6Nlz7MPOG9em8xMuOJfI1D9mnr9Mnhx5' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
