import { pathToFileURL } from 'node:url';

import { afterEach, describe, expect, test, vi } from 'vitest';

import { CodeTypoConfigFileJson } from '../CodeTypoConfigFile/CodeTypoConfigFileJson.js';
import { defaultIO } from '../defaultIO.js';
import { fixtures } from '../test-helpers/fixtures.js';
import { loaderJavaScript } from './loaderJavaScript.js';

const oc = <T>(obj: T) => expect.objectContaining(obj);
const ac = <T>(a: Array<T>) => expect.arrayContaining(a);

describe('loaderJavaScript', () => {
    afterEach(() => {});

    test.each`
        file                                 | expected
        ${'js/module/codetypo.config.js'}    | ${{ settings: oc({ id: 'module/js' }) }}
        ${'js/module/codetypo.config.cjs'}   | ${{ settings: oc({ id: 'module/cjs' }) }}
        ${'js/commonjs/codetypo.config.js'}  | ${{ settings: oc({ id: 'commonjs/js' }) }}
        ${'js/commonjs/codetypo.config.mjs'} | ${{ settings: oc({ id: 'commonjs/mjs' }) }}
        ${'js/module/codetypo.custom.js'}    | ${{ settings: oc({ id: 'async-module', dictionaryDefinitions: [oc({ words: ac(['recheck', 'tested']) })] }) }}
    `('loaderJavaScript $file', async ({ file, expected }) => {
        const url = pathToFileURL(fixtures(file));
        expected.url ??= url;
        const next = vi.fn();

        const result = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result).toEqual(expected);

        // Try double loading.
        const result2 = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result2.settings).toBe(result.settings);

        // Ensure that we can force a load by changing search params.
        const url3 = new URL(url.href);
        url3.searchParams.append('q', '29');

        const result3 = await loaderJavaScript.load({ url: url3, context: { deserialize, io: defaultIO } }, next);
        expect(result3.settings).not.toBe(result.settings);
        expect(result3.settings).toEqual(result.settings);

        // Ensure that we can force a load by changing the hash.
        const url4 = new URL(url.href);
        url4.hash = 'hash';
        const result4 = await loaderJavaScript.load({ url: url4, context: { deserialize, io: defaultIO } }, next);
        expect(result4.settings).not.toBe(result.settings);
    });

    /* codetypo:ignore lazr */

    test.each`
        file                                | expected
        ${'js/module/codetypo.function.js'} | ${{ settings: oc({ id: 'config-function', words: ac(['recheck', 'tested']) }) }}
        ${'js/module/codetypo.python.mjs'}  | ${{ settings: oc({ id: 'python-imports', words: ac(['blinker', 'click', 'lazr']) }) }}
    `('loaderJavaScript $file default function', async ({ file, expected }) => {
        const url = pathToFileURL(fixtures(file));
        expected.url ??= url;
        const next = vi.fn();

        const result = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result).toEqual(expected);

        // Try double loading.
        const result2 = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result2.settings).toEqual(result.settings);
        // These are not the same because it is a function result, not a static object.
        expect(result2.settings).not.toBe(result.settings);

        // Ensure that we can force a load by changing search params.
        const url3 = new URL(url.href);
        url3.searchParams.append('q', '29');

        const result3 = await loaderJavaScript.load({ url: url3, context: { deserialize, io: defaultIO } }, next);
        expect(result3.settings).not.toBe(result.settings);
        expect(result3.settings).toEqual(result.settings);

        // Ensure that we can force a load by changing the hash.
        const url4 = new URL(url.href);
        url4.hash = 'hash';
        const result4 = await loaderJavaScript.load({ url: url4, context: { deserialize, io: defaultIO } }, next);
        expect(result4.settings).not.toBe(result.settings);
    });

    test.each`
        file                                 | expected
        ${'js/commonjs/codetypo.config.mjs'} | ${{ settings: oc({ id: 'commonjs/mjs' }) }}
    `('loaderJavaScript reloading $file', async ({ file, expected }) => {
        const url = pathToFileURL(fixtures(file));
        expected.url ??= url;
        const next = vi.fn();

        const result = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result).toEqual(expected);

        // Try double loading.
        const result2 = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result2.settings).toBe(result.settings);

        // Ensure that we can force a load
        loaderJavaScript.reset();

        const result3 = await loaderJavaScript.load({ url, context: { deserialize, io: defaultIO } }, next);
        expect(result3.settings).not.toBe(result.settings);
        expect(result3.settings).toEqual(result.settings);
    });

    test.each`
        url
        ${'file:///codetypo.json'}
    `('loaderJavaScript next', async ({ url }) => {
        const next = vi.fn();
        await loaderJavaScript.load({ url: new URL(url), context: { deserialize, io: defaultIO } }, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

function deserialize(params: { url: URL; content: string }): CodeTypoConfigFileJson {
    return new CodeTypoConfigFileJson(params.url, JSON.parse(params.content));
}
