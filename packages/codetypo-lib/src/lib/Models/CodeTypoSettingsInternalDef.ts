import type {
    AdvancedCodeTypoSettingsWithSourceTrace,
    CodeTypoSettingsWithSourceTrace,
    DictionaryDefinition,
    DictionaryDefinitionAugmented,
    DictionaryDefinitionCustom,
    DictionaryDefinitionInline,
    DictionaryDefinitionPreferred,
    Parser,
} from '@codetypo/codetypo-types';
import type { WeightMap } from 'codetypo-trie-lib';

import type { OptionalOrUndefined } from '../util/types.js';
import { clean } from '../util/util.js';

export const SymbolCodeTypoSettingsInternal = Symbol('CodeTypoSettingsInternal');

export interface CodeTypoSettingsInternal extends Omit<AdvancedCodeTypoSettingsWithSourceTrace, 'dictionaryDefinitions'> {
    [SymbolCodeTypoSettingsInternal]: true;
    dictionaryDefinitions?: DictionaryDefinitionInternal[];
}

export interface CodeTypoSettingsInternalFinalized extends CodeTypoSettingsInternal {
    parserFn: Parser | undefined;
    finalized: true;
    ignoreRegExpList: RegExp[];
    includeRegExpList: RegExp[];
}

type DictionaryDefinitionCustomUniqueFields = Omit<DictionaryDefinitionCustom, keyof DictionaryDefinitionPreferred>;

export type DictionaryDefinitionInternal = DictionaryFileDefinitionInternal | DictionaryDefinitionInlineInternal;

export type DictionaryDefinitionInlineInternal = DictionaryDefinitionInline & {
    /** The path to the config file that contains this dictionary definition */
    readonly __source?: string | undefined;
};

export interface DictionaryFileDefinitionInternal
    extends Readonly<DictionaryDefinitionPreferred>,
        Readonly<Partial<DictionaryDefinitionCustomUniqueFields>>,
        Readonly<DictionaryDefinitionAugmented> {
    /**
     * Optional weight map used to improve suggestions.
     */
    readonly weightMap?: WeightMap | undefined;
    /** The path to the config file that contains this dictionary definition */
    readonly __source?: string | undefined;
}

export interface DictionaryFileDefinitionInternalWithSource extends DictionaryFileDefinitionInternal {
    readonly __source: string;
}

export type DictionaryDefinitionInternalWithSource = DictionaryDefinitionInternal & {
    readonly __source: string;
};

export function cleanCodeTypoSettingsInternal(
    parts?: OptionalOrUndefined<Partial<CodeTypoSettingsInternal>>,
): CodeTypoSettingsInternal {
    return parts
        ? Object.assign(clean(parts), { [SymbolCodeTypoSettingsInternal]: true })
        : { [SymbolCodeTypoSettingsInternal]: true };
}

export function createCodeTypoSettingsInternal(
    parts?: OptionalOrUndefined<Partial<CodeTypoSettingsInternal>>,
): CodeTypoSettingsInternal {
    return cleanCodeTypoSettingsInternal({ ...parts });
}

export function isCodeTypoSettingsInternal(
    cs:
        | CodeTypoSettingsInternal
        | CodeTypoSettingsWithSourceTrace
        | OptionalOrUndefined<CodeTypoSettingsInternal | CodeTypoSettingsWithSourceTrace>,
): cs is CodeTypoSettingsInternal {
    return !!(<CodeTypoSettingsInternal>cs)[SymbolCodeTypoSettingsInternal];
}

export function isDictionaryDefinitionInlineInternal(
    def: DictionaryDefinitionInternal | DictionaryDefinitionInline | DictionaryDefinition,
): def is DictionaryDefinitionInlineInternal {
    if (def.path) return false;
    const defInline = def as DictionaryDefinitionInline;
    return !!(defInline.words || defInline.flagWords || defInline.ignoreWords || defInline.suggestWords);
}
