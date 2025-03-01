# CodeTypo Portuguese Dictionary

Portuguese dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-pt-pt
codetypo link add @codetypo/dict-pt-pt
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-pt-pt
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-pt-pt/codetypo-ext.json"],
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

MIT
See: [Portuguese-European.dic license](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/pt_PT/src/hunspell/LICENSE)

> Some packages may have other licenses included.
