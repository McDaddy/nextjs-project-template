module.exports = {
  '*.{ts,tsx}': 'eslint --cache --fix --max-warnings=0',
  '**/*.ts?(x)': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,scss,css,md}': 'prettier --write',
};
