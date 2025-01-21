import * as fs from 'node:fs';
import * as path from 'node:path';

import { describe, expect, test } from 'vitest';

import { pathPackageSamples } from '../../test-util/test.locations.cjs';
import * as codetypo from '../index.js';
import * as util from '../util/util.js';

const sampleFilename = path.join(pathPackageSamples, 'Seattle.fa.md');
const text = fs.readFileSync(sampleFilename, 'utf8').toString();

const frenchConfig = require.resolve('@codetypo/dict-fa-ir/codetypo-ext.json');

const timeout = 10_000;

describe('Validate that Persian text is correctly checked.', () => {
    test(
        'Tests the default configuration',
        async () => {
            expect(Object.keys(text)).not.toHaveLength(0);
            const ext = path.extname(sampleFilename);
            const languageIds = codetypo.getLanguagesForExt(ext);
            const frenchSettings = await codetypo.readSettings(frenchConfig);
            const settings = codetypo.mergeSettings(await codetypo.getDefaultBundledSettingsAsync(), frenchSettings, {
                language: 'en,fa',
            });
            const fileSettings = codetypo.combineTextAndLanguageSettings(settings, text, languageIds);
            const results = await codetypo.validateText(text, fileSettings);
            /* codetypo:ignore aujourd’hui */
            expect(
                results
                    .map((a) => a.text)
                    .filter(util.uniqueFn())
                    .sort(),
            ).toEqual([]);
        },
        { timeout },
    );
});
