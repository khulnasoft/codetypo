# CodeTypo Slovenian Dictionary

Slovenian dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-sl-si
codetypo link add @codetypo/dict-sl-si
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-sl-si
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-sl-si
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-sl-si/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

## Resources

The Hunspell source for this dictionary can be found:

- https://cgit.freedesktop.org/libreoffice/dictionaries/tree/sl_SI/

## License

GNU/LGPL and GNU/GPL

> Some packages may have other licenses included.

See also: [README_sl_SI.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/sl_SIsrc/README_sl_SI.txt)
