# CodeTypo Slovak Dictionary

Slovak dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-sk-sk
codetypo link add @codetypo/dict-sk-sk
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-sk-sk
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-sk-sk/codetypo-ext.json"],
    // …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
npm run build
```

## Resources

The Hunspell source for this dictionary can be found:

- <https://github.com/sk-spell/hunspell-sk>

## License

MPL v2

> Some packages may have other licenses included.

See also:

- [sk-spell/hunspell-sk](https://github.com/sk-spell/hunspell-sk#readme)
- [Slovak.txt](https://github.com/khulnasoft/codetypo/blob/main/dictionaries/src/Slovak.txt)

## Contributors

- [Zdenko Podobný](https://github.com/zdposter) - original contributor.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
