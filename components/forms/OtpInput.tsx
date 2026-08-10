import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';

type OtpInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  value: string;
  onChangeText: (text: string) => void;
};

export function OtpInput({ value, onChangeText, style, ...props }: OtpInputProps) {
  const digits = value.slice(0, 6).split('');
  const filled = digits.length;

  return (
    <View style={[{ alignItems: 'center', gap: Spacing.lg }, style]}>
      <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <View
            key={index}
            style={{
              width: 44,
              height: 52,
              borderRadius: Radius.md,
              borderWidth: 1,
              borderColor: index < filled ? Colors.primary : Colors.outlineVariant,
              backgroundColor: Colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[Typography.headlineMd, { color: Colors.onSurface }]}>
              {digits[index] ?? ''}
            </Text>
          </View>
        ))}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        maxLength={6}
        textContentType="oneTimeCode"
        autoFocus
        style={{ position: 'absolute', opacity: 0 }}
        {...props}
      />
    </View>
  );
}
