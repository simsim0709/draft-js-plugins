// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line no-var

console.log(
  'yooooo',
  path.join(__dirname, '..', 'draft-js-focus-plugin', 'src')
);

module.exports = {
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader:
          'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: [
          path.join(__dirname, '..', 'stories'),
          path.join(__dirname, '..', 'draft-js-plugins-editor', 'src'),
          path.join(__dirname, '..', 'draft-js-side-toolbar-plugin-2', 'src'),
          path.join(__dirname, '..', 'draft-js-divider-plugin', 'src'),
        ],
      },
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: [
          path.join('..', 'stories'),
          path.join(__dirname, '..', 'draft-js-plugins-editor', 'src'),
          path.join(__dirname, '..', 'draft-js-side-toolbar-plugin-2', 'src'),
          path.join(__dirname, '..', 'draft-js-divider-plugin', 'src'),
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }],
      },
    ],
  },
  resolve: {
    alias: {
      'draft-js-plugins-editor': path.join(
        __dirname,
        '..',
        'draft-js-plugins-editor',
        'src'
      ),
      'draft-js-side-toolbar-plugin-2': path.join(
        __dirname,
        '..',
        'draft-js-side-toolbar-plugin-2',
        'src'
      ),
      'draft-js-divider-plugin': path.join(
        __dirname,
        '..',
        'draft-js-divider-plugin',
        'src'
      ),
    },
  },
};
