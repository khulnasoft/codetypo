import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { describe, expect, test } from 'vitest';

import { CodeTypoConfigFileInMemory } from './CodeTypoConfigFileInMemory.js';

describe('CodeTypoConfigFileInMemory', () => {
    const url = new URL('https://example.com/config');
    const settings: CodeTypoSettings = {};

    test('should create an instance of CodeTypoConfigFileInMemory', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile).toBeInstanceOf(CodeTypoConfigFileInMemory);
    });

    test('should have the correct URL', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile.url).toEqual(url);
    });

    test('should have the correct settings', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile.settings).toEqual(settings);
    });

    test('should be readonly', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile.readonly).toBe(true);
    });

    test('should be remote', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile.remote).toBe(true);
    });

    test('should be virtual', () => {
        const configFile = new CodeTypoConfigFileInMemory(url, settings);
        expect(configFile.virtual).toBe(true);
    });
});
