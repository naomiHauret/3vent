const typography = {
  fontSizeMin: 1.125,
  fontSizeMax: 1.25,
  msFactorMin: 1.125,
  msFactorMax: 1.2,
  lineHeight: 1.6,
}

const screensRem = {
  min: 20,
  '2xs': 30,
  xs: 36,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
  '2xl': 85.364,
}

const fsMin = typography.fontSizeMin
const fsMax = typography.fontSizeMax
const msFactorMin = typography.msFactorMin
const msFactorMax = typography.msFactorMax
const screenMin = screensRem.min
const screenMax = screensRem['2xl']

// Calc min and max font-size
const calcMulti = (multiMin = 0, multiMax = null) => {
  return {
    fsMin: fsMin * Math.pow(msFactorMin, multiMin),
    fsMax: fsMax * Math.pow(msFactorMax, multiMax || multiMin),
  }
}

// build the clamp property
const clamp = (multiMin = 0, multiMax = null) => {
  const _calcMulti = calcMulti(multiMin, multiMax || multiMin)
  const _fsMin = _calcMulti.fsMin
  const _fsMax = _calcMulti.fsMax
  return `clamp(${_fsMin}rem, calc(${_fsMin}rem + (${_fsMax} - ${_fsMin}) * ((100vw - ${screenMin}rem) / (${screenMax} - ${screenMin}))), ${_fsMax}rem)`
}

const remToPx = (rem) => {
  return `${rem * 16}px`
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      min: remToPx(screensRem.min),
      '2xs': remToPx(screensRem['2xs']),
      xs: remToPx(screensRem.xs),
      sm: remToPx(screensRem.sm),
      md: remToPx(screensRem.md),
      lg: remToPx(screensRem.lg),
      xl: remToPx(screensRem.xl),
      '2xl': remToPx(screensRem['2xl']),
    },
    fontFamily: {
      sans: ['sans-serif'],
      mono: ['monospace'],
    },
    fontSize: {
      '3xs': clamp(-5),
      '2xs': clamp(-2),
      xs: clamp(-1),
      sm: clamp(-0.5),
      base: clamp(-0.25),
      md: clamp(0.125),
      lg: clamp(0.5),
      xl: clamp(1),
      '2xl': clamp(2),
      '3xl': clamp(3),
      '4xl': clamp(5),
    },
    extend: {
      colors: {
        white: 'white',
        black: 'black',

        base: {
          100: '#e4d8b4', //  Base color of page, used for blank backgrounds
          200: '#d2c59d', //  Base color of elements like sidebars
          300: '#c6b386', // Base color of elements like modals, popovers etc.
          400: '#6d5340',
        },
        'base-content': '#282824', // Foreground content color to use on base color

        neutral: '#7d7259',
        'neutral-focus': '#655d48',
        'neutral-content': '#e4d8b4',

        primary: {
          0: '#e5d4e5',
          100: '#D8BFD8',
          200: '#c9a6c9',
          300: '#b98cb9',
          900: '#3f273f',
        },
        secondary: {
          0: '#bfdbca',
          100: '#a4cbb4',
          200: '#8dbea1',
          300: '#75b08d',
          900: '#213a2c',
        },
        accent: {
          0: '#f3a7f3',
          100: '#ee82ee',
          200: '#e541e5',
          300: '#e121e1',
          900: '#510b51',
        },

        positive: {
          0: '#b7fcb7',
          100: '#98fb98',
          200: '#6df96d',
          300: '#2bf72b',
          900: '#022f02',
        },
        'on-positive': '#2f4f4f',

        info: {
          0: '#c8e9ed',
          100: '#b0e0e6',
          200: '#91d4dc',
          300: '#53bcc9',
          900: '#18474d',
        },
        'on-info': '#483d8b',

        warning: {
          0: '#f4edad',
          100: '#f0e68c',
          200: '#ecdf6e',
          300: '#e8d94f',
          900: '#4a440a',
        },
        'on-warning': '#d2691e',

        negative: {
          0: '#f18d8d',
          100: '#f08080',
          200: '#ec5f5f',
          300: '#e83e3e',
          900: '#520a0a',
        },
        'on-negative': '#8b0000',
      },
      keyframes: {
        appear: {
          from: {
            opacity: 0,
            transform: 'translateY(5px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        appear: 'appear 300ms ease-in forwards',
      },
      height: {
        'fit-content': 'fit-content',
      },
      width: ({ theme }) => ({
        ...theme('screens'),
        'max-content': 'max-content',
        'fit-content': 'fit-content',
        'min-content': 'min-content',
      }),
      maxWidth: ({ theme }) => ({
        ...theme('width'),
        ...theme('screens'),
        unset: 'unset',
      }),
      minWidth: ({ theme }) => ({
        ...theme('width'),
        ...theme('screens'),
        unset: 'unset',
      }),
      opacity: {
        2.5: '0.025',
        3.5: '0.035',
        7.5: '0.075',
        15: '0.15',
      },
      spacing: {
        '1ex': '1ex',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-logical'), require('@tailwindcss/typography')],
}
