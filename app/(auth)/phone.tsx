import { View, Text } from 'react-native';
import { useAuth } from '@/app/_layout';
import { Colors, Typography, Spacing } from '@/constants/colors';

export default function PhoneScreen() {
  const { isLoading } = useAuth();

  if (isLoading) return <View />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: Spacing.sectionPadding }}>
      <Text style={[Typography.headlineLg, { color: Colors.onSurface, marginBottom: Spacing.stackGap }]}>
        Welcome to Kira
      </Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, textAlign: 'center' }]}>
        Enter your phone number to sign in or create an account.
      </Text>
    </View>
  );
}
