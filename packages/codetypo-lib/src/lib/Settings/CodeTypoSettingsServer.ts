import assert from 'node:assert';

import type {
    AdvancedCodeTypoSettingsWithSourceTrace,
    CodeTypoSettingsWithSourceTrace,
    CodeTypoUserSettings,
    ImportFileRef,
    Parser,
    Plugin,
    Source,
} from '@codetypo/codetypo-types';

import { onClearCache } from '../events/index.js';
import type { CodeTypoSettingsInternal, CodeTypoSettingsInternalFinalized } from '../Models/CodeTypoSettingsInternalDef.js';
import { cleanCodeTypoSettingsInternal as csi, isCodeTypoSettingsInternal } from '../Models/CodeTypoSettingsInternalDef.js';
import { autoResolveWeak, AutoResolveWeakCache } from '../util/AutoResolve.js';
import type { OptionalOrUndefined } from '../util/types.js';
import { toFileUrl } from '../util/url.js';
import * as util from '../util/util.js';
import { configSettingsFileVersion0_1, ENV_CODETYPO_GLOB_ROOT } from './constants.js';
import { calcDictionaryDefsToLoad, mapDictDefsToInternal } from './DictionarySettings.js';
import { mergeList, mergeListUnique } from './mergeList.js';
import { resolvePatterns } from './patterns.js';
import { CwdUrlResolver } from './resolveCwd.js';

type CodeTypoSettingsWST = AdvancedCodeTypoSettingsWithSourceTrace;
export type CodeTypoSettingsWSTO = OptionalOrUndefined<AdvancedCodeTypoSettingsWithSourceTrace>;
export type CodeTypoSettingsI = CodeTypoSettingsInternal;

export { stats as getMergeStats } from './mergeList.js';

const emptyWords: string[] = [];
Object.freeze(emptyWords);

const cachedMerges = new AutoResolveWeakCache<string[], WeakMap<string[], string[]>>();

const mergeCache = new AutoResolveWeakCache<
    CodeTypoSettingsWSTO | CodeTypoSettingsI,
    WeakMap<CodeTypoSettingsWSTO | CodeTypoSettingsI, CodeTypoSettingsI>
>();

const cacheInternalSettings = new AutoResolveWeakCache<CodeTypoSettingsI | CodeTypoSettingsWSTO, CodeTypoSettingsI>();

const parserCache = new AutoResolveWeakCache<Exclude<CodeTypoSettingsI['plugins'], undefined>, Map<string, Parser>>();
const emptyParserMap = new Map<string, Parser>();

const cwdResolver = new CwdUrlResolver();
let envCodeTypoGlobRoot = process.env[ENV_CODETYPO_GLOB_ROOT];

onClearCache(() => {
    parserCache.clear();
    emptyParserMap.clear();
    cachedMerges.clear();
    mergeCache.clear();
    cacheInternalSettings.clear();
    cwdResolver.reset();
    envCodeTypoGlobRoot = process.env[ENV_CODETYPO_GLOB_ROOT];
});

function _mergeWordsCached(left: string[], right: string[]): string[] {
    const map = autoResolveWeak(cachedMerges, left, () => new WeakMap<string[], string[]>());
    return autoResolveWeak(map, right, () => [...left, ...right]);
}

/**
 * Merges two lists of words.
 * Order is preserved.
 */
function mergeWordsCached(left: undefined, right: undefined): undefined;
function mergeWordsCached(left: string[], right: string[]): string[];
function mergeWordsCached(left: undefined, right: string[]): string[];
function mergeWordsCached(left: string[], right: undefined): string[];
function mergeWordsCached(left: string[] | undefined, right: string[] | undefined): string[] | undefined;
function mergeWordsCached(left: string[] | undefined, right: string[] | undefined): string[] | undefined {
    if (!Array.isArray(left) || !left.length) {
        return Array.isArray(right) ? (right.length ? right : emptyWords) : undefined;
    }
    if (!Array.isArray(right) || !right.length) return left;

    return _mergeWordsCached(left, right);
}

function mergeObjects(left: undefined, right: undefined): undefined;
function mergeObjects<T>(left: T, right: undefined): T;
function mergeObjects<T>(left: T, right: T): T;
function mergeObjects<T>(left: undefined, right: T): T;
function mergeObjects<T>(left?: T, right?: T): T | undefined {
    if (!left || typeof left !== 'object') return !right || typeof right !== 'object' ? undefined : right;
    if (!right || typeof right !== 'object') return left;
    return { ...left, ...right };
}

function replaceIfNotEmpty<T>(left: Array<T> = [], right: Array<T> = []) {
    const filtered = right.filter((a) => !!a);
    if (filtered.length) {
        return filtered;
    }
    return left;
}

export function mergeSettings(
    left: CodeTypoSettingsWSTO | CodeTypoSettingsI,
    ...settings: (CodeTypoSettingsWSTO | CodeTypoSettingsI | undefined)[]
): CodeTypoSettingsI {
    const rawSettings = settings.filter(util.isDefined).reduce<CodeTypoSettingsI>(merge, toInternalSettings(left));
    return util.clean(rawSettings);
}

function isEmpty(obj: object) {
    return !obj || Object.keys(obj).length === 0;
}

function merge(left: CodeTypoSettingsI, right: CodeTypoSettingsWSTO | CodeTypoSettingsI): CodeTypoSettingsI {
    const map = mergeCache.get(left, () => new WeakMap());
    return autoResolveWeak(map, right, () => _merge(left, right));
}

function _merge(
    left: CodeTypoSettingsWSTO | CodeTypoSettingsI,
    right: CodeTypoSettingsWSTO | CodeTypoSettingsI,
): CodeTypoSettingsI {
    const _left = toInternalSettings(left);
    const _right = toInternalSettings(right);
    if (left === right) {
        return _left;
    }
    if (isEmpty(right)) {
        return _left;
    }
    if (isEmpty(left)) {
        return _right;
    }
    if (isLeftAncestorOfRight(_left, _right)) {
        return _right;
    }
    if (doesLeftHaveRightAncestor(_left, _right)) {
        return _left;
    }

    const includeRegExpList = takeRightOtherwiseLeft(_left.includeRegExpList, _right.includeRegExpList);

    const optionals = includeRegExpList?.length ? { includeRegExpList } : {};
    const version = max(_left.version, _right.version);

    const valuesToClear = {
        name: undefined,
        id: undefined,
        description: undefined,
        globRoot: undefined,
        import: undefined,
        __importRef: undefined,
    };

    const settings = csi({
        ..._left,
        ..._right,
        ...optionals,
        ...valuesToClear,
        version,
        words: mergeWordsCached(_left.words, _right.words),
        userWords: mergeWordsCached(_left.userWords, _right.userWords),
        flagWords: mergeWordsCached(_left.flagWords, _right.flagWords),
        ignoreWords: mergeWordsCached(_left.ignoreWords, _right.ignoreWords),
        suggestWords: mergeWordsCached(_left.suggestWords, _right.suggestWords),
        enabledLanguageIds: replaceIfNotEmpty(_left.enabledLanguageIds, _right.enabledLanguageIds),
        enableFiletypes: mergeList(_left.enableFiletypes, _right.enableFiletypes),
        enabledFileTypes: mergeObjects(_left.enabledFileTypes, _right.enabledFileTypes),
        ignoreRegExpList: mergeListUnique(_left.ignoreRegExpList, _right.ignoreRegExpList),
        patterns: mergeListUnique(_left.patterns, _right.patterns),
        dictionaryDefinitions: mergeListUnique(_left.dictionaryDefinitions, _right.dictionaryDefinitions),
        dictionaries: mergeListUnique(_left.dictionaries, _right.dictionaries),
        noSuggestDictionaries: mergeListUnique(_left.noSuggestDictionaries, _right.noSuggestDictionaries),
        languageSettings: mergeList(_left.languageSettings, _right.languageSettings),
        enabled: _right.enabled !== undefined ? _right.enabled : _left.enabled,
        files: mergeListUnique(_left.files, _right.files),
        ignorePaths: versionBasedMergeList(_left.ignorePaths, _right.ignorePaths, version),
        overrides: versionBasedMergeList(_left.overrides, _right.overrides, version),
        features: mergeObjects(_left.features, _right.features),
        source: mergeSources(_left, _right),
        plugins: mergeList(_left.plugins, _right.plugins),
        __imports: mergeImportRefs(_left, _right),
    });
    return settings;
}

function versionBasedMergeList<T>(
    left: T[] | undefined,
    right: T[] | undefined,
    version: CodeTypoUserSettings['version'],
): T[] | undefined {
    if (version === configSettingsFileVersion0_1) {
        return takeRightOtherwiseLeft(left, right);
    }
    return mergeListUnique(left, right);
}

/**
 * Check to see if left is a left ancestor of right.
 * If that is the case, merging is not necessary:
 * @param left - setting on the left side of a merge
 * @param right - setting on the right side of a merge
 */
function isLeftAncestorOfRight(left: CodeTypoSettingsWSTO, right: CodeTypoSettingsWSTO): boolean {
    return hasAncestor(right, left, 0);
}

/**
 * Check to see if left has right as an ancestor to the right.
 * If that is the case, merging is not necessary:
 * @param left - setting on the left side of a merge
 * @param right - setting on the right side of a merge
 */
function doesLeftHaveRightAncestor(left: CodeTypoSettingsWSTO, right: CodeTypoSettingsWSTO): boolean {
    return hasAncestor(left, right, 1);
}

function hasAncestor(s: CodeTypoSettingsWSTO, ancestor: CodeTypoSettingsWSTO, side: number): boolean {
    const sources = s.source?.sources;
    if (!sources) return false;
    // calc the first or last index of the source array.
    const i = side ? sources.length - 1 : 0;
    const src = sources[i];
    return src === ancestor || (src && hasAncestor(src, ancestor, side)) || false;
}

export function mergeInDocSettings(left: CodeTypoSettingsWSTO, ...rest: CodeTypoSettingsWSTO[]): CodeTypoSettingsWST {
    const merged = mergeSettings(left, ...rest);
    return util.clean(merged);
}

/**
 * If right is non-empty return right, otherwise return left.
 * @param left - left hand values
 * @param right - right hand values
 */
function takeRightOtherwiseLeft(left: undefined, right: undefined): undefined;
function takeRightOtherwiseLeft<T>(left: T[], right: undefined): T[];
function takeRightOtherwiseLeft<T>(left: undefined, right: T[]): T[];
function takeRightOtherwiseLeft<T>(left: T[] | undefined, right: T[] | undefined): T[] | undefined;
function takeRightOtherwiseLeft<T>(left: T[] | undefined, right: T[] | undefined): T[] | undefined {
    if (right?.length) {
        return right;
    }
    return left || right;
}

/**
 *
 * @param settings - settings to finalize
 * @returns settings where all globs and file paths have been resolved.
 */
export function finalizeSettings(settings: CodeTypoSettingsWSTO | CodeTypoSettingsI): CodeTypoSettingsInternalFinalized {
    return _finalizeSettings(toInternalSettings(settings));
}

function _finalizeSettings(settings: CodeTypoSettingsI): CodeTypoSettingsInternalFinalized {
    // apply patterns to any RegExpLists.

    const finalized: CodeTypoSettingsInternalFinalized = {
        ...settings,
        finalized: true,
        ignoreRegExpList: resolvePatterns(settings.ignoreRegExpList, settings.patterns),
        includeRegExpList: resolvePatterns(settings.includeRegExpList, settings.patterns),
        parserFn: resolveParser(settings),
    };

    finalized.name = 'Finalized ' + (finalized.name || '');
    finalized.source = { name: settings.name || 'src', sources: [settings] };
    return finalized;
}

export function toInternalSettings(settings: undefined): undefined;
export function toInternalSettings(settings: CodeTypoSettingsI | CodeTypoSettingsWSTO): CodeTypoSettingsI;
export function toInternalSettings(settings?: CodeTypoSettingsI | CodeTypoSettingsWSTO): CodeTypoSettingsI | undefined;
export function toInternalSettings(settings?: CodeTypoSettingsI | CodeTypoSettingsWSTO): CodeTypoSettingsI | undefined {
    if (settings === undefined) return undefined;
    if (isCodeTypoSettingsInternal(settings)) return settings;

    return cacheInternalSettings.get(settings, _toInternalSettings);
}

function _toInternalSettings(settings: CodeTypoSettingsI | CodeTypoSettingsWSTO): CodeTypoSettingsI {
    const { dictionaryDefinitions: defs, ...rest } = settings;

    const dictionaryDefinitions =
        defs &&
        mapDictDefsToInternal(
            defs,
            (settings.source?.filename && toFileUrl(settings.source?.filename)) || resolveCwd(),
        );
    const setting = dictionaryDefinitions ? { ...rest, dictionaryDefinitions } : rest;
    return csi(setting);
}

function mergeSources(left: CodeTypoSettingsWSTO, right: CodeTypoSettingsWSTO): Source {
    return {
        name: 'merged',
        sources: [left as CodeTypoSettingsWithSourceTrace, right as CodeTypoSettingsWithSourceTrace],
    };
}

function max(a: undefined, b: undefined): undefined;
function max<T>(a: T, b: undefined): T;
function max<T>(a: undefined, b: T): T;
function max<T>(a: T | undefined, b: T | undefined): T | undefined;
function max<T>(a: T | undefined, b: T | undefined): T | undefined {
    if (a === undefined || a === null) return b;
    if (b === undefined || b === null) return a;
    return a > b ? a : b;
}

/**
 * Return a list of Setting Sources used to create this Setting.
 * @param settings the settings to search
 */
export function getSources(settings: CodeTypoSettingsWSTO): CodeTypoSettingsWSTO[] {
    const visited = new Set<CodeTypoSettingsWSTO>();
    const sources: CodeTypoSettingsWSTO[] = [];

    function _walkSourcesTree(settings: CodeTypoSettingsWSTO | undefined): void {
        if (!settings || visited.has(settings)) return;
        visited.add(settings);
        if (!settings.source?.sources?.length) {
            sources.push(settings);
            return;
        }
        settings.source.sources.forEach(_walkSourcesTree);
    }

    _walkSourcesTree(settings);

    return sources;
}

type Imports = CodeTypoSettingsWSTO['__imports'];

function mergeImportRefs(left: CodeTypoSettingsWSTO, right: CodeTypoSettingsWSTO = {}): Imports | undefined {
    const imports = new Map(left.__imports || []);
    if (left.__importRef) {
        imports.set(left.__importRef.filename, left.__importRef);
    }
    if (right.__importRef) {
        imports.set(right.__importRef.filename, right.__importRef);
    }
    const rightImports = right.__imports?.values() || [];
    for (const ref of rightImports) {
        imports.set(ref.filename, ref);
    }
    return imports.size ? imports : undefined;
}

export interface ImportFileRefWithError extends ImportFileRef {
    error: Error;
}

export interface ConfigurationDependencies {
    configFiles: string[];
    dictionaryFiles: string[];
}

export function extractDependencies(settings: CodeTypoSettingsWSTO | CodeTypoSettingsI): ConfigurationDependencies {
    const settingsI = toInternalSettings(settings);
    const configFiles = [...(mergeImportRefs(settingsI) || [])].map(([filename]) => filename);
    const dictionaryFiles = calcDictionaryDefsToLoad(settingsI)
        .map((dict) => dict.path)
        .filter((file): file is string => !!file);

    return {
        configFiles,
        dictionaryFiles,
    };
}

function resolveCwd(): URL {
    return cwdResolver.resolveUrl(envCodeTypoGlobRoot);
}

function resolveParser(settings: CodeTypoSettingsI): Parser | undefined {
    if (!settings.parser) return undefined;
    if (typeof settings.parser === 'function') return settings.parser;

    const parserName = settings.parser;
    assert(typeof parserName === 'string');

    const parsers = extractParsers(settings.plugins);
    const parser = parsers.get(parserName);
    assert(parser, `Parser "${parserName}" not found.`);
    return parser;
}

function* parsers(plugins: Plugin[]) {
    for (const plugin of plugins) {
        if (!plugin.parsers) continue;
        for (const parser of plugin.parsers) {
            yield [parser.name, parser] as const;
        }
    }
}

function mapPlugins(plugins: Exclude<CodeTypoSettingsI['plugins'], undefined>): Map<string, Parser> {
    return new Map(parsers(plugins));
}

function extractParsers(plugins: CodeTypoSettingsI['plugins']): Map<string, Parser> {
    if (!plugins || !plugins.length) return emptyParserMap;

    return parserCache.get(plugins, mapPlugins);
}

export const __testing__ = {
    mergeObjects,
};
