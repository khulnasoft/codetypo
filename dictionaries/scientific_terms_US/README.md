# CSpell Scientific Terms US Dictionary

Scientific Terms US dictionary for codetypo.

The words for this dictionary came from [John Petrie’s LifeBlag](http://www.jpetrie.net/scientific-word-list-for-spell-checkersspelling-dictionaries/)

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-scientific-terms-us
codetypo link add @codetypo/dict-scientific-terms-us
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-scientific-terms-us
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-scientific-terms-us/codetypo-ext.json"],
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

<!--- codetypo:ignore Petrie’s --->
