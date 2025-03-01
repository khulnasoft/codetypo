# `@codetypo/filetypes`

A library to help determine the type of a file.

## Install

```sh
npm install -S @codetypo/filetypes
```

## Usage

```ts
import { findMatchingFileTypes } from '@codetypo/filetypes';

console.log(findMatchingFileTypes('code.js')); // outputs: [ 'javascript' ]
```
