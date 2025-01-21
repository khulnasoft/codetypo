# CodeTypo Serbian (Latin) Dictionary

Serbian (Latin) dictionary for codetypo.

This is a pre-built dictionary for use with CodeTypo. The word list is based on
Milutin Smiljanić's [korektor](https://github.com/msmiljan/korektor). The codetypo
dictionary has been compiled and is maintained by [Toma Tasovac](https://github.com/ttasovac).

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-sr-latn
codetypo link add @codetypo/dict-sr-latn
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-sr-latn
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-sr-latn
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-sr-latn/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

## License

GNU GPL

> Some packages may have other licenses included.

<!--- codetypo:words  Milutin Smiljanić Smiljanić's korektor Toma Tasovac --->
