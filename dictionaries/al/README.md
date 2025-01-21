# CodeTypo AL Dictionary

AL Dictionary

This is a pre-built dictionary for use with CodeTypo.

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-al
codetypo link add @codetypo/dict-al
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-al
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```npm
npm i @codetypo/dict-al
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-al/codetypo-ext.json"],
    // …
}
```

## Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasofttle="KhulnaSoft Ltd">
<img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
