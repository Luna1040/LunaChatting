const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    watch: true
  },
  devServer: {
    port: 7230,
    proxy: {
      '/api': {
        target: 'http://192.168.0.100:3000/api/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
})
