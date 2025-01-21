# CSpell Java Dictionary

Java dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-java
codetypo link add @codetypo/dict-java
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-java
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-java/codetypo-ext.json"],
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

## Contributors

- [Arthur Peters](https://github.com/arthurp) contributed the word list: [Gist](https://gist.github.com/arthurp/91963552130d42a11cf7dc1ad1967c5b)
- [Benjamin Schmid](https://twitter.com/bentolor) updated wordlist for
  JDK 12 via
  [a new script](https://github.com/bentolor/jdk9-module-enumerator)
  leveraging the [classgraph project](https://github.com/classgraph/classgraph)
