module.exports = {
  'src/**/*.{js,ts,jsx,tsx}': [
    // lint
    'eslint',
    // check types
    () => 'tsc -p ./tsconfig.json',
  ],
  'src/**/*.{scss}': [
    // stylelint
    'stylelint',
  ],
};
