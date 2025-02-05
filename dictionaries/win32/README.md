# CodeTypo Win32 Dictionary

Win32 dictionary for codetypo.

This is a pre-built dictionary for use with codetypo.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [codetypo](https://github.com/khulnasoft/codetypo)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=khulnasoft.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to codetypo global settings.

```sh
npm install -g @codetypo/dict-win32
codetypo link add @codetypo/dict-win32
```

## Uninstall from codetypo

```sh
codetypo link remove @codetypo/dict-win32
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-win32
```

The `codetypo-ext.json` file in this package should be added to the import section in your CodeTypo configuration file.

**_`codetypo.config.yaml`_**

```yaml
import: ['@codetypo/dict-win32/codetypo-ext.json']
```

**`codetypo.json`**

```javascript
{
    // …
    "import": ["@codetypo/dict-win32/codetypo-ext.json"],
    // …
}
```

## Enable the Dictionary

By default the `win32` dictionary is enabled for `C` and `C++` file types. To enable it for other file types, it is necessary to add it to the `dictionaries` section of the configuration or include it as an inline CodeTypo directive: `codetypo:dictionaries win32`.

Example: `example.md`

````markdown
Sample Code:

```cpp
    // Parse the command line parameters
    int argc;
    LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);
    pSample->ParseCommandLineArgs(argv, argc);
    LocalFree(argv);
```

<!--- codetypo:dictionaries win32 --->
````

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.
