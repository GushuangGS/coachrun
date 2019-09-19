const webpack = require('webpack')

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
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development'){
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        })
      );
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true, // console
      //         drop_console: true
      //         // pure_funcs:['console.log'] // 移除console
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   })
      // );
    }
  }
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'windows.jQuery': 'jquery'
  //     })
  //   ],
  // },
}
