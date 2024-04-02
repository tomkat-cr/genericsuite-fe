/* config-overrides.js | react-app-rewired */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const appLocalDomainName = process.env.APP_LOCAL_DOMAIN_NAME;

module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
      // ...add your webpack config
      return config;
    },
    // The Jest config to use when running your jest tests - note that the normal rewires do not
    // work here.
    jest: function(config) {
      // ...add your jest config customisation...
      // Example: enable/disable some tests based on environment variables in the .env file.
      if (!config.testPathIgnorePatterns) {
        config.testPathIgnorePatterns = [];
      }
      if (!process.env.RUN_COMPONENT_TESTS) {
        config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
      }
      if (!process.env.RUN_REDUCER_TESTS) {
        config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
      }
      return config;
    },
    // The function to use to create a webpack dev server configuration when running the development
    // server with 'npm run start' or 'yarn start'.
    // Example: set the dev server to use a specific certificate in https.
    devServer: function(configFunction) {
      // Return the replacement function for create-react-app to use to generate the Webpack
      // Development Server config. "configFunction" is the function that would normally have
      // been used to generate the Webpack Development server config - you can use it to create
      // a starting configuration to then modify instead of having to create a config from scratch.
      return function(proxy, allowedHost) {
        // Create the default config by calling configFunction with the proxy/allowedHost parameters
        const config = configFunction(proxy, allowedHost);
        config.allowedHosts = [appLocalDomainName, "localhost", "127.0.0.1"]; // To avoid "Invalid Host header" error
        config.historyApiFallback = true;
        config.hot = true;
        config.compress = true;
        config.port = process.env.FRONTEND_LOCAL_PORT || 3000;

        if (process.env.REACT_APP_API_URL.includes("http://")) {
          config.https = false;
        } else {
          // Change the https certificate options to match your certificate, using the .env file to
          // set the file paths & passphrase.
          config.https = {
            key: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.key`), 'utf8'),
            cert: fs.readFileSync(path.resolve(__dirname, `${appLocalDomainName}.chain.crt`), 'utf8'),
            ca: fs.readFileSync(path.resolve(__dirname, 'ca.crt'), 'utf8'),
            passphrase: process.env.REACT_HTTPS_PASS
          };
        }

        // Return your customised Webpack Development Server config.
        return config;
      };
    },

    plugins: function(config, env) {
        config.plugins = [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
                favicon: "./public/favicon.ico",
                filename: "index.html",
                manifest: "./public/manifest.json",
            })
        ];
        return config;
    },

    resolve: function(config, env) {
        config.extensions = ['*', '.js', '.jsx'];
        config.alias = {
            '@': path.resolve(__dirname, 'src/'),
        };
        config.fallback = { 
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "vm": require.resolve("vm-browserify"),
            "tty": require.resolve("tty-browserify"),
            "fs": false
        };
        return config;
      },
  
    // The paths config to use when compiling your react app for development or production.
    paths: function(paths, env) {
      // ...add your paths config
      return paths;
    },
  }
