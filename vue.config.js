const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/),
    ],
  },
  assetsDir: 'public',
  devServer: {
    host: 'localhost', // can be overwritten by process.env.HOST
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  lintOnSave: undefined,
  css: undefined,
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {
      fix: true,
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: 'static'
    },
  },
};
