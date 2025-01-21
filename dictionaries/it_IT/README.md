# CSpell Italian Dictionary

Italian dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-it-it
codetypo link add @codetypo/dict-it-it
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-it-it
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-it-it/codetypo-ext.json"],
    // …
}
```

## License

GPL-3.0 or later

> Some packages may have other licenses included.
