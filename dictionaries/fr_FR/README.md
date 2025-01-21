# CSpell French Dictionary

French dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-fr-fr
codetypo link add @codetypo/dict-fr-fr
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-fr-fr
```

## Manual Installation

The `codetypo-ext.json` file in this package should be added to the import section in your codetypo.json file.

```javascript
{
    // …
    "import": ["@codetypo/dict-fr-fr/codetypo-ext.json"],
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

- <http://code.grammalecte.net:8080/home>

## License

MIT

See also: [French.txt](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/fr_FR/src/hunspell-french-dictionaries-v7.0/README_dict_fr.txt)

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
