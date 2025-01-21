# CSpell English Dictionary

English dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Note

This dictionary comes pre-installed with codetypo. It should not be necessary to add it.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasofto)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoftell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-en_us
codetypo link add @codetypo/dict-en_us
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-en_us
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-en_us/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Adding Words

Please add any words to [src/additional_words.txt](https://github.com/khulnasofto-dicts/blob/main/dictionaries/en_US/src/additional_words.txt) by making a pull request.

## Resources

The Hunspell source for this dictionary can be found:

<http://wordlist.aspell.net/hunspell-readme/>

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasofttle="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
