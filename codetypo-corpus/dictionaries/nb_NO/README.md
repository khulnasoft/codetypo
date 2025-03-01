# CodeTypo Norwegian Bokmål Dictionary

Norwegian Bokmål dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-nb-no
codetypo link add @codetypo/dict-nb-no
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-nb-no
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-nb-no
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-nb-no/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

GPL-3.0

> Some packages may have other licenses included.
