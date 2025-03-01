import assert from 'node:assert';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { describe, expect, test } from 'vitest';

import * as index from './index.js';
import { createReaderWriter, CodeTypoConfigFile } from './index.js';
import { fixtures } from './test-helpers/fixtures.js';
import { copyFile, tempPath } from './test-helpers/util.js';

describe('index', () => {
    test('index', () => {
        expect(index).toBeDefined();
    });
    test.each`
        value                        | expected
        ${typeof createReaderWriter} | ${'function'}
    `('exports', ({ value, expected }) => {
        expect(value).toEqual(expected);
    });
});

describe('codetypo-config', () => {
    test.each`
        fixture                                 | addWords
        ${'package/with-value/package.json'}    | ${['apple']}
        ${'package/without-value/package.json'} | ${['apple']}
        ${'codetypo.jsonc'}                       | ${['apple', 'cache']}
        ${'codetypo.yaml'}                        | ${['apple', 'cache']}
    `('edit config', async ({ fixture, addWords }) => {
        const fixtureFile = fixtures(fixture);
        const tempFile = tempPath(fixture);
        await copyFile(fixtureFile, tempFile);
        const rw = createReaderWriter();
        const uri = pathToFileURL(resolve(tempFile));
        const cfg = await rw.readConfig(uri);
        assert(cfg instanceof CodeTypoConfigFile);
        cfg.addWords(addWords);
        await rw.writeConfig(cfg);
        expect(await fs.readFile(tempFile, 'utf8')).toMatchSnapshot();
    });
});
