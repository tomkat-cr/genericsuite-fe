import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from '@rollup/plugin-commonjs';
import postcss from "rollup-plugin-postcss";
// import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';
import svg from 'rollup-plugin-svg-import';
import json from '@rollup/plugin-json';

export default {
    input: "./src/lib/index.js",
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        postcss({
            inject: true
        }),
        typescript(),
        babel({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        resolve(),
        commonjs(),
        svg({
            /**
             * If `true`, instructs the plugin to import an SVG as string.
             * For example, for Server Side Rendering.
             * Otherwise, the plugin imports SVG as DOM node.
             */
            stringify: true
        }),
        json(),
    ],
}
