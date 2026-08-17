import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/colors';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 64, marginBottom: 16 }}>✅</Text>
      <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>Listing Published</Text>
      <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginTop: 8, textAlign: 'center' }]}>
        Your property is now live. Interested tenants will contact you soon.
      </Text>
      <TouchableOpacity
        onPress={() => router.replace('/(landlord)/home')}
        style={{ marginTop: 32, backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, width: '100%', alignItems: 'center' }}
      >
        <Text style={[Typography.labelLg, { color: Colors.onPrimary }]}>Go to My Listings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace('/(landlord)/post')}
        style={{ marginTop: 12, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: Colors.outline }}
      >
        <Text style={[Typography.labelLg, { color: Colors.primary }]}>Post Another</Text>
      </TouchableOpacity>
    </View>
  );
}
