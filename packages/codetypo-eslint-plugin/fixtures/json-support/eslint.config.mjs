// @ts-check
import eslint from '@eslint/js';
import codetypoRecommended from '@codetypo/eslint-plugin/recommended';
import eslintPluginJsonc from 'eslint-plugin-jsonc';

/**
 * @type { import("eslint").Linter.FlatConfig[] }
 */
const config = [
    eslint.configs.recommended,
    codetypoRecommended,
    ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
    {
        ignores: ['eslint.config.mjs'],
    },
    {
        files: ['**/*.json', '**/*.jsonc'],
        rules: {
            '@codetypo/spellchecker': ['warn', { debugMode: true }],
        },
    },
];

export default config;
