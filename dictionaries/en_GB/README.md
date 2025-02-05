# CodeTypo en_GB Dictionary

British English dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-en-gb
codetypo link add @codetypo/dict-en-gb
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-en-gb
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-en-gb/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Adding Words

Please add any words to [src/additional_words.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/en_GB/src/additional_words.txt) by making a pull request.

## License

GPL-3.0-or-later

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
