import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function SuccessScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Listing Published</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Your property is now live. Interested tenants will contact you soon.
      </Text>
    </View>
  );
}
