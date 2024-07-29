import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { WebpackConfiguration } from "webpack-dev-server";
import pkg from "./package.json";

export default (env: IAppEnv, arg: IAppArgv): WebpackConfiguration => {
  const { WEBPACK_SERVE = false } = env;
  const { mode } = arg;

  const config: WebpackConfiguration = {
    mode,
    entry: pkg.main,
    devtool: mode == "development" ? "eval-source-map" : "source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.[hash].js",
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "react-app-template",
        template: "./src/index.html",
      }),
    ],
  };

  if (WEBPACK_SERVE) {
    config.devServer = {
      port: 3000,
    };
  }

  return config;
};

interface IAppEnv {
  WEBPACK_SERVE?: boolean;
  WEBPACK_BUNDLE?: boolean;
  WEBPACK_BUILD?: boolean;
}

interface IAppArgv {
  mode: "development" | "production" | "none";
  env: IAppEnv;
}
