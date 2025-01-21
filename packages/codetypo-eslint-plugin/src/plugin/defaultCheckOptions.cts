import type { Check, Options, RequiredOptions, WorkerOptions } from '../common/options.cjs';

export const defaultCheckOptions: Required<Check> = {
    checkComments: true,
    checkIdentifiers: true,
    checkJSXText: true,
    checkStrings: true,
    checkStringTemplates: true,
    configFile: '',
    codetypoOptionsRoot: '',
    codetypo: {
        words: [],
        flagWords: [],
        ignoreWords: [],
    },
    customWordListFile: undefined,
    ignoreImportProperties: true,
    ignoreImports: true,
    checkScope: [],
};

export const defaultOptions: RequiredOptions = {
    ...defaultCheckOptions,
    numSuggestions: 8,
    generateSuggestions: true,
    autoFix: false,
};

export function normalizeOptions(opts: Options | undefined, cwd: string): WorkerOptions {
    const codetypoOptionsRoot = opts?.codetypoOptionsRoot || 'eslint-configuration-file';
    const options: WorkerOptions = Object.assign({}, defaultOptions, opts || {}, { codetypoOptionsRoot, cwd });
    return options;
}
