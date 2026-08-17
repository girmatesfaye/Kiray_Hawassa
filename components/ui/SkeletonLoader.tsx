/**
 * SkeletonLoader — shimmer placeholder for loading states.
 * Uses react-native-reanimated for hardware-accelerated shimmer.
 * Usage:
 *   <SkeletonLoader width={200} height={16} radius={8} />
 *   <SkeletonLoader.Card />
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

type SkeletonProps = {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: object;
};

export function SkeletonLoader({ width = '100%', height = 16, radius = 8, style }: SkeletonProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1100, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.35, 0.8, 0.35]),
  }));

  return (
    <Animated.View
      style={[
        shimmerStyle,
        {
          width: width as number,
          height,
          borderRadius: radius,
          backgroundColor: '#E2E8F0',
        },
        style,
      ]}
    />
  );
}

/** Pre-built skeleton for a standard listing/lead card */
SkeletonLoader.Card = function SkeletonCard() {
  return (
    <View style={styles.card}>
      <SkeletonLoader height={140} radius={12} style={{ marginBottom: 12 }} />
      <SkeletonLoader height={14} width="70%" radius={6} style={{ marginBottom: 8 }} />
      <SkeletonLoader height={11} width="50%" radius={6} style={{ marginBottom: 12 }} />
      <View style={styles.row}>
        <SkeletonLoader height={11} width="35%" radius={6} />
        <SkeletonLoader height={11} width="28%" radius={6} />
      </View>
    </View>
  );
};

/** Pre-built skeleton for a lead list row */
SkeletonLoader.Row = function SkeletonRow() {
  return (
    <View style={styles.row2}>
      <View style={{ flex: 1 }}>
        <SkeletonLoader height={13} width="60%" radius={6} style={{ marginBottom: 6 }} />
        <SkeletonLoader height={10} width="40%" radius={6} />
      </View>
      <SkeletonLoader height={24} width={80} radius={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
});
