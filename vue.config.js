const webpack = require('webpack')
const path = require('path')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
  // 调整内部的 webpack 配置。
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}


function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
      ],
    })
}
