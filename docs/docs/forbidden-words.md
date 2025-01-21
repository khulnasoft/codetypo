---
layout: default
title: How to Forbid Words
categories: docs
# parent: Docs
nav_order: 4
---

# How to Forbid Words

## Making Words Forbidden

There are several ways to mark a word as forbidden:

1. In a custom word list with words beginning with `!`.

   ```
   !forbiddenWord
   companyname
   jQuery
   projectname
   ```

   `forbiddenWord` will always be marked as misspelled. While `companyname` will be considered correct.

2. In `words` section of `codetypo` configuration:

   ```
   "words": [
       "!forbiddenWord",
       "configstore"
   ],
   ```

3. In `flagWords` section of `codetypo` configuration:
   ```
   "flagWords": ["forbiddenWord"]
   ```

## Overriding Forbidden words

Sometimes it is necessary to allow a word even if it is forbidden.

### In a comment

```js
/**
 * Do not mark `forbiddenWord` as incorrect.
 * codetypo:ignore forbiddenWord
 */
```

### In the `codetypo` configuration

```jsonc
{
  "ignoreWords": ["forbiddenWord"]
}
```

<!---
codetypo:ignore companyname projectname
--->
