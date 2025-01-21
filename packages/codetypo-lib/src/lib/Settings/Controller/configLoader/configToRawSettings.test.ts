import { fileURLToPath } from 'node:url';

import { CodeTypoConfigFileJavaScript } from 'codetypo-config-lib';
import { describe, expect, test } from 'vitest';

import { configToRawSettings } from './configToRawSettings.js';

describe('configToRawSettings', () => {
    test('should return empty settings when config file is undefined', () => {
        const result = configToRawSettings(undefined);
        expect(result).toEqual({});
    });

    test('should convert CodeTypoConfigFile to CodeTypoSettingsWST', () => {
        const cfgFile = new CodeTypoConfigFileJavaScript(new URL(import.meta.url), {});
        const result = configToRawSettings(cfgFile);
        expect(result.__importRef).toEqual(expect.objectContaining({ filename: fileURLToPath(import.meta.url) }));
    });
});
