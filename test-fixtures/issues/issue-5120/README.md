### Kind of Issue

Runtime - command-line tools

### Tool or Library

codetypo

### Version

8.2.3

### Supporting Library

Not sure

### OS

Macos

### OS Version

Sonoma 14.2.1

### Description

codetypo does not automatically read a configuration file if it is a symlink.

### Steps to Reproduce

1. Define `somenewword` in a simple config file: `codetypo.yaml`
2. Confirm it works: `codetypo trace somenewword`
3. Rename it: `mv codetypo.yaml actual.yaml`
4. Create a symlink to it: `ln -s actual.yaml codetypo.yaml`
5. Try using it implicitly: `codetypo trace somenewword`. **The config is not loaded.**
6. Use it explicitly: `codetypo trace somenewword --config codetypo.yaml`. The config is loaded.

### Expected Behavior

codetypo finds and reads `codetypo.yaml` no matter whether it is a symlink or an actual file.

### Additional Information

_No response_

### codetypo.json

_No response_

### codetypo.config.yaml

```yml
words:
  - somenewword
```


### Example Repository

_No response_

### Code of Conduct

- [X] I agree to follow this project's Code of Conduct
