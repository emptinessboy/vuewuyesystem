// vue.config.js
module.exports = {
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       prependData: `@import "~@/style/style.scss";`
  //     }
  //   }
  // },
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8081,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/remoapi': {
        target: 'http://127.0.0.1:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/remoapi': ''
        }
      }
    }
  },

  lintOnSave: false
};
