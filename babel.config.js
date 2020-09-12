module.exports = {
  presets: [
    '@vue/app',
    ['@babel/env', { targets: { node: 8 } }],
  ],
  plugins: ['lodash'],
};
