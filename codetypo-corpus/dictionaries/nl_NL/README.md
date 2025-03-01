# CodeTypo nl_NL Dictionary

Dutch dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-nl-nl
codetypo link add @codetypo/dict-nl-nl
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-nl-nl
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-nl-nl/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## License

MIT

> Some packages may have other licenses included.
> See: [hunspell Dutch license](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/nl_NL/src/hunspell/license)

## Resources

The Hunspell source for this dictionary can be found:

- https://github.com/titoBouzout/Dictionaries
