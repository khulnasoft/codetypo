# CodeTypo Html Symbol Entities Dictionary

HTML Symbol Entities dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

This addon dictionary adds HTML symbol entities like: `&mdash;`, `&laquo;`, and `&gtrarr;` to the spell checker for `html` and `markdown` files.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-html-symbol-entities
codetypo link add @codetypo/dict-html-symbol-entities
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-html-symbol-entities
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-html-symbol-entities/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary.
_Note:_ Building will take a few minutes for large files.

```sh
npm run build
```

## License

MIT

> Some packages may have other licenses included.
