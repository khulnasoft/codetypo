import type { CodeTypoUserSettings } from '@codetypo/codetypo-types';
import { suite } from 'perf-insight';

import { __internal, getInDocumentSettings } from './InDocSettings.js';

suite('Get InDocSettings', async (test) => {
    const doc = sampleDoc();
    const iterations = 10;

    test('getInDocumentSettings', () => {
        let settings: CodeTypoUserSettings | undefined = undefined;
        for (let i = iterations; i > 0; --i) {
            settings = getInDocumentSettings(doc);
        }
        return settings;
    });
});

suite('Collect InDocSettings', async (test) => {
    const doc = sampleDoc();
    const iterations = 10;

    test('collectInDocumentSettings', () => {
        let settings: unknown | undefined = undefined;
        for (let i = iterations; i > 0; --i) {
            settings = __internal.collectInDocumentSettings(doc);
        }
        return settings;
    });
});

function sampleDoc() {
    return `
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

    // codetypo:ignore againxx
# codeTypo\u003AdisableCompoundWords
# codeTypo\u003AenableCOMPOUNDWords
# happydays arehere againxx

// codetypo:ignore popoutlist

// spell\u003Adictionaries php
// spell\u003Awords const
// codetypo\u003A
// codetypo\u003Aignore popoutlist
const x = imp.popoutlist;
// codetypo\u003Aignore again

    // codetypo:ignore happydays arehere againxx localwords weirdberry straange misssspellings
    // codetypo:ignore faullts mooree prooobleems onn thisss line tooo wordberry
`;
}
