# CodeTypo Google Dictionary

Google Cloud Development Dictionary for CodeTypo. It contains common terms found while working with Google products, services, and APIs.

This is a pre-built dictionary for use with CodeTypo.

Based upon: [cloud.google.com](https://cloud.google.com/products)

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-google
codetypo link add @codetypo/dict-google
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-google
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-google
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-google/codetypo-ext.json"],
    "dictionaries": ["google"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

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
