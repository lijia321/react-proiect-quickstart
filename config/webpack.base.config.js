'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口起点
    entry: {
        app: './src/index.js',
    },
    // 解析
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
			
		}
    },
    // loader
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,// 屏蔽不需要处理的文件（文件夹）（可选）
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html',
            inject: 'body'
        })
    ]
};
