import assert from 'node:assert';
import { stat } from 'node:fs/promises';
import path from 'node:path';

import type { CacheSettings, CodeTypoSettings } from '@codetypo/codetypo-types';

import { isErrorLike } from '../errors.js';
import type { CacheOptions } from './CacheOptions.js';
import type { CodeTypoLintResultCache } from './CodeTypoLintResultCache.js';
import { DiskCache } from './DiskCache.js';
import { DummyCache } from './DummyCache.js';

// codetypo:word codetypocache
export const DEFAULT_CACHE_LOCATION = '.codetypocache';

export interface CreateCacheSettings extends Required<CacheSettings> {
    /**
     * codetypo version used to validate cache entries.
     */
    version: string;

    /**
     * When true, causes the cache to be reset, removing any entries
     * or cache files.
     */
    reset?: true;
}

const versionSuffix = '';

/**
 * Creates CodeTypoLintResultCache (disk cache if caching is enabled in config or dummy otherwise)
 */
export function createCache(options: CreateCacheSettings): CodeTypoLintResultCache {
    const { useCache, cacheLocation, cacheStrategy, reset } = options;
    const location = path.resolve(cacheLocation);
    const useChecksum = cacheStrategy === 'content';
    const version = normalizeVersion(options.version);
    const useUniversal = options.cacheFormat === 'universal';
    const cache = useCache ? new DiskCache(location, useChecksum, version, useUniversal) : new DummyCache();
    reset && cache.reset();
    return cache;
}

export async function calcCacheSettings(
    config: CodeTypoSettings,
    cacheOptions: CacheOptions,
    root: string,
): Promise<CreateCacheSettings> {
    const cs = config.cache ?? {};
    const useCache = cacheOptions.cache ?? cs.useCache ?? false;
    const cacheLocation = await resolveCacheLocation(
        path.resolve(root, cacheOptions.cacheLocation ?? cs.cacheLocation ?? DEFAULT_CACHE_LOCATION),
    );

    const cacheStrategy = cacheOptions.cacheStrategy ?? cs.cacheStrategy ?? 'content';
    const cacheFormat = cacheOptions.cacheFormat ?? cs.cacheFormat ?? 'universal';
    const optionals: Partial<CreateCacheSettings> = {};
    if (cacheOptions.cacheReset) {
        optionals.reset = true;
    }
    return {
        ...optionals,
        useCache,
        cacheLocation,
        cacheStrategy,
        version: cacheOptions.version,
        cacheFormat,
    };
}

async function resolveCacheLocation(cacheLocation: string): Promise<string> {
    try {
        const s = await stat(cacheLocation);
        if (s.isFile()) return cacheLocation;
        return path.join(cacheLocation, DEFAULT_CACHE_LOCATION);
    } catch (err) {
        if (isErrorLike(err) && err.code === 'ENOENT') {
            return cacheLocation;
        }
        throw err;
    }
}

/**
 * Normalizes the version and return only `major.minor + versionSuffix`
 * @param version The codetypo semantic version.
 */
function normalizeVersion(version: string): string {
    const parts = version.split('.').slice(0, 2);
    assert(parts.length === 2);
    return parts.join('.') + versionSuffix;
}

export const __testing__ = {
    normalizeVersion,
    versionSuffix,
};
