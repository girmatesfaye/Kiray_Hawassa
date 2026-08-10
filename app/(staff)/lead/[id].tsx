import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function LeadDetailScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Lead Detail</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        View lead details, notes, and contact information.
      </Text>
    </View>
  );
}
