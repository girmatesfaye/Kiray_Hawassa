import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function BrowseScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Browse Listings</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Find available properties near you.
      </Text>
    </View>
  );
}
