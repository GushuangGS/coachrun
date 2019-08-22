const webpack = require('webpack')

module.exports = {
  // 项目部署的基础路径
  publicPath:'/',
  // 将构建好的文件输出到哪里
  outputDir: 'vue',
  pluginOptions: {
  },
  devServer: {
    
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
