import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function InterestsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>My Interests</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Track the status of your rental interests.
      </Text>
    </View>
  );
}
