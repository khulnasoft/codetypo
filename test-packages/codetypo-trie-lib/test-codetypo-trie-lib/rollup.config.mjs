// @ts-check
import { readFileSync } from 'node:fs';
import Path from 'node:path';

import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import rollupPluginJson from '@rollup/plugin-json';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginTypescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

/** @typedef {import('rollup').RollupOptions} RollupOptions */
/** @typedef {import('rollup').OutputOptions} OutputOptions */
/** @typedef {import('@rollup/plugin-typescript').RollupTypescriptPluginOptions} RollupTypescriptPluginOptions */

/** @type {RollupOptions} */
const common = {
    input: 'src/index.ts',

    output: {
        sourcemap: true,
    },

    // external: ['@codetypo/codetypo-pipe', '@codetypo/codetypo-pipe/sync'],

    treeshake: {
        annotations: true,
        moduleSideEffects: [],
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
    },
};

/** @type {RollupTypescriptPluginOptions} */
const defaultTypeScriptConfig = { tsconfig: 'tsconfig.json' };

/**
 * Get new instances of all the common plugins.
 * @param {RollupTypescriptPluginOptions} typeScriptConfig
 */
function getPlugins(typeScriptConfig = defaultTypeScriptConfig) {
    return [
        rollupPluginTypescript({
            ...typeScriptConfig,
        }),
        rollupPluginNodeResolve({
            mainFields: ['module', 'exports', 'es', 'es6', 'esm', 'main'],
            extensions: ['.ts', '.js', '.mjs', '.mts', '.node', '.json'],
            preferBuiltins: true,
        }),
        rollupPluginCommonjs({
            transformMixedEsModules: true,
        }),
        rollupPluginJson(),
    ];
}

/** @type {OutputOptions[]} */
const targets = [
    { file: './dist/rollup/cjs/index.cjs', format: 'cjs' },
    { file: './dist/rollup/esm/index.mjs', format: 'es' },
    { file: pkg.browser, format: 'umd', name: 'test-codetypo-pipe-rollup' },
];

/** @type {import('rollup').RollupOptions[]} */
const configs = targets.map((target) => ({
    ...common,
    output: { ...common.output, ...target },
    plugins: getPlugins({
        tsconfig: 'tsconfig.json',
        compilerOptions: { outDir: (target.file && Path.dirname(target.file)) || undefined },
    }),
}));
export default configs;
