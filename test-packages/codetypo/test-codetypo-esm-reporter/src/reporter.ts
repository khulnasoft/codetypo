import type { CodeTypoReporter, CodeTypoReporterConfiguration, Issue } from 'codetypo';

export function getReporter(settings: unknown, config: CodeTypoReporterConfiguration): CodeTypoReporter {
    const issues: Issue[] = [];

    const { console: _console, ...cfg } = config;

    const console = _console ?? globalThis.console;

    console.log(`Settings: %o\nOptions: %o`, settings, cfg);

    return {
        issue: (issue) => issues.push(issue),
        result: (result) => {
            for (const issue of issues) {
                console.log(`Issue:\t"${issue.text}"\t${issue.row}\t${issue.col}`);
            }
            console.log('%o', result);
        },
    };
}
