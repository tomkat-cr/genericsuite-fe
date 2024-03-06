const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const appLocalDomainName = process.env.APP_LOCAL_DOMAIN_NAME;

module.exports = {
    mode: 'development',
    entry: './src/index.tsx', 
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.svg$/, // Match SVG files
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]' // Output path for the SVG files
                }
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        fallback: { 
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "vm": require.resolve("vm-browserify"),
            "tty": require.resolve("tty-browserify"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: "./public/favicon.ico",
            filename: "index.html",
            manifest: "./public/manifest.json",
            publicPath: '/'
        }),
        new webpack.DefinePlugin({
            // Environment variables
            'process.env': {
                PUBLIC_URL: JSON.stringify(`https://${appLocalDomainName}`),
                REACT_APP_VERSION: JSON.stringify(process.env.REACT_APP_VERSION || fs.readFileSync('version.txt', 'utf8')),
                REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL || `https://${appLocalDomainName}`),
                REACT_APP_DEBUG: JSON.stringify(process.env.REACT_APP_DEBUG || '0'),
                REACT_APP_URI_PREFIX: JSON.stringify(process.env.REACT_APP_URI_PREFIX || 'exampleapp_frontend'),
                REACT_APP_X_TOKEN: JSON.stringify(process.env.REACT_APP_X_TOKEN || ''),
                REACT_APP_APP_NAME: JSON.stringify(process.env.REACT_APP_APP_NAME || 'exampleapp'),
                REACT_APP_GENERIC_SUITE_AI_PATH: JSON.stringify(process.env.REACT_APP_GENERIC_SUITE_AI_PATH || ''),
            }
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }), 
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        // Run with SSL, to unblock browser's resources like the Camera and Mic
        // SSL certificates for your local development server are required:
        //    $ openssl req -x509 -newkey rsa:4096 -keyout app.exampleapp.local.key -out app.exampleapp.local.crt -days 365
        //         or
        //    $ make create_ssl_certs
        compress: true,
        port: 3000,
        // Enable HTTPS
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.key`)),
                // cert: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.crt`)),
                cert: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.chain.crt`)),
                // ca_cert: fs.readFileSync(path.resolve(__dirname, 'ca.crt')),
                // passphrase: 'password',
            },
        },
        allowedHosts: [appLocalDomainName], // To avoid "Invalid Host header" error
    },
    externals: {
        // global app config object
        // config: JSON.stringify({
        //     apiUrl: `http://${appLocalDomainName}:5000`,
        // })
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        clean: true,
    },
}


