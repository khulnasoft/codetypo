# CodeTypo Go Language Dictionary

Go Language dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

Supports keywords and built-in library names up to Go 1.12.

This dictionary is included by default in CodeTypo.

## Requirements

| Tool                                                                                                                 | Version |
| -------------------------------------------------------------------------------------------------------------------- | ------- |
| [codetypo](https://github.com/khulnasofto)                                                                           | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoftell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-golang
codetypo link add @codetypo/dict-golang
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-golang
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-golang/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Contributors

@AlekSi - Alexey Palazhchenko: https://github.com/AlekSi/go-words

## License

MIT

> Some packages may have other licenses included.
