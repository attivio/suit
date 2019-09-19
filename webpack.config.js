const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// This is the base URI for the webapp and is used when links get created for resources
// such as images and font files.
const publicPath = `/`;

module.exports = {
  // Provides a source map for use in development.
  //  https://webpack.js.org/guides/development/#using-source-maps
  devtool: 'inline-source-map',
  devServer: {
    publicPath,
    watchContentBase: true,
    open: true,
  },
  optimization: {
    // Setting optimization.minimizer overrides the defaults provided by webpack,
    //  so we must also now specify a JS minimizer.
    // https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    // Clean the /dist folder before each build
    //  https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    new CleanWebpackPlugin(),

    // Simplifies HTML file creation for dynamic hash names.
    //  https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),

// Replacement for deprecated extract-text-webpack-plugin
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    // https://github.com/Urthen/case-sensitive-paths-webpack-plugin#readme
    new CaseSensitivePathsPlugin(),
  ],
  output: {
    // Give the bundled output file a name. Use [name] for dynamically generated naming. Requires
    //  HtmlWebpackPlugin.
    filename: '[name].js',
    // Tell webpack where to put the bundled file.
    path: path.resolve(__dirname, 'app'),
    // You must set this if the app won't be served at `http://<app-url>:<port>/`.
    //  appnav is served at `/beta/ for example until its external release.
    publicPath,
  },
  module: {
    // These rules tell webpack how to load different file types. Without these, webpack can't load anything.
    //  https://webpack.js.org/guides/asset-management/#setup
    rules: [
      {
        // Tell webpack how to load style files.
        //  https://webpack.js.org/guides/asset-management/#loading-css
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Support hot-module-reload for style files in development.
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'node_modules')],
            },
          },
        ],
      },
      {
        // Tell webpack how to load images.
        //  https://webpack.js.org/guides/asset-management/#loading-images
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            // Tell webpack to use url-loader to load images.
            //  https://webpack.js.org/loaders/url-loader/#root
            loader: 'url-loader',
            options: {
              limit: 10000,
              // url-loader is not suitable for larger images. Specify a fallback for files larger 
              //  than the limit set above.
              //  https://webpack.js.org/loaders/file-loader/
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        // Tell webpack how to load font files.
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          // Tell webpack to use file-loader for font files.
          //  https://webpack.js.org/loaders/file-loader/
          'file-loader',
        ],
      },
      {
        // Tell webpack how to load xml files. 
        //  Note: JSON data loading is built into webpack and requires no loading configuration.
        // https://webpack.js.org/guides/asset-management/#loading-data
        test: /\.xml$/,
        use: [
          // Tell webpack to use xml-loader for xml files.
          // https://github.com/gisikw/xml-loader
          'xml-loader',
        ],
      },
      {
        // Tell webpack to check source files, before modification by other loaders (like babel-loader).
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        // Tell eslint to ignore node-modules.
        exclude: /node_modules/,
        // Tell webpack to use eslint-loader on js and jsx source files.
        // https://webpack.js.org/loaders/eslint-loader/#install
        loader: 'eslint-loader',
        options: {
          // The module build will fail if there are any eslint errors. Enforces best practices.
          //  https://webpack.js.org/loaders/eslint-loader/#failonerror-default-false
          failOnError: true,
        },
      },
      {
        // Tell webpack how to load javascript and JSX files.
        //  https://webpack.js.org/configuration/configuration-languages/#babel-and-jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          // Tell webpack to use babel-loader for js and jsx files.
          //  https://webpack.js.org/loaders/babel-loader/
          loader: 'babel-loader',
        },
      },
      {
        // Tell webpack how to load html pages.
        // https://webpack.js.org/loaders/html-loader/#root
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
            minimize: true,
          }
        }
      }
    ],
  },
};
