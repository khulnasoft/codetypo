# CSpell Git Configuration

Configuration for spell checking Git Commit messages.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-git
codetypo link add @codetypo/dict-git
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-git
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-git/codetypo-ext.json"],
    // …
}
```

## Usage commit-msg

**`.git/hooks/commit-msg`**

```sh
#!/bin/sh

exec npx codetypo --language-id commit-msg $1
```

## License

MIT

> Some packages may have other licenses included.
