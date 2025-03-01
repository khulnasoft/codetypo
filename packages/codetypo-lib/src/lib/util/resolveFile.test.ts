import fs from 'node:fs';
import { createRequire } from 'node:module';
import * as os from 'node:os';
import * as path from 'node:path';
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { getActiveResourcesInfo } from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import util from 'node:util';

import { parse } from 'comment-json';
import type { VFileSystemProvider } from 'codetypo-io';
import { createRedirectProvider, createVirtualFS } from 'codetypo-io';
import { afterEach, describe, expect, test } from 'vitest';

import { pathRepoTestFixturesURL } from '../../test-util/index.mjs';
import { FileResolver, resolveRelativeTo } from './resolveFile.js';
import { envToTemplateVars } from './templates.js';
import { isFileURL, toFilePathOrHref, toURL } from './url.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function debugOut(...args: Parameters<typeof util.format>) {
    // Use a function like this one when debugging inside an AsyncHook callback
    fs.writeFileSync(2, `${util.format(...args)}\n`);
}

interface Config {
    import: string[];
}

const issuesFolderURL = new URL('issues/', pathRepoTestFixturesURL);
const notFoundURL = new URL('not-found/', pathRepoTestFixturesURL);

const defaultConfigFile = require.resolve('@codetypo/codetypo-bundled-dicts/codetypo-default.json');
const defaultConfigLocation = path.dirname(defaultConfigFile);

const config = readConfig(defaultConfigFile);

const notFound = '1fgh0dld6y56cr1wls.r9bp0ckc00ds0gna.json';
const userNotFound = path.join('~', notFound);

const rr = {
    '@codetypo/dict-cpp/codetypo-ext.json': require.resolve('@codetypo/dict-cpp/codetypo-ext.json'),
    vitest: require.resolve('vitest'),
};

const oc = <T>(obj: T) => expect.objectContaining(obj);
const sm = (m: string | RegExp) => expect.stringMatching(m);

// leakedHandles.set({ fullStack: true, timeout: 1000 });

// Force quit after 5 minutes.
setTimeout(
    () => {
        debugOut('Failed to quit in 1 minute: %o', getActiveResourcesInfo());
        process.exitCode = 1;
        throw new Error('Failed to quit in 1 minute');
    },
    1000 * 60 * 1,
);

describe('Validate resolveFile', () => {
    const redirects: [VFileSystemProvider, ...VFileSystemProvider[]] = [
        createRedirectProvider('google', new URL('https://google.com/'), notFoundURL),
    ];
    let vfs = createVirtualFS();
    vfs.registerFileSystemProvider(...redirects);
    let resolver = new FileResolver(vfs.fs, envToTemplateVars(process.env));

    afterEach(() => {
        vfs = createVirtualFS();
        resolver = new FileResolver(vfs.fs, envToTemplateVars(process.env));
    });

    interface ResolveFileTest {
        filename: string;
        relativeTo: string | URL;
        expected: string;
        found: boolean;
    }

    test.each`
        filename                                      | relativeTo                        | expected                                           | found
        ${__filename}                                 | ${__dirname}                      | ${__filename}                                      | ${true}
        ${'.' + path.sep + path.basename(__filename)} | ${__dirname}                      | ${__filename}                                      | ${true}
        ${'.' + path.sep + path.basename(__filename)} | ${pathToFileURL(__dirname + '/')} | ${__filename}                                      | ${true}
        ${'.' + path.sep + path.basename(__filename)} | ${pathToFileURL(__dirname)}       | ${__filename}                                      | ${true}
        ${'.' + path.sep + 'my-file.txt'}             | ${pathToFileURL(__filename)}      | ${path.resolve(__dirname, 'my-file.txt')}          | ${false}
        ${'.' + path.sep + 'search.ts'}               | ${pathToFileURL(__filename)}      | ${path.resolve(__dirname, 'search.ts')}            | ${true}
        ${'.' + path.sep + notFound}                  | ${__dirname}                      | ${path.resolve(__dirname, notFound)}               | ${false}
        ${path.relative(__dirname, __filename)}       | ${__dirname}                      | ${__filename}                                      | ${true}
        ${'@codetypo/dict-cpp/codetypo-ext.json'}         | ${__dirname}                      | ${rr['@codetypo/dict-cpp/codetypo-ext.json']}          | ${true}
        ${'codetypo-ext.json'}                          | ${__dirname}                      | ${'codetypo-ext.json'}                               | ${false}
        ${'vitest'}                                   | ${__dirname}                      | ${rr['vitest']}                                    | ${true}
        ${userNotFound}                               | ${__dirname}                      | ${path.resolve(path.join(os.homedir(), notFound))} | ${false}
        ${'https://google.com/file.txt'}              | ${__dirname}                      | ${'https://google.com/file.txt'}                   | ${false}
        ${'file.txt'}                                 | ${'https://google.com'}           | ${'https://google.com/file.txt'}                   | ${false}
        ${'file.txt'}                                 | ${'https://google.com/search'}    | ${'https://google.com/file.txt'}                   | ${false}
    `('resolveFile $filename rel $relativeTo', async ({ filename, relativeTo, expected, found }: ResolveFileTest) => {
        const r = await resolver.resolveFile(filename, relativeTo);
        expect(r.filename).toBe(expected);
        expect(r.found).toBe(found);
    });

    test.each(
        config.import
            .map((f) => ({
                filename: f,
                relativeTo: defaultConfigLocation,
                expected: require.resolve(f, { paths: [defaultConfigLocation] }),
                found: true,
            }))
            .map(({ filename, relativeTo, expected, found }) => [filename, relativeTo, expected, found]),
    )('resolveFile "%s" rel "%s"', async (filename: string, relativeTo: string, expected: string, found: boolean) => {
        const r = await resolver.resolveFile(filename, relativeTo);
        expect(r.filename).toBe(expected);
        expect(r.found).toBe(found);
    });

    const urlIssue5034 = new URL('issue-5034/.codetypo.json', issuesFolderURL);

    test.each`
        filename                               | relativeTo                                                | expected                               | found
        ${'./frontend/src/codetypo.config.yaml'} | ${urlIssue5034.href}                                      | ${sm(/src[/\\]codetypo\.config\.yaml$/)} | ${true}
        ${'./frontend/src/codetypo.config.yaml'} | ${new URL('codetypo.json', urlIssue5034).href}              | ${sm(/src[/\\]codetypo\.config\.yaml$/)} | ${true}
        ${'@codetypo/dict-fr-fr'}                | ${new URL('frontend/src/codetypo.json', urlIssue5034).href} | ${sm(/codetypo-ext\.json$/)}             | ${true}
        ${'@codetypo/dict-mnemonics'}            | ${new URL('frontend/src/codetypo.json', urlIssue5034).href} | ${sm(/codetypo-ext\.json$/)}             | ${true}
    `('resolveFile $filename rel $relativeTo', async ({ filename, relativeTo, expected, found }) => {
        const r = await resolver.resolveFile(filename, toURL(relativeTo));
        expect(r.filename).toEqual(expected);
        expect(r.found).toBe(found);
        expect(r.warning).toBeUndefined();
    });

    // Due to a circular reference it is not possible to make a dependency upon the issue.
    const frExtFound = fs.existsSync(new URL('frontend/node_modules/@codetypo/dict-fr-fr/codetypo-ext.json', urlIssue5034));

    test.each`
        filename                                                        | relativeTo           | expected                   | found
        ${'./frontend/node_modules/@codetypo/dict-fr-fr/codetypo-ext.json'} | ${urlIssue5034.href} | ${sm(/codetypo-ext\.json$/)} | ${frExtFound}
    `('resolveFile $filename rel $relativeTo', async ({ filename, relativeTo, expected, found }) => {
        const r = await resolver.resolveFile(filename, toURL(relativeTo));
        expect(r.filename).toEqual(expected);
        expect(r.found).toBe(found);
        expect(r.warning).toBeUndefined();
    });

    test.each`
        filename                                                 | relativeTo                                                | expected                   | found   | warning                                    | method
        ${'node_modules/@codetypo/dict-mnemonics/codetypo-ext.json'} | ${new URL('frontend/src/codetypo.json', urlIssue5034).href} | ${sm(/codetypo-ext\.json$/)} | ${true} | ${expect.stringContaining('node_modules')} | ${'tryLegacyResolve'}
        ${'@codetypo/dict-mnemonics'}                              | ${new URL('frontend/src/codetypo.json', urlIssue5034).href} | ${sm(/codetypo-ext\.json$/)} | ${true} | ${undefined}                               | ${'tryCreateRequire'}
        ${'node_modules/@codetypo/dict-mnemonics'}                 | ${new URL('frontend/src/codetypo.json', urlIssue5034).href} | ${sm(/codetypo-ext\.json$/)} | ${true} | ${expect.stringContaining('node_modules')} | ${'tryLegacyResolve'}
    `(
        'resolveFile $filename rel $relativeTo with warning',
        async ({ filename, relativeTo, expected, found, warning, method }) => {
            const r = await resolver.resolveFile(filename, relativeTo);
            // console.error('r %o', r);
            expect(r.filename).toEqual(expected);
            expect(r.found).toBe(found);
            expect(r.warning).toEqual(warning);
            expect(r.method).toEqual(method);
        },
    );

    test.each`
        url                              | expected
        ${'/User/home'}                  | ${false}
        ${'file:///User/home'}           | ${true}
        ${import.meta.url}               | ${true}
        ${new URL('.', import.meta.url)} | ${true}
    `('isFileURL $url', ({ url, expected }) => {
        expect(isFileURL(url)).toBe(expected);
    });

    test.each`
        url                     | relativeTo                     | expected
        ${'/User/home'}         | ${import.meta.url}             | ${oc({ filename: r('/User/home'), found: false })}
        ${uh('/User/not-home')} | ${import.meta.url}             | ${oc({ filename: fileURLToPath(u('/User/not-home')), found: false })}
        ${import.meta.url}      | ${import.meta.url}             | ${oc({ filename: toFilePathOrHref(new URL(import.meta.url)), found: true })}
        ${'file.txt'}           | ${'https://google.com'}        | ${oc({ filename: 'https://google.com/file.txt', found: false })}
        ${'@codetypo/dict-de-de'} | ${'data:,Hello%2C%20World%21'} | ${undefined}
    `('tryUrl $url $relativeTo', async ({ url, relativeTo, expected }) => {
        expect(await resolver.tryUrl(url, relativeTo)).toEqual(expected);
    });
});

describe('resolveRelativeTo', () => {
    test('should resolve a filename to a URL', () => {
        const filename = '/path/to/file.txt';
        const relativeTo = 'https://example.com';
        const result = resolveRelativeTo(filename, relativeTo);
        expect(result.toString()).toBe('https://example.com/path/to/file.txt');
    });

    test('should resolve a relative path to a URL', () => {
        const filename = '../file.txt';
        const relativeTo = 'https://example.com/path/to/';
        const result = resolveRelativeTo(filename, relativeTo);
        expect(result.toString()).toBe('https://example.com/path/file.txt');
    });

    test('should resolve a URL to a URL', () => {
        const filename = 'https://example.com/file.txt';
        const relativeTo = 'https://example.com/path/to/';
        const result = resolveRelativeTo(filename, relativeTo);
        expect(result.toString()).toBe('https://example.com/file.txt');
    });

    test('should resolve a filename with environment variables', () => {
        const filename = '${env:HOME}/${env:PROJECTS}/codetypo/file.txt';
        const relativeTo = 'https://example.com';
        const result = resolveRelativeTo(
            filename,
            relativeTo,
            envToTemplateVars({ HOME: '/user', PROJECTS: 'projects' }),
        );
        expect(result.toString()).toBe('https://example.com/user/projects/codetypo/file.txt');
    });

    test('resolve a filename with a nested environment variable', () => {
        const filename = '/${env:OUTSIDE}/codetypo/file.txt';
        const relativeTo = 'https://example.com';
        const result = resolveRelativeTo(
            filename,
            relativeTo,
            envToTemplateVars({ OUTSIDE: '${env: INSIDE}', INSIDE: '${env:HOME}' }),
        );
        expect(result.toString()).toBe('https://example.com/$%7Benv:%20INSIDE%7D/codetypo/file.txt');
    });

    test('should resolve a filename with tilde (~)', () => {
        const filename = '~/file.txt';
        const relativeTo = pathToFileURL(import.meta.url);
        const result = resolveRelativeTo(filename, relativeTo);
        const absFilename = fileURLToPath(result);
        expect(absFilename).toBe(path.resolve(os.homedir(), 'file.txt'));
    });

    test('should resolve a filename `${cwd}`', () => {
        const filename = '${cwd}/file.txt';
        const relativeTo = pathToFileURL(import.meta.url);
        const result = resolveRelativeTo(filename, relativeTo);
        const absFilename = fileURLToPath(result);
        expect(absFilename).toBe(path.resolve(process.cwd(), 'file.txt'));
    });
});

function readConfig(filename: string): Config {
    const parsed = parse(fs.readFileSync(filename, 'utf8'));
    if (!parsed || typeof parsed !== 'object') throw new Error(`Unable to parse "${filename}"`);
    return parsed as unknown as Config;
}

const rootURL = new URL('/', import.meta.url);

function u(url: string) {
    return new URL(url, rootURL);
}

function uh(url: string) {
    return u(url).href;
}

function r(filename: string): string {
    return path.resolve(fileURLToPath(import.meta.url), filename);
}
