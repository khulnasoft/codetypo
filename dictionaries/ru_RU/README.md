# CodeTypo Russian Dictionary

Russian dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

It combines

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-ru_ru
codetypo link add @codetypo/dict-ru_ru
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-ru_ru
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-ru_ru/codetypo-ext.json"],
    // …
}
```

## Resources

The Hunspell source for this dictionary can be found:

- https://github.com/wooorm/dictionaries/tree/master/dictionaries/ru_RU

## License

GPL-3.0-or-later

> Some packages may have other licenses included.

# Contributing

## Adding Missing Words

Please add words to [additional_words.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/ru_RU/src/additional_words.txt)

## Building

Building is only necessary if you want to modify the contents of the dictionary.
Note: Building the Russian dictionary takes at least 30 minutes.

```sh
pnpm run build
```
