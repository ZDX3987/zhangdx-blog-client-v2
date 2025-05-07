const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.113.97.58:8888/',
        // target: 'http://localhost:8888/',
        changeOrign: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
})
