import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import type { CodeTypoSettingsWithSourceTrace, CodeTypoUserSettings, ImportFileRef } from '@codetypo/codetypo-types';
import { CodeTypoConfigFile, CodeTypoConfigFileInMemory } from 'codetypo-config-lib';
import { createRedirectProvider, createVirtualFS } from 'codetypo-io';
import { assert, beforeEach, describe, expect, test, vi } from 'vitest';
import { URI } from 'vscode-uri';

import {
    pathPackageRoot,
    pathPackageSamples,
    pathPackageSamplesURL,
    pathRepoRoot,
    pathRepoRootURL,
    pathRepoTestFixtures,
    pathRepoTestFixturesURL,
} from '../../../../test-util/test.locations.cjs';
import { logError, logWarning } from '../../../util/logger.js';
import { cwdURL, resolveFileWithURL, toFilePathOrHref, toFileUrl } from '../../../util/url.js';
import { currentSettingsFileVersion, defaultConfigFileModuleRef, ENV_CODETYPO_GLOB_ROOT } from '../../constants.js';
import type { ImportFileRefWithError } from '../../CodeTypoSettingsServer.js';
import { extractDependencies, getSources, mergeSettings } from '../../CodeTypoSettingsServer.js';
import { _defaultSettings, getDefaultBundledSettingsAsync } from '../../DefaultSettings.js';
import {
    __testing__ as __configLoader_testing__,
    ConfigurationLoaderFailedToResolveError,
    createConfigLoader,
    loadPnP,
} from './configLoader.js';
import { configToRawSettings } from './configToRawSettings.js';
import {
    clearCachedSettingsFiles,
    getCachedFileSize,
    getDefaultConfigLoader,
    getGlobalSettings,
    getGlobalSettingsAsync,
    loadConfig,
    readConfigFile,
    readRawSettings,
    searchForConfig,
} from './defaultConfigLoader.js';
import { extractImportErrors, extractImports } from './extractImportErrors.js';
import { readSettings } from './readSettings.js';
import { readSettingsFiles } from './readSettingsFiles.js';

const { validateRawConfigVersion, resolveGlobRoot, relativeToCwd } = __configLoader_testing__;

const rootCodetypoLib = path.join(pathPackageRoot, '.');
const root = pathRepoRoot;
const samplesDir = pathPackageSamples;
const samplesSrc = path.join(samplesDir, 'src');
const testFixtures = pathRepoTestFixtures;

const urlIssues = new URL('issues/', pathRepoTestFixturesURL);

const oc = <T>(obj: T) => expect.objectContaining(obj);
const sm = (m: string | RegExp) => expect.stringMatching(m);

function expectError(err: string | Error) {
    const message = typeof err === 'string' ? err : err.message;
    return expect.objectContaining({ message });
}

vi.mock('../../../util/logger');

const mockedLogError = vi.mocked(logError);
const mockedLogWarning = vi.mocked(logWarning);

const urlSrcDir = pathToFileURL(rp('src/lib'));

describe('Validate CodeTypoSettingsServer', () => {
    test.each`
        filename                                              | relativeTo   | refFilename
        ${rp('codetypo.config.json')}                           | ${undefined} | ${rp('codetypo.config.json')}
        ${rp('codetypo.config.json')}                           | ${rp('src')} | ${rp('codetypo.config.json')}
        ${'@codetypo/codetypo-bundled-dicts/codetypo-default.json'} | ${rp()}      | ${require.resolve('@codetypo/codetypo-bundled-dicts/codetypo-default.json')}
        ${'@codetypo/codetypo-bundled-dicts/codetypo-default.json'} | ${undefined} | ${require.resolve('@codetypo/codetypo-bundled-dicts/codetypo-default.json')}
    `('tests readSettings $filename $relativeTo', async ({ filename, relativeTo, refFilename }) => {
        const settings = await readSettings(filename, relativeTo);
        expect(settings.__importRef?.filename).toBe(refFilename);
        expect(settings.__importRef?.error).toBeUndefined();
        expect(settings.import).toBeUndefined();
    });

    test('tests loading project codetypo.json file', async () => {
        const filename = path.join(samplesDir, 'linked/codetypo-missing.json');
        const settings = await readSettings(filename);
        expect(Object.keys(settings)).not.toHaveLength(0);
        expect(settings.words).toBeUndefined();
    });

    test('tests loading a codeTypo.json file', async () => {
        const filename = path.join(samplesDir, 'linked/codetypo-import.json');
        const settings = await readSettings(filename);
        expect(Object.keys(settings)).not.toHaveLength(0);
        expect(settings.words).toEqual(expect.arrayContaining(['import']));
    });

    test('readSettingsFiles codeTypo.json', async () => {
        const filename = path.join(samplesDir, 'linked/codetypo-import.json');
        const settings = await readSettingsFiles([filename]);
        expect(Object.keys(settings)).not.toHaveLength(0);
        expect(settings.words).toEqual(expect.arrayContaining(['import']));
    });

    test('tests loading a codeTypo.json with multiple imports file', async () => {
        const filename = path.join(samplesDir, 'linked/codetypo-imports.json');
        const settings = await readSettings(filename);
        expect(Object.keys(settings)).not.toHaveLength(0);
        expect(settings.words).toEqual(expect.arrayContaining(['import']));
        expect(settings.words).toEqual(expect.arrayContaining(['imports']));
        // codetypo:word leuk
        expect(settings.words).toEqual(expect.arrayContaining(['leuk']));
    });

    test('tests loading a codeTypo.json with a missing import file', async () => {
        const filename = path.join(samplesDir, 'linked/codetypo-import-missing.json');
        const settings = await readSettings(filename);
        expect(settings.__importRef?.filename).toBe(path.resolve(filename));
        expect(settings.__imports?.size).toBe(2);
        const errors = extractImportErrors(settings);
        expect(errors).toHaveLength(1);
        expect(errors.map((ref) => ref.error.toString())).toContainEqual(
            expect.stringMatching('intentionally-missing-file.json'),
        );
        expect(errors.map((ref) => ref.error.toString())).toContainEqual(expect.stringMatching('Failed to resolve'));
    });

    test('makes sure global settings is an object', async () => {
        const settings = getGlobalSettings();
        expect(await getGlobalSettingsAsync()).toBe(settings);
        expect(Object.keys(settings)).not.toHaveLength(0);
        const merged = mergeSettings(await getDefaultBundledSettingsAsync(), await getGlobalSettingsAsync());
        expect(Object.keys(merged)).not.toHaveLength(0);
    });

    test('verify clearing the file cache works', async () => {
        mergeSettings(await getDefaultBundledSettingsAsync(), await getGlobalSettingsAsync());
        expect(getCachedFileSize()).toBeGreaterThan(0);
        clearCachedSettingsFiles();
        expect(getCachedFileSize()).toBe(0);
    });

    test('the loaded defaults contain expected settings', async () => {
        const settings = await getDefaultBundledSettingsAsync();
        const sources = getSources(settings);
        const sourceNames = sources.map((s) => s.name || '?');
        expect(sourceNames).toEqual(expect.arrayContaining([_defaultSettings.name]));
    });

    test('loading circular imports (readSettings)', async () => {
        const configFile = path.join(samplesDir, 'linked/codetypo.circularA.json');
        const config = await readSettings(configFile);
        expect(config?.ignorePaths).toEqual(
            expect.arrayContaining([
                {
                    glob: 'node_modules',
                    root: path.dirname(configFile),
                    source: configFile,
                },
            ]),
        );
        const errors = extractImportErrors(config);
        expect(errors).toEqual([]);

        const sources = getSources(config);
        // circular includes a copy of the origin.
        expect(sources.length).toBe(3);
    });
});

describe('Validate CodeTypoSettingsServer loadConfig', () => {
    beforeEach(() => {
        clearCachedSettingsFiles();
    });

    test('loading circular imports (loadConfig)', async () => {
        const configFile = path.join(samplesDir, 'linked/codetypo.circularA.json');
        const config = await loadConfig(configFile);
        expect(config?.ignorePaths).toEqual(
            expect.arrayContaining([
                {
                    glob: 'node_modules',
                    root: path.dirname(configFile),
                    source: configFile,
                },
            ]),
        );
        const errors = extractImportErrors(config);
        expect(errors).toEqual([]);

        const sources = getSources(config);
        // sources include the origin twice.
        expect(sources.length).toBe(3);
        const sourceMap = new Map(sources.map((s) => [s.__importRef?.filename, s]));
        expect(sourceMap.size).toBe(2);
    });

    test('loading circular imports (loadConfigSync)', async () => {
        const configFile = path.join(samplesDir, 'linked/codetypo.circularA.json');
        const config = await loadConfig(configFile);
        expect(config?.ignorePaths).toEqual(
            expect.arrayContaining([
                {
                    glob: 'node_modules',
                    root: path.dirname(configFile),
                    source: configFile,
                },
            ]),
        );
        const errors = extractImportErrors(config);
        expect(errors).toEqual([]);

        const sources = getSources(config);
        // console.warn('sources %o', sources);
        expect(sources.length).toBe(3);
    });
});

describe('Validate Glob resolution', () => {
    beforeEach(() => {
        delete process.env[ENV_CODETYPO_GLOB_ROOT];
    });

    test('normalized settings', () => {
        expect(sampleSettings).not.toEqual(sampleSettingsV1);
        expect(sampleSettings.globRoot).not.toEqual(sampleSettingsV1.globRoot);
        expect(sampleSettings.globRoot).toBe(path.dirname(srcSampleSettingsFilename));
        expect(sampleSettingsV1.globRoot).toEqual('${cwd}');
        expect(sampleSettings.ignorePaths).toEqual(
            expect.arrayContaining([
                { glob: 'node_modules', root: sampleSettings.globRoot, source: srcSampleSettingsFilename },
            ]),
        );
        expect(sampleSettingsV1.ignorePaths).toEqual(
            expect.arrayContaining([
                { glob: 'node_modules', root: sampleSettingsV1.globRoot, source: srcSampleSettingsFilename },
            ]),
        );
    });

    test('Using ENV_CODETYPO_GLOB_ROOT', async () => {
        process.env[ENV_CODETYPO_GLOB_ROOT] = path.dirname(srcSampleSettingsFilename);
        const settingsV = await cc(rawSampleSettings, srcSampleSettingsFilename);
        const settingsV1 = await cc(rawSampleSettingsV1, srcSampleSettingsFilename);

        expect(settingsV).toEqual(sampleSettings);
        expect(settingsV1).not.toEqual(sampleSettingsV1);

        delete settingsV1.version;
        const { version: _, ...sample } = sampleSettings;
        expect(settingsV1).toEqual(sample);
    });

    test('Using ENV_CODETYPO_GLOB_ROOT as without shared hierarchy', async () => {
        process.env[ENV_CODETYPO_GLOB_ROOT] = rp('samples');
        const settingsV = await cc(rawSampleSettings, srcSampleSettingsFilename);
        const settingsV1 = await cc(rawSampleSettingsV1, srcSampleSettingsFilename);

        expect(settingsV.version).toEqual(currentSettingsFileVersion);

        expect(settingsV1).toEqual(oc({ version: '0.1' }));
        expect(settingsV).not.toEqual(sampleSettings);
        expect(settingsV1).not.toEqual(sampleSettingsV1);

        delete settingsV1.version;
        delete settingsV.version;
        expect(settingsV1).toEqual(settingsV);
    });

    test('globs with relative globRoot', async () => {
        const configFilename = path.resolve(samplesDir, 'codetypo.relative-glob-root.json');
        const configDir = path.dirname(configFilename);
        const config = await loadConfig(configFilename);

        expect(config).toEqual(
            oc({
                ignorePaths: expect.arrayContaining([
                    {
                        glob: 'node_modules',
                        root: path.resolve(configDir, '../../..'),
                        source: configFilename,
                    },
                ]),
            }),
        );
    });

    test.each`
        from
        ${rp('src/lib')}
        ${undefined}
    `('globs from config file (search) $from', async ({ from }) => {
        const config = await searchForConfig(from);
        expect(config?.ignorePaths).toEqual(
            expect.arrayContaining([
                {
                    glob: 'node_modules/**',
                    root: rootCodetypoLib,
                    source: path.join(rootCodetypoLib, 'codetypo.config.json'),
                },
            ]),
        );
    });

    test('globs from config file (readSettings)', async () => {
        const configFile = path.join(rootCodetypoLib, 'codetypo.config.json');
        const config = await readSettings(configFile);
        expect(config?.ignorePaths).toEqual(
            expect.arrayContaining([
                {
                    glob: 'node_modules/**',
                    root: rootCodetypoLib,
                    source: configFile,
                },
            ]),
        );
    });

    test.each`
        settings                                                          | file                      | expected
        ${{}}                                                             | ${rSrcLib('codetypo.json')} | ${oc({ name: 'lib/codetypo.json' })}
        ${{ gitignoreRoot: '.' }}                                         | ${rSrcLib('codetypo.json')} | ${oc({ name: 'lib/codetypo.json', gitignoreRoot: [rSrcLib('.') + path.sep] })}
        ${{ gitignoreRoot: '..' }}                                        | ${rSrcLib('codetypo.json')} | ${oc({ gitignoreRoot: [rSrcLib('..') + path.sep] })}
        ${{ gitignoreRoot: ['.', '..'] }}                                 | ${rSrcLib('codetypo.json')} | ${oc({ gitignoreRoot: [rSrcLib('.') + path.sep, rSrcLib('..') + path.sep] })}
        ${{ reporters: [rel(rSample('reporter.cjs'), rSrcLib())] }}       | ${rSrcLib('codetypo.json')} | ${oc({ reporters: [rSample('reporter.cjs')] })}
        ${{ reporters: [[rel(rSample('reporter.cjs'), rSrcLib())]] }}     | ${rSrcLib('codetypo.json')} | ${oc({ reporters: [[rSample('reporter.cjs')]] })}
        ${{ reporters: [[rel(rSample('reporter.cjs'), rSrcLib()), {}]] }} | ${rSrcLib('codetypo.json')} | ${oc({ reporters: [[rSample('reporter.cjs'), {}]] })}
    `('normalizeSettings $settings', async ({ settings, file, expected }) => {
        expect(await cc(settings, file)).toEqual(expected);
    });

    test.each`
        settings                            | file                      | expected
        ${{ reporters: ['./reporter.js'] }} | ${rSrcLib('codetypo.json')} | ${'Not found: "./reporter.js"'}
        ${{ reporters: [{}] }}              | ${rSrcLib('codetypo.json')} | ${'Invalid Reporter'}
        ${{ reporters: [[{}]] }}            | ${rSrcLib('codetypo.json')} | ${'Invalid Reporter'}
    `('normalizeSettings with Error $settings', async ({ settings, file, expected }) => {
        await expect(cc(settings, file)).rejects.toThrowError(expected);
    });
});

describe('Validate search/load config files', () => {
    beforeEach(() => {
        mockedLogError.mockClear();
        mockedLogWarning.mockClear();
        clearCachedSettingsFiles();
    });

    function resolveError(filename: string, relativeTo = cwdURL()): ImportFileRefWithError {
        return {
            filename,
            error: new ConfigurationLoaderFailedToResolveError(filename, relativeTo),
        };
    }

    function readError(filename: string): ImportFileRefWithError {
        return {
            filename,
            error: new Error(`Failed to read config file: "${filename}"`),
        };
    }

    function s(filename: string): string {
        return rSample(filename);
    }

    interface TestSearchFrom {
        dir: string;
        expectedConfig: CodeTypoSettingsWithSourceTrace;
        expectedImportErrors: string[];
    }

    test.each`
        dir                         | expectedConfig                                                                    | expectedImportErrors
        ${samplesSrc}               | ${cfg(s('.codetypo.json'))}                                                         | ${[]}
        ${s('bug-fixes/bug345.ts')} | ${cfg(s('bug-fixes/codetypo.json'))}                                                | ${[]}
        ${s('linked/README.md')}    | ${cfg(s('linked/codetypo.config.js'))}                                              | ${[]}
        ${s('linked')}              | ${cfg(s('linked/codetypo.config.js'))}                                              | ${[]}
        ${s('dot-config/src/')}     | ${cfg(s('dot-config/.config/codetypo.config.yaml'), { name: 'Nested in .config' })} | ${[]}
        ${s('yaml-config/')}        | ${cfg(s('yaml-config/codetypo.yaml'), { id: 'Yaml Example Config' })}               | ${['codetypo-imports.json']}
    `('Search from $dir', async ({ dir, expectedConfig, expectedImportErrors }: TestSearchFrom) => {
        const searchResult = await searchForConfig(dir);
        expect(searchResult).toEqual(expect.objectContaining(expectedConfig));
        if (searchResult?.__importRef) {
            const loadResult = await loadConfig(searchResult.__importRef?.filename);

            expect(loadResult).toEqual(searchResult);
        }
        const errors = extractImportErrors(searchResult || {});
        expect(errors).toHaveLength(expectedImportErrors.length);
        expect(errors).toEqual(
            expect.arrayContaining(
                expectedImportErrors.map((filename) =>
                    expect.objectContaining({ filename: expect.stringContaining(filename) }),
                ),
            ),
        );
    });

    test.each`
        dir                                | expectedConfig
        ${pathToFileURL(samplesSrc + '/')} | ${toFileUrl(s('.codetypo.json'))}
        ${sURL('bug-fixes/bug345.ts')}     | ${toFileUrl(s('bug-fixes/codetypo.json'))}
        ${sURL('linked/')}                 | ${toFileUrl(s('linked/codetypo.config.js'))}
        ${sURL('yaml-config/')}            | ${toFileUrl(s('yaml-config/codetypo.yaml'))}
    `('Search from $dir', async ({ dir, expectedConfig }) => {
        const loader = getDefaultConfigLoader();
        const searchResult = await loader.searchForConfigFile(toFileUrl(dir));
        expect(searchResult?.url.href).toEqual(expectedConfig.href);
    });

    test.each`
        dir                                                   | expectedImports
        ${new URL('issue-5034/.codetypo.json', urlIssues).href} | ${[oc({ filename: sm(/codetypo-ext.json/) }), oc({ filename: sm(/.codetypo.json/) })]}
    `('Search and merge from $dir', async ({ dir, expectedImports }) => {
        const loader = getDefaultConfigLoader();
        const url = toFileUrl(dir);
        const searchResult = await loader.searchForConfigFile(url);
        assert(searchResult);
        expect(searchResult.url.href).toEqual(url.href);
        const settings = await loader.mergeConfigFileWithImports(searchResult);
        expect(settings?.__importRef?.filename).toEqual(fileURLToPath(url));
        expect(extractImports(settings)).toEqual(expectedImports);
    });

    test.each`
        dir                                     | expectedConfig                                                      | expectedImportErrors
        ${pathToFileURL(samplesSrc + '/').href} | ${cfg(s('.codetypo.json'))}                                           | ${[]}
        ${sURL('bug-fixes/bug345.ts').href}     | ${cfg(s('bug-fixes/codetypo.json'))}                                  | ${[]}
        ${sURL('linked/file.txt').href}         | ${cfg(s('linked/codetypo.config.js'))}                                | ${[]}
        ${sURL('yaml-config/README.md').href}   | ${cfg(s('yaml-config/codetypo.yaml'), { id: 'Yaml Example Config' })} | ${['codetypo-imports.json']}
    `('Search check from $dir', async ({ dir, expectedConfig, expectedImportErrors }: TestSearchFrom) => {
        const searchResult = await searchForConfig(toFileUrl(dir));
        expect(searchResult?.__importRef).toEqual(expect.objectContaining(expectedConfig.__importRef));
        // expect(searchResult).toEqual(expect.objectContaining(expectedConfig));
        const errors = extractImportErrors(searchResult || {});
        expect(errors).toHaveLength(expectedImportErrors.length);
        expect(errors).toEqual(
            expect.arrayContaining(
                expectedImportErrors.map((filename) =>
                    expect.objectContaining({ filename: expect.stringContaining(filename) }),
                ),
            ),
        );
    });

    interface TestLoadConfig {
        file: string;
        expectedConfig: CodeTypoSettingsWithSourceTrace;
    }

    test.each`
        file                                          | expectedConfig
        ${samplesSrc}                                 | ${cfg(resolveError(samplesSrc))}
        ${s('bug-fixes')}                             | ${cfg(resolveError(s('bug-fixes')))}
        ${s('linked/codetypo.config.js')}               | ${cfg(s('linked/codetypo.config.js'))}
        ${s('dot-config/.config/codetypo.config.yaml')} | ${cfg(s('dot-config/.config/codetypo.config.yaml'), { name: 'Nested in .config', globRoot: s('dot-config') })}
        ${s('js-config/codetypo.config.js')}            | ${cfg(s('js-config/codetypo.config.js'))}
    `('Load from $file', async ({ file, expectedConfig }: TestLoadConfig) => {
        const searchResult = await loadConfig(file);
        expect(searchResult).toEqual(oc(expectedConfig));
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        file                                  | expectedConfig
        ${s('linked/codetypo.config.js')}       | ${cf(s('linked/codetypo.config.js'), { description: 'codetypo.config.js file in samples/linked', import: ['./codetypo-imports.json'] })}
        ${s('js-config/codetypo.config.js')}    | ${cf(s('js-config/codetypo.config.js'), { description: 'codetypo.config.js file in samples/js-config' })}
        ${s('js-config/codetypo-no-export.js')} | ${cf(s('js-config/codetypo-no-export.js'), {})}
    `('readConfigFile from $file', async ({ file, expectedConfig }) => {
        const searchResult = await readConfigFile(file);
        expect(searchResult.url).toEqual(oc(expectedConfig.url));
        expect(searchResult.settings).toEqual(oc(expectedConfig.settings));
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        file                                  | expectedConfig
        ${s('linked/codetypo.config.js')}       | ${cf(s('linked/codetypo.config.js'), { description: 'codetypo.config.js file in samples/linked', import: ['./codetypo-imports.json'] })}
        ${s('js-config/codetypo.config.js')}    | ${cf(s('js-config/codetypo.config.js'), { description: 'codetypo.config.js file in samples/js-config' })}
        ${s('js-config/codetypo-no-export.js')} | ${cf(s('js-config/codetypo-no-export.js'), {})}
    `('ReadRawSettings from $file', async ({ file, expectedConfig }) => {
        const searchResult = await readRawSettings(file);
        expect(searchResult.__importRef?.filename).toEqual(toFilePathOrHref(expectedConfig.url));
        expect(searchResult).toEqual(oc(expectedConfig.settings));
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        file                            | expectedConfig
        ${samplesSrc}                   | ${expectError(readError(samplesSrc).error)}
        ${s('bug-fixes')}               | ${expectError(readError(s('bug-fixes')).error)}
        ${s('js-config/codetypo-bad.js')} | ${expectError(readError(s('js-config/codetypo-bad.js')).error)}
    `('readConfigFile with error $file', async ({ file, expectedConfig }: TestLoadConfig) => {
        await expect(readConfigFile(file)).rejects.toEqual(expectedConfig);
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        file                            | expectedConfig
        ${samplesSrc}                   | ${readError(samplesSrc).error}
        ${s('bug-fixes')}               | ${readError(s('bug-fixes')).error}
        ${s('js-config/codetypo-bad.js')} | ${readError(s('js-config/codetypo-bad.js')).error}
    `('ReadRawSettings with error $file', async ({ file, expectedConfig }) => {
        const result = await readRawSettings(file);
        expect(result).toEqual(oc({ __importRef: oc({ error: expectError(expectedConfig) }) }));
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    /*
    test.each`
        file                                          | relativeTo   | expectedConfig
        ${'khulnasoft/codetypo/main/codetypo.test.base.json'} | ${'https://raw.githubusercontent.com/'} | ${oc(cf('https://raw.githubusercontent.com/khulnasoft/codetypo/main/codetypo.test.base.json', oc({ name: 'Base Test Config' })))}
    */

    test.each`
        file                                          | relativeTo   | expectedConfig
        ${samplesSrc}                                 | ${undefined} | ${expectError(readError(samplesSrc).error)}
        ${s('bug-fixes')}                             | ${undefined} | ${expectError(readError(s('bug-fixes')).error)}
        ${s('bug-fixes/not-found/codetypo.json')}       | ${undefined} | ${expectError(readError(s('bug-fixes/not-found/codetypo.json')).error)}
        ${s('dot-config/.config/codetypo.config.yaml')} | ${undefined} | ${oc(cf(s('dot-config/.config/codetypo.config.yaml'), oc({ name: 'Nested in .config' })))}
        ${rp('codetypo.config.json')}                   | ${undefined} | ${oc(cf(rp('codetypo.config.json'), oc({ id: 'codetypo-package-config' })))}
        ${s('linked/codetypo.config.js')}               | ${undefined} | ${cf(s('linked/codetypo.config.js'), oc({ description: 'codetypo.config.js file in samples/linked' }))}
        ${s('js-config/codetypo.config.js')}            | ${undefined} | ${cf(s('js-config/codetypo.config.js'), oc({ description: 'codetypo.config.js file in samples/js-config' }))}
        ${s('esm-config/codetypo.config.js')}           | ${undefined} | ${cf(s('esm-config/codetypo.config.js'), oc({ description: 'codetypo.config.js file in samples/esm-config' }))}
        ${s('esm-config/codetypo.config.cjs')}          | ${undefined} | ${cf(s('esm-config/codetypo.config.cjs'), oc({ description: 'codetypo.config.cjs file in samples/esm-config' }))}
        ${s('esm-config/codetypo.config.mjs')}          | ${undefined} | ${cf(s('esm-config/codetypo.config.mjs'), oc({ description: 'codetypo.config.mjs file in samples/esm-config' }))}
    `('readConfigFile $file $relativeTo', async ({ file, relativeTo, expectedConfig }) => {
        const loader = getDefaultConfigLoader();
        const cfg = await loader.readConfigFile(file, relativeTo);
        expect(cfg).toEqual(expectedConfig);
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test('readConfigFile cached', async () => {
        const loader = getDefaultConfigLoader();
        const filename = rp('codetypo.config.json');
        const cfg = await loader.readConfigFile(filename);
        const cfg2 = await loader.readConfigFile(filename);
        expect(cfg2).toBe(cfg);
        loader.clearCachedSettingsFiles();
        const cfg3 = await loader.readConfigFile(filename);
        expect(cfg3).not.toBe(cfg);
    });

    test('readConfigFile pending', async () => {
        const loader = getDefaultConfigLoader();
        const filename = rp('codetypo.config.json');
        const pCfg = loader.readConfigFile(filename);
        const pCfg2 = loader.readConfigFile(filename);
        expect(pCfg2).not.toBe(pCfg);
        const cfg = await pCfg;
        const cfg2 = await pCfg2;
        expect(cfg2).toBe(cfg);
    });

    test.each`
        file                                                   | expectedConfig
        ${path.join(testFixtures, 'issues/issue-1729/a.yaml')} | ${oc({ version: 0.2 })}
        ${path.join(testFixtures, 'issues/issue-1729/b.yaml')} | ${oc({ version: 0.2, language: 'en' })}
    `('readConfigFile from $file', async ({ file, expectedConfig }: TestLoadConfig) => {
        const searchResult = await readConfigFile(file);
        expect(searchResult.settings).toEqual(expectedConfig);
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        // version validation will log an error - this has been disabled for the moment. The detection will move to a "doctor" mode.
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        file                                                   | expectedConfig
        ${path.join(testFixtures, 'issues/issue-1729/a.yaml')} | ${oc({ version: '0.2' })}
        ${path.join(testFixtures, 'issues/issue-1729/b.yaml')} | ${oc({ version: '0.2', language: 'en' })}
    `('ReadRawSettings from $file', async ({ file, expectedConfig }: TestLoadConfig) => {
        const searchResult = await readRawSettings(file);
        expect(searchResult).toEqual(expectedConfig);
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        // version validation will log an error - this has been disabled for the moment.
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test('loadPnP', async () => {
        await expect(loadPnP({}, urlSrcDir)).resolves.toBeUndefined();
        // Look for a pnp file from the current location, but it won't be found.
        await expect(loadPnP({ usePnP: true }, urlSrcDir)).resolves.toBeUndefined();
    });

    test('config needing PnP', async () => {
        const uriTestPackages = path.join(root, 'test-packages/yarn');
        const uriYarn2TestMedCodetypo = path.join(uriTestPackages, 'yarn2/test-yarn-med/codetypo.json');
        const result = await loadConfig(uriYarn2TestMedCodetypo, {});
        expect(result.dictionaries).toEqual(['medical terms']);
    });

    test.each`
        config
        ${{ version: '0.2' }}
        ${{}}
        ${{ version: undefined }}
    `('validateRawConfigVersion valid $config', ({ config }) => {
        validateRawConfigVersion(cf('filename', config));
        expect(mockedLogWarning).toHaveBeenCalledTimes(0);
        expect(mockedLogError).toHaveBeenCalledTimes(0);
    });

    test.each`
        config                  | mocked              | expected
        ${{ version: 'hello' }} | ${mockedLogError}   | ${`Unsupported config file version: "hello"\n  File: "${path.resolve('filename')}"`}
        ${{ version: '0.1' }}   | ${mockedLogWarning} | ${`Legacy config file version found: "0.1", upgrade to "0.2"\n  File: "${path.resolve('filename')}"`}
        ${{ version: '0.3' }}   | ${mockedLogWarning} | ${`Newer config file version found: "0.3". Supported version is "0.2"\n  File: "${path.resolve('filename')}"`}
        ${{ version: 0.2 }}     | ${mockedLogError}   | ${`Unsupported config file version: "0.2", string expected\n  File: "${path.resolve('filename')}"`}
        ${{ version: 0.3 }}     | ${mockedLogError}   | ${`Unsupported config file version: "0.3", string expected\n  File: "${path.resolve('filename')}"`}
    `('validateRawConfigVersion $config', ({ config, mocked, expected }) => {
        validateRawConfigVersion(cf('filename', config));
        expect(mocked).toHaveBeenCalledWith(expected);
    });

    test('create', () => {
        const loader = getDefaultConfigLoader();
        const cfgFile = loader.createCodeTypoConfigFile(import.meta.url, {});

        expect(cfgFile.url.href).toBe(import.meta.url);
        expect(cfgFile).toBeInstanceOf(CodeTypoConfigFile);
        expect(cfgFile).toBeInstanceOf(CodeTypoConfigFileInMemory);
        expect(cfgFile.virtual).toBe(true);
    });
});

describe('ConfigLoader with VirtualFS', () => {
    const publicURL = new URL('vscode-fs://github/khulnasoft/public-samples/');
    const publicFileURL = new URL('public-sample/', pathToFileURL(path.resolve('/')));

    function pURL(path: string, rel = publicURL): URL {
        return new URL(path, rel);
    }

    test.each`
        file                                       | expectedConfig
        ${'dot-config/.config/codetypo.config.yaml'} | ${cf(pURL('dot-config/.config/codetypo.config.yaml'), { name: 'Nested in .config' })}
        ${'yaml-config/codetypo.yaml'}               | ${cf(pURL('yaml-config/codetypo.yaml'), { id: 'Yaml Example Config' })}
    `('ReadRawSettings from $file', async ({ file, expectedConfig }) => {
        const vfs = createVirtualFS();
        const redirectProvider = createRedirectProvider('test', publicURL, sURL('./'));
        vfs.registerFileSystemProvider(redirectProvider);

        const fileURL = pURL(file);

        // Make sure we can read the file without using the loader.
        const rawFilePrivate = await vfs.fs.readFile(sURL(file));
        expect(rawFilePrivate.url.href).toBe(sURL(file).href);

        const rawFile = await vfs.fs.readFile(fileURL);
        expect(rawFile.url.href).toBe(fileURL.href);

        // Use the loader
        const loader = createConfigLoader(vfs.fs);
        const cfg = await loader.readConfigFile(fileURL, publicURL);
        expect(cfg).not.instanceOf(Error);
        assert(!(cfg instanceof Error));
        const searchResult = configToRawSettings(cfg);
        expect(searchResult.__importRef?.filename).toEqual(toFilePathOrHref(expectedConfig.url));
        expect(searchResult).toEqual(oc(expectedConfig.settings));
    });

    test.each`
        file                                    | expectedConfig                                                                   | expectedImportErrors
        ${'README.md'}                          | ${cfg(pURL('.codetypo.json'), {})}                                                 | ${[]}
        ${'bug-fixes/bug345.ts'}                | ${cfg(pURL('bug-fixes/codetypo.json'), {})}                                        | ${[]}
        ${uh('linked/file.txt', publicFileURL)} | ${cfg(uh('linked/codetypo.config.js', publicFileURL), { __importRef: undefined })} | ${[]}
        ${'linked/file.txt'}                    | ${cfg(pURL('.codetypo.json') /* .js not loaded */, {})}                            | ${[]}
        ${'yaml-config/README.md'}              | ${cfg(pURL('yaml-config/codetypo.yaml'), { id: 'Yaml Example Config' })}           | ${['codetypo-imports.json']}
    `('Search check from $file', async ({ file, expectedConfig, expectedImportErrors }) => {
        const vfs = createVirtualFS();
        const redirectProvider = createRedirectProvider('test', publicURL, sURL('./'));
        vfs.registerFileSystemProvider(redirectProvider);

        const fileURL = pURL(file);
        const loader = createConfigLoader(vfs.fs);

        const searchResult = await loader.searchForConfig(fileURL);
        expect(searchResult?.__importRef).toEqual(
            expectedConfig.__importRef ? expect.objectContaining(expectedConfig.__importRef) : undefined,
        );
        // expect(searchResult).toEqual(expect.objectContaining(expectedConfig));
        const errors = extractImportErrors(searchResult || {});
        expect(errors).toHaveLength(expectedImportErrors.length);
        expect(errors).toEqual(
            expect.arrayContaining(
                (expectedImportErrors as string[]).map((filename) =>
                    expect.objectContaining({ filename: expect.stringContaining(filename) }),
                ),
            ),
        );
    });

    test.each`
        file                       | expectedConfig                                                                     | expectedImportErrors
        ${'README.md'}             | ${cfg(u('.codetypo.json', publicFileURL), {})}                                       | ${[]}
        ${'bug-fixes/bug345.ts'}   | ${cfg(u('bug-fixes/codetypo.json', publicFileURL), {})}                              | ${[]}
        ${'linked/file.txt'}       | ${cfg(u('.codetypo.json', publicFileURL) /* not trusted == .js not loaded */, {})}   | ${[]}
        ${'yaml-config/README.md'} | ${cfg(u('yaml-config/codetypo.yaml', publicFileURL), { id: 'Yaml Example Config' })} | ${['codetypo-imports.json']}
    `('Search untrusted $file', async ({ file, expectedConfig, expectedImportErrors }) => {
        const vfs = createVirtualFS();
        const redirectProvider = createRedirectProvider('test', publicFileURL, sURL('./'));
        vfs.registerFileSystemProvider(redirectProvider);

        const fileURL = u(file, publicFileURL);
        const loader = createConfigLoader(vfs.fs);
        loader.setIsTrusted(false);

        const searchResult = await loader.searchForConfig(fileURL);
        expect(searchResult?.__importRef).toEqual(
            expectedConfig.__importRef ? expect.objectContaining(expectedConfig.__importRef) : undefined,
        );
        // expect(searchResult).toEqual(expect.objectContaining(expectedConfig));
        const errors = extractImportErrors(searchResult || {});
        expect(errors).toHaveLength(expectedImportErrors.length);
        expect(errors).toEqual(
            expect.arrayContaining(
                (expectedImportErrors as string[]).map((filename) =>
                    expect.objectContaining({ filename: expect.stringContaining(filename) }),
                ),
            ),
        );
    });

    test.each`
        file                          | expectedConfig
        ${'./.codetypo.json'}           | ${cf(u('.codetypo.json', publicFileURL), {})}
        ${'./bug-fixes/codetypo.json'}  | ${cf(u('bug-fixes/codetypo.json', publicFileURL), {})}
        ${defaultConfigFileModuleRef} | ${cf(u('packages/codetypo-bundled-dicts/codetypo-default.json', pathRepoRootURL), {})}
    `('Search resolve untrusted $file', async ({ file, expectedConfig }) => {
        const vfs = createVirtualFS();
        const redirectProvider = createRedirectProvider('test', publicFileURL, sURL('./'));
        vfs.registerFileSystemProvider(redirectProvider);
        const loader = createConfigLoader(vfs.fs);
        loader.setIsTrusted(false);

        const location = await loader.resolveConfigFileLocation(file, publicFileURL);

        const configFile = await loader.readConfigFile(file, publicFileURL);

        expect(configFile).not.toBeInstanceOf(Error);
        assert(!(configFile instanceof Error));
        expect(configFile.url.href).toBe(location?.href);
        expect(configFile.url.href).toBe(expectedConfig.url.href);

        const config = await loader.mergeConfigFileWithImports(configFile);
        expect(config).toBeDefined();
        const errors = extractImportErrors(config);
        expect(errors).toHaveLength(0);
    });

    test.each`
        file
        ${'./linked/codetypo.config.js'}
    `('Error reading untrusted $file', async ({ file }) => {
        const vfs = createVirtualFS();
        const redirectProvider = createRedirectProvider('test', publicFileURL, sURL('./'));
        vfs.registerFileSystemProvider(redirectProvider);
        const loader = createConfigLoader(vfs.fs);
        loader.setIsTrusted(false);

        const location = await loader.resolveConfigFileLocation(file, publicFileURL);
        const configFile = await loader.readConfigFile(file, publicFileURL);

        expect(configFile).toBeInstanceOf(Error);
        assert(configFile instanceof Error);
        expect(configFile.cause).toEqual(expectError(`Untrusted URL: "${location?.href}"`));
    });
});

function u(url: string | URL, ref?: string | URL): URL {
    return new URL(url, ref);
}

function uh(url: string | URL, ref?: string | URL): string {
    return u(url, ref).href;
}

describe('Validate resolveGlobRoot', () => {
    test.each`
        globRoot                        | cfgUrl                                                                 | expected
        ${undefined}                    | ${import.meta.url}                                                     | ${rp(fileURLToPath(u('.', import.meta.url)))}
        ${undefined}                    | ${uh('../not/found/cfg.json', import.meta.url)}                        | ${fileURLToPath(u('../not/found', import.meta.url))}
        ${undefined}                    | ${uh('./.vscode/codetypo.json', import.meta.url)}                        | ${'${cwd}'}
        ${undefined}                    | ${uh('./.config/.codetypo.json', import.meta.url)}                       | ${rp(fileURLToPath(u('.', import.meta.url)))}
        ${undefined}                    | ${cUrl(import.meta.url, { scheme: 'vscode-vfs' }).href}                | ${uh('.', cUrl(import.meta.url, { scheme: 'vscode-vfs' }))}
        ${undefined}                    | ${uh('vscode-vfs://github/khulnasoft/codetypo-dicts/README.md')} | ${'vscode-vfs://github/khulnasoft/codetypo-dicts/'}
        ${'..'}                         | ${uh('vscode-vfs://github/khulnasoft/codetypo-dicts/README.md')} | ${'vscode-vfs://github/khulnasoft/'}
        ${'..' + path.sep + 'frontend'} | ${uh('vscode-vfs://github/khulnasoft/codetypo-dicts/README.md')} | ${'vscode-vfs://github/khulnasoft/frontend/'}
    `('resolveGlobRoot $globRoot, $cfgUrl', ({ globRoot, cfgUrl, expected }) => {
        const url = toFileUrl(cfgUrl);
        const r = resolveGlobRoot({ globRoot }, url);
        expect(r).toEqual(expected);
    });
});

describe('Validate Dependencies', () => {
    test.each`
        filename                    | relativeTo   | expected
        ${rp('codetypo.config.json')} | ${undefined} | ${{ configFiles: [rr('codetypo.json'), rp('codetypo.config.json')], dictionaryFiles: [rr('codetypo-dict.txt'), rr('codetypo-ignore-words.txt')] }}
    `('tests readSettings $filename $relativeTo', async ({ filename, relativeTo, expected }) => {
        const settings = await readSettings(filename, relativeTo);
        const dependencies = extractDependencies(settings);
        expect(dependencies).toEqual(expected);
    });
});

describe('relativeToCwd', () => {
    test.each`
        filename                                      | expected
        ${cwdURL()}                                   | ${'./'}
        ${'../../codetypo.json'}                        | ${'../../codetypo.json'}
        ${'../../codetypo.json'}                        | ${'../../codetypo.json'}
        ${'../../../codetypo.json'}                     | ${'../../../codetypo.json'}
        ${pathToFileURL('../../../../codetypo.json')}   | ${path.resolve('../../../../codetypo.json')}
        ${pathToFileURL('./samples/codetypo.json')}     | ${'./samples/codetypo.json'}
        ${pathToFileURL('../samples/codetypo.json')}    | ${'../samples/codetypo.json'}
        ${new URL('https://example.com/codetypo.json')} | ${'https://example.com/codetypo.json'}
    `('relativeToCwd', ({ filename, expected }) => {
        expect(relativeToCwd(filename)).toEqual(expected);
    });
});

/**
 * Resolve relative to src/lib
 */
function rSrcLib(...parts: string[]): string {
    return path.resolve(rp('src/lib'), ...parts);
}

/**
 * Resolve relative to CodeTypoLib Root
 */
function rp(...parts: string[]): string {
    return path.resolve(rootCodetypoLib, ...parts);
}

/**
 * Resolve relative to Repo Root
 */
function rr(...parts: string[]): string {
    return path.resolve(pathRepoRoot, ...parts);
}

/**
 * Resolve sample file
 */
function rSample(file: string) {
    return path.resolve(samplesDir, file);
}

function rSampleURL(file: string) {
    return resolveFileWithURL(file, pathPackageSamplesURL);
}

function sURL(file: string) {
    return rSampleURL(file);
}

function rel(file: string, relativeTo: string) {
    return path.relative(relativeTo, file);
}

const rawSampleSettings: CodeTypoUserSettings = {
    language: 'en',
    languageId: 'plaintext',
    ignorePaths: ['node_modules'],
    overrides: [
        {
            filename: '**/*.ts',
            languageId: 'typescript',
        },
        {
            filename: '**/*.lex',
            languageId: 'lex',
        },
        {
            filename: '**/NL/*.txt',
            language: 'en,nl',
        },
    ],
};

const rawSampleSettingsV1: CodeTypoUserSettings = { ...rawSampleSettings, version: '0.1' };
const srcSampleSettingsFilename = rp('src/test/codetypo.json');
const sampleSettings = await createConfig(srcSampleSettingsFilename, rawSampleSettings);
const sampleSettingsV1 = await createConfig(srcSampleSettingsFilename, rawSampleSettingsV1);

function cf(filename: string | URL, settings: CodeTypoUserSettings): CodeTypoConfigFile {
    const loader = getDefaultConfigLoader();
    return loader.createCodeTypoConfigFile(filename, settings);
}

function createConfig(filename: string, settings: CodeTypoUserSettings): Promise<CodeTypoUserSettings> {
    const loader = getDefaultConfigLoader();
    return loader.mergeConfigFileWithImports(cf(toFileUrl(filename), settings), {});
}

function cc(settings: CodeTypoUserSettings, filename: string) {
    return createConfig(filename, settings);
}

interface UriComponents {
    scheme: string;
    authority: string;
    path: string;
    query: string;
    fragment: string;
}

function cUrl(url: string | URL, replaceWith: Partial<UriComponents>): URL {
    const uri = URI.parse(toFileUrl(url).href).with(replaceWith);

    return new URL(uri.toString());
}

function cfg(
    filename: string | ImportFileRefWithError | URL,
    values: CodeTypoSettingsWithSourceTrace | { __importRef?: undefined } = {},
): CodeTypoSettingsWithSourceTrace {
    const __importRef = importFileRef(filename);
    return {
        __importRef,
        ...values,
    } as CodeTypoSettingsWithSourceTrace;
}

/**
 * Create an ImportFileRef that has an `error` field.
 */
function importFileRef(filenameOrRef: string | ImportFileRef | ImportFileRefWithError | URL): ImportFileRef {
    const { filename, error } = iRef(filenameOrRef);
    return { filename, error };
}

/**
 * Create an ImportFileRef with an optional `error` field.
 */
function iRef(filenameOrRef: string | ImportFileRef | ImportFileRefWithError | URL): ImportFileRef {
    filenameOrRef = filenameOrRef instanceof URL ? toFilePathOrHref(filenameOrRef) : filenameOrRef;
    return typeof filenameOrRef === 'string' ? { filename: filenameOrRef } : filenameOrRef;
}
