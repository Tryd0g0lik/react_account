const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// const { merge } = require("webpack-merge");
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
// const CopyPlugin = require("copy-webpack-plugin");
// const webpackFront = require("./src/frontend/webpack.config.js");

// module.exports = webpackFront, {
module.exports = {
  entry: './src/index.ts',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, './dist'), // '../static'
    filename: 'main-[id]-[hash].js',
    publicPath: '/',
    clean: true
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          // path.resolve(__dirname, "src/backend"),
        ]

      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',

        ],

      },
      // {
      //   test: /\.svg$/,
      //   include: path.resolve(__dirname, 'src/pic'),

      //   type: 'asset/inline',
      //   generator: {
      //     filename: 'pic/svg/[name][ext]',
      //   },

      // },

      /*{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../pic/[name][ext]',
        },
      },*/
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '../fonts/[name][ext]'  // [hash][ext][query]'
      //   }
      // },

    ]
  },

  plugins: [
    new Dotenv(),
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),

    new SpriteLoaderPlugin(), // svg

    new HtmlWebpackPlugin({
      template: 'src/public/index.html' //'../templates/index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: './dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: path.resolve(__dirname, 'src'),

    }),

    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist/frontend'), // '../static'

    },
    watchFiles: [
      'dist',
    ],
    hot: true, // Включение горячей перезагрузки
    liveReload: true, // Включение live-reload

    compress: true,
    historyApiFallback: true
    // open: true, // Автоматическое открытие браузера
    // port: 8080
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "dist")
    ],

    alias: {
      // "@Interfaces": [
      //   path.resolve(__dirname, "src/frontend/src/account/interfaces.ts")
      // ],
      // "@Components": [
      //   path.resolve(__dirname, "src/frontend/src/account/components")
      // ],
      // "@Services": [
      //   path.resolve(__dirname, "src/frontend/src/account/services")
      // ],
      // "@Logs": [path.resolve(__dirname, "src/backend/src/server/logs/index.ts")],
      //     // "@Interfaceback": [
      //     //   path.resolve(__dirname, "src/backend/src/server/interfaces.ts"),
      //     // ]

    }
  },

};

