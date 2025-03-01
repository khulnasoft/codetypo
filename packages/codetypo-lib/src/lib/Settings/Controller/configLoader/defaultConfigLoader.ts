import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import type { CodeTypoConfigFile, ICodeTypoConfigFile } from 'codetypo-config-lib';

import { toError } from '../../../util/errors.js';
import { toFileUrl } from '../../../util/url.js';
import type { IConfigLoader } from './configLoader.js';
import { getDefaultConfigLoaderInternal } from './configLoader.js';
import { configErrorToRawSettings, configToRawSettings } from './configToRawSettings.js';
import type { PnPSettingsOptional } from './PnPSettings.js';
import { defaultPnPSettings } from './PnPSettings.js';
import type { CodeTypoSettingsI, CodeTypoSettingsWST } from './types.js';

export type { CodeTypoConfigFile, ICodeTypoConfigFile } from 'codetypo-config-lib';

const gcl = getDefaultConfigLoaderInternal;
/**
 *
 * @param searchFrom the directory / file to start searching from.
 * @param pnpSettings - related to Using Yarn PNP.
 * @returns the resulting settings
 */

export function searchForConfig(
    searchFrom: URL | string | undefined,
    pnpSettings: PnPSettingsOptional = defaultPnPSettings,
): Promise<CodeTypoSettingsI | undefined> {
    return gcl().searchForConfig(searchFrom, pnpSettings);
}
/**
 * Load a CodeTypo configuration files.
 * @param file - path or package reference to load.
 * @param pnpSettings - PnP settings
 * @returns normalized CodeTypoSettings
 */

export async function loadConfig(file: string, pnpSettings?: PnPSettingsOptional): Promise<CodeTypoSettingsI> {
    return gcl().readSettingsAsync(file, undefined, pnpSettings);
}

/**
 * Resolve the imports in the settings file.
 * @param settings - settings to resolve imports for
 * @param filename - the filename of the settings file, use cwd if not available.
 * @returns
 */
export async function resolveSettingsImports(
    settings: CodeTypoSettings,
    filename: string | URL,
): Promise<CodeTypoSettingsI> {
    return gcl().resolveSettingsImports(settings, filename);
}

export async function readConfigFile(filename: string | URL, relativeTo?: string | URL): Promise<CodeTypoConfigFile> {
    const result = await gcl().readConfigFile(filename, relativeTo);
    if (result instanceof Error) {
        throw result;
    }
    return result;
}

export async function resolveConfigFileImports(
    configFile: CodeTypoConfigFile | ICodeTypoConfigFile,
): Promise<CodeTypoSettingsI> {
    return gcl().mergeConfigFileWithImports(configFile, configFile.settings);
}

/**
 * Might throw if the settings have not yet been loaded.
 * @deprecated use {@link getGlobalSettingsAsync} instead.
 */
export function getGlobalSettings(): CodeTypoSettingsI {
    return gcl().getGlobalSettings();
}

/**
 * Loads and caches the global settings.
 * @returns - global settings
 */
export function getGlobalSettingsAsync(): Promise<CodeTypoSettingsI> {
    return gcl().getGlobalSettingsAsync();
}

export function getCachedFileSize(): number {
    return cachedFiles().size;
}

export function clearCachedSettingsFiles(): void {
    return gcl().clearCachedSettingsFiles();
}

export function getDefaultConfigLoader(): IConfigLoader {
    return getDefaultConfigLoaderInternal();
}

function cachedFiles() {
    return gcl()._cachedFiles;
}

export async function readRawSettings(filename: string | URL, relativeTo?: string | URL): Promise<CodeTypoSettingsWST> {
    try {
        const cfg = await readConfigFile(filename, relativeTo);
        return configToRawSettings(cfg);
    } catch (e) {
        return configErrorToRawSettings(toError(e), toFileUrl(filename));
    }
}
