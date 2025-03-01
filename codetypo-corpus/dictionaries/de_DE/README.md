# CodeTypo German Dictionary

German dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-de-de
codetypo link add @codetypo/dict-de-de
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-de-de
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-de-de/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Resources

The Hunspell source for this dictionary can be found:

- https://github.com/titoBouzout/Dictionaries

## License

LGPL-3.0

> Some packages may have other licenses included.
> See [src/hunspell/license](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/de_DE/src/hunspell/license) and [src/German_de_DE.txt](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/de_DE/src/German_de_DE.txt)
