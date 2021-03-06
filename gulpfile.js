var gulp              = require('gulp');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path              = require('path');
var WebpackDevServer  = require("webpack-dev-server");
var webpack           = require('webpack')
var gutil             = require('gutil')
var del               = require('del');





var absPath = function(pathString){
    return path.join(__dirname, pathString);
}



var config = {
    entry: {
        client : "./src/index.js"
    },
    output: {
        path          : absPath("/dist"),
        filename      : "[chunkhash].js",
        chunkFilename : "[id].[chunkhash].js"
    },
    module: {
        loaders: [
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
                loader: "url-loader?limit=10000"
            },
        ]
    },
    resolve: {
        alias: {
            // fluxmax         : absPath('../../src/index'),
            'event-emitter' : 'wolfy87-eventemitter',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : './index.html',
        })
    ],
    devtool: 'eval',
    debug: true,
}



gulp.task("default", ["webpack-dev-server"]);
gulp.task("webpack-dev-server", function(callback){

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(config), {
        contentBase : './dist',
        stats: {
            colors: true
        },
        watch: true,
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task("build", function(callback){
    console.log(absPath('./dist/**'))
    del(absPath('./dist/**'));
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
    });
});
