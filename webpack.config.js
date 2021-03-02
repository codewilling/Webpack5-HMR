//webpack
//webpack-cli if passing variables at command line prompts or npm start instructions
//webpack-dev-server to for spinning up development server
// @babel/core is the Babel compiler core.
// @babel/preset-env is a preset that allows you to use the latest JavaScript without needing to worry about what transformations/polyfills are needed for browser support.
// @babel/preset-react is a wrapper around several transformations that enable JSX support and more.
// babel-loader is a plugin for Webpack to instruct Webpack to use Babel.
//  clean-webpack-plugin Webpack plugin to clean up the dist folder before each build if using contentHash naming for cache busting
// html-webpack-plugin to inject script tags for our JavaScript bundle because a production build JavaScript file will have a random file name, for cache busting.
// html-loader also so we can handle HTML files.
// cross-env makes using environment variables across different operating systems seamless.
// node-sass provides binding for Node.js to LibSass, a Sass compiler.
// sass-loader is a loader for Webpack for compiling SCSS/Sass files.
// style-loader injects our styles into our DOM.
// css-loader interprets @import and @url() and resolves them.
// mini-css-extract-plugin extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.
// file-loader resolves your imports and copies the file to the output directory (usually with a randomly generated name, for cache busting)
// image-webpack-loader processes the images using another package called imagemin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  //entry needed for hmr
  entry: {
    app: "./src/index.tsx",
  },
  //i dont think output option is used for hmr?
  output: {
    filename: isDevelopment ? "[name].js" : "[name].[contenthash].js",
    //when specifying 'output' in webpack 5 you now need to specify the path
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[contenthash].css",
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              // ... other options
              plugins: [
                // ... other plugins
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: !isDevelopment },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: isDevelopment
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
          },
          // Translates CSS into CommonJS
          //css-loader needs to be called before 'sass-loader'
          "css-loader",
          {
            // Compiles Sass to CSS
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: isDevelopment
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  },
};
