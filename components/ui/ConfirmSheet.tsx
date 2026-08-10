import { Pressable, View, Text, type ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/colors';
import { Button } from '@/components/ui/Button';

type ConfirmSheetProps = {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'primary' | 'danger';
};

export function ConfirmSheet({
  visible,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary',
}: ConfirmSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <View style={styles.sheet}>
          <Text style={[Typography.headlineMd, { color: Colors.onSurface, marginBottom: Spacing.sm }]}>
            {title}
          </Text>
          {description ? (
            <Text style={[Typography.bodyMd, { color: Colors.onSurfaceVariant, marginBottom: Spacing.lg }]}>
              {description}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', gap: Spacing.inlineGap }}>
            <Button title={cancelLabel} variant="outline" onPress={onCancel} style={{ flex: 1 }} />
            <Button
              title={confirmLabel}
              variant={variant === 'danger' ? 'outline' : 'primary'}
              onPress={onConfirm}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as ViewStyle,
  sheet: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    padding: Spacing.sectionPadding,
  } as ViewStyle,
};
