/**
 * Design tokens — sourced directly from the "Warm Marketplace" Stitch design system.
 * Project: Kira (projects/10435915684308696377)
 * Primary: Terracotta Orange | Secondary: Deep Forest | Font: Plus Jakarta Sans
 *
 * ⚠️  Edit here only — never hardcode colors in components.
 */

export const Colors = {
  // ── Brand ─────────────────────────────────────────────────────────────────
  primary:                '#a93200',
  primaryContainer:       '#cf4510',
  onPrimary:              '#ffffff',
  onPrimaryContainer:     '#fffbff',
  primaryFixed:           '#ffdbd0',
  primaryFixedDim:        '#ffb59e',
  onPrimaryFixed:         '#390b00',
  onPrimaryFixedVariant:  '#842500',
  inversePrimary:         '#ffb59e',

  // ── Secondary (Deep Forest) ───────────────────────────────────────────────
  secondary:              '#476558',
  secondaryContainer:     '#c6e7d7',
  onSecondary:            '#ffffff',
  onSecondaryContainer:   '#4b695c',
  secondaryFixed:         '#c9eada',
  secondaryFixedDim:      '#adcebe',
  onSecondaryFixed:       '#022017',
  onSecondaryFixedVariant:'#2f4d41',

  // ── Tertiary (Almond) ─────────────────────────────────────────────────────
  tertiary:               '#605b55',
  tertiaryContainer:      '#79746d',
  onTertiary:             '#ffffff',
  onTertiaryContainer:    '#fffbff',
  tertiaryFixed:          '#e9e1d9',
  tertiaryFixedDim:       '#ccc5be',
  onTertiaryFixed:        '#1e1b17',
  onTertiaryFixedVariant: '#4a4641',

  // ── Surface ───────────────────────────────────────────────────────────────
  surface:                '#f9f9ff',
  surfaceDim:             '#d3daea',
  surfaceBright:          '#f9f9ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow:    '#f0f3ff',
  surfaceContainer:       '#e7eefe',
  surfaceContainerHigh:   '#e2e8f8',
  surfaceContainerHighest:'#dce2f3',
  surfaceVariant:         '#dce2f3',
  surfaceTint:            '#ad3300',
  inverseSurface:         '#2a313d',
  inverseOnSurface:       '#ebf1ff',

  // ── On-Surface ────────────────────────────────────────────────────────────
  onSurface:              '#151c27',
  onSurfaceVariant:       '#5a4139',

  // ── Outline ───────────────────────────────────────────────────────────────
  outline:                '#8e7168',
  outlineVariant:         '#e2bfb5',

  // ── Background ────────────────────────────────────────────────────────────
  background:             '#f9f9ff',
  onBackground:           '#151c27',

  // ── Error ─────────────────────────────────────────────────────────────────
  error:                  '#ba1a1a',
  errorContainer:         '#ffdad6',
  onError:                '#ffffff',
  onErrorContainer:       '#93000a',

  // ── Semantic shortcuts (use these in components) ──────────────────────────
  available:    '#476558',   // green — "Available" status
  featured:     '#a93200',   // terracotta — "Featured" chip
  rented:       '#605b55',   // almond — "Rented Out" status
  pending:      '#8e7168',   // outline — "Pending" status
  white:        '#ffffff',
  black:        '#000000',
  transparent:  'transparent',
} as const;

export type ColorToken = keyof typeof Colors;

export { Typography } from './typography';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
} as const;
