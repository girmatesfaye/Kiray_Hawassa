/**
 * Typography tokens — sourced from "Warm Marketplace" Stitch design system.
 * Font family: Plus Jakarta Sans (all roles: headline, body, label)
 *
 * Usage in components:
 *   import { Typography } from '@/constants/typography';
 *   style={Typography.headlineXl}
 *
 * Real font files bundled:
 *   PlusJakartaSans-Regular.ttf  → FontFamily.regular
 *   PlusJakartaSans-Medium.ttf   → FontFamily.medium
 *   PlusJakartaSans-SemiBold.ttf → FontFamily.semiBold
 *   PlusJakartaSans-Bold.ttf     → FontFamily.bold
 * Each is registered individually in app/_layout.tsx via useFonts().
 */

import { TextStyle } from 'react-native';

// Font family names — must match exactly what's loaded via expo-font.
// Only the regular face is loaded; all other weights use fontWeight synthesis.
export const FontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
} as const;

// Type scale — maps exactly to Stitch typography tokens
export const Typography = {
  headlineXl: {
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.02 * 32, // -0.02em
  } satisfies TextStyle,

  headlineLg: {
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.01 * 24, // -0.01em
  } satisfies TextStyle,

  headlineLgMobile: {
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
  } satisfies TextStyle,

  headlineMd: {
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  } satisfies TextStyle,

  bodyLg: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,

  bodyMd: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,

  // Amharic body — slightly taller line height for Ge'ez script
  bodyAmharic: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 28, // ~15% taller than bodyLg
  } satisfies TextStyle,

  labelLg: {
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,

  labelMd: {
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  } satisfies TextStyle,

  // Price / metadata label — uppercase with tracking
  labelCaps: {
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.05 * 12, // 0.05em
    textTransform: 'uppercase' as const,
  } satisfies TextStyle,
} as const;


export type TypographyToken = keyof typeof Typography;
