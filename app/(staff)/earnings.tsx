import { View, Text } from 'react-native';
import { Colors, Typography } from '@/constants/colors';

export default function EarningsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Earnings</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Track your commissions and payouts.
      </Text>
    </View>
  );
}
