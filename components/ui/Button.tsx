import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, variant = 'primary', style, disabled, onPress }: ButtonProps) {
  const backgroundColor =
    variant === 'primary'
      ? Colors.primary
      : variant === 'secondary'
        ? Colors.surfaceContainerHigh
        : variant === 'destructive'
          ? Colors.error
          : 'transparent';

  const textColor =
    variant === 'primary' || variant === 'destructive'
      ? Colors.onPrimary
      : variant === 'secondary'
        ? Colors.primary
        : Colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radius.md,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: Colors.primary,
          opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      <Text style={[Typography.labelLg, { color: textColor, textAlign: 'center' }]}>
        {title}
      </Text>
    </Pressable>
  );
}
