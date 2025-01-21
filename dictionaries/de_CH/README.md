# CSpell Swiss German Dictionary

Swiss German dictionary for CSpell.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-de-ch
codetypo link add @codetypo/dict-de-ch
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-de-ch
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-de-ch/codetypo-ext.json"],
    // …
}
```

## Resources

The Hunspell source for this dictionary can be found:

- https://github.com/wooorm/dictionaries/tree/main#readme
