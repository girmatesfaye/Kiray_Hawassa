import { TouchableOpacity, Text, type TouchableOpacityProps } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
};

export function Button({ title, variant = 'primary', style, disabled, ...props }: ButtonProps) {
  const backgroundColor =
    variant === 'primary'
      ? Colors.primary
      : variant === 'secondary'
        ? Colors.surfaceContainerHigh
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? Colors.onPrimary
      : variant === 'secondary'
        ? Colors.primary
        : Colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        {
          backgroundColor,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radius.md,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: Colors.primary,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}>
      <Text style={[Typography.labelLg, { color: textColor, textAlign: 'center' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
