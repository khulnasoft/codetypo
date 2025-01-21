import { describe, expect, test } from 'vitest';

import { readTrieFromConfig } from '../test/dictionaries.test.helper.js';

function getTrie() {
    return readTrieFromConfig('@codetypo/dict-en_us/codetypo-ext.json');
}

const timeout = 10_000;

describe('Validate English Trie', () => {
    const pTrie = getTrie();

    // codetypo:ignore setsid macukrainian
    test.each`
        word              | useCompound | expected
        ${'setsid'}       | ${true}     | ${true}
        ${'hello'}        | ${true}     | ${true}
        ${'set'}          | ${true}     | ${true}
        ${'sid'}          | ${true}     | ${true}
        ${'setsid'}       | ${true}     | ${true}
        ${'macukrainian'} | ${true}     | ${true}
        ${'setsid'}       | ${false}    | ${false}
        ${'macukrainian'} | ${false}    | ${false}
    `(
        'has "$word" useCompound: $useCompound',
        async ({ word, expected, useCompound }) => {
            const trie = await pTrie;
            expect(trie.has(word, useCompound)).toBe(expected);
        },
        timeout,
    );
});
