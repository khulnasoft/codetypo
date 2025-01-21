import { checkFilenameMatchesExcludeGlob } from '../globs/checkFilenameMatchesGlob.js';
import type { CodeTypoSettingsI, CodeTypoSettingsWSTO } from './CodeTypoSettingsServer.js';
import { mergeSettings, toInternalSettings } from './CodeTypoSettingsServer.js';

export function calcOverrideSettings(settings: CodeTypoSettingsWSTO, filename: string): CodeTypoSettingsI {
    const _settings = toInternalSettings(settings);
    const overrides = _settings.overrides || [];

    const result = overrides
        .filter((override) => checkFilenameMatchesExcludeGlob(filename, override.filename))
        .reduce((settings, override) => mergeSettings(settings, override), _settings);
    return result;
}
