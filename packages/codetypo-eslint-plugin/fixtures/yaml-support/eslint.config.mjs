import eslint from '@eslint/js';
import codetypoRecommended from '@codetypo/eslint-plugin/recommended';
import parserYml from 'yaml-eslint-parser';
import pluginYml from 'eslint-plugin-yml';

/**
 * @type { import("eslint").Linter.FlatConfig[] }
 */
const config = [
    eslint.configs.recommended,
    codetypoRecommended,
    ...pluginYml.configs['flat/standard'],
    {
        files: ['**/*.yaml', '**/*.yml'],
        languageOptions: {
            parser: parserYml,
        },
        // plugins: {
        //     yml: pluginYml,
        // },
        rules: {
            '@codetypo/spellchecker': 'warn',
        },
    },
];

export default config;
