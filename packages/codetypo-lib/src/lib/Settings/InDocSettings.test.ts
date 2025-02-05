import type { CodeTypoSettings, DictionaryDefinitionInline } from '@codetypo/codetypo-types';
import { describe, expect, test } from 'vitest';

import * as Text from '../util/text.js';
import * as TextRange from '../util/TextRange.js';
import { isDefined } from '../util/util.js';
import * as InDoc from './InDocSettings.js';

const dictName = InDoc.__internal.staticInDocumentDictionaryName;

const oc = <T>(obj: T) => expect.objectContaining(obj);
const ac = <T>(a: Array<T>) => expect.arrayContaining(a);
const nac = expect.not.arrayContaining;

// codeTypo:ignore faullts straange tooo
// codeTypo:ignoreRegExp \w+s{4}\w+
// codeTypo:ignoreRegExp /\/\/\/.*/
// codeTypo:ignoreRegExp  weird
const sampleCode = `
    // codeTypo\u003AenableCompoundWords
    // codeTypo\u003AdisableCompoundWords
    // codeTypo\u003A enableCOMPOUNDWords
    // codeTypo:words whiteberry, redberry, lightbrown
    // codeTypo\u003A ignoreRegExp /\\/\\/\\/.*/
    // codeTypo\u003AignoreRegexp w\\w+berry
    // codeTypo\u003A:ignoreRegExp  /
    /* codeTypo\u003AignoreRegExp \\w+s{4}\\w+ */
    /* codeTypo\u003AignoreRegExp /faullts[/]?/ */
    const berries = ['whiteberry', 'redberry', 'blueberry'];

    /* codeTypo\u003Aignore tripe, comment */
    // codeTypo\u003A: ignoreWords tooo faullts
    /// ignore triple comment, with misssspellings and faullts
    /// mooree prooobleems onn thisss line tooo with wordberry
    // misssspellings faullts

    // weirdberry can be straange.
    // codeTypo\u003Alanguage en-US
    // codetypo\u003Alocal
    // codetypo\u003Alocale es-ES
    // codetypo\u003Alocal en, nl

    // codetypo\u003Adictionaries lorem-ipsum
    // LocalWords: one two three
    // LocalWords:four five six
    // localwords: seven eight nine
`;

// codetypo:ignore againxx
const sampleText = `
# codeTypo\u003AdisableCompoundWords
# codeTypo\u003AenableCOMPOUNDWords
# happydays arehere againxx
`;

// codetypo:ignore popoutlist
const sampleTextWithIncompleteInDocSetting = `
// spell\u003Adictionaries php
// spell\u003Awords const
// codetypo\u003A
// codetypo\u003Aignore popoutlist
const x = imp.popoutlist;
// codetypo\u003Aignore again
`;

const sampleInDocDict: DictionaryDefinitionInline = {
    name: dictName,
    words: ['const'],
    ignoreWords: ['popoutlist', 'again'],
};

// codetypo:disable
const sampleTextWithBadRegexp = `
# codetypo\u003AignoreRegExp  "(foobar|foo_baz)"');
`;
// codetypo:enable

describe('Validate InDocSettings', () => {
    test('tests matching settings', () => {
        const matches = [...InDoc.__internal.getPossibleInDocSettings(sampleCode)].map((a) => a.match);
        expect(matches).toEqual([
            'enableCompoundWords',
            'disableCompoundWords',
            'enableCOMPOUNDWords',
            'words whiteberry, redberry, lightbrown',
            'ignoreRegExp /\\/\\/\\/.*/',
            'ignoreRegexp w\\w+berry',
            'ignoreRegExp  /',
            'ignoreRegExp \\w+s{4}\\w+ */',
            'ignoreRegExp /faullts[/]?/ */',
            'ignore tripe, comment */',
            'ignoreWords tooo faullts',
            'language en-US',
            'local',
            'locale es-ES',
            'local en, nl',
            'dictionaries lorem-ipsum',
            'LocalWords: one two three',
            'LocalWords:four five six',
        ]);
    });

    const USE_TEST = undefined;

    test.each`
        test                                                                   | text                                                                   | expected
        ${'Empty Doc'}                                                         | ${''}                                                                  | ${{ id: 'in-doc-settings' }}
        ${'codeTypo\u003AenableCompoundWords'}                                   | ${'codeTypo\u003AenableCompoundWords'}                                   | ${oc({ allowCompoundWords: true })}
        ${'codeTypo\u003AENABLECompoundWords'}                                   | ${'codeTypo\u003AENABLECompoundWords'}                                   | ${oc({ allowCompoundWords: true })}
        ${'codeTypo\u003AdisableCompoundWords'}                                  | ${'codeTypo\u003AdisableCompoundWords'}                                  | ${oc({ allowCompoundWords: false })}
        ${'codeTypo\u003AdisableCompoundWORDS'}                                  | ${'codeTypo\u003AdisableCompoundWORDS'}                                  | ${oc({ allowCompoundWords: false })}
        ${'codeTypo\u003AENABLECompoundWords\ncodeTypo\u003AdisableCompoundWords'} | ${'codeTypo\u003AENABLECompoundWords\ncodeTypo\u003AdisableCompoundWords'} | ${oc({ allowCompoundWords: false })}
        ${'codeTypo\u003AdisableCompoundWords\ncodeTypo\u003AenableCompoundWords'} | ${'codeTypo\u003AdisableCompoundWords\ncodeTypo\u003AenableCompoundWords'} | ${oc({ allowCompoundWords: true })}
        ${'sampleText'}                                                        | ${sampleText}                                                          | ${oc({ allowCompoundWords: true })}
        ${'sampleCode'}                                                        | ${sampleCode}                                                          | ${oc({ allowCompoundWords: true })}
        ${'codeTypo\u003Aword apple'}                                            | ${USE_TEST}                                                            | ${oc(inDocDict({ words: ['apple'] }))}
        ${'/*codeTypo\u003Aword apple*/'}                                        | ${USE_TEST}                                                            | ${oc(inDocDict({ words: ['apple*/'] }))}
        ${'<!--- codeTypo\u003Aword apple -->'}                                  | ${USE_TEST}                                                            | ${oc(inDocDict({ words: ['apple', '-->'] }))}
        ${'<!--- codeTypo\u003AignoreWords apple -->'}                           | ${USE_TEST}                                                            | ${oc(inDocDict({ ignoreWords: ['apple', '-->'] }))}
        ${'<!--- codeTypo\u003AforbidWords apple -->'}                           | ${USE_TEST}                                                            | ${oc(inDocDict({ flagWords: ['apple', '-->'] }))}
        ${'<!--- codeTypo\u003Aflag-words apple -->'}                            | ${USE_TEST}                                                            | ${oc(inDocDict({ flagWords: ['apple', '-->'] }))}
        ${'# codetypo\u003Aignore auto* *labeler'}                               | ${USE_TEST}                                                            | ${oc(inDocDict({ ignoreWords: ['auto*', '*labeler'] }))}
    `('detect compound words setting: $test', ({ test, text, expected }) => {
        expect(InDoc.getInDocumentSettings(text == USE_TEST ? test : text)).toEqual(expected);
        expect([...InDoc.validateInDocumentSettings(text, {})]).toEqual([]);
    });

    test.each`
        test                                      | text                                     | expected
        ${'Empty Doc'}                            | ${''}                                    | ${{ id: 'in-doc-settings' }}
        ${'sampleTextWithIncompleteInDocSetting'} | ${sampleTextWithIncompleteInDocSetting}  | ${oc(inDocDict(sampleInDocDict, ['php']))}
        ${'enableCaseSensitive'}                  | ${'// codetypo\u003AenableCaseSensitive'}  | ${oc({ caseSensitive: true })}
        ${'disableCaseSensitive'}                 | ${'// codetypo\u003AdisableCaseSensitive'} | ${oc({ caseSensitive: false })}
    `('extract setting: $test', ({ text, expected }) => {
        expect(InDoc.getInDocumentSettings(text)).toEqual(expected);
    });

    test('tests finding words to add to dictionary', () => {
        const words = InDoc.__internal.getWordsFromDocument(sampleCode);
        // we match to the end of the line, so the */ is included.
        expect(words).toEqual(['whiteberry', 'redberry', 'lightbrown', 'one', 'two', 'three', 'four', 'five', 'six']);
        expect(InDoc.getIgnoreWordsFromDocument('Hello')).toEqual([]);
    });

    test('tests finding words to ignore', () => {
        const words = InDoc.getIgnoreWordsFromDocument(sampleCode);
        // we match to the end of the line, so the */ is included.
        expect(words).toEqual(['tripe', 'comment', '*/', 'tooo', 'faullts']);
        expect(InDoc.getIgnoreWordsFromDocument('Hello')).toEqual([]);
    });

    test('tests finding ignoreRegExp', () => {
        const matches = InDoc.getIgnoreRegExpFromDocument(sampleCode);
        expect(matches).toEqual(['/\\/\\/\\/.*/', 'w\\w+berry', '/', '\\w+s{4}\\w+', '/faullts[/]?/ */']);
        const regExpList = matches.map((s) => Text.stringToRegExp(s));
        expect(regExpList).toEqual([/\/\/\/.*/g, /w\w+berry/gimu, /\//gimu, /\w+s{4}\w+/gimu, /faullts[/]?\/ */g]);
        const ranges = TextRange.findMatchingRangesForPatterns(regExpList.filter(isDefined), sampleCode);
        expect(ranges.length).toBe(39);
    });

    test('fetching the local for the text', () => {
        const settings = InDoc.getInDocumentSettings(sampleCode);
        expect(settings.language).toBe('en,nl');
    });

    test('setting dictionaries for file', () => {
        const settings = InDoc.getInDocumentSettings(sampleCode);
        expect(settings.dictionaries).toStrictEqual(['lorem-ipsum', '[in-document-dict]']);
    });

    test('bad ignoreRegExp', () => {
        // I currently does not check the validity of the expressions.
        expect(InDoc.getInDocumentSettings(sampleTextWithBadRegexp)).toEqual(
            expect.objectContaining({
                ignoreRegExpList: [`"(foobar|foo_baz)"');`],
            }),
        );
    });

    // codetypo:ignore dictionar lokal

    test.each`
        text                                       | settings | expected
        ${''}                                      | ${{}}    | ${[]}
        ${'codetypo\u003A */'}                       | ${{}}    | ${[]}
        ${'codetypo\u003A ignore x */'}              | ${{}}    | ${[]}
        ${'codetypo\u003A word*/'}                   | ${{}}    | ${[]}
        ${'codetypo\u003A word-*/'}                  | ${{}}    | ${[oc({ message: 'Unknown CodeTypo directive', text: 'word-' })]}
        ${'spell-checker\u003A word-*/'}           | ${{}}    | ${[oc({ message: 'Unknown CodeTypo directive', text: 'word-' })]}
        ${'spellchecker\u003A word-*/'}            | ${{}}    | ${[oc({ message: 'Unknown CodeTypo directive', text: 'word-' })]}
        ${'spell\u003A ignore-next-occurrence */'} | ${{}}    | ${[oc({ message: 'Unknown CodeTypo directive', text: 'ignore-next-occurrence' })]}
        ${'codetypo\u003Adictionar dutch'}           | ${{}}    | ${[oc({ range: [7, 16], suggestions: ac(['dictionary', 'dictionaries']), text: 'dictionar' })]}
        ${'codetypo\u003A:dictionar dutch'}          | ${{}}    | ${[oc({ range: [8, 17], suggestions: ac(['dictionary', 'dictionaries']), text: 'dictionar' })]}
        ${'codetypo\u003A ignored */'}               | ${{}}    | ${[oc({ range: [8, 15], suggestions: ac(['ignore', 'ignoreWord']), text: 'ignored' })]}
        ${'codetypo\u003Alokal en'}                  | ${{}}    | ${[oc({ suggestions: ac(['locale']) })]}
        ${'codetypo\u003Alokal en'}                  | ${{}}    | ${[oc({ suggestions: nac(['local']) })]}
    `('validateInDocumentSettings $text', ({ text, settings, expected }) => {
        const result = [...InDoc.validateInDocumentSettings(text, settings)];
        expect(result).toEqual(expected);
    });
});

function inDocDict(dict: Partial<DictionaryDefinitionInline>, dictionaries: string[] = []): CodeTypoSettings {
    const def = {
        name: dictName,
        ...dict,
    } as DictionaryDefinitionInline;

    dictionaries = [...dictionaries, dictName];
    return {
        dictionaryDefinitions: [def],
        dictionaries,
    };
}

// codetypo:disableCompoundWords
// codetypo:ignore localwords happydays arehere
