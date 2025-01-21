---
title: 'Document Settings'
categories: configuration
parent: Configuration
nav_order: 11
---

# Inline Document Settings

## In Document Settings

It is possible to add spell check settings into your source code.
This is to help with file specific issues that may not be applicable to the entire project.

All settings are prefixed with `codeTypo:` or `spell-checker:`.

- `disable` -- turn off the spell checker for a section of code.
- `enable` -- turn the spell checker back on after it has been turned off.
- `ignore` -- specify a list of words to be ignored.
- `words` -- specify a list of words to be considered correct and will appear in the suggestions list.
- `ignoreRegExp` -- Any text matching the regular expression will NOT be checked for spelling.
- `includeRegExp` -- Only text matching the collection of includeRegExp will be checked.
- `enableCompoundWords` / `disableCompoundWords` -- Allow / disallow words like: "stringlength".
- `dictionaries` -- specify a list of the names of the dictionaries to use.

### Enable / Disable checking sections of code

It is possible to disable / enable the spell checker by adding comments to your code.

#### Disable Checking

- `/* codeTypo:disable */`
- `/* spell-checker: disable */`
- `/* spellchecker: disable */`
- `// codetypo:disable-line` -- disables checking for the current line.
- `/* codetypo:disable-next-line */` -- disables checking till the end of the next line.
<!--- codeTypo:enable -->

#### Enable Checking

- `/* codeTypo:enable */`
- `/* spell-checker: enable */`
- `/* spellchecker: enable */`

#### Example

```javascript
// codeTypo:disable
const wackyWord = ['zaallano', 'wooorrdd', 'zzooommmmmmmm'];
/* codeTypo:enable */

const words = ['zaallano', 'wooorrdd', 'zzooommmmmmmm']; // codetypo:disable-line disables this entire line

// To disable the next line, use codetypo:disable-next-line
const moreWords = ['ieeees', 'beees', 'treeees'];

// Nesting disable / enable is not Supported

// spell-checker:disable
// It is now disabled.

var liep = 1;

/* codetypo:disable */
// It is still disabled

// codeTypo:enable
// It is now enabled

const str = 'goededag'; // <- will be flagged as an error.

// spell-checker:enable <- doesn't do anything

// codeTYPO:DISABLE <-- also works.

// if there isn't an enable, spelling is disabled till the end of the file.
const str = 'goedemorgen'; // <- will NOT be flagged as an error.
```

<!--- codeTypo:enable -->

### Ignore

_Ignore_ allows you the specify a list of words you want to ignore within the document.

```javascript
// codeTypo:ignore zaallano, wooorrdd
// codeTypo:ignore zzooommmmmmmm
const wackyWord = ['zaallano', 'wooorrdd', 'zzooommmmmmmm'];
```

**Note:** words defined with `ignore` will be ignored for the entire file.

### Words

The _words_ list allows you to add words that will be considered correct and will be used as suggestions.

```javascript
// codeTypo:words woorxs sweeetbeat
const companyName = 'woorxs sweeetbeat';
```

**Note:** words defined with `words` will be used for the entire file.

### Enable / Disable compound words

In some programming language it is common to glue words together.

```c
// codeTypo:enableCompoundWords
char * errormessage;  // Is ok with codeTypo:enableCompoundWords
int    errornumber;   // Is also ok.
```

**Note:** Compound word checking cannot be turned on / off in the same file.
The last setting in the file determines the value for the entire file.

### Excluding and Including Text to be checked.

By default, the entire document is checked for spelling.
`codeTypo:disable`/`codeTypo:enable` above allows you to block off sections of the document.
`ignoreRegExp` and `includeRegExp` give you the ability to ignore or include patterns of text.
By default the flags `gim` are added if no flags are given.

The spell checker works in the following way:

1. Find all text matching `includeRegExp`
2. Remove any text matching `ignoreRegExp`
3. Check the remaining text.

#### Exclude Example

```javascript
// codeTypo:ignoreRegExp 0x[0-9a-f]+     -- will ignore c style hex numbers
// codeTypo:ignoreRegExp /0x[0-9A-F]+/g  -- will ignore upper case c style hex numbers.
// codeTypo:ignoreRegExp g{5} h{5}       -- will only match ggggg, but not hhhhh or 'ggggg hhhhh'
// codeTypo:ignoreRegExp g{5}|h{5}       -- will match both ggggg and hhhhh
// codeTypo:ignoreRegExp /g{5} h{5}/     -- will match 'ggggg hhhhh'
/* codeTypo:ignoreRegExp /n{5}/          -- will NOT work as expected because of the ending comment -> */
/*
   codeTypo:ignoreRegExp /q{5}/          -- will match qqqqq just fine but NOT QQQQQ
*/
// codeTypo:ignoreRegExp /[^\s]{40,}/    -- will ignore long strings with no spaces.
// codeTypo:ignoreRegExp Email           -- this will ignore email like patterns -- see Predefined RegExp expressions
var encodedImage = 'HR+cPzr7XGAOJNurPL0G8I2kU0UhKcqFssoKvFTR7z0T3VJfK37vS025uKroHfJ9nA6WWbHZ/ASn...';
var email1 = 'emailaddress@myfancynewcompany.com';
var email2 = '<emailaddress@myfancynewcompany.com>';
```

**Note:** ignoreRegExp and includeRegExp are applied to the entire file. They do not start and stop.

#### Include Example

In general you should not need to use `includeRegExp`. But if you are mixing languages then it could come in helpful.

```Python
# codeTypo:includeRegExp #.*
# codeTypo:includeRegExp ("""|''')[^\1]*\1
# only comments and block strings will be checked for spelling.
def sum_it(self, seq):
    """This is checked for spelling"""
    variabele = 0
    alinea = 'this is not checked'
    for num in seq:
        # The local state of 'value' will be retained between iterations
        variabele += num
        yield variabele
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
