# CodeTypo Spanish Dictionary

Spanish dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-es-es
codetypo link add @codetypo/dict-es-es
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-es-es
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-es-es/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Adding Words

Please add any words to [src/additional_words.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/es_ES/src/additional_words.txt) by making a pull request.

## Resources

The Hunspell source for this dictionary can be found:

- https://github.com/titoBouzout/Dictionaries

## License

LGPL-3.0

> Some packages may have other licenses included.
> See [src/hunspell/license](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/src/hunspell/license)
