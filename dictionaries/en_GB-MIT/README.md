# CodeTypo en_GB Dictionary with MIT License

British English dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

**Note:** this is a limited dictionary, it is an old word list. Use `@codetypo/dict-en-gb` for a more extensive dictionary.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-en-gb-mit
codetypo link add @codetypo/dict-en-gb-mit
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-en-gb-mit
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-en-gb-mit/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Adding Words

Please add any words to [src/additional_words.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/en_GB-MIT/src/additional_words.txt) by making a pull request.

## License

MIT

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="KhulnaSoft Ltd">
<img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
