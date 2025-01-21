# CodeTypo Czech Dictionary

Czech dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-cs-cz
codetypo link add @codetypo/dict-cs-cz
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-cs-cz
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-cs-cz/codetypo-ext.json"],
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

> Some packages may have other licenses included.

See also: [Czech.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/cs_CZ/Czech.txt)
