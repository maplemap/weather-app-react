const path = require('path');
const {override, addWebpackAlias} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    mixins: path.resolve(__dirname, './src/styles/mixins.scss'),
    variables: path.resolve(__dirname, './src/styles/variables.scss'),
  }),
);
