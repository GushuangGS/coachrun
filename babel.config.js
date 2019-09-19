// // 打包时删除console
// const plugins = [];
// // if (process.env.NODE_ENV !== 'development') {
// if (['production', 'sandbox'].includes(process.env.NODE_ENV)){
//   plugins.push("transform-remove-console")
// }

const plugins = ["@vue/babel-plugin-transform-vue-jsx"]
if(process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: plugins,
  // plugins: [
  //   [
  //     "component",
  //     {
  //       "libraryName": "element-ui",
  //       "styleLibraryName": "theme-chalk"
  //     }
  //   ],
  //   transformRemoveConsolePlugin
  // ]
}
