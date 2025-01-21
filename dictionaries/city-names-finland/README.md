# CodeTypo city-names-finland Dictionary

City area names in Finland for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-city-names-finland
codetypo link add @codetypo/dict-city-names-finland
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-city-names-finland
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-city-names-finland/codetypo-ext.json"],
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
