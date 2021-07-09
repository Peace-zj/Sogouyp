module.exports = {
  devServer: {
    proxy: {
      '/sgsg': {
        target: 'https://mall.sogou.com',
        pathRewrite: {
          '^/sgsg': ''
        },
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}
