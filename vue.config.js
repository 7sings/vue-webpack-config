const { resolve } = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('extract-css').tap(() => [{
      filename: 'css/[name].[contenthash:6].css',
    }]);
  },
  configureWebpack: {
    optimization: {
      minimize: false,
    },
    output: {
      chunkFilename: '[name].[contenthash:6].js',
      filename: '[name].[hash:6].js',
      path: resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      }],
    },
  },
  // chainWebpack: config => {
  //     if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //         config.plugin('webpack-bundle-analyzer')
  //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  //     } else {
  //     // 为开发环境修改配置...
  //     }
  // }

};
