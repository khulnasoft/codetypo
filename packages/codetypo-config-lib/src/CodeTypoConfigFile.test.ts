import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { parse, stringify } from 'comment-json';
import { describe, expect, test } from 'vitest';

import { __testing__, ImplCodeTypoConfigFile } from './CodeTypoConfigFile.js';

const { addUniqueWordsToListAndSort } = __testing__;

describe('CodeTypoConfigFile', () => {
    const listWithComments = '["one", // comment after\n "two",\n // comment before three\n "three"\n]';
    const listWithCommentsSorted = toStr(
        parse('["one", // comment after\n // comment before three\n "three",\n "two"]'),
    );
    const listWithCommentsAddTen = toStr(
        parse('["one", // comment after\n "ten", \n // comment before three\n "three",\n "two"]'),
    );

    test.each`
        list                | toAdd      | expected
        ${[]}               | ${[]}      | ${[]}
        ${listWithComments} | ${[]}      | ${listWithCommentsSorted}
        ${listWithComments} | ${['ten']} | ${listWithCommentsAddTen}
        ${listWithComments} | ${['two']} | ${listWithCommentsSorted}
    `('addUniqueWordsToListAndSort $list, $toAdd', ({ list, toAdd, expected }) => {
        list = typeof list === 'string' ? parse(list) : list;
        expected = typeof expected !== 'string' ? toStr(expected) : expected;
        addUniqueWordsToListAndSort(list, toAdd);
        expect(toStr(list)).toBe(expected);
    });

    test('ImplCodeTypoConfigFile readonly', () => {
        const cfg = new Cfg(new URL('file:///codetypo.json'), { readonly: true });
        expect(() => cfg.addWords(['one'])).toThrowError('Config file is readonly: file:///codetypo.json');
    });
});

function toStr(obj: unknown): string {
    return stringify(obj, null, 2);
}

class Cfg extends ImplCodeTypoConfigFile {
    constructor(url: URL, settings: CodeTypoSettings = {}) {
        super(url, settings);
    }
}
