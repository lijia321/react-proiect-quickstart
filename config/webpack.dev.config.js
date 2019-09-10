'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "development",
  // 调试工具
  devtool: 'inline-source-map',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  // 开发服务器
  devServer: {
    contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    compress: true,// 启用gzip压缩
    inline: true,// 设置为true，当源文件改变时会自动刷新页面
    hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
    // host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
    port: 8703,// 设置默认监听端口，如果省略，默认为“8080”,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // loader是从后往前加载的，postcss-loader在less-loader前面
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: { "@primary-color": "blue" },
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {loader:'url-loader',
          options: {
            limit: 20000, // size <= 20KB
          }}
        ]
      },

    ]
  },
  // 插件
  plugins: [
    // 热更新相关
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    nodeEnv: 'development',
  }
});
