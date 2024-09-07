import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { WebpackConfiguration } from 'webpack-dev-server'
import pkg from './package.json'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default (env: IAppEnv, arg: IAppArgv): WebpackConfiguration => {
    const { WEBPACK_SERVE = false } = env
    const { mode } = arg

    const config: WebpackConfiguration = {
        mode,
        entry: pkg.main,
        devtool: mode == 'development' ? 'eval-source-map' : 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                '@src': path.resolve(__dirname, 'src')
            }
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.[fullhash].js',
            clean: true
        },

        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        mode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                                    localIdentName:
                                        mode == 'development' ? '[local]--[hash:base64:5]' : '[hash:base64:8]'
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'react-app-template',
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
            //new BundleAnalyzerPlugin()
        ]
    }

    if (WEBPACK_SERVE) {
        config.devServer = {
            port: 3000
        }
    }

    return config
}

interface IAppEnv {
    WEBPACK_SERVE?: boolean
    WEBPACK_BUNDLE?: boolean
    WEBPACK_BUILD?: boolean
}

interface IAppArgv {
    mode: 'development' | 'production' | 'none'
    env: IAppEnv
}
