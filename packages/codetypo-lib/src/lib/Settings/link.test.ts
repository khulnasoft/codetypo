import * as Path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { CodeTypoConfigFileInMemory } from 'codetypo-config-lib';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { CodeTypoSettingsWST } from './Controller/configLoader/types.js';
import { getGlobalConfig, getRawGlobalSettings, writeRawGlobalSettings } from './GlobalSettings.js';
import { __testing__, addPathsToGlobalImports, listGlobalImports, removePathsFromGlobalImports } from './link.js';

vi.mock('./GlobalSettings');

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

const findPackageForCodeTypoConfig = __testing__.findPackageForCodeTypoConfig;

const mock_getGlobalConfig = vi.mocked(getGlobalConfig);
const mock_getRawGlobalSettings = vi.mocked(getRawGlobalSettings);
const mock_writeRawGlobalSettings = vi.mocked(writeRawGlobalSettings);

mock_getGlobalConfig_mockImplementation({});

const configFileLocation = '/Users/home/.config/store';
const pathPython = require.resolve('@codetypo/dict-python/codetypo-ext.json');
const pathCpp = require.resolve('@codetypo/dict-cpp/codetypo-ext.json');
const pathHtml = require.resolve('@codetypo/dict-html/codetypo-ext.json');
const pathCss = require.resolve('@codetypo/dict-css/codetypo-ext.json');
const python = require.resolve('@codetypo/dict-python/codetypo-ext.json');

describe('Validate Link.ts', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('listGlobalImports configstore empty', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            source: { filename: undefined, name: 'CodeTypo Configstore' },
        });
        const r = await listGlobalImports();
        expect(r).toEqual({
            list: [],
            globalSettings: {
                source: { filename: undefined, name: 'CodeTypo Configstore' },
            },
        });
        expect(mock_getRawGlobalSettings).toHaveBeenCalledOnce();
        expect(mock_writeRawGlobalSettings).not.toHaveBeenCalled();
    });

    test('listGlobalImports configstore empty import', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });
        const r = await listGlobalImports();
        expect(r).toEqual({
            list: [],
            globalSettings: {
                source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
                import: [],
            },
        });
    });

    test('listGlobalImports with imports', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [python],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });
        const r = await listGlobalImports();
        expect(r).toEqual(
            expect.objectContaining({
                list: [
                    expect.objectContaining({
                        filename: python,
                        error: undefined,
                    }),
                ],
                globalSettings: expect.objectContaining({
                    source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
                }),
            }),
        );
    });

    test('listGlobalImports with import errors', async () => {
        const filename = '__not_found_file_.ext';
        mock_getRawGlobalSettings_mockReturnValue({
            import: [filename],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });
        const r = await listGlobalImports();
        expect(r).toEqual(
            expect.objectContaining({
                list: [
                    expect.objectContaining({
                        filename: filename,
                        error: expect.stringContaining('Failed to read config'),
                    }),
                ],
                globalSettings: expect.objectContaining({
                    source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
                }),
            }),
        );
        expect(mock_getRawGlobalSettings).toHaveBeenCalledOnce();
        expect(mock_writeRawGlobalSettings).not.toHaveBeenCalled();
    });

    test('addPathsToGlobalImports', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [pathPython, pathCss],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });

        const r = await addPathsToGlobalImports([pathCpp, pathPython, pathHtml]);

        expect(r.resolvedSettings).toHaveLength(3);
        expect(r).toEqual({
            success: true,
            resolvedSettings: [
                expect.objectContaining({ filename: pathCpp }),
                expect.objectContaining({ filename: pathPython }),
                expect.objectContaining({ filename: pathHtml }),
            ],
        });
        expect(mock_writeRawGlobalSettings).toHaveBeenCalledWith({
            import: [pathPython, pathCss, pathCpp, pathHtml],
        });
    });

    test('addPathsToGlobalImports with errors', async () => {
        const pathNotFound = '__not_found_file_.ext';

        mock_getRawGlobalSettings_mockReturnValue({
            import: [pathPython],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });

        const r = await addPathsToGlobalImports([pathCpp, pathPython, pathNotFound]);

        expect(r.resolvedSettings).toHaveLength(3);
        expect(r).toEqual({
            error: 'Unable to resolve files.',
            success: false,
            resolvedSettings: [
                expect.objectContaining({ filename: pathCpp }),
                expect.objectContaining({ filename: pathPython }),
                expect.objectContaining({
                    filename: pathNotFound,
                    error: expect.stringContaining('Failed to read config'),
                }),
            ],
        });
        expect(mock_writeRawGlobalSettings).not.toHaveBeenCalled();
    });

    test('removePathsFromGlobalImports', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [pathCpp, pathPython, pathCss, pathHtml],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });

        const r = await removePathsFromGlobalImports([pathCpp, '@codetypo/dict-css']);

        expect(r).toEqual({
            success: true,
            error: undefined,
            removed: [pathCpp, pathCss],
        });

        expect(mock_writeRawGlobalSettings).toHaveBeenCalledWith({
            import: [pathPython, pathHtml],
        });
    });

    test('removePathsFromGlobalImports with unknown', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [pathCpp, pathPython, pathCss, pathHtml],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });

        const r = await removePathsFromGlobalImports([
            pathCpp,
            '@codetypo/dict-unknown',
            'codetypo-ext.json',
            '@codetypo/dict-html',
            'python/codetypo-ext.json',
        ]);

        expect(r).toEqual({
            success: true,
            error: undefined,
            removed: [pathCpp, pathHtml],
        });

        expect(mock_writeRawGlobalSettings).toHaveBeenCalledWith({
            import: [pathPython, pathCss],
        });
    });

    test('removePathsFromGlobalImports with nothing to remove', async () => {
        mock_getRawGlobalSettings_mockReturnValue({
            import: [pathCpp, pathPython, pathCss, pathHtml],
            source: { filename: configFileLocation, name: 'CodeTypo Configstore' },
        });

        const r = await removePathsFromGlobalImports([
            '@codetypo/dict-unknown',
            'codetypo-ext.json',
            'python/codetypo-ext.json',
        ]);

        expect(r).toEqual({
            success: true,
            error: undefined,
            removed: [],
        });

        expect(mock_writeRawGlobalSettings).not.toHaveBeenCalled();
    });

    test('findPackageForCodeTypoConfig', () => {
        const pathPythonDir = Path.dirname(pathPython);
        const pathPythonPackage = Path.join(pathPythonDir, 'package.json');

        const found = findPackageForCodeTypoConfig(pathPythonDir);
        expect(found).toEqual({
            name: '@codetypo/dict-python',
            filename: pathPythonPackage,
        });
    });

    test('findPackageForCodeTypoConfig not found', () => {
        const found = findPackageForCodeTypoConfig(pathPython);
        expect(found).toBeUndefined();
    });
});

function mock_getRawGlobalSettings_mockReturnValue(settings: CodeTypoSettingsWST) {
    mock_getRawGlobalSettings.mockReturnValue(Promise.resolve(settings));
}

function mock_getGlobalConfig_mockImplementation(useSettings: CodeTypoSettingsWST) {
    mock_getGlobalConfig.mockImplementation(() => {
        const url = new URL('global-config.json', pathToFileURL('/User/local/data/.config/configstore/'));
        const settings: CodeTypoSettingsWST = {
            import: [],
            source: {
                name: 'CodeTypo Configstore',
                filename: Path.join(__dirname, 'global-config.json'),
            },
            ...useSettings,
        };
        return Promise.resolve(new CodeTypoConfigFileInMemory(url, settings));
    });
}
