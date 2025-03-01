# CodeTypo Catalan Dictionary

Catalan dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-ca
codetypo link add @codetypo/dict-ca
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-ca
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-ca/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Resources

The resources for this dictionary can be obtained from the [LibreOffice repository](https://cgit.freedesktop.org/libreoffice/dictionaries/)

## License

MIT

> Some packages may have other licenses included.

GPLv2

> The catalan hunspell dictionary files are licensed under the GPLv2 license.

## Acknowledgement

- Contributed by [Jordi Olivares Provencio](https://github.com/jordiolivares)

<!---
    codetypo:words Jordi Olivares Provencio
--->
