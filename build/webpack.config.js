const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {

  entry: {
    jim: '../lib/index.js',
    'jim.min': '../lib/index.js'
  },
  output: {
    filename: '[name].js',
    libraryExport: 'default',
    library: 'jim',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ 
        include: /\.min\.js$/, // 对.min文件进行压缩
      })
    
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}