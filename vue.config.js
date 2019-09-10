const webpack = require('webpack')

module.exports = {
  // 项目部署的基础路径
  publicPath:'/vue/',
  // 将构建好的文件输出到哪里
  outputDir: 'vue',
  pluginOptions: {
  },
  devServer: {
    proxy: {
      '/api':{
        target:"http://sandbox.gotobus.com"
      },
      '/search':{
        target: 'https://search.gotobus.com/search'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ],
  },
}
