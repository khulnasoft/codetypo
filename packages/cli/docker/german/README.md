# Extending the Docker Container to include German

The CodeTypo container has all the default dictionaries installed, but to include other dictionaries,
it is necessary to extend the container.

**`Dockerfile`**

```dockerfile
FROM ghcr.io/khulnasoft/codetypo:8.4.1

WORKDIR /app
# Setting HOME is necessary to set the location of CodeTypo's global config.
ENV HOME=/home
# Install the dictionaries we want
RUN npm install @codetypo/dict-de-de@3.2.0
# Link the dictionaries so that CodeTypo is aware of them by default.
RUN codetypo-cli link add @codetypo/dict-de-de

# Restore the working directory to the virtual directory.
WORKDIR /workdir
```

## Building

```sh
docker build -t codetypo-german:latest .
```

## Running

Example of `codetypo trace` command:

```sh
docker run -v $PWD:/workdir \
 codetypo-german:latest \
 trace Strasse \
 --locale=de --dictionary-path=short
```

**Result:**

```
Word    F Dictionary           Dictionary Location
Strasse - [flagWords]*         From Settings `flagWords`
Strasse - [ignoreWords]*       From Settings `ignoreWords`
Strasse - [suggestWords]*      From Settings `suggestWords`
Strasse - [words]*             From Settings `words`
Strasse - aws*                 [node_modules]/aws.txt
Strasse - companies*           [node_modules]/companies.txt
Strasse - computing-acronyms*  [node_modules]/computing-acronyms.txt
Strasse - cryptocurrencies*    [node_modules]/cryptocurrencies.txt
Straße  * de-de*               [node_modules]/de_DE.trie.gz
Strasse - filetypes*           [node_modules]/filetypes.txt.gz
Strasse - public-licenses*     [node_modules]/public-licenses.txt.gz
Strasse - softwareTerms*       [node_modules]/softwareTerms.txt
Strasse - web-services*        [node_modules]/webServices.txt
```

## CodeTypo Configuration

It is necessary to enable the locale for the dictionary to be used. On the command line, it is `--locale=<lang>`, i.e. `--locale=de,en` for German and English.

In a CodeTypo Configuration file:

**`codetypo.config.yaml`**

```yaml
language: de,en
```

**`codetypo.json`**

```json
{
  "language": "de,en"
}
```

<!--- codetypo:ignore Strasse Straße --->
