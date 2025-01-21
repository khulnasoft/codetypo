---
layout: default
title: Overrides
categories: configuration
parent: Configuration
nav_order: 11
---

<!--- Remove published when the page is ready  --->

# Overrides

Overrides are useful for forcing configuration on a per file basis.

Example:

```javascript
    "overrides": [
        // Force `*.hrr` and `*.crr` files to be treated as `cpp` files:
        {
            "filename": "**/{*.hrr,*.crr}",
            "languageId": "cpp"
        },
        // Force `*.txt` to use the Dutch dictionary (Dutch dictionary needs to be installed separately):
        {
            "language": "nl",
            "filename": "**/dutch/**/*.txt"
        }
    ]
```

<!---
    These are at the bottom because the VSCode Marketplace leaves a bit space at the top

    codeTypo:disableCompoundWords
    codeTypo:ignore  compoundwords stringlength errornumber
    codeTypo:ignore jsja goededag alek wheerd behaviour tsmerge QQQQQ ncode
    codeTypo:includeRegExp Everything
    codeTypo:ignore hte variabele alinea
    codeTypo:ignore mkdirp githubusercontent khulnasoft vsmarketplacebadge visualstudio
    codeTypo:words Verdana
    codeTypo:ignore ieeees beees treeees
    codeTypo:ignore amet
-->

<!---
You can use the [editor on GitHub](https://github.com/khulnasoft/codetypo/edit/main/docs/index.md) to maintain and preview the content for your website in Markdown files.
--->
