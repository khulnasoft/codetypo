import { pathToFileURL } from 'node:url';

import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { describe, expect, test, vi } from 'vitest';

import { CodeTypoConfigFile } from './CodeTypoConfigFile.js';
import { CodeTypoConfigFileInMemory, CodeTypoConfigFileJavaScript } from './CodeTypoConfigFile/index.js';
import { CodeTypoConfigFileReaderWriterImpl } from './CodeTypoConfigFileReaderWriter.js';
import type { IO } from './IO.js';
import { defaultLoaders } from './loaders/index.js';
import { defaultDeserializers } from './serializers/index.js';
import { fixtures } from './test-helpers/fixtures.js';
import { json } from './test-helpers/util.js';

const oc = <T>(obj: T) => expect.objectContaining(obj);

describe('CodeTypoConfigFileReaderWriter', () => {
    test.each`
        uri                       | content                                                 | expected
        ${'file:///package.json'} | ${json({ name: 'name', codetypo: { words: ['one'] } })} | ${oc({ url: new URL('file:///package.json'), settings: { words: ['one'] } })}
    `('readConfig', async ({ uri, content, expected }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn(),
        };
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        expect(await rw.readConfig(uri)).toEqual(expected);
    });

    test.each`
        uri                      | content | expected
        ${'file:///codetypo.js'} | ${''}   | ${new Error('Unable to parse config file: "file:///codetypo.js"')}
    `('fail to read .js config without a loader', async ({ uri, content, expected }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn(),
        };
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, []);
        await expect(rw.readConfig(uri)).rejects.toEqual(expected);
    });

    test.each`
        uri                        | content
        ${'file:///codetypo.json'} | ${'{}\n'}
    `('writeConfig $uri', async ({ uri, content }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn((ref) => Promise.resolve(ref)),
        };

        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        const cf = await rw.readConfig(uri);
        const url = new URL(uri);
        await expect(rw.writeConfig(cf)).resolves.toEqual({ url });
        expect(io.writeFile).toHaveBeenCalledWith({ url, content });
    });

    test.each`
        uri                               | settings
        ${'file:///codetypo.config.js'}   | ${{}}
        ${'file:///codetypo.config.json'} | ${{ readonly: true }}
    `('writeConfig readonly $uri', async ({ uri, settings }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content: '' })),
            writeFile: vi.fn((ref) => Promise.resolve(ref)),
        };

        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, []);
        const url = new URL(uri);
        const cf = url.pathname.endsWith('.js')
            ? new CodeTypoConfigFileJavaScript(url, settings)
            : new Cfg(url, settings);
        await expect(rw.writeConfig(cf)).rejects.toEqual(new Error(`Config file is readonly: ${uri}`));
    });

    test('Fail to serialize', async () => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content: '' })),
            writeFile: vi.fn((ref) => Promise.resolve(ref)),
        };

        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, []);
        const cf = new Cfg(new URL('file:///codetypo.js'), {});
        await expect(rw.writeConfig(cf)).rejects.toThrowError('Unable to serialize config file: "file:///codetypo.js"');
    });

    test('clearCachedFiles', async () => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content: '' })),
            writeFile: vi.fn((ref) => Promise.resolve(ref)),
        };
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        const file = 'js/commonjs/codetypo.config.mjs';
        const url = pathToFileURL(fixtures(file));
        const cfg0 = await rw.readConfig(url);
        const cfg1 = await rw.readConfig(url);
        expect(cfg1.settings).toBe(cfg0.settings);
        rw.clearCachedFiles();
        const cfg2 = await rw.readConfig(url);
        expect(cfg2.settings).not.toBe(cfg0.settings);
        expect(cfg2.settings).toEqual(cfg0.settings);
    });

    test.each`
        uri                                     | content                   | expected
        ${'file:///package.json'}               | ${json({ name: 'name' })} | ${'Untrusted URL: "file:///package.json"'}
        ${'safe-fs:///path/codetypo.config.js'} | ${json({ name: 'name' })} | ${'Untrusted URL: "safe-fs:///path/codetypo.config.js"'}
    `('readConfig untrusted', async ({ uri, content, expected }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn(),
        };
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        rw.setUntrustedExtensions(['.json', '.js']);

        expect(rw.trustedUrls).toEqual([]);
        expect(rw.untrustedExtensions).toEqual(['.json', '.js']);

        await expect(rw.readConfig(uri)).rejects.toThrowError(expected);
    });

    test.each`
        uri                              | content                   | expected
        ${'file:///package.json'}        | ${json({ name: 'name' })} | ${oc({ url: new URL('file:///package.json') })}
        ${'safe-fs:///code/sample.json'} | ${json({ name: 'name' })} | ${oc({ url: new URL('safe-fs:///code/sample.json'), settings: { name: 'name' } })}
    `('readConfig trusted', async ({ uri, content, expected }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn(),
        };
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        rw.setUntrustedExtensions(['.json', '.js']).setTrustedUrls(['file:///package.json', 'safe-fs:///']);

        expect(rw.trustedUrls.toString()).toEqual('file:///package.json,safe-fs:///');
        expect(rw.untrustedExtensions).toEqual(['.json', '.js']);

        await expect(rw.readConfig(uri)).resolves.toEqual(expected);
    });

    test.each`
        url                        | content
        ${'file:///codetypo.json'} | ${json({ name: 'name', words: ['one'] })}
    `('toCodeTypoConfigFile $url', async ({ url, content }) => {
        const io: IO = {
            readFile: vi.fn((url) => Promise.resolve({ url, content })),
            writeFile: vi.fn(),
        };
        url = new URL(url);
        const settings = JSON.parse(content) as CodeTypoSettings;
        const rw = new CodeTypoConfigFileReaderWriterImpl(io, defaultDeserializers, defaultLoaders);
        const config = await rw.readConfig(url);
        expect(config).toBeInstanceOf(CodeTypoConfigFile);
        expect(config.url).toEqual(url);
        expect(config.settings).toEqual(settings);

        expect(rw.toCodeTypoConfigFile(config)).toBe(config);

        const config2 = rw.toCodeTypoConfigFile({ url, settings });
        expect(config2).toBeInstanceOf(CodeTypoConfigFile);
        expect(config2).not.toEqual(config);

        // At the moment, we do not try to associate the settings with the right loader.
        expect(config2).toBeInstanceOf(CodeTypoConfigFileInMemory);

        expect(config2.settings).toEqual(settings);
    });
});

class Cfg extends CodeTypoConfigFile {
    constructor(
        public readonly url: URL,
        public readonly settings: CodeTypoSettings = {},
    ) {
        super(url);
    }

    addWords(_words: string[]): this {
        return this;
    }
}
