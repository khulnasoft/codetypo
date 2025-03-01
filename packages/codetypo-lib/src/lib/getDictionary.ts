import type { CodeTypoUserSettings } from '@codetypo/codetypo-types';

import { toInternalSettings } from './Settings/CodeTypoSettingsServer.js';
import type { SpellingDictionaryCollection } from './SpellingDictionary/index.js';
import { getDictionaryInternal } from './SpellingDictionary/index.js';

/**
 * Load a dictionary collection defined by the settings.
 * @param settings - that defines the dictionaries and the ones to load.
 * @returns a dictionary collection that represents all the enabled dictionaries.
 */
export async function getDictionary(settings: CodeTypoUserSettings): Promise<SpellingDictionaryCollection> {
    return getDictionaryInternal(toInternalSettings(settings));
}
