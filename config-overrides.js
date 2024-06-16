const path = require('path');
const {override, addWebpackAlias} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    mixins: path.resolve(__dirname, './src/styles/mixins.scss'),
    variables: path.resolve(__dirname, './src/styles/variables.scss'),
    breakpoints: path.resolve(__dirname, './src/styles/breakpoints.scss'),
    colors: path.resolve(__dirname, './src/styles/colors.scss'),
  }),
);
