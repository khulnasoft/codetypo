import type { Linter } from 'eslint';

import { plugin } from './codetypo-eslint-plugin.cjs';

const config: Linter.Config = {
    plugins: {
        '@codetypo': plugin,
    },
    rules: {
        '@codetypo/spellchecker': ['warn', {}],
    },
};

export const plugins = config.plugins;
export const rules = config.rules;
