/* vite.config.js | Vite */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';
import fs from 'node:fs';
// import history from 'connect-history-api-fallback';

/*
https://vite.dev/guide/

npm install --save-dev vite @vitejs/plugin-react vite-plugin-require @tailwindcss/vite
*/

export default defineConfig(({ mode }) => {
    const appLocalDomainName = process.env.APP_LOCAL_DOMAIN_NAME;

    console.log('** Vite options **');
    console.log('');
    
    // Server configuration
    const serverConfig = {
        port: process.env.FRONTEND_LOCAL_PORT || 3000,
        host: true,
        cors: true,
        // To open the browser automatically
        // open: true,
        // To enable the hot reload, usePolling is required
        watch: {
            usePolling: true
        },
        allowedHosts: [appLocalDomainName], // To avoid "Invalid Host header" error

        // historyApiFallback: true, // Handle SPA routing
        // middlewares: [
        //   history({ 
        //     disableDotRule: true,
        //     htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
        //   })
        // ]
    };

    // Add HTTPS if needed
    if (process.env.REACT_APP_API_URL.includes("https://")) {
        serverConfig.https = {
            key: fs.readFileSync(resolve(__dirname, `${appLocalDomainName}.key`)),
            cert: fs.readFileSync(resolve(__dirname, `${appLocalDomainName}.crt`)),
            ca: fs.readFileSync(resolve(__dirname, 'ca.crt')),
            // passphrase: process.env.SSL_PASSPHRASE || 'password',
        };
    }

    const process_env = {
        REACT_APP_VERSION: (process.env.REACT_APP_VERSION || fs.readFileSync('version.txt', 'utf8')),
        REACT_APP_API_URL: (process.env.REACT_APP_API_URL || `https://${appLocalDomainName}`),
        REACT_APP_DEBUG: (process.env.REACT_APP_DEBUG || '0'),
        REACT_APP_URI_PREFIX: (process.env.REACT_APP_URI_PREFIX || 'exampleapp_frontend'),
        REACT_APP_X_TOKEN: (process.env.REACT_APP_X_TOKEN || ''),
        REACT_APP_APP_NAME: (process.env.REACT_APP_APP_NAME || 'exampleapp'),
        REACT_APP_USE_AXIOS: (process.env.REACT_APP_USE_AXIOS || '1'),
    }

    console.log('Server config:', serverConfig);
    console.log('process_env:', process_env);
    console.log('');

    return {
        plugins: [
            react(),
            vitePluginRequire,
            tailwindcss(),
        ],
        server: serverConfig,
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg']
        },
        define: {
            'process.env': process_env
        },
        build: {
            outDir: 'build',
            assetsDir: 'static',
            emptyOutDir: true,
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                    }
                }
            }
        },
        base: '/',
        publicDir: 'public',
        root: '.',
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom'],
        },
    };
});
