import * as fsp from 'node:fs/promises';
import * as path from 'node:path';

import { describe, expect, test } from 'vitest';

import { pathPackageSamples } from '../../test-util/test.locations.cjs';
import * as codetypo from '../index.js';

const samples = path.join(pathPackageSamples, 'bug-fixes');
const configFile = path.join(samples, 'codetypo.json');

const files = ['bug345.ts', '../src/sample.go'];

const timeout = 10_000;

describe('Validate Against Bug Fixes', () => {
    function t(filename: string) {
        test(
            `validate ${filename}`,
            async () => {
                const fullFilename = path.resolve(samples, filename);
                const ext = path.extname(filename);
                const text = await fsp.readFile(fullFilename, 'utf8');
                const languageIds = codetypo.getLanguagesForExt(ext);
                const settings = codetypo.mergeSettings(
                    await codetypo.getDefaultBundledSettingsAsync(),
                    await codetypo.readSettings(configFile),
                );
                const fileSettings = codetypo.combineTextAndLanguageSettings(settings, text, languageIds);
                const result = await codetypo.validateText(text, fileSettings);
                expect(result).toMatchSnapshot();
            },
            { timeout },
        );
    }

    files.forEach(t);
});
