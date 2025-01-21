---
title: 'Installing CodeTypo'
categories: docs
# parent: Docs
nav_order: 2
---

# Installation

## Node

CodeTypo requires Node.js to run.

### **Check the node version**

```sh
node -v
```

CodeTypo requires Node.js version `>=18.0`.

### Resources:

- [Downloading and installing Node.js and npm - npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Download - Node.js](https://nodejs.org/en/download/)
- [Releases - Node.js](https://nodejs.org/en/about/releases/)

## CodeTypo

### **NPM Global**

```sh
npm install -g codetypo@latest
```

### **NPM Package**

```sh
npm install --save-dev codetypo@latest
```

### **Yarn Package**

```sh
yarn add --dev codetypo@latest
```

## Running CodeTypo

- ```sh
  codetypo "**"
  ```
- ```sh
  npx codetypo "**"
  ```
- ```sh
  yarn codetypo "**"
  ```

# See Also

- [Getting Started](./getting-started.md)
