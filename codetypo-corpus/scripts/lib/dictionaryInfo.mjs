// ts-check
import fs from 'node:fs/promises';
import path from 'node:path/posix';

import bundledWithCodeTypo from '@codetypo/codetypo-bundled-dicts';
import { readConfigFile, resolveConfigFileImports } from 'codetypo-lib';
import json5 from 'json5';

const rootUrl = new URL('../../', import.meta.url);

/**
 * @typedef {Awaited<ReturnType<import('codetypo-lib').readConfigFile>>} CodeTypoConfigFile
 */

/**
 * Dictionary information.
 * @typedef {object} DictionaryInfo
 * @property {string} name The name of the dictionary.
 * @property {string} [description] The description of the dictionary.
 * @property {string[]} [locales] The locales supported by the dictionary.
 * @property {string[]} [fileTypes] The dictionary is enabled for the following file types.
 * @property {boolean} [enabled] The dictionary is enabled by default.
 */

/**
 * Dictionary Package information.
 * @typedef {object} DictionaryPackageInfo
 * @property {string} name The name of the dictionary.
 * @property {string} packageName The name of the package.
 * @property {string} dir The directory containing the dictionary package.
 * @property {boolean} codetypo The dictionary package is bundled with codetypo.
 * @property {string} description The description of the package.
 * @property {string[]} categories The category of the package. (e.g. programming, natural-language)
 * @property {DictionaryInfo[]} dictionaries The dictionaries in the package.
 * @property {boolean} [isBundle] The dictionary package is a bundle of other packages.
 * @property {boolean} [hasEnabledByDefault] The dictionary package has dictionaries enabled by default.
 */

/**
 * @typedef {import('@codetypo/codetypo-types').CodeTypoSettings} CodeTypoSettings
 */

/** @type {CodeTypoSettings} */
const codetypoBundle = bundledWithCodeTypo;

const defaultCodeTypoImports = new Set(extractImports(codetypoBundle));

/**
 *
 * @param {URL} dictURL
 * @returns {Promise<DictionaryPackageInfo>}
 */
export async function fetchDictionaryInfo(dictURL) {
    dictURL = new URL('./', dictURL);
    const pkgUrl = new URL('package.json', dictURL);

    const pkgJson = await readJson(pkgUrl);
    const extFile = pkgJson.exports?.['.'] || 'codetypo-ext.json';
    const codetypoExtUrl = new URL(extFile, dictURL);
    const extConfigFile = await readConfigFile(codetypoExtUrl);
    /** @type {CodeTypoSettings} */
    const codetypoExt = extConfigFile.settings;
    const isBundle = extractImports(codetypoExt).filter((i) => i.startsWith('@codetypo/')).length > 2 || undefined;
    // Remove package imports from the list of imports.
    extConfigFile.settings.import = Array.isArray(extConfigFile.settings.import)
        ? extConfigFile.settings.import.filter((i) => i.startsWith('./'))
        : extConfigFile.settings.import;
    const dictionaries = await extractDictionaryInfo(extConfigFile);
    const hasEnabledByDefault = dictionaries.some((d) => d.enabled) || undefined;
    return {
        name: codetypoExt.name || pkgJson.name,
        dir: path.relative(rootUrl.pathname, dictURL.pathname),
        packageName: pkgJson.name,
        description: codetypoExt.description || pkgJson.description || '',
        codetypo: defaultCodeTypoImports.has(pkgJson.name),
        categories: extractCategories(pkgJson, dictionaries),
        dictionaries,
        isBundle,
        hasEnabledByDefault,
    };
}

/**
 *
 * @param {CodeTypoConfigFile} codetypoConfigFile
 * @returns {Promise<DictionaryInfo[]>}
 */
export async function extractDictionaryInfo(codetypoConfigFile) {
    const codetypoExt = await resolveConfigFileImports(codetypoConfigFile);
    const dictionaryDefs = codetypoExt.dictionaryDefinitions || [];
    /** @type {Map<string, DictionaryInfo>} */
    const dictMap = new Map(dictionaryDefs.map((d) => [d.name, { name: d.name, description: d.description }]));

    for (const langSetting of codetypoExt.languageSettings || []) {
        const { languageId, locale, dictionaries = [] } = langSetting;
        for (const dictName of dictionaries) {
            const dict = dictMap.get(dictName);
            if (dict) {
                const locales = expandStringOrStringArray(locale);
                if (locales) {
                    dict.locales = dict.locales || [];
                    dict.locales.push(...locales);
                }
                const langIds = expandStringOrStringArray(languageId);
                if (langIds) {
                    dict.fileTypes = dict.fileTypes || [];
                    dict.fileTypes.push(...langIds);
                }
            }
        }
    }

    for (const dict of codetypoExt.dictionaries || []) {
        const d = dictMap.get(dict);
        if (d) {
            d.enabled = true;
        }
    }

    /**
     *
     * @param {DictionaryInfo} d
     * @returns {DictionaryInfo}
     */
    function cleanUpDict(d) {
        d.locales = dedupe(d.locales)?.sort();
        d.fileTypes = dedupe(d.fileTypes)?.sort();
        if (d.locales?.includes('*') && d.fileTypes?.includes('*')) {
            d.enabled = true;
        }
        if (!d.locales?.length || d.locales[0] === '*') {
            d.locales = undefined;
        }
        if (!d.fileTypes?.length || d.fileTypes[0] === '*') {
            d.fileTypes = undefined;
        }
        return d;
    }

    return [...dictMap.values()].map(cleanUpDict);
}

/**
 * Read a json file.
 * @param {URL} pkgUrl
 * @returns {Promise<any>}
 */
async function readJson(pkgUrl) {
    const text = await fs.readFile(pkgUrl, 'utf-8');
    return json5.parse(text);
}

/**
 *
 * @param {string | string[] | undefined} s
 * @returns {string[] | undefined}
 */
function expandStringOrStringArray(s) {
    return typeof s === 'string' ? s.split(',').map((l) => l.trim()) : s;
}

function dedupe(a) {
    if (Array.isArray(a)) return a;
    return [...new Set(a)];
}

/**
 *
 * @param {CodeTypoSettings} codetypoExt
 * @returns {string[]}
 */
function extractImports(codetypoExt) {
    const imports = (typeof codetypoExt.import === 'string' ? [codetypoExt.import] : codetypoExt.import) || [];
    const packageNames = imports.map((i) => i.replace('/codetypo-ext.json', ''));
    return packageNames;
}

/**
 * @param {Record<string, any>} pkgJson
 * @param {DictionaryInfo[]} dictionaries
 * @returns {string[]}
 */
function extractCategories(pkgJson, dictionaries) {
    const pkgCategories = Array.isArray(pkgJson.categories) ? pkgJson.categories : undefined;
    return pkgCategories || extractCategoriesFromDictionaries(dictionaries);
}

/**
 *
 * @param {DictionaryInfo[]} dictionaries
 * @returns {string[]}
 */
function extractCategoriesFromDictionaries(dictionaries) {
    const categories = new Set();
    for (const dict of dictionaries) {
        const programming = dict.fileTypes?.length;
        const naturalLanguage = dict.locales?.length;
        if (programming) {
            categories.add('programming');
        }
        if (naturalLanguage) {
            categories.add('natural-language');
        }
        if (!programming && !naturalLanguage) {
            categories.add('other');
        }
        if (dict.enabled) {
            categories.add('default');
        }
    }
    return [...categories];
}
