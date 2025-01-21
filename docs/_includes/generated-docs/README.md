<!--- @@inject: ../../../README.md --->

# CodeTypo

[![unit tests](https://github.com/khulnasoft/codetypo/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![integration tests](https://github.com/khulnasoft/codetypo/actions/workflows/integration-test.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![lint](https://github.com/khulnasoft/codetypo/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![coverage](https://github.com/khulnasoft/codetypo/actions/workflows/coverage.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)

[![codecov](https://codecov.io/gh/khulnasoft/codetypo/branch/main/graph/badge.svg?token=Dr4fi2Sy08)](https://codecov.io/gh/khulnasoft/codetypo)
[![Coverage Status](https://coveralls.io/repos/github/khulnasoft/codetypo/badge.svg?branch=main)](https://coveralls.io/github/khulnasoft/codetypo)

The CodeTypo mono-repo, a spell checker for code.

## Support Future Development

- [![GitHub Sponsors](https://img.shields.io/badge/-black?style=social&logo=githubsponsors&label=GitHub%20Sponsor%3A%20Street%20Side%20Software)](https://github.com/sponsors/khulnasoft)
- [![Patreon](https://img.shields.io/badge/-black?style=social&logo=patreon&label=Patreon%3A%20Street%20Side%20Software)](https://patreon.com/khulnasoft)
- [![PayPal](https://img.shields.io/badge/-black?style=social&logo=paypal&label=PayPal%20Donate%3A%20Street%20Side%20Software)](https://www.paypal.com/donate/?hosted_button_id=26LNBP2Q6MKCY)
- [![Open Collective](https://img.shields.io/badge/-black?style=social&logo=opencollective&label=Open%20Collective%3A%20CodeTypo)](https://opencollective.com/codetypo)

## Documentation

[Documentation - CodeTypo](https://khulnasoft.github.io/codetypo/)

## Third-Party Video Presentations

Some videos related to CodeTypo and the [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) for VS Code.

- [Spell Checking Documentation in DevOps Pipelines](https://www.youtube.com/watch?v=w8gGi3aeVpc) by Houssem Dellai
- [Don't Worry About Spelling...VS Code Can Do It For You!!](https://www.youtube.com/watch?v=MfxFMFMsBP4) by [James Q Quick](https://www.youtube.com/@JamesQQuick)
- [Spell Checking In VSCode - VSCode Pro Tips](https://www.youtube.com/watch?v=_GwpPJgH1Gw)
- [Spell Check in VS Code with Code Spell Checker - Extension Highlight](https://www.youtube.com/watch?v=ZxNnOjWetH4)
- [Spell check your code from the command line with Codetypo](https://www.youtube.com/watch?v=nwmJ9h_zPJc)
- [How to Use VS Code Spell Checker](https://www.youtube.com/watch?v=Ix5bMd0kZeY) - Detailed walkthrough to setup and use multiple languages
- [Code Spell Checker Extension for Visual Studio Code](https://www.youtube.com/watch?v=dUn1mrJYMrM)

## Packages

- [codetypo](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo) -- codetypo command-line application
- [@codetypo/eslint-plugin](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-eslint-plugin) -- CodeTypo ESLint Plugin
- [codetypo-bundled-dicts](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-bundled-dicts) -- collection of dictionaries bundled with codetypo.
- [codetypo-glob](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-glob) -- glob library.
- [codetypo-io](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-io) -- i/o library.
- [codetypo-lib](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-lib) -- codetypo library used for code driven spelling checking (used by the application).
- [codetypo-types](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-types) -- codetypo types and JSON schema for codetypo configuration files.
- [codetypo-tools](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-tools) -- tool used to compile dictionaries.
- [codetypo-trie-lib](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-trie-lib) -- trie data structure used to store words.
- [codetypo-trie](https://github.com/khulnasoft/codetypo/tree/main/packages/codetypo-trie) -- trie data tool used to store words.
- [hunspell-reader](https://github.com/khulnasoft/codetypo/tree/main/packages/hunspell-reader) -- reads Hunspell files and outputs words.

## Related Packages

- [codetypo-cli](https://github.com/khulnasoft/codetypo-cli) -- `codetypo-cli` is useful for including `codetypo` directly from GitHub.

  Example install: `npm install -g git+https://github.com/khulnasoft/codetypo-cli`.

  This will add the `codetypo-cli` command, which is an alias of the `codetypo` command.

## Live Discussions

Join us on:

[<img src="./assets/images/zulip-icon-circle.svg" width="32">](https://codetypo.zulipchat.com/)

[codetypo.zulipchat.com](https://codetypo.zulipchat.com/)

## RFCs

| Link                                                                                                            | Description                     | Status      |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| [rfc-0001](https://github.com/khulnasoft/codetypo/tree/main/rfc/rfc-0001%20suggestions/)                        | Fixing common misspellings      | Done        |
| [rfc-0002](https://github.com/khulnasoft/codetypo/tree/main/rfc/rfc-0002%20improve%20dictionary%20suggestions/) | Improving Generated Suggestions | Done        |
| [rfc-0003](https://github.com/khulnasoft/codetypo/tree/main/rfc/rfc-0003%20parsing%20files/)                    | Plug-ins: Adding file parsers   | In Progress |
| [rfc-0004](https://github.com/khulnasoft/codetypo/tree/main/rfc/rfc-0004%20known%20issues/)                     | Support Marking Issues as Known | Not started |

## CodeTypo for enterprise

Available as part of the Tidelift Subscription.

The maintainers of CodeTypo and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source packages you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact packages you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-codetypo?utm_source=npm-codetypo&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## Security contact information

To report a security vulnerability, please email <security@khulnasoft.com> or use the
[Tidelift security contact](https://tidelift.com/security).
Tidelift will coordinate the fix and disclosure.

## Versions

|          | version | Node    | Status                | Maintenance | End of Free Support |
| :------- | :------ | :------ | :-------------------- | :---------- | :------------------ |
| codetypo | 8.x     | 18.x    | In Active Development | TBD         | TBD                 |
| codetypo | 7.x     | 16.x    | Maintenance           | 2023-10-01  | 2023-11-07          |
| codetypo | 6.x     | 14.14.x | Paid support only[^1] | 2023-04-01  | 2023-05-01          |
| codetypo | 5.x     | 12.x    | Paid support only[^1] | -           | 2022-10-01          |
| codetypo | 4.x     | 10.x    | Paid support only[^1] | -           | 2022-05-01          |

[^1]: [Support - Street Side Software](https://khulnasoft.com/support/#maintenance-agreements)

## Contributing

Contributions are welcome! See our [contribution notes](CONTRIBUTING.md). **Note:** To add or remove words in a dictionary, visit [codetypo-dicts](https://github.com/khulnasoft/codetypo/issues).

🙏 _**Special thanks to all of our amazing contributors!**_ 🥰

<!--- codetypo:disable --->

[<img alt="Contributor FortiShield" src="https://avatars.githubusercontent.com/u/161459699?v=4&size=128" width=64>](https://github.com/FortiShield)
[<img alt="Contributor khulnasoft-bot" src="https://avatars.githubusercontent.com/u/43526132?v=4&size=128" width=64>](https://github.com/khulnasoft-bot)
[<img alt="Contributor NxPKG" src="https://avatars.githubusercontent.com/u/116948796?v=4&size=128" width=64>](https://github.com/NxPKG)
[<img alt="Contributor gitworkflows" src="https://avatars.githubusercontent.com/u/118260833?v=4&size=128" width=64>](https://github.com/gitworkflows)

<!--- codetypo:enable --->

<br/>

---

<p align="center">Brought to you by<a href="https://khulnasoft.com" title="Street Side Software"><img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software</a></p>

<!---
codetypo:ignore Houssem Dellai
--->

<!--- @@inject-end: ../../../README.md --->
