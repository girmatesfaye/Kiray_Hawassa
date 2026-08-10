import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors, Typography } from '@/constants/colors';

export default function LandlordHomeScreen() {
  const { profile } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}>
      <Text style={[Typography.headlineLg, { color: Colors.onSurface }]}>
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
      </Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8 }]}>
        Your listings dashboard
      </Text>
    </View>
  );
}
