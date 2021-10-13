const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#722ED1',
          900: '#22075E',
          300: '#D3ADF7',
          100: '#F9F0FF',
        },
        error: '#F5222D',
        warning: '#FAAD14',
        success: '#52C41A',
        red: '#F5222D',
        yellow: '#FAAD14',
        purple: {
          DEFAULT: '#722ED1',
          900: '#22075E',
          300: '#D3ADF7',
          100: '#F9F0FF',
          '100-transparent': '#F9F0FF00',
        },
        blue: {
          DEFAULT: '#1890FF',
          900: '#003A8C',
          300: '#91D5FF',
          100: '#E6F7FF',
        },
        cyan: {
          DEFAULT: '#13C2C2',
          900: '#00474F',
          300: '#87E8DE',
          100: '#E6FFFB',
        },
        orange: {
          DEFAULT: '#FA541C',
          900: '#871400',
          300: '#FFBB96',
          100: '#FFF2E8',
        },
        green: {
          DEFAULT: '#52C41A',
          900: '#135200',
          300: '#B7EB8F',
          100: '#F6FFED',
        },
        dark: {
          DEFAULT: '#111111',
          1: '#333333',
          2: '#626262',
          3: '#929292',
          4: '#D9D9D9',
          5: '#ECECEC',
          6: '#FCFCFC',
        },
        white: {
          DEFAULT: '#FFFFFF',
          1: '#DBDBDB',
          2: '#A8A8A8',
          3: '#757575',
          4: '#D9D9D9',
        },
      },
      fontFamily: {
        log: ['Menlo', 'PingFangSC-Regular', 'Consolas', 'Courier', 'monospace'],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
      },
      width: {
        fit: 'fit-content',
      },
      height: {
        '1/10': '10%',
        '3/10': '30%',
        '7/10': '70%',
        '9/10': '90%',
        fit: 'fit-content',
      },
      boxShadow: {
        0.5: '0 2px 6px 0 rgba(0, 0, 0, 0.08)',
        '0.5-y': '0 -2px 6px 0 rgba(0, 0, 0, 0.08)',
        1: '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
        '1-y': '-4px 0 12px 0 rgba(0,0,0,0.08)',
        2: '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      padding: ['first', 'last'],
      backgroundColor: ['active'],
      colors: ['active'],
      boxShadow: ['active'],
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.not-allowed': {
          color: '#00000066',
          cursor: 'not-allowed',
        },
        '.border-all': {
          border: '1px solid #00000019',
        },
        '.border-top': {
          'border-top': '1px solid #00000019',
        },
        '.border-bottom': {
          'border-bottom': '1px solid #00000019',
        },
        '.border-left': {
          'border-left': '1px solid #00000019',
        },
        '.border-right': {
          'border-right': '1px solid #00000019',
        },
        '.border-dashed': {
          borderStyle: 'dashed',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx', './src/**/*.ts'],
    safelist: [
      'bg-red',
      'bg-blue',
      'bg-yellow',
      'bg-green',
      'bg-orange',
      'bg-gray',
      'bg-cyan',
      'bg-white',
      'bg-purple',
      'bg-success',
      'bg-blue-300',
      'bg-orange-300',
      'bg-dark-2',
      'bg-green-300',
      'bg-dark-4',
      'bg-dark-5',
      'grid-cols-1',
      'grid-cols-2',
      'grid-cols-3',
      'grid-cols-4',
      'grid-cols-5',
    ],
  },
};
