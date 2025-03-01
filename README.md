# codetypo

> **Source code spell checker**

Finds and corrects spelling mistakes among source code:
- Fast enough to run on monorepos
- Low false positives so you can run on PRs

![Screenshot](./docs/screenshot.png)


[![Downloads](https://img.shields.io/github/downloads/khulnasoft/codetypo/total.svg)](https://github.com/khulnasoft/codetypo/releases)
[![codecov](https://codecov.io/gh/khulnasoft/codetypo/branch/master/graph/badge.svg)](https://codecov.io/gh/khulnasoft/codetypo)
[![Documentation](https://img.shields.io/badge/docs-master-blue.svg)][Documentation]
![License](https://img.shields.io/crates/l/codetypo.svg)
[![Crates Status](https://img.shields.io/crates/v/codetypo.svg)][Crates.io]

Dual-licensed under [MIT](LICENSE-MIT) or [Apache 2.0](LICENSE-APACHE)

## Documentation

- [Installation](#install)
- [Getting Started](#getting-started)
  - [False Positives](#false-positives)
  - [Integrations](#integrations)
    - [GitHub Action](docs/github-action.md)
    - [pre-commit](docs/pre-commit.md)
    - [Custom](#custom)
  - [Debugging](#debugging)
- [Reference](docs/reference.md)
- [FAQ](#faq)
- [Comparison with other spell checkers](docs/comparison.md)
- [Projects using codetypo](https://github.com/khulnasoft/codetypo/wiki)
- [Benchmarks](benchsuite/runs)
- [Design](docs/design.md)
- [Contribute](CONTRIBUTING.md)
- [CHANGELOG](CHANGELOG.md)

## Install

[Download](https://github.com/khulnasoft/codetypo/releases) a pre-built binary
(installable via [gh-install](https://github.com/khulnasoft/gh-install)).

Or use rust to install:
```console
$ cargo install codetypo-cli
```

Or use [Homebrew](https://brew.sh/) to install:
```console
$ brew install codetypo-cli
```

Or use [Conda](https://conda.io/) to install:
```console
$ conda install codetypo
```

Or use [Pacman](https://wiki.archlinux.org/title/pacman) to install:
```console
$ sudo pacman -S codetypo
```

## Getting Started

Most commonly, you'll either want to see what codetypo are available with
```console
$ codetypo
```

Or have them fixed
```console
$ codetypo --write-changes
$ codetypo -w
```
If there is any ambiguity (multiple possible corrections), `codetypo` will just report it to the user and move on.

### False Positives

Sometimes, what looks like a typo is intentional, like with people's names, acronyms, or localized content.

To mark a word or an identifier (grouping of words) as valid, add it your [`_codetypo.toml`](docs/reference.md) by declaring itself as the valid spelling:
```toml
[default]
extend-ignore-identifiers-re = [
    # *sigh* this just isn't worth the cost of fixing
    "AttributeID.*Supress.*",
]

[default.extend-identifiers]
# *sigh* this just isn't worth the cost of fixing
AttributeIDSupressMenu = "AttributeIDSupressMenu"

[default.extend-words]
# Don't correct the surname "Teh"
teh = "teh"
```
For more ways to ignore or extend the dictionary with examples, see the [config reference](docs/reference.md).

For cases like localized content, you can disable spell checking of file contents while still checking the file name:
```toml
[type.po]
extend-glob = ["*.po"]
check-file = false
```
(run `codetypo --type-list` to see configured file types)

If you need some more flexibility, you can completely exclude some files from consideration:
```toml
[files]
extend-exclude = ["localized/*.po"]
```

### Integrations

- [GitHub Actions](docs/github-action.md)
- [pre-commit](docs/pre-commit.md)
- [🐊Putout Processor](https://github.com/putoutjs/putout-processor-codetypo)
- [Visual Studio Code](https://github.com/tekumara/codetypo-vscode)
- [codetypo-lsp (Language Server Protocol server)](https://github.com/tekumara/codetypo-vscode)

#### Custom

`codetypo` provides several building blocks for custom native integrations
- `-` reads from `stdin`, `--write-changes` will be written to `stdout`
- `--diff` to provide a diff
- `--format json` to get jsonlines with exit code 0 on no errors, code 2 on codetypo, anything else is an error.

Examples:
```console
$ # Read file from stdin, write corrected version to stdout
$ codetypo - --write-changes
$ # Creates a diff of what would change
$ codetypo dir/file --diff
$ # Fully programmatic control
$ codetypo dir/file --format json
```

### Debugging

You can see what the effective config looks like by running
```console
$ codetypo --dump-config -
```

You can then see how codetypo is processing your project with
```console
$ codetypo --files
$ codetypo --identifiers
$ codetypo --words
```

If you need to dig in more, you can enable debug logging with `-v`

## FAQ

### Why was ... not corrected?

**Does the file show up in `codetypo --files`?**
If not, check your config with `codetypo --dump-config -`.
The `[files]` table controls how we walk files.
If you are using `files.extend-exclude`,
are you running into [#593](https://github.com/khulnasoft/codetypo/issues/593)?
If you are using `files.ignore-vcs = true`,
is the file in your `.gitignore` but git tracks it anyways?
Prefer allowing the file explicitly (see [#909](https://github.com/khulnasoft/codetypo/issues/909)).

**Does the identifier show up in `codetypo --identifiers` or the word show up in `codetypo --words`?**
If not, it might be subject to one of codetypo' heuristics for
detecting non-words (like hashes) or
unambiguous words (like words after a `\` escape).

If it is showing up, likely `codetypo` doesn't know about it yet.

`codetypo` maintains a list of known typo corrections to keep the false positive
count low so it can safely run unassisted.

This is in contrast to most spell checking UIs people use where there is a
known list of valid words.  In this case, the spell checker tries to guess your
intent by finding the closest-looking word.  It then has a gauge for when a
word isn't close enough and assumes you know best.  The user has the
opportunity to verify these corrections and explicitly allow or reject them.

For more on the trade offs of these approaches, see [Design](docs/design.md).

- To correct it locally, see also our [False Positives documentation](#false-positives).
- To contribute your correction, see [Contribute](CONTRIBUTING.md)

[Crates.io]: https://crates.io/crates/codetypo-cli
[Documentation]: https://docs.rs/codetypo
