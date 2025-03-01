import * as fs from 'node:fs';
import * as path from 'node:path';

import { describe, expect, test } from 'vitest';

import { pathPackageSamples } from '../../test-util/test.locations.cjs';
import * as codetypo from '../index.js';
import * as util from '../util/util.js';

const sampleFilename = path.join(pathPackageSamples, 'Dutch.txt');
const text = fs.readFileSync(sampleFilename, 'utf8').toString();

const dutchConfig = require.resolve('@codetypo/dict-nl-nl/codetypo-ext.json');

const timeout = 10_000;

describe('Validate that Dutch text is correctly checked.', () => {
    test(
        'Tests the default configuration',
        async () => {
            expect(Object.keys(text)).not.toHaveLength(0);
            const ext = path.extname(sampleFilename);
            const languageIds = codetypo.getLanguagesForExt(ext);
            const dutchSettings = await codetypo.readSettings(dutchConfig);
            const settings = codetypo.mergeSettings(await codetypo.getDefaultBundledSettingsAsync(), dutchSettings, {
                language: 'en,nl',
            });
            const fileSettings = codetypo.combineTextAndLanguageSettings(settings, text, languageIds);
            const results = await codetypo.validateText(text, fileSettings);
            /* codetypo:ignore ANBI RABO RABONL unported */
            expect(
                results
                    .map((a) => a.text)
                    .filter(util.uniqueFn())
                    .sort(),
            ).toEqual(['RABO', 'RABONL', 'unported']);
        },
        { timeout },
    );
});
