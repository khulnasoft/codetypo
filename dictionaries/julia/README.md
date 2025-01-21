# CSpell Julia Dictionary

Julia dictionary for codetypo.

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @codetypo/dict-julia
codetypo link add @codetypo/dict-julia
```

## Uninstall from CSpell

```sh
codetypo link remove @codetypo/dict-julia
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @codetypo/dict-julia
```

The `codetypo-ext.json` file in this package should be added to the import section in your `codetypo.json` file.

```javascript
{
    // …
    "import": ["@codetypo/dict-julia/codetypo-ext.json"],
    // …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/khulnasoft/codetypo-dicts#how-to-create-a-new-dictionary)

## Script to export all relevant Base functions

```julia
base_functions = names(Base) .|> string
# We get rid of operators like +, - etc...
filter!(f -> !isnothing(match(r"\w+", f)), base_functions)
open("./src/julia.txt", "w") do io
 println.(io, base_functions)
end;
```

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://khulnasoft.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
