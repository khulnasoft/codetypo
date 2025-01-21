import { CodeTypoSettings } from './CodeTypoSettingsDef';

export const defaultCodeTypoSettings = {
    ignoreRandomStrings: true,
    minRandomLength: 40,
} as const satisfies CodeTypoSettings;
