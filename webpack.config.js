const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node-modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@test': path.resolve(__dirname, 'test/'),
    },
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Garden Manager',
      template: 'assets/index.ejs',
    }),
    new FaviconsWebpackPlugin({
      logo: 'assets/favicon.png',
      favicons: {
        appName: 'Garden Manager',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          appleTouch: false,
          favicons: true,
          windows: false,
          yandex: true,
        }
      }
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'https://garden-manager.test.cloud.ra-tech.pro',
        headers: {
          host: 'garden-manager.test.cloud.ra-tech.pro',
        },
        secure: false,
      },
    ],
  },
}
