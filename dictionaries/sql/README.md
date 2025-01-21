# CodeTypo SQL Dictionary

SQL dictionary for CodeTypo.

This is a pre-built dictionary for use with CodeTypo.

## Requirements

| Tool                                                                                                                         | Version |
| ---------------------------------------------------------------------------------------------------------------------------- | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                           | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-sql
codetypo link add @codetypo/dict-sql
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-sql
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-sql
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-sql/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.
