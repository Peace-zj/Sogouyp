module.exports = {
  devServer: {
    proxy: {
      '/heihei': {
        target: 'https://mall.sogou.com',
        pathRewrite: {
          '^/heihei': ''
        },
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}
