import { Text, type ViewProps } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type StatusStampProps = ViewProps & {
  status: 'Available' | 'Rented Out' | 'Pending';
  animated?: boolean;
};

export function StatusStamp({ status, style, animated = true }: StatusStampProps) {
  const colorMap = {
    Available: Colors.secondary,
    'Rented Out': Colors.tertiary,
    Pending: Colors.outline,
  };

  const Container = animated ? Animated.View : Animated.View;

  return (
    <Container
      entering={animated ? ZoomIn.duration(280).springify().damping(12) : undefined}
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
      ]}
    >
      <Text
        style={[
          Typography.labelCaps,
          {
            color: colorMap[status],
            letterSpacing: 1,
            fontWeight: '700',
          },
        ]}
      >
        {status}
      </Text>
    </Container>
  );
}
