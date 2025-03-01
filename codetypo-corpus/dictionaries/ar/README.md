# CodeTypo Arabic Dictionary

Arabic dictionary for codetypo.

This is a pre-built dictionary for use with CodeTypo.

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-ar
codetypo link add @codetypo/dict-ar
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-ar
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-ar
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-ar/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## Source

[AyaSpell Arabic Dictionary for Hunspell Spellchecker](https://github.com/linuxscout/ayaspell)

## License

LGPL

> Some packages may have other licenses included.
