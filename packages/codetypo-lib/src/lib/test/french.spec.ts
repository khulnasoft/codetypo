import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';

import { describe, expect, test } from 'vitest';

import { pathPackageSamples } from '../../test-util/index.mjs';
import * as codetypo from '../index.js';
import * as util from '../util/util.js';

const require = createRequire(import.meta.url);

const sampleFilename = path.join(pathPackageSamples, 'French.md');
const text = fs.readFileSync(sampleFilename, 'utf8').toString();

const frenchConfig = require.resolve('@codetypo/dict-fr-fr/codetypo-ext.json');

const timeout = 10_000;

describe('Validate that French text is correctly checked.', () => {
    test(
        'Tests the default configuration',
        async () => {
            expect(Object.keys(text)).not.toHaveLength(0);
            const ext = path.extname(sampleFilename);
            const languageIds = codetypo.getLanguagesForExt(ext);
            const frenchSettings = await codetypo.readSettings(frenchConfig);
            const settings = codetypo.mergeSettings(await codetypo.getDefaultBundledSettingsAsync(), frenchSettings, {
                language: 'en,fr',
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
