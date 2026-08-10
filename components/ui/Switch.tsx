import { Colors } from '@/constants/colors';
import { Switch as NativeSwitch } from 'react-native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function Switch({ value, onValueChange }: SwitchProps) {
  return (
    <NativeSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
      thumbColor={value ? Colors.primary : Colors.onSurfaceVariant}
    />
  );
}
