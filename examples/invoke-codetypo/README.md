# Invoke CodeTypo

Example of invoking CodeTypo Lint programmatically.

<!--- @@inject: ./index.mjs --->

```javascript
import { lint } from 'codetypo';

await lint(['.'], {
  progress: true,
  summary: true
  // progress: false,
  // summary: false,
  // wordsOnly: true,
  // config: './codetypo.config.yaml',
});
```

<!--- @@inject-end: ./index.mjs --->
