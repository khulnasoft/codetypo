# Codetypo Bundled Dictionaries

This package contains all the dictionaries bundled with codetypo.

It has been pull into its own package to make it easier to Webpack codetypo.

## Webpack

Example `webpack.config.js` modification:

```js
  externals: [
    /^@codetypo\/codetypo-bundled-dicts/,
  ],
```

Example: `package.json`:

```js
  "devDependencies": {
    "codetypo": "workspace:*",
  },
  "dependencies": {
    "@codetypo/codetypo-bundled-dicts": "workspace:*"
  }
```

See [khulnasoft/codetypo-action](https://github.com/khulnasoft/codetypo-action)
