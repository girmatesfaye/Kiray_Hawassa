import { View, Text, type ViewProps } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/colors';

type StepIndicatorProps = ViewProps & {
  steps: string[];
  currentStep: number;
};

export function StepIndicator({ steps, currentStep, style }: StepIndicatorProps) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm }, style]}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <View key={step} style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: isComplete || isActive ? Colors.primary : Colors.surfaceContainerHigh,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  Typography.labelMd,
                  {
                    color: isComplete || isActive ? Colors.onPrimary : Colors.onSurfaceVariant,
                  },
                ]}>
                {index + 1}
              </Text>
            </View>
            <Text
              style={[
                Typography.labelMd,
                {
                  color: isActive ? Colors.primary : Colors.onSurfaceVariant,
                  marginTop: Spacing.xs,
                  textAlign: 'center',
                },
              ]}>
              {step}
            </Text>
            {index < steps.length - 1 && (
              <View
                style={{
                  position: 'absolute',
                  top: 14,
                  left: '60%',
                  right: '-40%',
                  height: 1,
                  backgroundColor: isComplete ? Colors.primary : Colors.outlineVariant,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
