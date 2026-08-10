import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Typography } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={Colors.onSurface}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <Text style={Typography.labelLg}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.inlineGap,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  content: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
});
