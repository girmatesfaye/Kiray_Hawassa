import { View, Text } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';
import { Button } from '@/components/ui/Button';

type NonDismissableSheetProps = {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

export function NonDismissableSheet({
  visible,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
}: NonDismissableSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={[Typography.headlineMd, { color: Colors.onSurface, marginBottom: Spacing.sm }]}>
            {title}
          </Text>
          {description ? (
            <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginBottom: Spacing.lg }]}>
              {description}
            </Text>
          ) : null}
          <Button title={confirmLabel} onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  } as ViewStyle,
  sheet: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.sheet,
    padding: Spacing.sectionPadding,
  } as ViewStyle,
};
