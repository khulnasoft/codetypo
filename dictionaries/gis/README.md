# CodeTypo GIS and PostGIS Dictionary

GIS (Geographic Information System) and [PostGIS](https://postgis.net/) dictionary for codetypo.

This is a pre-built dictionary for use with CodeTypo.

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-gis
codetypo link add @codetypo/dict-gis
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-gis
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```sh
npm i @codetypo/dict-gis
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-gis/codetypo-ext.json"],
    "dictionaries": ["gis"]
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
Brought to you by <a href="https://khulnasoft.com" title="KhulnaSoft Ltd">
<img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
