import type { CodeTypoReporter, ReporterConfiguration } from '@codetypo/codetypo-types';

import type { IConsole } from './console.js';
import type { LinterCliOptions } from './options.js';

export type ReporterConsole = IConsole;

export interface CodeTypoReporterConfiguration extends Readonly<ReporterConfiguration>, Readonly<LinterCliOptions> {
    /**
     * The console to use for reporting.
     * @since 8.11.1
     */
    readonly console?: ReporterConsole;
}

export interface CodeTypoReporterModule {
    getReporter: <T>(settings: T, config: CodeTypoReporterConfiguration) => CodeTypoReporter;
}
