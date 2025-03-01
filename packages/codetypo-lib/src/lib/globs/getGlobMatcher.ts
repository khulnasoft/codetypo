import type { Glob } from '@codetypo/codetypo-types';
import { GlobMatcher } from 'codetypo-glob';

import { onClearCache } from '../events/index.js';

type GlobObj = Exclude<Glob, string> | Glob[];

const simpleGlobCache = new Map<string, GlobMatcher>();
let globCache = new WeakMap<GlobObj, GlobMatcher>();

onClearCache(() => {
    globCache = new WeakMap();
    simpleGlobCache.clear();
});

const emptyIgnorePaths: Glob[] = [];

export function getGlobMatcherForExcluding(glob: Glob | Glob[] | undefined): GlobMatcher {
    if (!glob || (Array.isArray(glob) && !glob.length)) return getGlobMatcherGlobGlob(emptyIgnorePaths);
    return typeof glob === 'string' ? getGlobMatcherGlobString(glob) : getGlobMatcherGlobGlob(glob);
}

function getGlobMatcherGlobString(glob: string): GlobMatcher {
    const cached = simpleGlobCache.get(glob);
    if (cached) return cached;
    const m = new GlobMatcher(glob);
    simpleGlobCache.set(glob, m);
    return m;
}

function getGlobMatcherGlobGlob(glob: GlobObj): GlobMatcher {
    const cached = globCache.get(glob);
    if (cached) return cached;
    const m = new GlobMatcher(glob);
    globCache.set(glob, m);
    return m;
}
