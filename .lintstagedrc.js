module.exports = {
  'src/**/*.(ts|js)?(x)': ['eslint --cache --fix', 'prettier --write'],
  'src/**/*.(html)': [
    'prettier --write "src/app/**/*.component.html" --parser angular --html-whitespace-sensitivity ignore',
  ],
  // 'src/**/*.(css|scss|less)': ['stylelint --fix'],
};
