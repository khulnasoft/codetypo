import eslint from '@eslint/js';
import codetypoRecommended from '@codetypo/eslint-plugin/recommended';
import * as mdx from 'eslint-plugin-mdx';

/**
 * @type { import("eslint").Linter.FlatConfig[] }
 */
const config = [
    eslint.configs.recommended,
    codetypoRecommended,
    mdx.configs.flat,
    {
        ignores: ['eslint.config.mjs'],
    },
    {
        files: ['**/*.mdx', '**/*.md'],
        rules: {
            '@codetypo/spellchecker': ['warn', { debugMode: true }],
        },
    },
];

export default config;
