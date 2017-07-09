/**
 * Created by yjzhme on 2017/7/3.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('../config');

function createHtmlentry(cfg) {
  const out = {};
  if (Array.isArray(cfg) && cfg.length > 0) {   // 多entry模式
    cfg.forEach(e => {
      out[e.name] =  path.resolve(__dirname, e.entry)
    });
    return out;
  }

  out.index = path.resolve(__dirname, '../app/main.jsx'); // html没有设置时生成默认entry
  return out;
}


function createHtmlPlugin(cfg) {
  if (Array.isArray(cfg) && cfg.length > 0) {  // 生成多个页面
    return cfg.map(e =>
      new HtmlWebpackPlugin({
        title: e.title,
        filename: `./${e.name}.html`,
        template: path.resolve(__dirname, '../index.html'),
        chunks: [`${e.name}`],
        inject: 'true',
      })
    );
  }
  return (  // html没有设置时默认生成index页面
    [
      new HtmlWebpackPlugin({
        title: '首页',
        filename: './index.html',
        template: path.resolve(__dirname, '../index.html'),
        inject: 'true',
      })
    ]
  );
}

function createProdHtmlPlugin(cfg) {
  if (Array.isArray(cfg) && cfg.length > 0) {  // 生成多个页面
    return cfg.map(e =>
      new HtmlWebpackPlugin({
        title: e.title,
        filename: `./${e.name}.html`,
        template: path.resolve(__dirname, '../index.html'),
        chunks: [`${e.name}`, 'vendor'],
        inject: 'true',
        chunksSortMode: 'dependency',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      })
    );
  }
  return (  // html没有设置时默认生成index页面
    [
      new HtmlWebpackPlugin({
        title: '首页',
        filename: './index.html',
        template: path.resolve(__dirname, '../index.html'),
        inject: 'true',
        chunksSortMode: 'dependency',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      })
    ]
  );
}

module.exports = {
  createHtmlentry,
  createHtmlPlugin,
  createProdHtmlPlugin,
}
