# CSpell Basque Dictionary

Basque dictionary for codetypo.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-eu
codetypo link add @codetypo/dict-eu
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-eu
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-eu
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-eu/codetypo-ext.json"],
    // …
}
```

## References

- Source: [jmigartua/basque_hunspell](https://github.com/jmigartua/basque_hunspell)

## License

MIT

> Some packages may have other licenses included.

<!--- codetypo:ignore jmigartua --->
