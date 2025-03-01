import { describe, expect, test } from 'vitest';

import * as codetypo from './index.js';

describe('Validate the codetypo API', () => {
    test('Tests the default configuration', async () => {
        const ext = '.json';
        const languageIds = codetypo.getLanguagesForExt(ext);
        const settings = await codetypo.getDefaultBundledSettingsAsync();
        // codetypo:ignore jansons
        const text = '{ "name": "Jansons"}';
        const fileSettings = codetypo.combineTextAndLanguageSettings(settings, text, languageIds);
        return codetypo.validateText(text, fileSettings).then((results) => {
            expect(Object.keys(results)).not.toHaveLength(0);
            expect(results.map((to) => to.text)).toEqual(expect.arrayContaining(['Jansons']));
            return;
        });
    });

    test('Verify API exports', () => {
        expect(codetypo).toMatchSnapshot();
    });
});
