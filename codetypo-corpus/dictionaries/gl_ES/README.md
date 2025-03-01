# CodeTypo Galician Dictionary (Spain)

Galician Dictionary (Spain)

This is a pre-built dictionary for use with CodeTypo.

## Installation

Global Install and add to CodeTypo global settings.

```sh
npm install -g @codetypo/dict-gl-es
codetypo link add @codetypo/dict-gl-es
```

## Uninstall from CodeTypo

```sh
codetypo link remove @codetypo/dict-gl-es
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-gl-es
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-gl-es/codetypo-ext.json"],
    // …
}
```

## Adding Words

Please add any words to [src/additional_words.txt](https://github.com/khulnasoft/codetypo-dicts/blob/main/dictionaries/gl_ES/src/additional_words.txt) by making a pull request.

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.

## Acknowledgements

Contributed by:

- [Borja Paz Rodríguez](https://github.com/borjapazr)

This dictionary makes use of the following open source projects:

- [hunspell-gl](https://gitlab.com/trasno/hunspell-gl) ([Proxecto Trasno](https://trasno.gal/))

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://streetsidesoftware.com" title="KhulnaSoft Ltd">
<img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
