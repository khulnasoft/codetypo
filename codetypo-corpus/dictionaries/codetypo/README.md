# CodeTypo Dictionary Bundle

Dictionaries included with the CodeTypo Command Line tool.

This is a pre-built dictionary for use with CodeTypo.

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```sh
npm i -D @codetypo/dict-codetypo-bundle
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```jsonc
{
  // …
  "import": ["@codetypo/dict-codetypo-bundle/codetypo-ext.json"],
  // …
}
```

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://streetsidesoftware.com" title="KhulnaSoft Ltd">
<img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
