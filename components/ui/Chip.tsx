import { View, Text, type ViewProps } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type ChipVariant = 'available' | 'featured' | 'rented' | 'pending';

type ChipProps = ViewProps & {
  label: string;
  variant?: ChipVariant;
};

const CHIP_COLORS: Record<ChipVariant, { bg: string; text: string }> = {
  available: { bg: Colors.secondaryContainer, text: Colors.secondary },
  featured: { bg: Colors.primaryContainer, text: Colors.primary },
  rented: { bg: Colors.surfaceContainerHigh, text: Colors.tertiary },
  pending: { bg: Colors.surfaceVariant, text: Colors.outline },
};

export function Chip({ label, variant = 'available', style }: ChipProps) {
  const colors = CHIP_COLORS[variant];

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.sm,
          borderRadius: Radius.full,
        },
        style,
      ]}>
      <Text style={[Typography.labelMd, { color: colors.text }]}>{label}</Text>
    </View>
  );
}
