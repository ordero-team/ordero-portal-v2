// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

const buttonSize = plugin(
  ({ addUtilities, theme, e, variants }) => {
    const values = theme('buttonSize');

    addUtilities(
      Object.entries(values).map(([key, value]) => ({
        [`.${e(`button-size-${key}`)}`]: {
          width: 'auto',
          height: value,
          minWidth: value,
          minHeight: value,
        },
      })),
      variants('buttonSize')
    );
  },
  {
    theme: {
      buttonSize: {
        base: '40px',
        lg: '60px',
      },
    },
    variants: {
      buttonSize: ['responsive'],
    },
  }
);

module.exports = buttonSize;
