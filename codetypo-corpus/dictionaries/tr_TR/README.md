# CodeTypo Turkish Dictionary

Turkish dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-tr-tr
codetypo link add @codetypo/dict-tr-tr
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-tr-tr
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-tr-tr/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Resources

The resources for this dictionary can be obtained from the [titoBouzout repository](https://github.com/titoBouzout/Dictionaries)

## License

MIT

> Some packages may have other licenses included.
