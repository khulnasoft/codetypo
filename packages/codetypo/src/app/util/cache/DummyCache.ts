import type { CodeTypoLintResultCache } from './CodeTypoLintResultCache.js';

/**
 * Dummy cache implementation that should be usd if caching option is disabled.
 */
export class DummyCache implements CodeTypoLintResultCache {
    getCachedLintResults(): Promise<undefined> {
        return Promise.resolve(undefined);
    }
    setCachedLintResults(): void {
        return;
    }
    reconcile(): void {
        return;
    }
    reset(): void {
        return;
    }
}
