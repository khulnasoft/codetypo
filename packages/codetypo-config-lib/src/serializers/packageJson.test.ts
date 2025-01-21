import assert from 'node:assert';

import { describe, expect, test, vi } from 'vitest';

import { CodeTypoConfigFilePackageJson } from '../CodeTypoConfigFile/CodeTypoConfigFilePackageJson.js';
import { defaultNextDeserializer, defaultNextSerializer } from '../defaultNext.js';
import { json } from '../test-helpers/util.js';
import { serializerPackageJson } from './packageJson.js';

const oc = <T>(obj: T) => expect.objectContaining(obj);
const next = defaultNextDeserializer;

describe('packageJson', () => {
    test.each`
        uri                   | content                        | expected
        ${'package.json'}     | ${'{}'}                        | ${oc({ settings: {} })}
        ${'package.json?x=5'} | ${'{"codetypo":{"words":[]}}'} | ${oc({ settings: { words: [] } })}
    `('success $uri', ({ uri, content, expected }) => {
        expect(serializerPackageJson.deserialize({ url: new URL(uri, import.meta.url), content }, next)).toEqual(
            expected,
        );
    });

    test.each`
        url                        | content               | expected
        ${'file:///'}              | ${''}                 | ${'Unable to parse config file: "file:///"'}
        ${'file:///codetypo.js'}   | ${''}                 | ${'Unable to parse config file: "file:///codetypo.js"'}
        ${'file:///codetypo.json'} | ${''}                 | ${'Unable to parse config file: "file:///codetypo.json"'}
        ${'file:///codetypo.yaml'} | ${''}                 | ${'Unable to parse config file: "file:///codetypo.yaml"'}
        ${'file:///package.json'}  | ${''}                 | ${'Unexpected end of JSON input'}
        ${'file:///package.json'}  | ${'[]'}               | ${'Unable to parse file:///package.json'}
        ${'file:///package.json'}  | ${'{"codetypo": []}'} | ${'Unable to parse file:///package.json'}
    `('fail $url', ({ url, content, expected }) => {
        expect(() => serializerPackageJson.deserialize({ url: new URL(url), content }, next)).toThrow(expected);
    });

    test.each`
        uri                   | content                            | expected
        ${'package.json'}     | ${'{\n\t"name": "name"}'}          | ${json({ name: 'name', codetypo: {} }, '\t')}
        ${'package.json?x=5'} | ${'{\n  "codetypo":{"words":[]}}'} | ${json({ codetypo: { words: [] } }, 2)}
        ${'package.json?x=5'} | ${'{\n  "codetypo":{"words":[]}}'} | ${json({ codetypo: { words: [] } }, 2)}
    `('serialize $uri', ({ uri, content, expected }) => {
        const file = serializerPackageJson.deserialize({ url: new URL(uri, import.meta.url), content }, next);
        assert(file instanceof CodeTypoConfigFilePackageJson);
        expect(serializerPackageJson.serialize(file, defaultNextSerializer)).toEqual(expected);
    });

    test('serialize reject', () => {
        const next = vi.fn();
        serializerPackageJson.serialize({ url: new URL('file:///file.txt'), settings: {} }, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
