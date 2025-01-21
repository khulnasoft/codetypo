# CSpell Hungarian Dictionary

Hungarian dictionary for codetypo.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-hu-hu
codetypo link add @codetypo/dict-hu-hu
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-hu-hu
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-hu-hu
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-hu-hu/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

GPL-3.0

### Source

"[Wooorm's Hungarian Dictionary][wooorm-hu-dict]" which is based on "[Magyar Ispell][magyarispell]".

"Magyar Ispell" is licensed under the GPL-3.0 license, see its [LICENSE][magyarispell-license] for details.

"Wooorm's dictionaries" is licensed under the MIT license, see its [LICENSE][wooorm-license] for details.

[magyarispell-license]: https://raw.githubusercontent.com/laszlonemeth/magyarispell/master/COPYING.GPL3
[magyarispell]: https://github.com/laszlonemeth/magyarispell
[wooorm-hu-dict]: https://github.com/wooorm/dictionaries/tree/main/dictionaries/hu
[wooorm-license]: https://github.com/wooorm/dictionaries/blob/main/license

> Some packages may have other licenses included.

<!--- codetypo:ignore Wooorm's --->

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
