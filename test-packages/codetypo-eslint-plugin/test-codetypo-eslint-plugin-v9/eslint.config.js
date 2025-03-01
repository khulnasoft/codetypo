import js from '@eslint/js';
import codetypoRecommended from '@codetypo/eslint-plugin/recommended';
import codetypoConfigs from '@codetypo/eslint-plugin/configs';
import tsESLint from 'typescript-eslint';

/**
 * @type { import("eslint").Linter.FlatConfig[] }
 */
const config = [
    js.configs.recommended,
    ...tsESLint.configs.recommended,
    // codetypoRecommended or codetypoConfigs.recommended can be used interchangeably.
    codetypoConfigs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/*.d.ts', '**/*.map', '**/coverage/**', '**/dist/**', '**/node_modules/**'],
        languageOptions: {
            parser: tsESLint.parser,
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@codetypo/spellchecker': ['warn', { customWordListFile: 'words.txt', autoFix: true }],
        },
    },
    {
        files: ['**/importAlias.ts'],
        rules: {
            '@codetypo/spellchecker': [
                'error',
                {
                    configFile: `${new URL('fixtures/codetypo.test.config.yaml', import.meta.url)}`,
                },
            ],
        },
    },
    {
        files: ['**/*.js'],
        plugins: codetypoRecommended.plugins,
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            'no-undef': 'warn',
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
