'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "production",
  // 调试工具
  devtool: 'source-map',
  // 输出
  output: {
    filename: "js/[name].[contentHash].js",
    // 通过splitChunks抽离的js文件名格式
    chunkFilename: "js/[name].[contentHash].chunk.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // loader是从后往前加载的，postcss-loader在less-loader前面
        use: [
          MiniCssExtractPlugin.loader,
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
        test: /\.(png|jpg|jpeg|svg|gif)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000, // size <= 20KB
              name: 'img/[name].[hash:8].[ext]',
              publicPath:'./'
            }
          }
        ]
      },

    ]
  },
  // 插件
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contentHash].css",
      chunkFilename: "css/[id].[contentHash].css"
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  // 代码分离相关
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin({ sourceMap: true }),
      new HtmlWebpackPlugin({
        template: "index.template.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      })
    ],
    // minimizer: [new UglifyJSPlugin()],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: "all",
      // 最大初始请求数量
      maxInitialRequests: Infinity,
      // 抽离体积大于80kb的chunk
      minSize: 80 * 1024,
      // 抽离被多个入口引用次数大于等于1的chunk
      minChunks: 1,
      cacheGroups: {
        // 抽离node_modules下面的第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // 从模块的路径地址中获得库的名称
          name: function (module, chunks, chacheGroupKey) {
           
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            console.log('packageName', packageName)
            return `vendor_${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
});
