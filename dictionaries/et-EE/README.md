# CSpell Estonian Dictionary

This is a CSpell repackaging of the [wordlist](http://www.meso.ee/~jjpp/speller/)
created by Jaak Pruulmann.

The following description has been taken from the webpage of the original author:

## Wordlists

The wordlists are based on work by the Institute of the Estonian Language,
subsequently improved by Jaak Pruulmann who also created the affix file.

## Encoding issues

All dictionaries are encoded in the UTF-8 character-set,
which is absolutely necessary to accommodate the plethora of foreign words
featuring S- and Z-caron that see daily usage in the Estonian language.

Dictionaries to accommodate the ISO-8859-1 legacy encoding still used on
some operating systems are also included for completion, but obviously
won't successfully proofread words that use S and Z with a caron accent.

## Wordlist improvement

Corrections to existing words and suggestions for new words are welcome.
Please send them to the author for inclusion in the next revision.

## Contact Information

Jaak Pruulmann <jjpp@meso.ee>

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-et-ee
codetypo link add @codetypo/dict-et-ee
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-et-ee
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-et-ee
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-et-ee/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## License

LGPL 3.0

> Some packages may have other licenses included.

<!---
codetypo:ignore wordlist wordlists
-->
