import path from 'path';
import webpack from 'webpack';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env:NodeJS.ProcessEnv, args:any[]):webpack.Configuration=>{
    require('dotenv').config({path: path.resolve(__dirname, `.env/${env.production?'production':'development'}`)});

    let moduleOutFolder = path.resolve(__dirname, `dist`);

    return {
        mode: env.production?'production':'development',
        devtool: env.production ? false : 'inline-source-map',
        entry: './src/main.ts',
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        output: {
            path: moduleOutFolder,
            publicPath: `${process.env.CDN_URL}${process.env.CDN_VERSION}/`,
            filename: env.production?'scripts/[hash].bundle.js':'scripts/[name].bundle.js',
            chunkFilename: 'scripts/[name].[chunkhash].js'
        },
        devServer:{
            contentBase: path.resolve(__dirname, 'dist'),
            compress:true,
            port:9000,
            https:true,
            stats: 'errors-only',
            watchContentBase: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title:"React Tutorials",
                template:"src/index.html"
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: env.production ? 'styles/[hash].css':'styles/[name].css',
                chunkFilename: env.production ?'styles/[id].[hash].css': 'styles/[id].css',

            }),
            new ForkTsCheckerWebpackPlugin(),
            new ManifestPlugin()
        ],
        module:{
            rules:[
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            sourceMap: !env.production
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: !env.production
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader", options: {
                                sourceMap: !env.production
                            }
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: env.production?'url-loader':'file-loader',
                            options: {
                                limit:8192,
                                name: env.production?'[hash].[ext]':'[name].[ext]',
                                outputPath:"images/"
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/, // for resolving fonts
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: env.production?'[hash].[ext]':'[name].[ext]',
                                outputPath:"fonts/"
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    use: ['json-loader']
                }
            ]
        }
    };
};