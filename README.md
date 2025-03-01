# CodeTypo

[![unit tests](https://github.com/khulnasoft/codetypo/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![integration tests](https://github.com/khulnasoft/codetypo/actions/workflows/integration-test.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![lint](https://github.com/khulnasoft/codetypo/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)
[![coverage](https://github.com/khulnasoft/codetypo/actions/workflows/coverage.yml/badge.svg?branch=main)](https://github.com/khulnasoft/codetypo/actions)

[![codecov](https://codecov.io/gh/khulnasoft/codetypo/branch/main/graph/badge.svg?token=Dr4fi2Sy08)](https://codecov.io/gh/khulnasoft/codetypo)
[![Coverage Status](https://coveralls.io/repos/github/khulnasoft/codetypo/badge.svg?branch=main)](https://coveralls.io/github/khulnasoft/codetypo)

The CodeTypo mono-repo, a spell checker for code.

## Support Future Development

<!--- @@inject: static/sponsor.md --->

- [![GitHub Sponsors](https://img.shields.io/badge/-black?style=social&logo=githubsponsors&label=GitHub%20Sponsor%3A%20Street%20Side%20Software)](https://github.com/sponsors/khulnasoft)
- [![Patreon](https://img.shields.io/badge/-black?style=social&logo=patreon&label=Patreon%3A%20Street%20Side%20Software)](https://patreon.com/khulnasoft)
- [![PayPal](https://img.shields.io/badge/-black?style=social&logo=paypal&label=PayPal%20Donate%3A%20Street%20Side%20Software)](https://www.paypal.com/donate/?hosted_button_id=26LNBP2Q6MKCY)
- [![Open Collective](https://img.shields.io/badge/-black?style=social&logo=opencollective&label=Open%20Collective%3A%20CodeTypo)](https://opencollective.com/codetypo)

<!--- @@inject-end: static/sponsor.md --->

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

<!--
## Live Discussions

Join us on:

[<img src="./assets/images/zulip-icon-circle.svg" width="32">](https://codetypo.zulipchat.com/)

[codetypo.zulipchat.com](https://codetypo.zulipchat.com/)
-->

## RFCs

| Link                                                                                                                  | Description                     | Status      |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
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

|        | version | Node    | Status                | Maintenance | End of Free Support |
| :----- | :------ | :------ | :-------------------- | :---------- | :------------------ |
| codetypo | 8.x     | 18.x    | In Active Development | TBD         | TBD                 |
| codetypo | 7.x     | 16.x    | Maintenance           | 2023-10-01  | 2023-11-07          |
| codetypo | 6.x     | 14.14.x | Paid support only[^1] | 2023-04-01  | 2023-05-01          |
| codetypo | 5.x     | 12.x    | Paid support only[^1] | -           | 2022-10-01          |
| codetypo | 4.x     | 10.x    | Paid support only[^1] | -           | 2022-05-01          |

[^1]: [Support - KhulnaSoft Ltd](https://khulnasoft.com/support/#maintenance-agreements)

## Contributing

Contributions are welcome! See our [contribution notes](CONTRIBUTING.md). **Note:** To add or remove words in a dictionary, visit [codetypo-dicts](https://github.com/khulnasoft/codetypo-dicts/issues).

🙏 _**Special thanks to all of our amazing contributors!**_ 🥰

<!--- @@inject: static/contributors.md --->

<!--- codetypo:disable --->

[<img alt="Contributor Jason3S" src="https://avatars.githubusercontent.com/u/3740137?v=4&size=128" width=64>](https://github.com/Jason3S)
[<img alt="Contributor nschonni" src="https://avatars.githubusercontent.com/u/1297909?v=4&size=128" width=64>](https://github.com/nschonni)
[<img alt="Contributor Jason-Rev" src="https://avatars.githubusercontent.com/u/4850573?v=4&size=128" width=64>](https://github.com/Jason-Rev)
[<img alt="Contributor amanoji" src="https://avatars.githubusercontent.com/u/17751138?v=4&size=128" width=64>](https://github.com/amanoji)
[<img alt="Contributor jrylan" src="https://avatars.githubusercontent.com/u/178806156?v=4&size=128" width=64>](https://github.com/jrylan)
[<img alt="Contributor mad-gooze" src="https://avatars.githubusercontent.com/u/1188779?v=4&size=128" width=64>](https://github.com/mad-gooze)
[<img alt="Contributor snyk-bot" src="https://avatars.githubusercontent.com/u/19733683?v=4&size=128" width=64>](https://github.com/snyk-bot)
[<img alt="Contributor zo" src="https://avatars.githubusercontent.com/u/518711?v=4&size=128" width=64>](https://github.com/zo)
[<img alt="Contributor dsanders11" src="https://avatars.githubusercontent.com/u/5820654?v=4&size=128" width=64>](https://github.com/dsanders11)
[<img alt="Contributor coliff" src="https://avatars.githubusercontent.com/u/1212885?v=4&size=128" width=64>](https://github.com/coliff)
[<img alt="Contributor dakotaJang" src="https://avatars.githubusercontent.com/u/22528264?v=4&size=128" width=64>](https://github.com/dakotaJang)
[<img alt="Contributor bisubus" src="https://avatars.githubusercontent.com/u/2905949?v=4&size=128" width=64>](https://github.com/bisubus)
[<img alt="Contributor aimagic" src="https://avatars.githubusercontent.com/u/40253639?v=4&size=128" width=64>](https://github.com/aimagic)
[<img alt="Contributor abdusabri" src="https://avatars.githubusercontent.com/u/25670682?v=4&size=128" width=64>](https://github.com/abdusabri)
[<img alt="Contributor caaatisgood" src="https://avatars.githubusercontent.com/u/12913401?v=4&size=128" width=64>](https://github.com/caaatisgood)
[<img alt="Contributor pzmarzly" src="https://avatars.githubusercontent.com/u/8074163?v=4&size=128" width=64>](https://github.com/pzmarzly)
[<img alt="Contributor naveensrinivasan" src="https://avatars.githubusercontent.com/u/172697?v=4&size=128" width=64>](https://github.com/naveensrinivasan)
[<img alt="Contributor matt9ucci" src="https://avatars.githubusercontent.com/u/8044346?v=4&size=128" width=64>](https://github.com/matt9ucci)
[<img alt="Contributor lostintangent" src="https://avatars.githubusercontent.com/u/116461?v=4&size=128" width=64>](https://github.com/lostintangent)
[<img alt="Contributor Zamiell" src="https://avatars.githubusercontent.com/u/5511220?v=4&size=128" width=64>](https://github.com/Zamiell)
[<img alt="Contributor dflock" src="https://avatars.githubusercontent.com/u/47756?v=4&size=128" width=64>](https://github.com/dflock)
[<img alt="Contributor DenysVuika" src="https://avatars.githubusercontent.com/u/503991?v=4&size=128" width=64>](https://github.com/DenysVuika)
[<img alt="Contributor benmccann" src="https://avatars.githubusercontent.com/u/322311?v=4&size=128" width=64>](https://github.com/benmccann)
[<img alt="Contributor ScottRudiger" src="https://avatars.githubusercontent.com/u/26824724?v=4&size=128" width=64>](https://github.com/ScottRudiger)
[<img alt="Contributor rivy" src="https://avatars.githubusercontent.com/u/80132?v=4&size=128" width=64>](https://github.com/rivy)
[<img alt="Contributor rasa" src="https://avatars.githubusercontent.com/u/220772?v=4&size=128" width=64>](https://github.com/rasa)
[<img alt="Contributor roman-petrov" src="https://avatars.githubusercontent.com/u/18419515?v=4&size=128" width=64>](https://github.com/roman-petrov)
[<img alt="Contributor orta" src="https://avatars.githubusercontent.com/u/49038?v=4&size=128" width=64>](https://github.com/orta)
[<img alt="Contributor ollelauribostrom" src="https://avatars.githubusercontent.com/u/16004130?v=4&size=128" width=64>](https://github.com/ollelauribostrom)
[<img alt="Contributor alexandear" src="https://avatars.githubusercontent.com/u/3228886?v=4&size=128" width=64>](https://github.com/alexandear)
[<img alt="Contributor ndelangen" src="https://avatars.githubusercontent.com/u/3070389?v=4&size=128" width=64>](https://github.com/ndelangen)
[<img alt="Contributor nvuillam" src="https://avatars.githubusercontent.com/u/17500430?v=4&size=128" width=64>](https://github.com/nvuillam)
[<img alt="Contributor exhuma" src="https://avatars.githubusercontent.com/u/65717?v=4&size=128" width=64>](https://github.com/exhuma)
[<img alt="Contributor 74th" src="https://avatars.githubusercontent.com/u/1060011?v=4&size=128" width=64>](https://github.com/74th)
[<img alt="Contributor ssbarnea" src="https://avatars.githubusercontent.com/u/102495?v=4&size=128" width=64>](https://github.com/ssbarnea)
[<img alt="Contributor regseb" src="https://avatars.githubusercontent.com/u/1262990?v=4&size=128" width=64>](https://github.com/regseb)
[<img alt="Contributor zwaldowski" src="https://avatars.githubusercontent.com/u/170812?v=4&size=128" width=64>](https://github.com/zwaldowski)
[<img alt="Contributor fisker" src="https://avatars.githubusercontent.com/u/172584?v=4&size=128" width=64>](https://github.com/fisker)
[<img alt="Contributor hzhu" src="https://avatars.githubusercontent.com/u/1811365?v=4&size=128" width=64>](https://github.com/hzhu)
[<img alt="Contributor jonz94" src="https://avatars.githubusercontent.com/u/16042676?v=4&size=128" width=64>](https://github.com/jonz94)
[<img alt="Contributor mrazauskas" src="https://avatars.githubusercontent.com/u/72159681?v=4&size=128" width=64>](https://github.com/mrazauskas)
[<img alt="Contributor wtgtybhertgeghgtwtg" src="https://avatars.githubusercontent.com/u/18507762?v=4&size=128" width=64>](https://github.com/wtgtybhertgeghgtwtg)
[<img alt="Contributor wujekbogdan" src="https://avatars.githubusercontent.com/u/533954?v=4&size=128" width=64>](https://github.com/wujekbogdan)
[<img alt="Contributor siosio34" src="https://avatars.githubusercontent.com/u/7166022?v=4&size=128" width=64>](https://github.com/siosio34)
[<img alt="Contributor ADTC" src="https://avatars.githubusercontent.com/u/6047296?v=4&size=128" width=64>](https://github.com/ADTC)
[<img alt="Contributor kachkaev" src="https://avatars.githubusercontent.com/u/608862?v=4&size=128" width=64>](https://github.com/kachkaev)
[<img alt="Contributor AlexJameson" src="https://avatars.githubusercontent.com/u/33040934?v=4&size=128" width=64>](https://github.com/AlexJameson)
[<img alt="Contributor AlekSi" src="https://avatars.githubusercontent.com/u/11512?v=4&size=128" width=64>](https://github.com/AlekSi)
[<img alt="Contributor alicewriteswrongs" src="https://avatars.githubusercontent.com/u/6207644?v=4&size=128" width=64>](https://github.com/alicewriteswrongs)
[<img alt="Contributor aminya" src="https://avatars.githubusercontent.com/u/16418197?v=4&size=128" width=64>](https://github.com/aminya)
[<img alt="Contributor screendriver" src="https://avatars.githubusercontent.com/u/149248?v=4&size=128" width=64>](https://github.com/screendriver)
[<img alt="Contributor Namchee" src="https://avatars.githubusercontent.com/u/32661241?v=4&size=128" width=64>](https://github.com/Namchee)
[<img alt="Contributor d2s" src="https://avatars.githubusercontent.com/u/135053?v=4&size=128" width=64>](https://github.com/d2s)
[<img alt="Contributor dimitropoulos" src="https://avatars.githubusercontent.com/u/15232461?v=4&size=128" width=64>](https://github.com/dimitropoulos)
[<img alt="Contributor evenstensberg" src="https://avatars.githubusercontent.com/u/16735925?v=4&size=128" width=64>](https://github.com/evenstensberg)
[<img alt="Contributor tribut" src="https://avatars.githubusercontent.com/u/719105?v=4&size=128" width=64>](https://github.com/tribut)
[<img alt="Contributor HoussemDellai" src="https://avatars.githubusercontent.com/u/6548359?v=4&size=128" width=64>](https://github.com/HoussemDellai)
[<img alt="Contributor jmatsuzawa" src="https://avatars.githubusercontent.com/u/545426?v=4&size=128" width=64>](https://github.com/jmatsuzawa)
[<img alt="Contributor joshje" src="https://avatars.githubusercontent.com/u/813784?v=4&size=128" width=64>](https://github.com/joshje)
[<img alt="Contributor kamontat" src="https://avatars.githubusercontent.com/u/14089557?v=4&size=128" width=64>](https://github.com/kamontat)
[<img alt="Contributor kenji-miyake" src="https://avatars.githubusercontent.com/u/31987104?v=4&size=128" width=64>](https://github.com/kenji-miyake)
[<img alt="Contributor fughilli" src="https://avatars.githubusercontent.com/u/6869039?v=4&size=128" width=64>](https://github.com/fughilli)
[<img alt="Contributor Ki-er" src="https://avatars.githubusercontent.com/u/32241933?v=4&size=128" width=64>](https://github.com/Ki-er)
[<img alt="Contributor Maxim-Mazurok" src="https://avatars.githubusercontent.com/u/7756211?v=4&size=128" width=64>](https://github.com/Maxim-Mazurok)

<!--- codetypo:enable --->

<!--- @@inject-end: static/contributors.md --->

<!--- @@inject: static/footer.md --->

<br/>

---

<p align="center">Brought to you by<a href="https://khulnasoft.com" title="KhulnaSoft Ltd"><img width="16" alt="KhulnaSoft Ltd Logo" src="https://i.imgur.com/CyduuVY.png" /> KhulnaSoft Ltd</a></p>

<!--- @@inject-end: static/footer.md --->

<!---
codetypo:ignore Houssem Dellai
--->
