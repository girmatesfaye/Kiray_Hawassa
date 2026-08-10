import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Property Details</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Step 2: Add title, price, description, and amenities.
      </Text>
    </View>
  );
}
