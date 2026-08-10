import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors, Typography } from '@/constants/colors';

export default function OtpScreen() {
  const { isLoading } = useAuth();

  if (isLoading) return <View />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={[Typography.headlineLg, { color: Colors.onSurface, marginBottom: 8 }]}>
        Verify OTP
      </Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, textAlign: 'center' }]}>
        Enter the code sent to your phone.
      </Text>
    </View>
  );
}
