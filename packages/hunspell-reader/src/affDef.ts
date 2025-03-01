// codetypo:words uppercased
// codetypo:words KEEPCASE WARN NEEDAFFIX FORCEUCASE FORBIDDENWORD NOSUGGEST WORDCHARS
// codetypo:words COMPOUNDBEGIN COMPOUNDMIDDLE COMPOUNDEND COMPOUNDPERMITFLAG COMPOUNDFORBIDFLAG
// codetypo:words MAXDIFF COMPOUNDMIN COMPOUNDRULE COMPOUNDFLAG COMPOUNDLAST FORBIDWARN

export interface Fx {
    type: 'PFX' | 'SFX';
    id: string;
    combinable: boolean;
    substitutionSets: Substitutions;
    substitutionsForRegExps: SubstitutionsForRegExp[];
    count?: string; // number of line items for this rule.
    extra?: string[]; // extra items on the line.
}

export type Substitutions = Map<string, SubstitutionsForRegExp>;

export interface Substitution {
    type: 'P' | 'S';
    remove: string;
    attach: string;
    attachRules?: string;
    replace: RegExp;
    extra?: string;
}

export interface SubstitutionsForRegExp {
    match: RegExp;
    substitutions: Substitution[];
    substitutionsGroupedByRemove: Map<RegExp, Substitution[]>;
}

export interface Rep {
    match: string;
    replaceWith: string;
}

export interface Conv {
    from: string;
    to: string;
}

export interface AffTransformFlags {
    KEEPCASE?: string;
    WARN?: string;
    NEEDAFFIX?: string;
    FORCEUCASE?: string;
    FORBIDDENWORD?: string;
    NOSUGGEST?: string;
    COMPOUNDBEGIN?: string;
    COMPOUNDEND?: string;
    COMPOUNDFLAG?: string;
    COMPOUNDFORBIDFLAG?: string;
    COMPOUNDMIDDLE?: string;
    COMPOUNDPERMITFLAG?: string;
    ONLYINCOMPOUND?: string;
}

export interface AffInfo extends AffTransformFlags {
    SET: string; // Character set encoding of the .aff and .dic file
    TRY?: string;
    KEY?: string;
    WORDCHARS?: string;
    NOSPLITSUGS?: boolean;
    MAXCPDSUGS?: number;
    ONLYMAXDIFF?: boolean;
    MAXDIFF?: number;
    BREAK?: string[];
    FLAG?: string; // 'long' | 'num'
    MAP?: string[];
    ICONV?: Conv[];
    OCONV?: Conv[];
    REP?: Rep[];
    AF?: string[];
    COMPOUNDMIN?: number;
    COMPOUNDRULE?: string[];
    CHECKCOMPOUNDCASE?: boolean;
    CHECKCOMPOUNDDUP?: boolean;
    CHECKCOMPOUNDREP?: boolean;
    CHECKCOMPOUNDPATTERN?: string[][];
    PFX?: Map<string, Fx>;
    SFX?: Map<string, Fx>;
}

export type Rule = FlagRule | PfxRule | SfxRule;

interface RuleBase {
    id: string;
    type: string;
    flags?: AffWordFlags;
    pfx?: Fx;
    sfx?: Fx;
}

export interface FlagRule extends RuleBase {
    flags: AffWordFlags;
}

export interface PfxRule extends RuleBase {
    pfx: Fx;
}

export interface SfxRule extends RuleBase {
    sfx: Fx;
}

// codetypo:ignore straat

/**
 * AffWordFlags are the flags applied to a word after the hunspell rules have been applied.
 * They are either `true` or `undefined`.
 */
export interface AffWordFlags {
    /**
     * COMPOUNDFLAG flag
     *
     * Words signed with COMPOUNDFLAG may be in compound words (except when word shorter than COMPOUNDMIN).
     * Affixes with COMPOUNDFLAG also permits compounding of affixed words.
     *
     */
    isCompoundPermitted?: true;
    /**
     * COMPOUNDBEGIN flag
     *
     * Words signed with COMPOUNDBEGIN (or with a signed affix) may be first elements in compound words.
     *
     */
    canBeCompoundBegin?: true; // default false
    /**
     * COMPOUNDMIDDLE flag
     *
     * Words signed with COMPOUNDMIDDLE (or with a signed affix) may be middle elements in compound words.
     *
     */
    canBeCompoundMiddle?: true; // default false
    /**
     * COMPOUNDLAST flag
     *
     * Words signed with COMPOUNDLAST (or with a signed affix) may be last elements in compound words.
     *
     */
    canBeCompoundEnd?: true; // default false
    /**
     * COMPOUNDPERMITFLAG flag
     *
     * Prefixes are allowed at the beginning of compounds, suffixes are allowed at the end of compounds by default.
     * Affixes with COMPOUNDPERMITFLAG may be inside of compounds.
     *
     */
    isOnlyAllowedInCompound?: true;
    /**
     * COMPOUNDFORBIDFLAG flag
     *
     * Suffixes with this flag forbid compounding of the affixed word.
     *
     */
    isCompoundForbidden?: true;
    /**
     * WARN flag
     *
     * This flag is for rare words, which are also often spelling mistakes, see option -r of command line Hunspell and FORBIDWARN.
     */
    isWarning?: true;
    /**
     * KEEPCASE flag
     *
     * Forbid uppercased and capitalized forms of words signed with KEEPCASE flags. Useful for special orthographies (measurements and
     * currency often keep their case in uppercased texts) and writing systems (e.g. keeping lower case of IPA characters). Also valuable
     * for words erroneously written in the wrong case.
     */
    isKeepCase?: true;
    /**
     * FORCEUCASE flag
     *
     * Last word part of a compound with flag FORCEUCASE forces capitalization of the whole compound word.
     * Eg. Dutch word "straat" (street) with FORCEUCASE flags will allowed only in capitalized compound forms,
     * according to the Dutch spelling rules for proper names.
     */
    isForceUCase?: true;
    /**
     * FORBIDDENWORD flag
     *
     * This flag signs forbidden word form. Because affixed forms are also forbidden, we can subtract a subset from set of the
     * accepted affixed and compound words. Note: useful to forbid erroneous words, generated by the compounding mechanism.
     */
    isForbiddenWord?: true;
    /**
     * NOSUGGEST flag
     *
     * Words signed with NOSUGGEST flag are not suggested (but still accepted when typed correctly). Proposed flag for vulgar
     * and obscene words (see also SUBSTANDARD).
     */
    isNoSuggest?: true;
    // codetypo:ignore pseudoroot
    /**
     * NEEDAFFIX flag
     *
     * This flag signs virtual stems in the dictionary, words only valid when affixed. Except, if the dictionary word has a homonym
     * or a zero affix. NEEDAFFIX works also with prefixes and prefix + suffix combinations (see tests/pseudoroot5.*).
     */
    isNeedAffix?: true;
}

export interface AffWord {
    word: string;
    rules: string;
    flags: AffWordFlags;
    rulesApplied: string;
    /** prefix + base + suffix == word */
    base: string; // the base
    suffix: string; // suffixes applied
    prefix: string; // prefixes applied
    dic: string; // dictionary entry
}
