---
title: Configuration
nav_order: 4
description: 'Customizing CodeTypo'
has_children: true
---

# Configuration

_CodeTypo_'s behavior can be controlled through a config file.

By default it looks for any of the following files:

- `.codetypo.json`
- `codetypo.json`
- `.codeTypo.json`
- `codeTypo.json`
- `codetypo.config.js`
- `codetypo.config.cjs`
- `codetypo.config.json`
- `codetypo.config.yaml`
- `codetypo.config.yml`
- `codetypo.yaml`
- `codetypo.yml`
- [`package.json`](#packagejson)

Or you can specify a path to a config file with the `--config <path>` argument on the command line.

## `codetypo.json`

#### Example `codetypo.json` file

<!--- codetypo:ignore hte -->

```javascript
// codeTypo Settings
{
    // Version of the setting file.  Always 0.2
    "version": "0.2",
    // language - current active spelling language
    "language": "en",
    // words - list of words to be always considered correct
    "words": [
        "mkdirp",
        "tsmerge",
        "githubusercontent",
        "khulnasoft",
        "vsmarketplacebadge",
        "visualstudio"
    ],
    // flagWords - list of words to be always considered incorrect
    // This is useful for offensive words and common spelling errors.
    // For example "hte" should be "the"
    "flagWords": [
        "hte"
    ]
}
```

### codetypo.json sections

- `version` - currently always 0.2 - controls how the settings in the configuration file behave.
- `language` - this specifies the language locale to use in choosing the general dictionary.
  For example: `"language": "en-GB"` tells codetypo to use British English instead of US English.
- `words` - a list of words to be considered correct.
- `flagWords` - a list of words to be always considered incorrect
- `ignoreWords` - a list of words to be ignored (even if they are in the flagWords).
- `ignorePaths` - a list of globs to specify which files are to be ignored.

  **Example**

  ```json
  "ignorePaths": ["node_modules/**"]
  ```

  will cause codetypo to ignore anything in the `node_modules` directory.

- `maxNumberOfProblems` - defaults to **_100_** per file.
- `minWordLength` - defaults to **_4_** - the minimum length of a word before it is checked.
- `allowCompoundWords` - defaults to **_false_**; set to **true** to allow compound words by default.
- `dictionaries` - list of the names of the dictionaries to use. See [Dictionaries](../docs/dictionaries.md).
- `dictionaryDefinitions` - this list defines any custom dictionaries to use. This is how you can include other languages like Spanish.

  **Example**

  ```javascript
  "language": "en",
  // Dictionaries "spanish", "ruby", and "corp-terms" will always be checked.
  // Including "spanish" in the list of dictionaries means both Spanish and English
  // words will be considered correct.
  "dictionaries": ["spanish", "ruby", "corp-terms", "fonts"],
  // Define each dictionary:
  //  - Relative paths are relative to the config file.
  //  - URLs will be retrieved via HTTP GET
  "dictionaryDefinitions": [
      { "name": "spanish", "path": "./spanish-words.txt"},
      { "name": "ruby", "path": "./ruby.txt"},
      {
        "name": "corp-terms",
        "path": "https://shared-company-repository/codetypo-terms.txt"
      },
  ],
  ```

- `ignoreRegExpList` - list of patterns to be ignored
- `includeRegExpList` - _(Advanced)_ limits the text checked to be only that matching the expressions in the list.
- `patterns` - this allows you to define named patterns to be used with
  `ignoreRegExpList` and `includeRegExpList`.

  **Example**

  ```javascript
  "patterns": [
      {
          "name": "comment-single-line",
          "pattern": "/#.*/g"
      },
      {
          "name": "comment-multi-line",
          "pattern": "/(?:\\/\\*[\\s\\S]*?\\*\\/)/g"
      },
      // You can also combine multiple named patterns into one single named pattern
      {
          "name": "comments",
          "pattern": ["comment-single-line", "comment-multi-line"]
      }
  ],

  "ignoreRegExpList": ["comments"]
  ```

- `languageSettings` - this allow for per programming language configuration settings. See [LanguageSettings](./language-settings.md#LanguageSettings)

## `package.json`

It is possible to store CodeTypo configuration in the `package.json` file of a project. CodeTypo looks
for the configuration in the `codetypo` field of the `.json` file.

```js
{
  "name": "codetypo-docs",
  "description": "Documentation for CodeTypo",
  // ...
  "codetypo": {
    "version": "0.2",
    "useGitignore": true
  }
}
```

<!---
codetypo:ignore packagejson
--->
