import { View, Text, type ViewProps } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type StatusStampProps = ViewProps & {
  status: 'Available' | 'Rented Out' | 'Pending';
};

export function StatusStamp({ status, style }: StatusStampProps) {
  const colorMap = {
    Available: Colors.secondary,
    'Rented Out': Colors.tertiary,
    Pending: Colors.outline,
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: Spacing.md,
          right: Spacing.md,
          backgroundColor: Colors.white,
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.sm,
          borderRadius: Radius.sm,
          borderWidth: 2,
          borderColor: colorMap[status],
          transform: [{ rotate: '-12deg' }],
          zIndex: 10,
        },
        style,
      ]}>
      <Text
        style={[
          Typography.labelCaps,
          {
            color: colorMap[status],
            letterSpacing: 1,
          },
        ]}>
        {status}
      </Text>
    </View>
  );
}
