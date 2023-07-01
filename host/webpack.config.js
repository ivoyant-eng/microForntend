const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 8081,
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
  plugins: [
    new ModuleFederationPlugin({
      name: "MFE3",
      filename: "remoteEntry.js",
      remotes: {
        MFE1: "MFE1@http://localhost:8083/remoteEntry.js",
        MFE2: "MFE2@http://localhost:8082/remoteEntry.js",
        MFE3: "MFE3@http://localhost:8081/remoteEntry.js", // Needed to sync the store
      },
      exposes: {
        "./store": "./src/store",
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
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
