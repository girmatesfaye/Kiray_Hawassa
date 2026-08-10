import { View, Text, type ViewProps } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/colors';
import { Chip } from '@/components/ui/Chip';
import { StatusStamp } from '@/components/ui/StatusStamp';

type ListingCardProps = ViewProps & {
  title: string;
  price: string;
  location: string;
  status?: 'Available' | 'Rented Out' | 'Pending';
};

export function ListingCard({ title, price, location, status = 'Available', style }: ListingCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          overflow: 'hidden',
          ...Shadow.card,
        },
        style,
      ]}>
      <StatusStamp status={status} />
      <View style={{ height: 160, backgroundColor: Colors.surfaceContainerLow }} />
      <View style={{ padding: Spacing.cardPadding }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: Spacing.xs }}>
          <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>{title}</Text>
          <Text style={[Typography.headlineMd, { color: Colors.primary }]}>{price}</Text>
        </View>
        <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginBottom: Spacing.sm }]}>
          {location}
        </Text>
        <Chip label={status} variant={status.toLowerCase().replace(' ', '') as any} />
      </View>
    </View>
  );
}
