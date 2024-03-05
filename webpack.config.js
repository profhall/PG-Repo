const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const singleSpaDefaults = require('webpack-config-single-spa-react');
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'wendell',
    projectName: 'wend',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {

    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modules: [
        './node_modules'
      ]        
  },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        // ... other rules
        {
          test: /\.css$/,
          use: [
            // 'style-loader', 
            MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        },
      ],
    },
    // ... any other customizations
  });
};