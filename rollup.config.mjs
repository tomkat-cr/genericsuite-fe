import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from '@rollup/plugin-commonjs';
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
// import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';
import svg from 'rollup-plugin-svg'
import json from '@rollup/plugin-json';

// const packageJson = require("./package.json");
import packageJson from "./package.json" with { type: "json" };

export default [
    {
        input: "./src/lib/index.cjs",
        // external: [...Object.keys(packageJson.peerDependencies || {})],
        external: [
            "with",
            "axios",
            "buffer",
            "constants-browserify",
            // "crypto",
            "crypto-browserify",
            "downshift",
            // "express",
            "formik",
            "fs",
            "history",
            // "https-browserify",
            "json-loader",
            "os-browserify",
            "react",
            "react-dom",
            "react-error-overlay",
            "react-icons",
            "react-markdown",
            "react-router-dom",
            "react-syntax-highlighter",
            "rxjs",
            "stream-browserify",
            // "stream-http",
            "tty-browserify",
            "url",
            "vm-browserify",
            "web-vitals",
            "yup",
        ],
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            postcss({
                inject: true
            }),
            babel({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
            svg({
                base64: true
            }),
            json(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
    },
    {
        // input: "dist/esm/types/index.d.ts",
        input: "dist/esm/index.js",
        output: [
            {
                file: "dist/index.d.ts",
                format: "esm",
                name: "genericsuite"
            }
        ],
        plugins: [
            dts()
        ],
        external: [/\.css$/],
    }
]
