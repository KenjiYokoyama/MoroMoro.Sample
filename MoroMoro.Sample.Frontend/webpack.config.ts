import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const IS_DEV = (process.env.NODE_ENV === "development");

const config: webpack.Configuration = {
    mode: !IS_DEV ? "production" : "development",
    devtool: !IS_DEV ? false : "source-map",
    entry: [
        "./src/client/index.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".styl"],
        modules: [
            path.resolve(__dirname, "src/client"),
            path.resolve(__dirname, "node_modules")
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "react-hot-loader/webpack",
                    "ts-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: IS_DEV,
                            modules: {
                                localIdentName: !IS_DEV ? "[hash:base32]" : "[path][name]__[local]",
                            }
                        }
                    },
                    "stylus-loader"
                ]
            },
            {
                test: {
                    not: [
                        /\.html?$/,
                        /\.jsx?$/,
                        /\.tsx?$/,
                        /\.styl$/
                    ]
                },
                use: {
                    loader: "url-loader",
                    options: {
                        /* Every file exceeding the size limit is deployed as a file with a name of the indicated rule. */
                        limit: 51200,
                        name: !IS_DEV ? "[hash:base32].[ext]" : "[path][name].[ext]"
                    }
                }
            },
            {
                test: /favicon\.ico$/,
                use: "file-loader?name=[name].[ext]"
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
        }),
        new HtmlWebpackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html"
        })
    ]
};

export default config;
