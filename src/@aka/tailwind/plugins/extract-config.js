// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildMediaQuery = require('tailwindcss/lib/util/buildMediaQuery').default;

const extractConfig = plugin(({ addVariant, theme }) => {
  addVariant('aka-tailwind-extracted-config', ({ container }) => {
    // Prepare the extracted config variable
    let extractedConfig = '';

    // Breakpoints
    Object.entries(theme('screens')).forEach(([key, value]) => {
      extractedConfig = `${extractedConfig} --breakpoints-${key}:'${buildMediaQuery(value)}';`;
    });

    // Themes
    theme('aka.themes').forEach((value) => {
      extractedConfig = `${extractedConfig} --themes-${value}:'${value}';`;
    });

    // Append the extracted config
    container.append(`
            .aka-tailwind-extracted-config {
                ${extractedConfig}
            }
        `);
  });
});

module.exports = extractConfig;
