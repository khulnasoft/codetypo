import type { Linter } from 'eslint';

import { plugin } from './codetypo-eslint-plugin.cjs';
export * as recommended from './recommended.cjs';

export const debug: Linter.Config = {
    plugins: {
        '@codetypo': plugin,
    },
    rules: {
        '@codetypo/spellchecker': ['warn', { debugMode: true }],
    },
};
