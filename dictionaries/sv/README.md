# CSpell Swedish Dictionary

Swedish dictionary for CSpell.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-sv
codetypo link add @codetypo/dict-sv
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-sv
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-sv/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
pnpm run build
```

## License

GPL-3.0-or-later

> Some packages may have other licenses included.
