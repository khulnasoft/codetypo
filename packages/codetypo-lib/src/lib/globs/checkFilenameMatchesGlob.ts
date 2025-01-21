import type { Glob } from '@codetypo/codetypo-types';

import { getGlobMatcherForExcluding } from './getGlobMatcher.js';

/**
 * @param filename - filename
 * @param globs - globs
 * @returns true if it matches
 */
export function checkFilenameMatchesExcludeGlob(filename: string, globs: Glob | Glob[]): boolean {
    const m = getGlobMatcherForExcluding(globs);
    return m.match(filename);
}
