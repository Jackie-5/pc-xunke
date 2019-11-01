/**
 * Created by Jackie.Wu on 2017/8/24.
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  mode: env,
  resolve: {
    extensions: ['*', '.js', '.jsx', 'json'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new WebpackBar(),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    }),
  ],
  externals: {
    'axios': 'axios',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'dayjs': 'dayjs',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: path.resolve(process.cwd(), 'node_modules'),
        use: ['babel-loader'],
      }, {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-normalize')({ browsers: ['last 2 versions'] }),
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: require(path.join(process.cwd(), 'theme')),
              javascriptEnabled: true,
            },
          },
        ],
      }, {
        test: /\.(jpg|jpeg|gif|png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
              publicPath: env === 'development' ? '' : '../'
            }
          }
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
              publicPath: env === 'development' ? '' : '../'
            }
          }
        ]
      }]
  },
  optimization: {
    splitChunks: {
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          name: "vendor",
          minSize: 1000,
          minChunks: 3,
          chunks: "initial",
        }
      },
    }
  },
};
