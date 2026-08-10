/**
 * Spacing tokens — sourced from "Warm Marketplace" Stitch design system.
 * Base unit: 8px. All values are multiples of 4 or 8.
 *
 * Usage:
 *   import { Spacing, Radius } from '@/constants/spacing';
 *   style={{ padding: Spacing.cardPadding, borderRadius: Radius.lg }}
 */

// ── Spacing ────────────────────────────────────────────────────────────────
export const Spacing = {
  // Base units
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,

  // Stitch named spacing tokens
  containerMargin: 20,   // horizontal page margin on mobile
  stackGap:        16,   // vertical gap between stacked items
  inlineGap:       12,   // horizontal gap between inline items
  cardPadding:     16,   // internal padding of listing cards
  sectionPadding:  24,   // padding between major sections
} as const;

// ── Border Radius ──────────────────────────────────────────────────────────
export const Radius = {
  sm:   4,    // small chips, badges
  md:   8,    // buttons, inputs (standard)
  lg:   12,   // form inputs, selection chips
  xl:   16,   // property cards, main containers
  xxl:  24,   // large bottom sheets
  full: 9999, // pill-shaped buttons, tags
} as const;

// ── Elevation / Shadow presets ─────────────────────────────────────────────
// Use these with React Native's `shadow*` props or react-native-shadow-2
export const Shadow = {
  card: {
    shadowColor: '#151c27',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,           // Android
  },
  modal: {
    shadowColor: '#151c27',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export type SpacingToken = keyof typeof Spacing;
export type RadiusToken  = keyof typeof Radius;
export type ShadowToken  = keyof typeof Shadow;
