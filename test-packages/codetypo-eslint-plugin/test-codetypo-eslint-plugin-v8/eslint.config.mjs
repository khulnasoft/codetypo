import codetypoConfigs from '@codetypo/eslint-plugin/configs';
import codetypoRecommended from '@codetypo/eslint-plugin/recommended';
import eslint from '@eslint/js';

// @ts-check

const config = [
    eslint.configs.recommended,
    // codetypoRecommended or codetypoConfigs.recommended can be used interchangeably.
    codetypoConfigs.recommended,
    {
        ignores: ['**/node_modules/**', '**/*.ts', '**/*.tsx'],
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        ignores: ['**/*.d.ts', '**/*.map', '**/coverage/**', '**/dist/**', '**/node_modules/**'],
        rules: {
            '@codetypo/spellchecker': ['warn', { customWordListFile: 'words.txt', autoFix: true }],
        },
    },
    {
        files: ['**/*.js'],
        plugins: codetypoRecommended.plugins,
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            'no-undef': 'off',
            '@codetypo/spellchecker': ['warn', { checkIdentifiers: false }],
        },
    },
    {
        files: ['**/*.tsx'],
        rules: {
            '@codetypo/spellchecker': ['warn', { checkIdentifiers: true }],
        },
    },
];

export default config;
