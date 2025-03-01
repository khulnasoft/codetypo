import assert from 'node:assert';

import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { describe, test } from 'mocha';

import { defaultOptions, type Options } from './options.cjs';

describe('options', () => {
    test('Options are compatible with codetypo-types', () => {
        const options: Options = { ...defaultOptions, codetypo: { words: ['word'] } };
        assert(options.codetypo);
        const settings: CodeTypoSettings = options.codetypo;
        assert(settings, 'it is expected to compile.');
    });

    test('Make sure `language` is allowed.', () => {
        const options: Options = { ...defaultOptions, codetypo: { language: 'en-gb' } };
        assert(options.codetypo);
        const settings: CodeTypoSettings = options.codetypo;
        assert(settings, 'it is expected to compile.');
    });
});
