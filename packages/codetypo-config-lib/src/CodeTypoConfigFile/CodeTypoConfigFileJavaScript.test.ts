import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { describe, expect, test } from 'vitest';

import { CodeTypoConfigFileJavaScript } from './CodeTypoConfigFileJavaScript.js';

describe('CodeTypoConfigFileJavaScript', () => {
    const url = new URL('https://example.com/config');
    const settings: CodeTypoSettings = {};

    test('should create an instance of CodeTypoConfigFileInMemory', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile).toBeInstanceOf(CodeTypoConfigFileJavaScript);
    });

    test('should have the correct URL', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile.url).toEqual(url);
    });

    test('should have the correct settings', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile.settings).toEqual(settings);
    });

    test('should be readonly', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile.readonly).toBe(true);
    });

    test('should NOT be remote', () => {
        const configFile = new CodeTypoConfigFileJavaScript(new URL(import.meta.url), settings);
        expect(configFile.remote).toBe(false);
    });

    test('should be remote', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile.remote).toBe(true);
    });

    test('should NOT be virtual', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(configFile.virtual).toBe(false);
    });

    test('should throw when adding words', () => {
        const configFile = new CodeTypoConfigFileJavaScript(url, settings);
        expect(() => configFile.addWords(['word'])).toThrowError('Unable to add words to a JavaScript config file.');
    });
});
