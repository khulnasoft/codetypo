# CodeTypo-Tools

Tools used to assist CodeTypo Development.

The Primary use of this tool is to build dictionaries used by codetypo. This tool will convert a word list or a hunspell file into a file usable by codetypo.

This package is an alias for `@codetypo/codetypo-tools`.

## Install

```sh
npm install -g codetypo-tools
```

## Usage

```sh
codetypo-tools --help
```

To create a word list.

```sh
codetypo-tools compile keywords.txt -o ./dictionaries/
```

This will filter the words from `keywords.txt` and write them to `./dictionaries/keywords.txt.gz`.

To create a trie file from a hunspell file.

```sh
codetypo-tools compile-trie english.dic
```

This will read and expand the `english.dic` file based upon the rules in `english.aff` into a new file called `english.trie.gz`

For large files, this process can take a long time and us a lot of memory.

The tool `codetypo-trie` can be used to read the contents of a `.trie` or `.trie.gz` file.

## CodeTypo for Enterprise

<!--- @@inject: ../../static/tidelift.md --->

Available as part of the Tidelift Subscription.

The maintainers of codetypo and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source packages you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact packages you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-codetypo?utm_source=npm-codetypo&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

<!--- @@inject-end: ../../static/tidelift.md --->

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">Brought to you by<a href="https://khulnasoft.com" title="KhulnaSoft Ltd"><img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd</a></p>

<!--- @@inject-end: ../../static/footer.md --->
