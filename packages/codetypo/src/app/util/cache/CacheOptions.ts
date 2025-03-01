import type { CacheFormat, CacheStrategy } from '@codetypo/codetypo-types';

export interface CacheOptions {
    /**
     * The version of `codetypo` that made the cache entry.
     * Cache entries must match the `major.minor` version.
     */
    version: string;
    /**
     * Store the info about processed files in order to only operate on the changed ones.
     */
    cache?: boolean;

    // codetypo:word codetypocache
    /**
     * Path to the cache location. Can be a file or a directory.
     * If none specified .codetypocache will be used.
     * The file will be created in the directory where the codetypo command is executed.
     */
    cacheLocation?: string;

    /**
     * Strategy to use for detecting changed files, default: metadata
     */
    cacheStrategy?: CacheStrategy;

    /**
     * Resets the cache
     */
    cacheReset?: boolean;

    /**
     * Format of the cache file.
     * - `legacy` - use absolute paths in the cache file
     * - `universal` - use a sharable format.
     * @default 'legacy'
     */
    cacheFormat?: CacheFormat;
}
