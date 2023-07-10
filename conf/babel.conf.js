module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-transform-async-to-generator', {}],
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    ['@babel/plugin-syntax-dynamic-import'],
  ],
};
