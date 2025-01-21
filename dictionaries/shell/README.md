# CodeTypo Shell Script Dictionary

Shell Script dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Requirements

| Tool                                                                                                                 | Version |
| -------------------------------------------------------------------------------------------------------------------- | ------- |
| [codetypo](https://github.com/khulnasofto)                                                                           | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoftell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-shell
codetypo link add @codetypo/dict-shell
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-shell
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-shell/codetypo-ext.json"],
    // …
}
```

## License

MIT

> Some packages may have other licenses included.
