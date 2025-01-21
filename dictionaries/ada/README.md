# CodeTypo Ada Language Dictionary

Ada Language dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

Supports Ada keywords.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasofto)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoftell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-ada
codetypo link add @codetypo/dict-ada
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-ada
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-ada/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Reference

https://www.adaic.org/resources/add_content/standards/05rm/html/RM-2-9.html

## Contributors

@Jason3S - Jason Dent

## License

MIT

> Some packages may have other licenses included.
