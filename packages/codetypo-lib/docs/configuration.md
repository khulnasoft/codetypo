# CodeTypo Configuration Files

## Supported Configuration Files

The spell checker will look for the following configuration files.

- `.codetypo.json`
- `codetypo.json`
- `.codeTypo.json`
- `codeTypo.json`
- `.vscode/codetypo.json`
- `.vscode/codeTypo.json`
- `.vscode/.codetypo.json`
- `codetypo.config.js`
- `codetypo.config.cjs`
- `codetypo.config.json`
- `codetypo.config.yaml`
- `codetypo.config.yml`
- `codetypo.yaml`
- `codetypo.yml`

## Configuration Search

While spell checking files, the spell checker will look for the nearest configuration file in the directory hierarchy.
This allows for folder level configurations to be honored.
It is possible to stop this behavior by adding adding `"noConfigSearch": true` to the top level configuration.

A Monorepo Example:

```
repo-root
├── codetypo.config.json
├─┬ packages
│ ├─┬ package-A
│ │ ├── codetypo.json
│ │ ├── README.md
│ │ └── CHANGELOG.md
│ ├─┬ package-B
│ │ ├── README.md
│ │ └── CHANGELOG.md
│ ├─┬ package-C
│ │ ├── codetypo.yaml
│ │ ├── README.md
│ │ └── CHANGELOG.md
```

The following command will search the repo start at `repo-root` looking for `.md` files.

```
repo-root % codetypo "**/*.md"
```

The root configuration is used to determine which files to check. Files matching the globs in `ignorePaths` will not be checked. When a file is found, the directory hierarchy is searched looking for the nearest configuration file.

For example:

| File                           | Config Used                        |
| ------------------------------ | ---------------------------------- |
| `packages/package-A/README.md` | `packages/package-A/codetypo.json` |
| `packages/package-A/CONFIG.md` | `packages/package-A/codetypo.json` |
| `packages/package-B/README.md` | `codetypo.config.json`             |
| `packages/package-C/README.md` | `packages/package-C/codetypo.yaml` |

## Example Configurations:

### Example `codetypo.config.js`

```javascript
'use strict';

/** @type { import("@codetypo/codetypo-types").CodeTypoUserSettings } */
const codetypo = {
  description: 'Company codetypo settings',
  languageSettings: [
    {
      languageId: 'cpp',
      allowCompoundWords: false,
      patterns: [
        {
          // define a pattern to ignore #includes
          name: 'pound-includes',
          pattern: /^\s*#include.*/g
        }
      ],
      ignoreRegExpList: ['pound-includes']
    }
  ],
  dictionaryDefinitions: [
    {
      name: 'custom-words',
      path: './custom-words.txt'
    }
  ],
  dictionaries: ['custom-words']
};

module.exports = codetypo;
```

### Example import from `codetypo.json`

Import a `codetypo.config.js` file from a `codetypo.json` file.

```javascript
{
    "import": ["../codetypo.config.js"]
}
```
