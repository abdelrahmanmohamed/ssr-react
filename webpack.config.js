const nodeExternals = require("webpack-node-externals");
const path = require("path");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

const sassRule = {
  test: /\.(scss)$/,
  use: [{
    loader: 'style-loader', // inject CSS to page
  }, {
    loader: 'css-loader', // translates CSS into CommonJS modules
  }, {
    loader: 'postcss-loader', // Run post css actions
    options: {
      plugins: function () { // post css plugins, can be exported to postcss.config.js
        return [
          require('precss'),
          require('autoprefixer')
        ];
      }
    }
  }, {
    loader: 'sass-loader' // compiles Sass to CSS
  }]
}

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "src/index.js"),
  },
  module: {
    rules: [js, cssRule ,sassRule],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    "home.js": path.resolve(__dirname, "src/public/home.js"),
    "app.css": path.resolve(__dirname, "src/public/app.css"),
    "masterForm.js": path.resolve(__dirname, "src/public/masterForm.js"),
    "multipleRoutes.js": path.resolve(
      __dirname,
      "src/public/multipleRoutes.js"
    ),
  },
  module: {
    rules: [js, cssRule ,sassRule],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name]",
  },
};

module.exports = [serverConfig, clientConfig];
