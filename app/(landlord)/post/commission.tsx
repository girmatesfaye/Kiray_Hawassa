import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { useListingPostWizard } from '@/features/listings/postWizard';

export default function PostListingStep3Commission() {
  const router = useRouter();
  const { draft, updateDraft } = useListingPostWizard();

  return (
    <View className="flex-1 bg-white pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Post Property - Step 3/4" subtitle="Commission & Agreement" showBack />

        <ScrollView className="p-4 flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-2">Connector Commission Terms</Text>
          <Text className="text-sm text-gray-600 mb-6 leading-6">
            Kiray Hawassa operates on a verified local connector model to keep viewings safer and deals easier to close.
          </Text>

          <View className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-6">
            <Text className="text-xs font-bold text-emerald-800 uppercase mb-1">Standard Rate</Text>
            <Text className="text-3xl font-extrabold text-emerald-900 mb-1">10% First Month</Text>
            <Text className="text-xs text-emerald-700">
              Payable only after a successful lease agreement and tenant deposit collection.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => updateDraft({ acceptedTerms: !draft.acceptedTerms })}
            activeOpacity={0.8}
            className="flex-row items-center p-4 bg-gray-50 border border-gray-200 rounded-xl"
          >
            <View className={`w-6 h-6 rounded-md items-center justify-center mr-3 ${draft.acceptedTerms ? 'bg-emerald-700' : 'border border-gray-400'}`}>
              {draft.acceptedTerms && <Text className="text-white text-xs font-bold">OK</Text>}
            </View>
            <Text className="text-sm font-semibold text-gray-800 flex-1">
              I agree to the Hawassa Rental Connect listing and commission terms.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={() => router.push('/(landlord)/post/review')}
          disabled={!draft.acceptedTerms}
          activeOpacity={0.8}
          className={`py-4 rounded-xl items-center justify-center shadow-sm ${
            draft.acceptedTerms ? 'bg-emerald-700' : 'bg-gray-200'
          }`}
        >
          <Text className={`text-base font-bold ${draft.acceptedTerms ? 'text-white' : 'text-gray-400'}`}>
            Review & Preview Listing
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
