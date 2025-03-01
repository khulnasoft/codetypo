import { Trie } from 'codetypo-trie-lib';
import { describe, expect, test } from 'vitest';

import { compareResults } from './helpers.js';
import * as suggest from './suggest.js';

describe('Validate Suggest', () => {
    test('suggestions', () => {
        const words = [
            'apple',
            'ape',
            'able',
            'apple',
            'banana',
            'orange',
            'pear',
            'aim',
            'approach',
            'bear',
            'cattle',
            'rattle',
            'battle',
            'rattles',
            'battles',
            'tattles',
        ];
        const trie = Trie.create(words);
        // codetypo:ignore aple
        const suggestions = [...suggest.suggest(trie, 'aple')].sort(compareResults);
        expect(Object.keys(suggestions)).not.toHaveLength(0);
    });
});
