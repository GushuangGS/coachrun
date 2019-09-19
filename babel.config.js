// 打包时删除console
const plugins = [];
if (process.env.NODE_ENV !== 'development') {
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
