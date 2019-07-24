const webpack = require('webpack')

module.exports = {
  css: {
  },
  pluginOptions: {
  },
  devServer: {
    before (app) {
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
}
