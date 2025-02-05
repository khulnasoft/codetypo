import type { CodeTypoReporter, ReporterSettings } from '@codetypo/codetypo-types';
import { MessageTypes } from '@codetypo/codetypo-types';
import { describe, expect, test, vi } from 'vitest';

import { ApplicationError } from './errors.js';
import { InMemoryReporter } from './InMemoryReporter.js';
import { loadReporters, mergeReporters } from './reporters.js';

const defaultReporter: CodeTypoReporter = {
    issue: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
    progress: vi.fn(),
    result: vi.fn(),
};

const oc = (obj: unknown) => expect.objectContaining(obj);
const sc = (s: string) => expect.stringContaining(s);

describe('mergeReporters', () => {
    test('processes a single reporter', async () => {
        const reporter = new InMemoryReporter();
        await runReporter(mergeReporters(reporter));

        expect(reporter.dump()).toMatchSnapshot();
    });

    test('processes a multiple reporters', async () => {
        const reporters = [new InMemoryReporter(), new InMemoryReporter(), new InMemoryReporter()];
        await runReporter(mergeReporters(...reporters));

        reporters.forEach((reporter) => {
            expect(reporter.dump()).toMatchSnapshot();
        });
    });

    test('loadReporters', async () => {
        const reporters: ReporterSettings[] = [['@codetypo/codetypo-json-reporter', { outFile: 'out.json' }]];
        const loaded = await loadReporters(reporters, defaultReporter, {});
        expect(loaded).toEqual([expect.objectContaining({})]);
    });

    test.each`
        reporter                                   | expected
        ${['@codetypo/codetypo-json-reporter', false]} | ${new ApplicationError('Failed to load reporter @codetypo/codetypo-json-reporter: codetypo-json-reporter settings must be an object')}
        ${['@codetypo/codetypo-unknown-reporter']}     | ${oc({ message: sc("Failed to load reporter @codetypo/codetypo-unknown-reporter: Cannot find package '@codetypo/codetypo-unknown-reporter' imported from") })}
        ${'@codetypo/codetypo-unknown-reporter'}       | ${oc({ message: sc("Failed to load reporter @codetypo/codetypo-unknown-reporter: Cannot find package '@codetypo/codetypo-unknown-reporter'") })}
    `('loadReporters fail $reporter', async ({ reporter, expected }) => {
        const reporters: ReporterSettings[] = [reporter];
        const r = loadReporters(reporters, defaultReporter, {});
        await expect(r).rejects.toEqual(expected);
    });
});

async function runReporter(reporter: CodeTypoReporter): Promise<void> {
    reporter.debug?.('foo');
    reporter.debug?.('bar');

    reporter.error?.('something went wrong', new Error('oh geez'));

    reporter.info?.('some logs', MessageTypes.Info);
    reporter.info?.('some warnings', MessageTypes.Warning);
    reporter.info?.('some debug logs', MessageTypes.Debug);

    // codeTypo:disable
    reporter.issue?.({
        text: 'fulll',
        offset: 13,
        line: { text: 'This text is fulll of errrorrrs.', offset: 0 },
        row: 1,
        col: 14,
        uri: 'text.txt',
        context: { text: 'This text is fulll of errrorrrs.', offset: 0 },
    });
    // codeTypo:enable

    reporter.progress?.({
        type: 'ProgressFileComplete',
        fileNum: 1,
        fileCount: 1,
        filename: 'text.txt',
        elapsedTimeMs: 349.058_747,
        processed: true,
        numErrors: 2,
    });

    await reporter.result?.({
        files: 1,
        filesWithIssues: new Set(['text.txt']),
        issues: 2,
        errors: 1,
        cachedFiles: 0,
    });
}
