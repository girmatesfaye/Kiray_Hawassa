import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/app/_layout';

export default function PhoneScreen() {
  const { isLoading, session } = useAuth();

  if (isLoading) return <View />;
  if (session) return <Redirect href="/(landlord)/home" />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9ff', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#151c27', marginBottom: 8 }}>Welcome to Kira</Text>
      <Text style={{ fontSize: 16, color: '#5a4139', textAlign: 'center' }}>
        Enter your phone number to sign in or create an account.
      </Text>
    </View>
  );
}
