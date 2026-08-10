import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function PostIndexScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Post a Property</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8, textAlign: 'center' }]}>
        Start by adding photos and details about your rental.
      </Text>
    </View>
  );
}
