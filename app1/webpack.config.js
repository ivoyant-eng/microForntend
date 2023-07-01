const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  devServer: {
    port: 8083,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
    ],
  },
  // Logic for Exposing the Components
  plugins: [
    new ModuleFederationPlugin({
      name: "MFE1",
      filename: "remoteEntry.js",
      exposes: {
        "./MyButton": "./src/MyButton",
        "./TaskCreation": "./src/TaskCreation",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
        },
        ["react-dom"]: {
          eager: true,
        },
      },
      remotes: {
        MFE3: "MFE3@http://localhost:8081/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
