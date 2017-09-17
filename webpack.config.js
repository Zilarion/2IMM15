const path              = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir       = path.resolve(__dirname, 'public');
const frontendSource = path.resolve(__dirname, 'app');
const staticDir      = path.resolve(__dirname, 'static');

module.exports = function(env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const frontend = {
        // Use detailed source maps in production for debugging purposes, use fast ones for development.
        devtool: 'sourcemap', //isProd ? 'source-map' : 'eval-source-map',

        // Start at these less and tsx files
        entry: [
            frontendSource + '/index.tsx'
        ],
        // Output javascript to frontend.js and css here into buildDir
        output: {
            path: buildDir,
            filename: 'frontend.js'
        },

        // Define specific loaders for each file
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                // Static files
                {
                    test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
                    include: staticDir,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[name]-[hash:8].[ext]'
                        }
                    }
                }
            ]
        },

        // Resolve from these modules
        resolve: {
            alias:{
                app: frontendSource,
                static: staticDir
            },
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },

        // Use these plugins to do that
        plugins: [
            new HtmlWebpackPlugin({
                template: frontendSource + '/index.ejs',
                inject: false
            }),
            new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
                disable: !isProd
            })
        ]
    };
    return module.exports = frontend;
};
