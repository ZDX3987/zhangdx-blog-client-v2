const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        //target: 'http://8.129.0.113:8888/',
        target: 'http://localhost:8888/',
        changeOrign: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
})
