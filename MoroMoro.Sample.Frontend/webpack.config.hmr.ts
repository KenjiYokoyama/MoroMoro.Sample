import * as webpack from "webpack";
import * as merge from "webpack-merge";
import config from "./webpack.config";
import "webpack-dev-server";

const hmrConfig: webpack.Configuration = merge(config, {
    devServer: {
        host: "localhost",
        port: 8080,
        contentBase: "src/client",
        historyApiFallback: true,
        inline: true,
        hot: true,
        open: false
    }
});

export default hmrConfig;
