import * as fsp from 'node:fs';
import * as path from 'node:path';

import { describe, expect, test } from 'vitest';

import { pathPackageSamples } from '../../test-util/test.locations.cjs';
import * as codetypo from '../index.js';

const samples = pathPackageSamples;
const sampleFilename = path.join(samples, 'src', 'sample.py');
const sampleConfig = path.join(samples, '.codetypo.json');
const text = fsp.readFileSync(sampleFilename, 'utf8').toString();

const timeout = 10_000;

describe('Validate that Python files are correctly checked.', () => {
    test(
        'Tests the default configuration',
        async () => {
            expect(Object.keys(text)).not.toHaveLength(0);
            const ext = path.extname(sampleFilename);
            const languageIds = codetypo.getLanguagesForExt(ext);
            const settings = codetypo.mergeSettings(
                await codetypo.getDefaultBundledSettingsAsync(),
                await codetypo.readSettings(sampleConfig),
            );
            const fileSettings = codetypo.combineTextAndLanguageSettings(settings, text, languageIds);
            return codetypo.validateText(text, fileSettings).then((results) => {
                expect(results).toHaveLength(1);
                /* codetypo:ignore garbbage */
                expect(results.map((t) => t.text)).toEqual(expect.arrayContaining(['garbbage']));
                return;
            });
        },
        { timeout },
    );
});
