import globals from 'globals';
import pluginJs from '@eslint/js';
import codetypoESLintPluginRecommended from '@codetypo/eslint-plugin/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        ignores: ['.pnp.cjs'],
    },
    codetypoESLintPluginRecommended,
];
