# CSpell Lithuanian Dictionary

Lithuanian dictionary for codetypo. Based on ispell-lt package, version 1.3.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-lt-lt
codetypo link add @codetypo/dict-lt-lt
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-lt-lt
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-lt-lt/codetypo-ext.json"],
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

- https://launchpad.net/ispell-lt

## License

BSD-3-Clause

> Some packages may have other licenses included.
