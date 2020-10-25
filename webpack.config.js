// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  devtool: "source-map",
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: "development",
  // エントリーポイントの設定
  entry: "./src/js/main.js",
  // 出力の設定
  output: {
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.resolve(__dirname, "./dist"),
    // 出力するファイル名
    filename: "js/main.js",
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "img/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/main.css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebPackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),
    new HtmlWebPackPlugin({
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
