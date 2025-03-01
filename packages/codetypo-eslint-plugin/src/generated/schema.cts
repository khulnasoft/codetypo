export const optionsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "additionalProperties": false,
  "definitions": {},
  "properties": {
    "autoFix": {
      "default": false,
      "description": "Automatically fix common mistakes. This is only possible if a single preferred suggestion is available.",
      "markdownDescription": "Automatically fix common mistakes.\nThis is only possible if a single preferred suggestion is available.",
      "type": "boolean"
    },
    "checkComments": {
      "default": true,
      "description": "Spell check comments",
      "markdownDescription": "Spell check comments",
      "type": "boolean"
    },
    "checkIdentifiers": {
      "default": true,
      "description": "Spell check identifiers (variables names, function names, class names, etc.)",
      "markdownDescription": "Spell check identifiers (variables names, function names, class names, etc.)",
      "type": "boolean"
    },
    "checkJSXText": {
      "default": true,
      "description": "Spell check JSX Text",
      "markdownDescription": "Spell check JSX Text",
      "type": "boolean"
    },
    "checkScope": {
      "description": "Scope selectors to spell check. This is a list of scope selectors to spell check.\n\nExample: ```js checkScope: [     ['YAMLPair[key] YAMLScalar', true],     ['YAMLPair[value] YAMLScalar', true],     ['YAMLSequence[entries] YAMLScalar', true],     ['JSONProperty[key] JSONLiteral', true],     ['JSONProperty[value] JSONLiteral', true],     ['JSONArrayExpression JSONLiteral', true], ], ```",
      "items": {
        "description": "A scope selector entry is a tuple that defines a scope selector and whether to spell check it.",
        "items": [
          {
            "description": "The scope selector is a string that defines the context in which a rule applies. Examples:\n- `YAMLPair[value] YAMLScalar` - check the value of a YAML pair.\n- `YAMLPair[key] YAMLScalar` - check the key of a YAML pair.",
            "markdownDescription": "The scope selector is a string that defines the context in which a rule applies.\nExamples:\n- `YAMLPair[value] YAMLScalar` - check the value of a YAML pair.\n- `YAMLPair[key] YAMLScalar` - check the key of a YAML pair.",
            "type": "string"
          },
          {
            "type": "boolean"
          }
        ],
        "markdownDescription": "A scope selector entry is a tuple that defines a scope selector and whether to spell check it.",
        "maxItems": 2,
        "minItems": 2,
        "type": "array"
      },
      "markdownDescription": "Scope selectors to spell check.\nThis is a list of scope selectors to spell check.\n\nExample:\n```js\ncheckScope: [\n    ['YAMLPair[key] YAMLScalar', true],\n    ['YAMLPair[value] YAMLScalar', true],\n    ['YAMLSequence[entries] YAMLScalar', true],\n    ['JSONProperty[key] JSONLiteral', true],\n    ['JSONProperty[value] JSONLiteral', true],\n    ['JSONArrayExpression JSONLiteral', true],\n],\n```",
      "type": "array"
    },
    "checkStringTemplates": {
      "default": true,
      "description": "Spell check template strings",
      "markdownDescription": "Spell check template strings",
      "type": "boolean"
    },
    "checkStrings": {
      "default": true,
      "description": "Spell check strings",
      "markdownDescription": "Spell check strings",
      "type": "boolean"
    },
    "configFile": {
      "description": "Path to the codetypo configuration file. Relative paths, will be relative to the current working directory.",
      "markdownDescription": "Path to the codetypo configuration file.\nRelative paths, will be relative to the current working directory.",
      "type": "string"
    },
    "codetypo": {
      "additionalProperties": false,
      "description": "CodeTypo options to pass to the spell checker.",
      "markdownDescription": "CodeTypo options to pass to the spell checker.",
      "properties": {
        "allowCompoundWords": {
          "default": false,
          "description": "True to enable compound word checking.",
          "markdownDescription": "True to enable compound word checking.",
          "type": "boolean"
        },
        "dictionaries": {
          "description": "Optional list of dictionaries to use. Each entry should match the name of the dictionary.\n\nTo remove a dictionary from the list, add `!` before the name.\n\nFor example, `!typescript` will turn off the dictionary with the name `typescript`.\n\nSee the [Dictionaries](https://codetypo.khulnasoft.com/docs/dictionaries/) and [Custom Dictionaries](https://codetypo.khulnasoft.com/docs/dictionaries-custom/) for more details.",
          "items": {
            "anyOf": [
              {
                "description": "This a reference to a named dictionary. It is expected to match the name of a dictionary.",
                "markdownDescription": "This a reference to a named dictionary.\nIt is expected to match the name of a dictionary.",
                "pattern": "^(?=[^!*,;{}[\\]~\\n]+$)(?=(.*\\w)).+$",
                "type": "string"
              },
              {
                "description": "This a negative reference to a named dictionary.\n\nIt is used to exclude or include a dictionary by name.\n\nThe reference starts with 1 or more `!`.\n- `!<dictionary_name>` - Used to exclude the dictionary matching `<dictionary_name>`.\n- `!!<dictionary_name>` - Used to re-include a dictionary matching `<dictionary_name>`.    Overrides `!<dictionary_name>`.\n- `!!!<dictionary_name>` - Used to exclude a dictionary matching `<dictionary_name>`.    Overrides `!!<dictionary_name>`.",
                "markdownDescription": "This a negative reference to a named dictionary.\n\nIt is used to exclude or include a dictionary by name.\n\nThe reference starts with 1 or more `!`.\n- `!<dictionary_name>` - Used to exclude the dictionary matching `<dictionary_name>`.\n- `!!<dictionary_name>` - Used to re-include a dictionary matching `<dictionary_name>`.\n   Overrides `!<dictionary_name>`.\n- `!!!<dictionary_name>` - Used to exclude a dictionary matching `<dictionary_name>`.\n   Overrides `!!<dictionary_name>`.",
                "pattern": "^(?=!+[^!*,;{}[\\]~\\n]+$)(?=(.*\\w)).+$",
                "type": "string"
              }
            ],
            "description": "Reference to a dictionary by name. One of:\n-  {@link  DictionaryRef } \n-  {@link  DictionaryNegRef }",
            "markdownDescription": "Reference to a dictionary by name.\nOne of:\n-  {@link  DictionaryRef } \n-  {@link  DictionaryNegRef }"
          },
          "markdownDescription": "Optional list of dictionaries to use. Each entry should match the name of the dictionary.\n\nTo remove a dictionary from the list, add `!` before the name.\n\nFor example, `!typescript` will turn off the dictionary with the name `typescript`.\n\nSee the [Dictionaries](https://codetypo.khulnasoft.com/docs/dictionaries/)\nand [Custom Dictionaries](https://codetypo.khulnasoft.com/docs/dictionaries-custom/) for more details.",
          "type": "array"
        },
        "dictionaryDefinitions": {
          "items": {
            "additionalProperties": false,
            "properties": {
              "description": {
                "description": "Optional description of the contents / purpose of the dictionary.",
                "markdownDescription": "Optional description of the contents / purpose of the dictionary.",
                "type": "string"
              },
              "name": {
                "description": "This is the name of a dictionary.\n\nName Format:\n- Must contain at least 1 number or letter.\n- Spaces are allowed.\n- Leading and trailing space will be removed.\n- Names ARE case-sensitive.\n- Must not contain `*`, `!`, `;`, `,`, `{`, `}`, `[`, `]`, `~`.",
                "markdownDescription": "This is the name of a dictionary.\n\nName Format:\n- Must contain at least 1 number or letter.\n- Spaces are allowed.\n- Leading and trailing space will be removed.\n- Names ARE case-sensitive.\n- Must not contain `*`, `!`, `;`, `,`, `{`, `}`, `[`, `]`, `~`.",
                "pattern": "^(?=[^!*,;{}[\\]~\\n]+$)(?=(.*\\w)).+$",
                "type": "string"
              },
              "noSuggest": {
                "description": "Indicate that suggestions should not come from this dictionary. Words in this dictionary are considered correct, but will not be used when making spell correction suggestions.\n\nNote: if a word is suggested by another dictionary, but found in this dictionary, it will be removed from the set of possible suggestions.",
                "markdownDescription": "Indicate that suggestions should not come from this dictionary.\nWords in this dictionary are considered correct, but will not be\nused when making spell correction suggestions.\n\nNote: if a word is suggested by another dictionary, but found in\nthis dictionary, it will be removed from the set of\npossible suggestions.",
                "type": "boolean"
              },
              "path": {
                "description": "Path to the file.",
                "markdownDescription": "Path to the file.",
                "type": "string"
              },
              "repMap": {
                "description": "Replacement pairs.",
                "items": {
                  "items": {
                    "type": "string"
                  },
                  "maxItems": 2,
                  "minItems": 2,
                  "type": "array"
                },
                "markdownDescription": "Replacement pairs.",
                "type": "array"
              },
              "type": {
                "default": "S",
                "description": "Type of file:\n- S - single word per line,\n- W - each line can contain one or more words separated by space,\n- C - each line is treated like code (Camel Case is allowed).\n\nDefault is S.\n\nC is the slowest to load due to the need to split each line based upon code splitting rules.\n\nNote: this settings does not apply to inline dictionaries or `.trie` files.",
                "enum": [
                  "S",
                  "W",
                  "C",
                  "T"
                ],
                "markdownDescription": "Type of file:\n- S - single word per line,\n- W - each line can contain one or more words separated by space,\n- C - each line is treated like code (Camel Case is allowed).\n\nDefault is S.\n\nC is the slowest to load due to the need to split each line based upon code splitting rules.\n\nNote: this settings does not apply to inline dictionaries or `.trie` files.",
                "type": "string"
              },
              "useCompounds": {
                "description": "Use Compounds.",
                "markdownDescription": "Use Compounds.",
                "type": "boolean"
              }
            },
            "required": [
              "name",
              "path"
            ],
            "type": "object"
          },
          "type": "array"
        },
        "enabled": {
          "default": true,
          "description": "Is the spell checker enabled.",
          "markdownDescription": "Is the spell checker enabled.",
          "type": "boolean"
        },
        "flagWords": {
          "description": "List of words to always be considered incorrect. Words found in `flagWords` override `words`.\n\nFormat of `flagWords`\n- single word entry - `word`\n- with suggestions - `word:suggestion` or `word->suggestion, suggestions`\n\nExample: ```ts \"flagWords\": [   \"color: colour\",   \"incase: in case, encase\",   \"canot->cannot\",   \"cancelled->canceled\" ] ```",
          "items": {
            "type": "string"
          },
          "markdownDescription": "List of words to always be considered incorrect. Words found in `flagWords` override `words`.\n\nFormat of `flagWords`\n- single word entry - `word`\n- with suggestions - `word:suggestion` or `word->suggestion, suggestions`\n\nExample:\n```ts\n\"flagWords\": [\n  \"color: colour\",\n  \"incase: in case, encase\",\n  \"canot->cannot\",\n  \"cancelled->canceled\"\n]\n```",
          "type": "array"
        },
        "ignoreRegExpList": {
          "description": "List of regular expression patterns or pattern names to exclude from spell checking.\n\nExample: `[\"href\"]` - to exclude html href pattern.\n\nRegular expressions use JavaScript regular expression syntax.\n\nExample: to ignore ALL-CAPS words\n\nJSON ```json \"ignoreRegExpList\": [\"/\\\\b[A-Z]+\\\\b/g\"] ```\n\nYAML ```yaml ignoreRegExpList:   - >-    /\\b[A-Z]+\\b/g ```\n\nBy default, several patterns are excluded. See [Configuration](https://codetypo.khulnasoft.com/configuration/patterns) for more details.\n\nWhile you can create your own patterns, you can also leverage several patterns that are [built-in to CodeTypo](https://codetypo.khulnasoft.com/types/codetypo-types/types/PredefinedPatterns.html).",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "description": "This matches the name in a pattern definition.",
                "markdownDescription": "This matches the name in a pattern definition.",
                "type": "string"
              },
              {
                "enum": [
                  "Base64",
                  "Base64MultiLine",
                  "Base64SingleLine",
                  "CStyleComment",
                  "CStyleHexValue",
                  "CSSHexValue",
                  "CommitHash",
                  "CommitHashLink",
                  "Email",
                  "EscapeCharacters",
                  "HexValues",
                  "href",
                  "PhpHereDoc",
                  "PublicKey",
                  "RsaCert",
                  "SshRsa",
                  "SHA",
                  "HashStrings",
                  "SpellCheckerDisable",
                  "SpellCheckerDisableBlock",
                  "SpellCheckerDisableLine",
                  "SpellCheckerDisableNext",
                  "SpellCheckerIgnoreInDocSetting",
                  "string",
                  "UnicodeRef",
                  "Urls",
                  "UUID",
                  "Everything"
                ],
                "type": "string"
              }
            ],
            "description": "A PatternRef is a Pattern or PatternId.",
            "markdownDescription": "A PatternRef is a Pattern or PatternId."
          },
          "markdownDescription": "List of regular expression patterns or pattern names to exclude from spell checking.\n\nExample: `[\"href\"]` - to exclude html href pattern.\n\nRegular expressions use JavaScript regular expression syntax.\n\nExample: to ignore ALL-CAPS words\n\nJSON\n```json\n\"ignoreRegExpList\": [\"/\\\\b[A-Z]+\\\\b/g\"]\n```\n\nYAML\n```yaml\nignoreRegExpList:\n  - >-\n   /\\b[A-Z]+\\b/g\n```\n\nBy default, several patterns are excluded. See\n[Configuration](https://codetypo.khulnasoft.com/configuration/patterns) for more details.\n\nWhile you can create your own patterns, you can also leverage several patterns that are\n[built-in to CodeTypo](https://codetypo.khulnasoft.com/types/codetypo-types/types/PredefinedPatterns.html).",
          "type": "array"
        },
        "ignoreWords": {
          "description": "List of words to be ignored. An ignored word will not show up as an error, even if it is also in the `flagWords`.",
          "items": {
            "type": "string"
          },
          "markdownDescription": "List of words to be ignored. An ignored word will not show up as an error, even if it is\nalso in the `flagWords`.",
          "type": "array"
        },
        "import": {
          "anyOf": [
            {
              "description": "A File System Path. Relative paths are relative to the configuration file.",
              "markdownDescription": "A File System Path. Relative paths are relative to the configuration file.",
              "type": "string"
            },
            {
              "items": {
                "description": "A File System Path. Relative paths are relative to the configuration file.",
                "markdownDescription": "A File System Path. Relative paths are relative to the configuration file.",
                "type": "string"
              },
              "type": "array"
            }
          ],
          "description": "Allows this configuration to inherit configuration for one or more other files.\n\nSee [Importing / Extending Configuration](https://codetypo.khulnasoft.com/configuration/imports/) for more details.",
          "markdownDescription": "Allows this configuration to inherit configuration for one or more other files.\n\nSee [Importing / Extending Configuration](https://codetypo.khulnasoft.com/configuration/imports/) for more details."
        },
        "includeRegExpList": {
          "description": "List of regular expression patterns or defined pattern names to match for spell checking.\n\nIf this property is defined, only text matching the included patterns will be checked.\n\nWhile you can create your own patterns, you can also leverage several patterns that are [built-in to CodeTypo](https://codetypo.khulnasoft.com/types/codetypo-types/types/PredefinedPatterns.html).",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "description": "This matches the name in a pattern definition.",
                "markdownDescription": "This matches the name in a pattern definition.",
                "type": "string"
              },
              {
                "enum": [
                  "Base64",
                  "Base64MultiLine",
                  "Base64SingleLine",
                  "CStyleComment",
                  "CStyleHexValue",
                  "CSSHexValue",
                  "CommitHash",
                  "CommitHashLink",
                  "Email",
                  "EscapeCharacters",
                  "HexValues",
                  "href",
                  "PhpHereDoc",
                  "PublicKey",
                  "RsaCert",
                  "SshRsa",
                  "SHA",
                  "HashStrings",
                  "SpellCheckerDisable",
                  "SpellCheckerDisableBlock",
                  "SpellCheckerDisableLine",
                  "SpellCheckerDisableNext",
                  "SpellCheckerIgnoreInDocSetting",
                  "string",
                  "UnicodeRef",
                  "Urls",
                  "UUID",
                  "Everything"
                ],
                "type": "string"
              }
            ],
            "description": "A PatternRef is a Pattern or PatternId.",
            "markdownDescription": "A PatternRef is a Pattern or PatternId."
          },
          "markdownDescription": "List of regular expression patterns or defined pattern names to match for spell checking.\n\nIf this property is defined, only text matching the included patterns will be checked.\n\nWhile you can create your own patterns, you can also leverage several patterns that are\n[built-in to CodeTypo](https://codetypo.khulnasoft.com/types/codetypo-types/types/PredefinedPatterns.html).",
          "type": "array"
        },
        "language": {
          "default": "en",
          "description": "Current active spelling language. This specifies the language locale to use in choosing the general dictionary.\n\nFor example:\n\n- \"en-GB\" for British English.\n- \"en,nl\" to enable both English and Dutch.",
          "markdownDescription": "Current active spelling language. This specifies the language locale to use in choosing the\ngeneral dictionary.\n\nFor example:\n\n- \"en-GB\" for British English.\n- \"en,nl\" to enable both English and Dutch.",
          "type": "string"
        },
        "words": {
          "description": "List of words to be considered correct.",
          "items": {
            "type": "string"
          },
          "markdownDescription": "List of words to be considered correct.",
          "type": "array"
        }
      },
      "type": "object"
    },
    "codetypoOptionsRoot": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "format": "uri",
          "type": "string"
        }
      ],
      "description": "Specify the root path of the codetypo configuration. It is used to resolve `imports` found in  {@link  codetypo } .\n\nexample: ```js codetypoOptionsRoot: import.meta.url // or codetypoOptionsRoot: __filename ```",
      "markdownDescription": "Specify the root path of the codetypo configuration.\nIt is used to resolve `imports` found in  {@link  codetypo } .\n\nexample:\n```js\ncodetypoOptionsRoot: import.meta.url\n// or\ncodetypoOptionsRoot: __filename\n```"
    },
    "customWordListFile": {
      "anyOf": [
        {
          "description": "Specify a path to a custom word list file",
          "markdownDescription": "Specify a path to a custom word list file",
          "type": "string"
        },
        {
          "additionalProperties": false,
          "properties": {
            "path": {
              "description": "Path to word list file. File format: 1 word per line",
              "markdownDescription": "Path to word list file.\nFile format: 1 word per line",
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "type": "object"
        }
      ],
      "description": "Specify a path to a custom word list file.\n\nexample: ```js customWordListFile: \"./myWords.txt\" ```",
      "markdownDescription": "Specify a path to a custom word list file.\n\nexample:\n```js\ncustomWordListFile: \"./myWords.txt\"\n```"
    },
    "debugMode": {
      "description": "Output debug logs to `.codetypo-eslint-plugin.log` default false",
      "markdownDescription": "Output debug logs to `.codetypo-eslint-plugin.log`\ndefault false",
      "type": "boolean"
    },
    "generateSuggestions": {
      "default": true,
      "description": "Generate suggestions",
      "markdownDescription": "Generate suggestions",
      "type": "boolean"
    },
    "ignoreImportProperties": {
      "default": true,
      "description": "Ignore the properties of imported variables, structures, and types.\n\nExample: ``` import { example } from 'third-party';\n\nconst msg = example.property; // `property` is not spell checked. ```",
      "markdownDescription": "Ignore the properties of imported variables, structures, and types.\n\nExample:\n```\nimport { example } from 'third-party';\n\nconst msg = example.property; // `property` is not spell checked.\n```",
      "type": "boolean"
    },
    "ignoreImports": {
      "default": true,
      "description": "Ignore import and require names",
      "markdownDescription": "Ignore import and require names",
      "type": "boolean"
    },
    "numSuggestions": {
      "default": 8,
      "description": "Number of spelling suggestions to make.",
      "markdownDescription": "Number of spelling suggestions to make.",
      "type": "number"
    }
  },
  "required": [
    "numSuggestions",
    "generateSuggestions",
    "autoFix"
  ],
  "type": "object"
}
