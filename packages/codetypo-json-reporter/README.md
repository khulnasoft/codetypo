# `@codetypo/codetypo-json-reporter`

> CodeTypo reporter with JSON output

## Installation

Install it as a development package in the repository that will use it.

```sh
npm install -SD @codetypo/codetypo-json-reporter
```

## Usage

### Using Command Line

```sh
codetypo . --reporter @codetypo/codetypo-json-reporter
```

### Using CodeTypo Configuration

Add this to `codetypo.yaml`:

```yaml
reporters: [['@codetypo/codetypo-json-reporter', { outFile: 'out.json' }]]
```

or `codetypo.json`

```json
{
  "reporters": [["@codetypo/codetypo-json-reporter", { "outFile": "out.json" }]]
}
```

## Output file format

`@codetypo/codetypo-json-reporter` emits a JSON file with the following fields:

- `issues` - found spelling issues
- `result` - CodeTypo linting results
- `error` - CSell error messages
- `progress` - file linting progress messages if `settings.progress` is enabled
- `info` - CodeTypo execution logs if `settings.verbose` is enabled
- `debug` - CodeTypo debug logs if `settings.debug` is enabled

<details>
<summary>JSON Output Definition</summary>

<!--- @@inject: src/CodeTypoJSONReporterOutput.ts --->

```ts
import type {
  ErrorLike,
  Issue,
  MessageType,
  ProgressFileComplete,
  ProgressItem,
  RunResult
} from '@codetypo/codetypo-types';

export type CodeTypoJSONReporterOutput = {
  /**
   * Found spelling issues
   */
  issues: Array<Issue>;
  /**
   * CodeTypo execution logs
   */
  info?: Array<{ message: string; msgType: MessageType }>;
  /**
   * CodeTypo debug logs
   */
  debug?: Array<{ message: string }>;
  /**
   * CodeTypo error logs
   */
  error?: Array<{ message: string; error: ErrorLike }>;
  /**
   * CodeTypo file progress logs
   */
  progress?: Array<ProgressItem | ProgressFileComplete>;
  /**
   * Execution result
   */
  result: RunResult;
};
```

<!--- @@inject-end: src/CodeTypoJSONReporterOutput.ts --->

</details>

## Settings

Possible settings:

- `outFile` (default: stdout) - path for JSON file to emit
- `verbose` (default: false) - enable saving of execution logs
- `debug` (default: false) - enable saving of debug logs
- `progress` (default: false) - enable saving of file progress logs

<details>
<summary>Reporter Settings</summary>

<!--- @@inject: src/CodeTypoJSONReporterSettings.ts --->

```ts
/**
 * CodeTypo-json-reporter settings type definition
 */
export type CodeTypoJSONReporterSettings = {
  /**
   * Path to the output file.
   *
   * Relative paths are relative to the current working directory.
   *
   * Special values:
   * - `stdout` - write the JSON to `stdout`.
   * - `stderr` - write the JSON to `stderr`.
   *
   * @default stdout
   */
  outFile?: string;
  /**
   * Add more information about the files being checked and the configuration
   * @default false
   */
  verbose?: boolean;
  /**
   * Add information useful for debugging codetypo.json files
   * @default false
   */
  debug?: boolean;
  /**
   * Add progress messages
   * @default false
   */
  progress?: boolean;
};
```

<!--- @@inject-end: src/CodeTypoJSONReporterSettings.ts --->

</details>
