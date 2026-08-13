import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type PhoneInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  value: string;
  onChangeText: (text: string) => void;
};

export function PhoneInput({ value, onChangeText, style, ...props }: PhoneInputProps) {
  const formatted = value.replace(/\D/g, '').slice(0, 10);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.surface,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: Colors.outlineVariant,
          paddingHorizontal: Spacing.md,
          height: 52,
        },
        style as any,
      ]}>
      <Text style={[Typography.bodyLg, { color: Colors.onSurfaceVariant, marginRight: Spacing.sm }]}>
        +251
      </Text>
      <TextInput
        value={formatted}
        onChangeText={onChangeText}
        placeholder="911 234 567"
        placeholderTextColor={Colors.outline}
        keyboardType="phone-pad"
        style={[Typography.bodyLg, { flex: 1, color: Colors.onSurface, paddingVertical: 0 }]}
        {...props}
      />
    </View>
  );
}
