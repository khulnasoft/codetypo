# CSpell Croatian Dictionary

Croatian dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-hr-hr
codetypo link add @codetypo/dict-hr-hr
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-hr-hr
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-hr-hr
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-hr-hr/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## Resources

The Hunspell source for this dictionary can be found: https://github.com/krunose/hunspell-hr

## License

MIT

> Some packages may have other licenses included.
