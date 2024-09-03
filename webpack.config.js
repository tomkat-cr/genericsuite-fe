const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const appLocalDomainName = process.env.APP_LOCAL_DOMAIN_NAME;

let devServerConfig = {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: process.env.FRONTEND_LOCAL_PORT || 3000,
    allowedHosts: [appLocalDomainName], // To avoid "Invalid Host header" error
};

if (process.env.REACT_APP_API_URL.includes("https://")) {
    devServerConfig.server = {
        // Enable HTTPS
        type: 'https',
        options: {
            key: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.key`)),
            cert: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.chain.crt`)),
            // ca_cert: fs.readFileSync(path.resolve(__dirname, 'ca.crt')),
            // passphrase: 'password',
        },
    };
}

console.log('devServerConfig:', devServerConfig);

module.exports = {
    mode: 'development',
    entry: './src/index.tsx', 
    // entry: './src/index.jsx', 
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                // exclude: /node_modules/,
                resolve: {
                    fullySpecified: false,
                },
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
        extensions: ['.*', '.js', '.jsx', '.tsx'],
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
            "constants": require.resolve("constants-browserify"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "./index.html",
            favicon: "./public/favicon.ico",
            manifest: "./public/manifest.json",
            publicPath: '/'
        }),
        new webpack.DefinePlugin({
            // Environment variables
            'process.env': {
                // PUBLIC_URL: JSON.stringify(`https://${appLocalDomainName}`),
                REACT_APP_VERSION: JSON.stringify(process.env.REACT_APP_VERSION || fs.readFileSync('version.txt', 'utf8')),
                REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL || `https://${appLocalDomainName}`),
                REACT_APP_DEBUG: JSON.stringify(process.env.REACT_APP_DEBUG || '0'),
                REACT_APP_URI_PREFIX: JSON.stringify(process.env.REACT_APP_URI_PREFIX || 'exampleapp_frontend'),
                REACT_APP_X_TOKEN: JSON.stringify(process.env.REACT_APP_X_TOKEN || ''),
                REACT_APP_APP_NAME: JSON.stringify(process.env.REACT_APP_APP_NAME || 'exampleapp'),
            }
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        // This solves the %PUBLIC_URL% issue in public/index.html file...
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '',
        }),
    ],
    devServer: devServerConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        clean: true,
    },
}


