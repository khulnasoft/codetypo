import { describe, expect, test } from 'vitest';

// Make sure the types are exported.
import type { CodeTypoApplicationOptions } from './index.mjs';
import * as index from './index.mjs';
import { InMemoryReporter } from './util/InMemoryReporter.js';

describe('Validate index.ts', () => {
    test('index', () => {
        expect(index).toBeDefined();
    });

    test('quick run', async () => {
        const appOptions: CodeTypoApplicationOptions = {};
        const reporter = new InMemoryReporter();

        const result = await index.lint(['*.md'], appOptions, reporter);

        expect(result).toEqual(
            expect.objectContaining({
                errors: 0,
                issues: 0,
            }),
        );
    });
});
