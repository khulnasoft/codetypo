import { promises as fs } from 'node:fs';
import * as path from 'node:path';

import type { CodeTypoReporter, ReporterConfiguration } from '@codetypo/codetypo-types';
import { MessageTypes } from '@codetypo/codetypo-types';

import type { CodeTypoJSONReporterOutput } from './CodeTypoJSONReporterOutput.js';
import type { CodeTypoJSONReporterSettings } from './CodeTypoJSONReporterSettings.js';
import { setToJSONReplacer } from './utils/setToJSONReplacer.js';
import { validateSettings } from './utils/validateSettings.js';

function mkdirp(p: string) {
    return fs.mkdir(p, { recursive: true });
}

const noopReporter = () => undefined;

type ReporterConsole = Pick<Console, 'log' | 'warn' | 'error'>;

export interface CodeTypoJSONReporterConfiguration extends ReporterConfiguration {
    console?: ReporterConsole;
}

const STDOUT = 'stdout';
const STDERR = 'stderr';

type Data = Omit<CodeTypoJSONReporterOutput, 'result'>;

const _console = console;

export function getReporter(
    settings: unknown | CodeTypoJSONReporterSettings,
    cliOptions?: CodeTypoJSONReporterConfiguration,
): Required<CodeTypoReporter> {
    const useSettings = normalizeSettings(settings);
    const reportData: Data = { issues: [], info: [], debug: [], error: [], progress: [] };
    const console = cliOptions?.console ?? _console;
    return {
        issue: (issue) => {
            reportData.issues.push(issue);
        },
        info: (message, msgType) => {
            if (msgType === MessageTypes.Debug && !useSettings.debug) {
                return;
            }
            if (msgType === MessageTypes.Info && !useSettings.verbose) {
                return;
            }
            reportData.info = push(reportData.info, { message, msgType });
        },
        debug: useSettings.debug
            ? (message) => {
                  reportData.debug = push(reportData.debug, { message });
              }
            : noopReporter,
        error: (message, error) => {
            reportData.error = push(reportData.error, { message, error });
        },
        progress: useSettings.progress
            ? (item) => {
                  reportData.progress = push(reportData.progress, item);
              }
            : noopReporter,
        result: async (result) => {
            const outFile = useSettings.outFile || STDOUT;
            const output = {
                ...reportData,
                result,
            };
            const jsonData = JSON.stringify(output, setToJSONReplacer, 4);
            if (outFile === STDOUT) {
                console.log(jsonData);
                return;
            }
            if (outFile === STDERR) {
                console.error(jsonData);
                return;
            }
            const outFilePath = path.join(cliOptions?.root ?? process.cwd(), outFile);
            await mkdirp(path.dirname(outFilePath));
            return fs.writeFile(outFilePath, jsonData);
        },
    };
}

function normalizeSettings(settings: unknown | CodeTypoJSONReporterSettings): CodeTypoJSONReporterSettings {
    if (settings === undefined) return { outFile: STDOUT };
    validateSettings(settings);
    return settings;
}

function push<T>(src: T[] | undefined, value: T): T[] {
    if (src) {
        src.push(value);
        return src;
    }
    return [value];
}
