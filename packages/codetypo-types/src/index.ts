// Using old-style of `type` exports because the new style breaks some integrations.
export type {
    CodeTypoReporter,
    CodeTypoReporterModule,
    DebugEmitter,
    ErrorEmitter,
    ErrorLike,
    Issue,
    MessageEmitter,
    MessageType,
    MessageTypeLookup,
    ProgressBase,
    ProgressEmitter,
    ProgressFileBase,
    ProgressFileBegin,
    ProgressFileComplete,
    ProgressItem,
    ProgressTypes,
    ReporterConfiguration,
    ResultEmitter,
    RunResult,
    SpellingErrorEmitter,
} from './CodeTypoReporter.js';
export { IssueType, MessageTypes } from './CodeTypoReporter.js';
export type {
    AdvancedCodeTypoSettings,
    AdvancedCodeTypoSettingsWithSourceTrace,
    BaseSetting,
    CacheFormat,
    CacheSettings,
    CacheStrategy,
    CodeTypoPackageSettings,
    CodeTypoSettings,
    CodeTypoSettingsWithSourceTrace,
    CodeTypoUserSettings,
    CodeTypoUserSettingsWithComments,
    CommandLineSettings,
    ExperimentalBaseSettings,
    ExperimentalFileSettings,
    ExtendableSettings,
    FileSettings,
    FileSource,
    FsPath,
    FSPathResolvable,
    Glob,
    GlobDef,
    ImportFileRef,
    InMemorySource,
    LanguageId,
    LanguageIdMultiple,
    LanguageIdMultipleNeg,
    LanguageIdSingle,
    LanguageSetting,
    LanguageSettingFilterFields,
    LanguageSettingFilterFieldsDeprecated,
    LanguageSettingFilterFieldsPreferred,
    LegacySettings,
    LocaleId,
    LocalId,
    MatchingFileType,
    MergeSource,
    OverrideFilterFields,
    OverrideSettings,
    Pattern,
    PatternId,
    PatternRef,
    Plugin,
    PnPSettings,
    PredefinedPatterns,
    RegExpPatternDefinition,
    RegExpPatternList,
    ReporterSettings,
    ReportingConfiguration,
    Settings,
    SimpleGlob,
    Source,
    SuggestionsConfiguration,
    TrustLevel,
    Version,
    VersionLatest,
    VersionLegacy,
    WorkspaceTrustSettings,
} from './CodeTypoSettingsDef.js';
export type { CodeTypoUserSettingsFields } from './configFields.js';
export { ConfigFields } from './configFields.js';
export { defaultCodeTypoSettings } from './defaultConfigSettings.js';
export { defineConfig } from './defineConfig.js';
export type {
    CustomDictionaryPath,
    CustomDictionaryScope,
    DictionaryDefinition,
    DictionaryDefinitionAlternate,
    DictionaryDefinitionAugmented,
    DictionaryDefinitionBase,
    DictionaryDefinitionCustom,
    DictionaryDefinitionInline,
    DictionaryDefinitionInlineFlagWords,
    DictionaryDefinitionInlineIgnoreWords,
    DictionaryDefinitionInlineWords,
    DictionaryDefinitionLegacy,
    DictionaryDefinitionPreferred,
    DictionaryFileTypes,
    DictionaryId,
    DictionaryNegRef,
    DictionaryPath,
    DictionaryRef,
    DictionaryReference,
    ReplaceEntry,
    ReplaceMap,
} from './DictionaryDefinition.js';
export type { CharacterSet, CharacterSetCosts, DictionaryInformation, EditCosts } from './DictionaryInformation.js';
export type { Feature, Features } from './features.js';
export type { ParsedText, Parser, ParseResult, ParserName, ParserOptions } from './Parser/index.js';
export type { SuggestionCostMapDef, SuggestionCostsDefs } from './suggestionCostsDef.js';
export type { MappedText } from './TextMap.js';
export type { TextDocumentOffset, TextOffset } from './TextOffset.js';
