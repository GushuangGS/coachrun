let transformRemoveConsolePlugin = ["@vue/babel-plugin-transform-vue-jsx"]
if (process.env.NODE_ENV === 'production') {
  transformRemoveConsolePlugin = ['transform-remove-console']
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
    ],
    transformRemoveConsolePlugin
  ]
}
