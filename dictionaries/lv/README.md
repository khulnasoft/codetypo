# CSpell Latvian Dictionary

Latvian dictionary for codetypo.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-lv
codetypo link add @codetypo/dict-lv
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-lv
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-lv
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-lv/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasofto-dicts#how-to-create-a-new-dictionary)

## License

LGPL-3.0

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
