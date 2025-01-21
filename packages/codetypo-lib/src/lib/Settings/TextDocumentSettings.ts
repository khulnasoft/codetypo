import type { CodeTypoSettings, CodeTypoUserSettings } from '@codetypo/codetypo-types';

import type { CodeTypoSettingsInternal } from '../Models/CodeTypoSettingsInternalDef.js';
import { mergeSettings, toInternalSettings } from './CodeTypoSettingsServer.js';
import { getInDocumentSettings } from './InDocSettings.js';
import { calcSettingsForLanguageId } from './LanguageSettings.js';

export function combineTextAndLanguageSettings(
    settings: CodeTypoUserSettings,
    text: string | undefined,
    languageId: string | string[],
): CodeTypoSettingsInternal {
    if (!text) {
        return toInternalSettings(calcSettingsForLanguageId(settings, languageId));
    }
    const docSettings = extractSettingsFromText(text);
    const settingsForText = mergeSettings(settings, docSettings);
    const langSettings = calcSettingsForLanguageId(settingsForText, languageId);
    // Merge again, to force In-Doc settings.
    const final = mergeSettings(langSettings, docSettings);
    return final;
}

export function extractSettingsFromText(text: string): CodeTypoSettings {
    return getInDocumentSettings(text);
}
