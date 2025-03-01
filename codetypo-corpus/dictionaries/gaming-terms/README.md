# CodeTypo Gaming Dictionary

Gaming dictionary for codetypo.

This is a pre-built dictionary for use with CodeTypo.

## Installation

This dictionary comes bundled with the latest versions of `codetypo`.

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```sh
npm i @codetypo/dict-gaming-terms
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    // It is necessary to explicitly enable `gaming-terms` and `game-development` dictionaries by
    // including it in the list of dictionaries.
    "dictionaries": ["gaming-terms", "game-development"]
    // …
}
```

## Adding Terms to the Dictionaries

See: [`src/README.md`](https://github.com/khulnasoft/codetypo-dicts/tree/main/dictionaries/gaming-terms/src#readme)

## Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.
