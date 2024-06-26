const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./sw.js",
      }),
      new WebpackPwaManifest({
        start_url: "./",
        publicPath: "./",
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Progressive Web App text editor",
        background_color: "#ffffff",
        orientation: "portrait",
        display: "standalone",
        fingerprints: false,
        favicon: "./favicon.ico",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            destination: path.join("assets", "icons"),

            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
      // new CopyWebpackPlugin({
      //   patterns: [{ from: "./favicon.ico", to: "./" }],
      // }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   type: "asset/resource",
        // },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
