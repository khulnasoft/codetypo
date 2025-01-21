# CodeTypo ESLint Plugin

A spell checker plugin for ESLint based upon CodeTypo.

## Feedback Welcome

This plugin is still in active development as part of the CodeTypo suite of tools and applications.

## Quick Setup

- Install `@codetypo/eslint-plugin` as a dev-dependency

  ```sh
  npm install --save-dev @codetypo/eslint-plugin
  ```

- Add the plugin to the ESLint configuration (see below:)
  - [Configuration (new: `eslint.config.js`)](#configuration-new-eslintconfigjs)
  - [Configuration (Legacy: `.eslintrc`)](#configuration-legacy-eslintrc)

### Configuration (new: `eslint.config.js`)

**`eslint.config.js` using recommended.**

```js
import codetypoESLintPluginRecommended from '@codetypo/eslint-plugin/recommended';

export default [
  // other config imports
  codetypoESLintPluginRecommended
  // other configs
];
```

**Or**

**`eslint.config.js` using configs.**

```js
import codetypoConfigs from '@codetypo/eslint-plugin/configs';

export default [
  // other config imports
  codetypoConfigs.recommended
  // other configs
];
```

**Or**

**`eslint.config.js` using `plugins`**

```js
import codetypoPlugin from '@codetypo/eslint-plugin';

export default [
  // other config imports
  {
    plugins: { '@codetypo': codetypoPlugin },
    rules: {
      '@codetypo/spellchecker': ['warn', {}]
    }
  }
  // other configs
];
```

### Configuration (Legacy: `.eslintrc`)

Add `"plugin:@codetypo/recommended"` to the `extends` section of the configuration.

**`.eslintrc`**

```json
{
  "extends": ["plugin:@codetypo/recommended"]
}
```

## Options

````ts
interface Options {
  /**
   * Automatically fix common mistakes.
   * This is only possible if a single preferred suggestion is available.
   * @default false
   */
  autoFix: boolean;
  /**
   * Number of spelling suggestions to make.
   * @default 8
   */
  numSuggestions: number;
  /**
   * Generate suggestions
   * @default true
   */
  generateSuggestions: boolean;
  /**
   * Ignore import, require names, and export from names
   * @default true
   */
  ignoreImports?: boolean;
  /**
   * Ignore the properties of imported variables, structures, and types.
   *
   * Example:
   * ```
   * import { example } from 'third-party';
   *
   * const msg = example.property; // `property` is not spell checked.
   * ```
   *
   * @default true
   */
  ignoreImportProperties?: boolean;
  /**
   * Spell check identifiers (variables names, function names, and class names)
   * @default true
   */
  checkIdentifiers?: boolean;
  /**
   * Spell check strings
   * @default true
   */
  checkStrings?: boolean;
  /**
   * Spell check template strings
   * @default true
   */
  checkStringTemplates?: boolean;
  /**
   * Spell check JSX Text
   * @default true
   */
  checkJSXText?: boolean;
  /**
   * Spell check comments
   * @default true
   */
  checkComments?: boolean;
  /**
   * Path to the codetypo configuration file.
   * Relative paths, will be relative to the current working directory.
   * @since 8.8.0
   */
  configFile?: string;
  /**
   * Some CodeTypo Settings
   */
  codetypo?: {
    /**
     * The language locale to use, i.e. `en-US,en-GB` to enable both
     * American and British English.
     */
    language?: string;
    /** List of words to be considered correct. */
    words?: string[];
    /**
     * List of words to be ignored.
     * An ignored word will not show up as an error, even if it is also
     * in the `flagWords`.
     */
    ignoreWords?: string[];
    /**
     * List of words to always be considered incorrect.
     * Words found in `flagWords` override `words`.
     * Format of `flagWords`
     * - single word entry - `word`
     * - with suggestions - `word:suggestion` or `word->suggestion, suggestions`
     */
    flagWords?: string[];
    /**
     * List of regular expression patterns or pattern names to exclude
     * from spell checking.
     */
    ignoreRegExpList?: string[];
    /**
     * List of regular expression patterns or defined pattern names to
     * match for spell checking.
     * If this property is defined, only text matching the included
     * patterns will be checked.
     */
    includeRegExpList?: string[];
    /** Allows words to be glued together. */
    allowCompoundWords?: boolean;
    /** Import codetypo config file. */
    import?: string[];
    /** List of dictionaries to enable */
    dictionaries?: string[];
    /** Define dictionaries. */
    dictionaryDefinitions?: DictionaryDefinition[];
  };

  /**
   * Specify the root path of the codetypo configuration.
   * It is used to resolve `imports` found in {@link codetypo}.
   *
   * example:
   * ```js
   * codetypoOptionsRoot: import.meta.url
   * // or
   * codetypoOptionsRoot: __filename
   * ```
   *
   * @default cwd
   *
   */
  codetypoOptionsRoot?: string | URL;

  /**
   * Specify a path to a custom word list file.
   *
   * example:
   * ```js
   * customWordListFile: "./myWords.txt"
   * ```
   */
  customWordListFile?: string | { path: string };

  /**
   * Scope selectors to spell check.
   * This is a list of scope selectors to spell check.
   *
   * Example:
   * ```js
   * checkScope: [
   *     ['YAMLPair[key] YAMLScalar', true],
   *     ['YAMLPair[value] YAMLScalar', true],
   *     ['YAMLSequence[entries] YAMLScalar', true],
   *     ['JSONProperty[key] JSONLiteral', true],
   *     ['JSONProperty[value] JSONLiteral', true],
   *     ['JSONArrayExpression JSONLiteral', true],
   * ],
   * ```
   *
   * To turn off checking JSON keys, use the following:
   *
   * ```js
   * checkScope: [
   *     ['JSONProperty[key] JSONLiteral', false],
   * ],
   * ```
   *
   * @since 8.9.0
   */
  checkScope?: ScopeSelectorList;

  /**
   * Output debug logs
   * @default false
   */
  debugMode?: boolean;
}
````

Examples:

**`eslint.config.js`**

```js
import codetypoPlugin from '@codetypo/eslint-plugin';

export default [
  {
    plugins: { '@codetypo': codetypoPlugin },
    rules: {
      '@codetypo/spellchecker': ['warn', { checkComments: false, autoFix: true }]
    }
  }
];
```

**`eslint.config.js`**

```js
import codetypoConfigs from '@codetypo/eslint-plugin/configs';

export default [
  codetypoConfigs.recommended,
  {
    rules: {
      '@codetypo/spellchecker': ['warn', { checkComments: false, autoFix: true }]
    }
  }
];
```

**`.eslintrc.json`**

```json
{
  "plugins": ["@codetypo"],
  "rules": {
    "@codetypo/spellchecker": ["warn", { "checkComments": false, "autoFix": true }]
  }
}
```

## `autoFix`

When enabled, `autoFix` corrects any spelling issues that have a single "preferred" suggestion. It attempts to match
case and style, but it cannot guarantee correctness of code.

### Preferred Suggestions

CodeTypo offers the ability to flag words as incorrect and to provide suggestions.

**`codetypo.config.yaml`**

```yaml
words:
  - allowlist
flagWords:
  - blacklist->allowlist
suggestWords:
  - colour->color
```

With this configuration, `blacklist` is flagged as forbidden and `allowlist` is the "preferred" suggestion. When `autoFix` is enabled, all instances of `blacklist` will be replaced with `allowlist`.

When spell checking, if `colour` is not in one of the dictionaries, then `color` will be offered as the preferred suggestion. `suggestWords` are used to provide preferred suggestions, but will not flag any words as incorrect.

CodeTypo will match case, but not word stems. `blacklist` and `Blacklist` will get replaced, but not `blacklists`.

## `configFile` - Using a CodeTypo Configuration File

**`eslint.config.mjs`**

```js
rules: {
    '@codetypo/spellchecker': [
        'error',
        {
            configFile: new URL('./codetypo.config.yaml', import.meta.url).toString(),
        },
    ],
},
```

## `codetypo` and `codetypoOptionsRoot` - CodeTypo Configuration

It is possible to send `codetypo` configuration to the spell checker. Where possible, use a codetypo configuration file and set `configFile`. But there are cases where this is not possible or desired (like fewer configuration files).

- Option `codetypo` is used to pass along configuration to the spell checker.
- Option `codetypoOptionsRoot` is used to tell the spell checker how to find `codetypo.import`s.

Example: **`eslint.config.mjs`**

```js
rules: {
    '@codetypo/spellchecker': [
        'warn',
        {
            codetypo: {
              import: ['./codetypo.config.yaml', '@codetypo/dict-de-de']
            },
            codetypoOptionsRoot: import.meta.url,
        },
    ],
},
```

Assuming `import.meta.url` is `file:///Users/ci/project/app/eslint.config.mjs`, this tells the spell checker to import `codetypo.config.yaml` from `file:///Users/ci/project/app/codetypo.config.yaml` and to search for package `@codetypo/dict-de-de` starting at `file:///Users/ci/project/app/`.

If `codetypoOptionsRoot` is not specified, the current working directory is used.

## Checking Custom AST Nodes

The `checkScope` setting is used to enable / disable checking AST Nodes. ESLint uses parsers to generate the AST (Abstract Syntax Tree) to evaluate a document. Each PlugIn gets access to the AST. `checkScope` can be used to handle new AST nodes when a custom parser is added. Some knowledge of the AST output by the parser is necessary.

```js
rules: {
  '@codetypo/spellchecker': ['warn', { checkScope: [
    ['JSONLiteral': true],  // will match AST Nodes of type `JSONLiteral` and spell check the value.
    ['JSONProperty[key] JSONLiteral', false]  // will turn off checking the JSON Property keys.
    ['JSONProperty JSONLiteral', false]  // will turn off checking the JSON Property keys and values.
    ['JSONProperty[value] JSONLiteral', true]  // will turn on checking the JSON Property values.
    ['YAMLPair[key] YAMLScalar', true],
    ['YAMLPair[value] YAMLScalar', true],
    ['YAMLSequence YAMLScalar', true],
  ] }],
},
```

## In Combination with CodeTypo

Due to the nature of how files are parsed, the `codetypo` command line tool and this ESLint plugin will give different results.
It is recommended that either ESLint or `codetypo` checks a file, but not both. Use `ignorePaths` setting in `codetypo.json` to
tell the `codetypo` command line tool to ignore files checked by ESLint.

Differences:

- The CodeTypo parser is generic across all file types. It just breaks an entire document into words and tests them against the dictionaries. Everything is checked, comments, code, strings, etc.

- The CodeTypo ESLint plugin uses the [AST](https://dev.to/akshay9677/what-the-heck-is-an-abstract-syntax-tree-ast--3kk5) (a way to identify the meaning of the individual parts of your code) provided by ESLint to only check literal strings, identifiers, and comments. See [Options](#options) on selecting what to check.

Example spell checked with ESLint CodeTypo Plugin: <img width="749" alt="image" src="https://user-images.githubusercontent.com/3740137/216295162-38ddf6a0-3873-4e48-b3a5-65fd421dae94.png">

Example spell checked with just `codetypo`: <img width="744" alt="image" src="https://user-images.githubusercontent.com/3740137/216295368-024c1065-2432-4d10-b204-7eb0589695e6.png">

## CodeTypo for Enterprise

<!--- @@inject: ../../static/tidelift.md --->

Available as part of the Tidelift Subscription.

The maintainers of codetypo and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source packages you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact packages you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-codetypo?utm_source=npm-codetypo&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

<!--- @@inject-end: ../../static/tidelift.md --->

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">Brought to you by<a href="https://khulnasoft.com" title="KhulnaSoft Ltd"><img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd</a></p>

<!--- @@inject-end: ../../static/footer.md --->

<!--- codetypo:ignore colour --->
