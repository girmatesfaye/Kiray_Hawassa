import { View, Text, type ViewProps } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type ContactCardProps = ViewProps & {
  name: string;
  phone: string;
  masked?: boolean;
};

export function ContactCard({ name, phone, masked = true, style }: ContactCardProps) {
  const displayPhone = masked ? '•••• •••• ••••' : phone;

  return (
    <View
      style={[
        {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.cardPadding,
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.inlineGap,
          ...Shadow.card,
        },
        style,
      ]}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Colors.primaryContainer,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconSymbol name="person.fill" size={20} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[Typography.labelLg, { color: Colors.onSurface }]}>{name}</Text>
        <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant }]}>
          {masked ? 'Tap to reveal phone' : displayPhone}
        </Text>
      </View>
      <IconSymbol name="phone.fill" size={20} color={Colors.primary} />
    </View>
  );
}
