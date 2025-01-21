import type {
    CodeTypoReporter,
    CodeTypoReporterModule,
    FileSettings,
    ReporterConfiguration,
    ReporterSettings,
    RunResult,
} from '@codetypo/codetypo-types';
import { dynamicImport } from '@codetypo/dynamic-import';

import { pkgDir } from '../pkgInfo.js';
import { ApplicationError, toError } from './errors.js';

type StandardEmitters = Omit<CodeTypoReporter, 'result'>;

function callAll<P0>(methods: ((p: P0) => void)[]): (p: P0) => void;
function callAll<P0, P1>(methods: ((p0: P0, p1: P1) => void)[]): (p0: P0, p1: P1) => void;
function callAll<P>(methods: ((...p: P[]) => void)[]): (...p: P[]) => void {
    return (...p: P[]) => {
        for (const method of methods) {
            method(...p);
        }
        return;
    };
}

export type FinalizedReporter = Required<CodeTypoReporter>;

function extractEmitter<K extends keyof StandardEmitters>(
    reporters: ReadonlyArray<StandardEmitters>,
    emitterName: K,
): FinalizedReporter[K][] {
    // The `bind` is used in case the reporter is a class.
    return reporters
        .map((r) => r[emitterName]?.bind(r) as StandardEmitters[K])
        .filter((r): r is FinalizedReporter[K] => !!r);
}

function mergeResultEmitters(reporters: ReadonlyArray<CodeTypoReporter>): FinalizedReporter['result'] {
    return async (result: RunResult) => {
        await Promise.all(reporters.map((reporter) => reporter.result?.(result)));
    };
}

/**
 * Mergers several codetypo reporters into a single one
 */
export function mergeReporters(...reporters: ReadonlyArray<CodeTypoReporter>): FinalizedReporter {
    return {
        issue: callAll(extractEmitter(reporters, 'issue')),
        info: callAll(extractEmitter(reporters, 'info')),
        debug: callAll(extractEmitter(reporters, 'debug')),
        progress: callAll(extractEmitter(reporters, 'progress')),
        error: callAll(extractEmitter(reporters, 'error')),
        result: mergeResultEmitters(reporters),
    };
}

/**
 * Loads reporter modules configured in codetypo config file
 */
export async function loadReporters(
    reporters: FileSettings['reporters'],
    defaultReporter: CodeTypoReporter,
    config: ReporterConfiguration,
): Promise<ReadonlyArray<CodeTypoReporter>> {
    async function loadReporter(reporterSettings: ReporterSettings): Promise<CodeTypoReporter | undefined> {
        if (reporterSettings === 'default') return defaultReporter;
        if (!Array.isArray(reporterSettings)) {
            reporterSettings = [reporterSettings];
        }
        const [moduleName, settings] = reporterSettings;

        try {
            const { getReporter }: CodeTypoReporterModule = await dynamicImport(moduleName, [process.cwd(), pkgDir]);
            return getReporter(settings, config);
        } catch (e: unknown) {
            throw new ApplicationError(`Failed to load reporter ${moduleName}: ${toError(e).message}`);
        }
    }

    reporters = !reporters || !reporters.length ? ['default'] : [...reporters];

    const loadedReporters = await Promise.all(reporters.map(loadReporter));
    return loadedReporters.filter((v: CodeTypoReporter | undefined): v is CodeTypoReporter => v !== undefined);
}

export function finalizeReporter(reporter: undefined): undefined;
export function finalizeReporter(reporter: CodeTypoReporter): FinalizedReporter;
export function finalizeReporter(reporter: CodeTypoReporter | undefined): FinalizedReporter | undefined;
export function finalizeReporter(reporter: CodeTypoReporter | undefined): FinalizedReporter | undefined {
    return reporter && mergeReporters(reporter);
}
