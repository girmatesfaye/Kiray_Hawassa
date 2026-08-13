import React from 'react';
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native';

interface ConnectorContactSheetProps {
  visible: boolean;
  onClose: () => void;
  connectorName?: string;
  connectorPhone?: string;
}

export default function ConnectorContactSheet({
  visible,
  onClose,
  connectorName = 'Hawassa Connector Staff',
  connectorPhone = '+251 930 112 233',
}: ConnectorContactSheetProps) {
  const handleCall = () => {
    if (connectorPhone) {
      Linking.openURL(`tel:${connectorPhone.replace(/\s+/g, '')}`);
    }
  };

  const maskedPhone = connectorPhone
    ? connectorPhone.replace(/(\+\d{3}\s?\d{3})\s?\d{3}(\s?\d{3})/, '$1 *** $2')
    : null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 border-t border-gray-100 shadow-xl">
          <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
          
          <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center self-center mb-3">
            <Text className="text-3xl">🤝</Text>
          </View>

          <Text className="text-2xl font-extrabold text-gray-900 text-center mb-1">
            Interest Expressed!
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-6 px-4">
            Your assigned connector is ready to arrange your property visit and answer all questions.
          </Text>

          {/* Connector Info Box */}
          <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <Text className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Assigned Hawassa Connector
            </Text>
            <Text className="text-lg font-bold text-amber-950 mb-1">{connectorName}</Text>
            <Text className="text-sm font-semibold text-amber-900 mb-4">
              Phone: {connectorPhone ? maskedPhone : 'Pending assignment'}
            </Text>

            {connectorPhone ? (
              <TouchableOpacity
                onPress={handleCall}
                activeOpacity={0.8}
                className="bg-amber-700 py-3 rounded-xl flex-row items-center justify-center shadow-sm"
              >
                <Text className="text-white text-base font-bold mr-2">📞</Text>
                <Text className="text-white text-base font-bold">Call Agent Directly</Text>
              </TouchableOpacity>
            ) : (
              <View className="bg-amber-100 p-3 rounded-xl">
                <Text className="text-xs text-amber-900 font-medium text-center">
                  Staff will reach out shortly to guide your property viewing.
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={onClose}
            className="py-3 bg-gray-100 rounded-xl items-center justify-center"
          >
            <Text className="text-sm font-bold text-gray-700">Done & View My Interests</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
