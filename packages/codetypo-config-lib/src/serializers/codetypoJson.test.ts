import assert from 'node:assert';

import { describe, expect, test, vi } from 'vitest';

import { CodeTypoConfigFileJson } from '../CodeTypoConfigFile/CodeTypoConfigFileJson.js';
import { defaultNextDeserializer, defaultNextSerializer } from '../defaultNext.js';
import { json } from '../test-helpers/util.js';
import { serializerCodeTypoJson } from './codetypoJson.js';

const oc = <T>(obj: T) => expect.objectContaining(obj);

const next = defaultNextDeserializer;

describe('codetypoJson', () => {
    const sampleCodeTypoJson = `{
  "version": "0.2",
  // Add words here:
  "words": [
    "cache"
  ]
}
`;

    test.each`
        uri                  | content                                    | expected
        ${'codetypo.json'}     | ${'{}'}                                    | ${oc({ settings: {} })}
        ${'codetypo-ext.json'} | ${'{}'}                                    | ${oc({ settings: {} })}
        ${'.codetypo.json'}    | ${'{\n  // add words here\n  "words":[]}'} | ${oc({ settings: { words: [] } })}
    `('success $uri', ({ uri, content, expected }) => {
        expect(serializerCodeTypoJson.deserialize({ url: new URL(uri, 'file:///'), content }, next)).toEqual(expected);
    });

    test.each`
        uri              | content | expected
        ${''}            | ${''}   | ${'Unable to parse config file: "file:///"'}
        ${'codetypo.js'}   | ${''}   | ${'Unable to parse config file: "file:///codetypo.js"'}
        ${'codetypo.yaml'} | ${''}   | ${'Unable to parse config file: "file:///codetypo.yaml"'}
        ${'codetypo.json'} | ${''}   | ${'Unable to parse file:///codetypo.json'}
        ${'codetypo.json'} | ${'[]'} | ${'Unable to parse file:///codetypo.json'}
    `('fail $uri', ({ uri, content, expected }) => {
        expect(() => serializerCodeTypoJson.deserialize({ url: new URL(uri, 'file:///'), content }, next)).toThrow(
            expected,
        );
    });

    test.each`
        uri                  | content                   | expected
        ${'codetypo.json'}     | ${'{\n\t"name": "name"}'} | ${json({ name: 'name' }, '\t')}
        ${'codetypo.json?x=5'} | ${'{\n  "words":[]}'}     | ${json({ words: [] }, 2)}
        ${'codetypo.jsonc'}    | ${sampleCodeTypoJson}       | ${sampleCodeTypoJson}
    `('serialize $uri', ({ uri, content, expected }) => {
        const next = vi.fn();
        const file = serializerCodeTypoJson.deserialize({ url: new URL(uri, 'file:///'), content }, next);
        assert(file instanceof CodeTypoConfigFileJson);
        expect(serializerCodeTypoJson.serialize(file, defaultNextSerializer)).toEqual(expected);
        expect(next).toHaveBeenCalledTimes(0);
    });

    test('serialize reject', () => {
        const next = vi.fn();
        serializerCodeTypoJson.serialize({ url: new URL('file:///file.txt'), settings: {} }, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
