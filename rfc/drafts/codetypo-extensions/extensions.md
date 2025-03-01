# CodeTypo Extensions

There are two types of extensions.

1. Pure static declarative config files. Loading the config file always has the same result.
1. Dynamic Extensions - Config defined in JavaScript

## Static Extensions

At the time of this writing, [codetypo-dicts](https://github.com/khulnasoft/codetypo-dicts) has only static dictionary extensions.

These extensions are defined as `codetypo-ext.json`. They tend to define static dictionaries and a few regexp patterns for include / exclude.

## Dynamic Extensions

CodeTypo currently supports using `default` exports from JavaScript files to get the configuration. If the `default` is a function, then it is called exactly once on load.

This method does allow some flexibility, but not much. It is possible for a `codetypo.config.mjs` file to load content and return it as configuration. It works fine if the `codetypo.config.mjs` file is in the users directory, but it does not make it easy to write a generic extension.

## Proposal

### Extending Imports to allow settings

**`codetypo.config.yaml`**

```yaml
import:
  - ['@codetypo/hunspell-ext', 'nl-nl'] # Use the Hunspell Extension to import the Dutch Hunspell dictionary.
  - ['@codetypo/hunspell-ext', 'eu'] # Use the Hunspell Extension to import the Basque Hunspell dictionary.
  - '@codetypo/dict-de-de' # import German dictionary.
```

- `@codetypo/hunspell-ext` could be a codetypo-extension that allowed importing Hunspell files directly.

### Configurations

Support the following exports:

```js
export const name = 'name of extension';
/**
 * @param {import("./types.ts").Context} context
 * @param {unknown[]} params
 * @returns {Promise<import("@codetypo/codetypo-types").CodeTypoUserSettings>}
 */
export default function getConfiguration(context, params);
```
