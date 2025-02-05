# CodeTypo VUE Configuration

Configuration bundle for VUE files.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-vue
codetypo link add @codetypo/dict-vue
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-vue
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-vue/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## License

MIT

> Some packages may have other licenses included.
