import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

export default function PostListingStep2() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-3 text-gray-900">Post a Listing - Step 2</Text>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida/AP1WRLsEhHx9v2d-AYVO1fVi5sywKyiRksmRhsBhzbWcFn0D0h7solcSgXOPN4Yold1LHkPRT58zLw7_7xPvQtBF0V0rJDqD5ICghcl5oGerPPsgYnIocj6wEuGgVIWM07wMx1QxbMEiywNHSZM3AfWSiSwbI3ZhF6eKtLk1Rn0nzrKJHkOj-cumt_hbHkJHL8iN91IG_r0Trt_2A9KKEz1wngsGMNuTrQ0ncWtsKUgB1ENxgTEdjaeM53WUm9s' }}
        className="w-full h-96 rounded-lg mb-4"
        resizeMode="contain"
      />
    </ScrollView>
  );
}
