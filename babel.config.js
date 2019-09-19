// 打包时删除console
const plugins = [];
// if (process.env.NODE_ENV !== 'development') {
  if (['production', 'sandbox'].includes(process.env.NODE_ENV)){
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/app',
    {
      "useBuiltIns": "entry",
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }
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
