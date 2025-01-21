import { suite } from 'perf-insight';

import { GlobMatcher } from '../GlobMatcher.js';
import { loadFileList, loadPatterns } from './loadFileList.js';

suite('codetypo-glob GlobMatcher match', async (test) => {
    const fileList = await loadFileList();
    const patterns = await loadPatterns();
    const matchers: GlobMatcher[] = patterns.map(({ options, patterns }) => new GlobMatcher(patterns, options));

    test('match', () => {
        for (const fileEntry of fileList) {
            const matcher = matchers[fileEntry.matcherId];
            matcher.match(fileEntry.filename);
        }
    });
});

suite('codetypo-glob GlobMatcher create', async (test) => {
    const patterns = await loadPatterns();

    test('create GlobMatcher', () => {
        patterns.map(({ options, patterns }) => new GlobMatcher(patterns, options));
    });
});
