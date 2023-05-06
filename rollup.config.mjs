import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import babel from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";

// import tailwindcss from 'tailwindcss';
// import tailwindConfig from "./tailwind.config.js";

import packageJson from './package.json' assert { type: 'json' };
import terser from "@rollup/plugin-terser";
export default [
    {
        input: "src/index.ts",
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
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                exclude: ['node_modules/**', 'Old/**']
            }),
            postcss(),
            terser(),
            babel({
                babelHelpers: 'bundled',
                exclude: ['node_modules/**', 'Old/**'],
                presets: ['@babel/preset-env','@babel/preset-react']
            })
        ],
        external: Object.keys(packageJson.peerDependencies),
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
];