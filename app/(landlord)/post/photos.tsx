import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function PhotosScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Add Photos</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Step 1: Upload photos of your property.
      </Text>
    </View>
  );
}
