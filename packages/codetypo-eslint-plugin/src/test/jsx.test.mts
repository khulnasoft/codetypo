import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import typeScriptParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import { RuleTester } from 'eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

import type { Options as RuleOptions } from '../plugin/index.cjs';
import Rule from '../plugin/index.cjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = path.resolve(__dirname, '../..');
const fixturesDir = path.join(root, 'fixtures');

const parsers: Record<string, Linter.Parser | undefined> = {
    // Note: it is possible for @typescript-eslint/parser to break the path
    '.ts': typeScriptParser,
};

type ValidTestCase = RuleTester.ValidTestCase;
type Options = Partial<RuleOptions>;

const KnownErrors: TestCaseError[] = [ce('Unknown word: "Summmer"', 8)];

const ruleTesterReact = new RuleTester({
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
        react,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            ...globals.browser,
        },
    },
    // ... others are omitted for brevity
});

ruleTesterReact.run('codetypo with React', Rule.rules.spellchecker, {
    valid: [readSample('react/sample.jsx'), readSample('react/sample.tsx')],
    invalid: [
        // codetypo:ignore Welcomeeeee Summmer
        readInvalid('with-errors/react/sample.jsx', ['Unknown word: "Welcomeeeee"', 'Unknown word: "Summmer"']),
        readInvalid('with-errors/react/sample.tsx', ['Unknown word: "Welcomeeeee"', 'Unknown word: "Summmer"']),
        readInvalid('with-errors/react/sample.tsx', ['Unknown word: "Summmer"'], {
            checkJSXText: false,
        }),
        readInvalid('with-errors/react/sample.jsx', ['Unknown word: "Summmer"'], {
            checkJSXText: false,
        }),
    ],
});

function resolveFix(filename: string): string {
    return path.resolve(fixturesDir, filename);
}

type ValidTestCaseEsLint9 = ValidTestCase;

function readFix(filename: string, options?: Options): ValidTestCase {
    const __filename = resolveFix(filename);
    const code = fs.readFileSync(__filename, 'utf8');

    const sample: ValidTestCaseEsLint9 = {
        code,
        filename: __filename,
    };
    if (options) {
        sample.options = [options];
    }

    const parser = parsers[path.extname(__filename)];
    if (parser) {
        sample.languageOptions ??= {};
        sample.languageOptions.parser = parser;
    }

    return sample;
}

function readSample(sampleFile: string, options?: Options) {
    return readFix(path.join('samples', sampleFile), options);
}

interface TestCaseError {
    message?: string | RegExp | undefined;
    messageId?: string | undefined;
    type?: string | undefined;
    data?: unknown | undefined;
    line?: number | undefined;
    column?: number | undefined;
    endLine?: number | undefined;
    endColumn?: number | undefined;
    suggestions?: RuleTester.SuggestionOutput[] | undefined | number;
}

type InvalidTestCaseError = RuleTester.TestCaseError | TestCaseError | string;

function readInvalid(filename: string, errors: (TestCaseError | string)[], options?: Options) {
    const sample = readFix(filename, options);
    return {
        ...sample,
        errors: errors.map((err) => csError(err)),
    };
}

function ce(message: string, suggestions?: number): RuleTester.TestCaseError {
    return { message, suggestions } as RuleTester.TestCaseError;
}

function csError(error: InvalidTestCaseError, suggestions?: number): RuleTester.TestCaseError {
    if (error && typeof error === 'object') return error as RuleTester.TestCaseError;
    const found = KnownErrors.find((e) => e.message === error) as RuleTester.TestCaseError | undefined;
    return found || ce(error, suggestions);
}
