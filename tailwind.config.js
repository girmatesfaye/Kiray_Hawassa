/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ── Colors (Stitch "Warm Marketplace") ───────────────────────────────
      colors: {
        // Brand
        primary: {
          DEFAULT:   '#a93200',
          container: '#cf4510',
          fixed:     '#ffdbd0',
          dim:       '#ffb59e',
          inverse:   '#ffb59e',
        },
        'on-primary': {
          DEFAULT:   '#ffffff',
          container: '#fffbff',
          fixed:     '#390b00',
          'fixed-variant': '#842500',
        },

        // Secondary (Deep Forest)
        secondary: {
          DEFAULT:   '#476558',
          container: '#c6e7d7',
          fixed:     '#c9eada',
          dim:       '#adcebe',
        },
        'on-secondary': {
          DEFAULT:   '#ffffff',
          container: '#4b695c',
          fixed:     '#022017',
          'fixed-variant': '#2f4d41',
        },

        // Tertiary (Almond)
        tertiary: {
          DEFAULT:   '#605b55',
          container: '#79746d',
        },
        'on-tertiary': {
          DEFAULT:   '#ffffff',
          container: '#fffbff',
        },

        // Surface
        surface: {
          DEFAULT:  '#f9f9ff',
          dim:      '#d3daea',
          bright:   '#f9f9ff',
          low:      '#f0f3ff',
          DEFAULT2: '#e7eefe',  // container
          high:     '#e2e8f8',
          highest:  '#dce2f3',
          variant:  '#dce2f3',
          tint:     '#ad3300',
        },
        'on-surface': {
          DEFAULT: '#151c27',
          variant: '#5a4139',
        },
        'inverse-surface': '#2a313d',
        'inverse-on-surface': '#ebf1ff',

        // Background
        background: '#f9f9ff',
        'on-background': '#151c27',

        // Outline
        outline: {
          DEFAULT: '#8e7168',
          variant: '#e2bfb5',
        },

        // Error
        error: {
          DEFAULT:   '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT:   '#ffffff',
          container: '#93000a',
        },

        // Semantic shortcuts for status chips
        available: '#476558',
        featured:  '#a93200',
        rented:    '#605b55',
        pending:   '#8e7168',
      },

      // ── Font Family (Plus Jakarta Sans) ───────────────────────────────────
      fontFamily: {
        sans:       ['PlusJakartaSans-Regular'],
        medium:     ['PlusJakartaSans-Medium'],
        semibold:   ['PlusJakartaSans-SemiBold'],
        bold:       ['PlusJakartaSans-Bold'],
        extrabold:  ['PlusJakartaSans-ExtraBold'],
      },

      // ── Font Size (Stitch type scale) ─────────────────────────────────────
      fontSize: {
        'label-md':      ['12px', { lineHeight: '16px' }],
        'label-lg':      ['14px', { lineHeight: '20px' }],
        'body-md':       ['14px', { lineHeight: '20px' }],
        'body-lg':       ['16px', { lineHeight: '24px' }],
        'headline-md':   ['20px', { lineHeight: '28px' }],
        'headline-lg':   ['24px', { lineHeight: '32px' }],
        'headline-lg-m': ['28px', { lineHeight: '36px' }],
        'headline-xl':   ['32px', { lineHeight: '40px' }],
      },

      // ── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        sm:     '4px',
        md:     '8px',    // standard: buttons, inputs
        lg:     '12px',   // chips, selection
        card:   '16px',   // property cards
        sheet:  '24px',   // bottom sheets
        full:   '9999px', // pill buttons, tags
      },

      // ── Spacing (Stitch named tokens) ─────────────────────────────────────
      spacing: {
        'container': '20px',   // containerMargin
        'stack':     '16px',   // stackGap
        'inline':    '12px',   // inlineGap
        'card':      '16px',   // cardPadding
        'section':   '24px',   // sectionPadding
      },
    },
  },
  plugins: [],
};

