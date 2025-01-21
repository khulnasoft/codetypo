# CSpell NPM Dictionary

This dictionary contains a list of popular JavaScript packages found on [npmjs.com](https://www.npmjs.com/).

This is a pre-built dictionary for use with CSpell.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-npm
codetypo link add @codetypo/dict-npm
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-npm
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-npm/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.

<!---
codetypo:ignore npmjs
--->
