import type { CodeTypoSettings, CodeTypoSettingsWithSourceTrace } from '@codetypo/codetypo-types';
import type { CodeTypoConfigFile } from 'codetypo-config-lib';
import { CodeTypoConfigFileInMemory, CodeTypoConfigFileJson } from 'codetypo-config-lib';
import { toFileURL } from 'codetypo-io';

import { getSourceDirectoryUrl, toFilePathOrHref } from '../util/url.js';
import { GlobalConfigStore } from './cfgStore.js';
import { configToRawSettings } from './Controller/configLoader/configToRawSettings.js';
import type { CodeTypoSettingsWST } from './Controller/configLoader/types.js';

const globalConfig = new GlobalConfigStore();

export interface GlobalSettingsWithSource extends Partial<GlobalCodeTypoSettings> {
    source: CodeTypoSettingsWithSourceTrace['source'];
}

export interface GlobalCodeTypoSettings extends Required<Pick<CodeTypoSettings, 'import'>> {}

export async function getRawGlobalSettings(): Promise<CodeTypoSettingsWST> {
    return configToRawSettings(await getGlobalConfig());
}

export async function getGlobalConfig(): Promise<CodeTypoConfigFile> {
    const name = 'CodeTypo Configstore';
    const configPath = getGlobalConfigPath();
    let urlGlobal = configPath ? toFileURL(configPath) : new URL('global-config.json', getSourceDirectoryUrl());

    const source: CodeTypoSettingsWST['source'] = {
        name,
        filename: toFilePathOrHref(urlGlobal),
    };

    const globalConf: GlobalSettingsWithSource = { source };

    let hasGlobalConfig = false;

    const found = await globalConfig.readConfigFile();

    if (found && found.config && found.filename) {
        const cfg = found.config;
        urlGlobal = toFileURL(found.filename);

        // Only populate globalConf is there are values.
        if (cfg && Object.keys(cfg).length) {
            Object.assign(globalConf, cfg);
            globalConf.source = {
                name,
                filename: found.filename,
            };
            hasGlobalConfig = Object.keys(cfg).length > 0;
        }
    }

    const settings: CodeTypoSettingsWST = { ...globalConf, name, source };

    const ConfigFile = hasGlobalConfig ? CodeTypoConfigFileJson : CodeTypoConfigFileInMemory;

    return new ConfigFile(urlGlobal, settings);
}

export async function writeRawGlobalSettings(settings: GlobalCodeTypoSettings): Promise<void> {
    const toWrite: GlobalCodeTypoSettings = {
        import: settings.import,
    };

    await globalConfig.writeConfigFile(toWrite);
}

export function getGlobalConfigPath(): string | undefined {
    try {
        return globalConfig.location || GlobalConfigStore.defaultLocation;
    } catch {
        return undefined;
    }
}
