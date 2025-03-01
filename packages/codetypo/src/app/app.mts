import type { Command } from 'commander';
import { Option as CommanderOption, program } from 'commander';
import { satisfies as semverSatisfies } from 'semver';

import { commandCheck } from './commandCheck.js';
import { commandLink } from './commandLink.js';
import { commandLint } from './commandLint.js';
import { commandSuggestion } from './commandSuggestion.js';
import { commandTrace } from './commandTrace.js';
import { npmPackage } from './pkgInfo.js';
import { ApplicationError } from './util/errors.js';

export { LinterCliOptions as Options } from './options.js';
export { ApplicationError, CheckFailed } from './util/errors.js';

export async function run(command?: Command, argv?: string[]): Promise<void> {
    const prog = command || program;
    const args = argv || process.argv;

    prog.exitOverride();

    prog.version(npmPackage.version).description('Spelling Checker for Code').name('codetypo');

    if (!semverSatisfies(process.versions.node, npmPackage.engines.node)) {
        throw new ApplicationError(
            `Unsupported NodeJS version (${process.versions.node}); ${npmPackage.engines.node} is required`,
        );
    }

    const optionFlags = new CommanderOption('-f,--flag <flag:value>', 'Declare an execution flag value')
        .hideHelp()
        .argParser((value: string, prev: undefined | string[]) => prev?.concat(value) || [value]);

    commandLint(prog).addOption(optionFlags);
    commandTrace(prog).addOption(optionFlags);
    commandCheck(prog).addOption(optionFlags);
    commandSuggestion(prog).addOption(optionFlags);
    commandLink(prog);

    /*
        program
            .command('init')
            .description('(Alpha) Initialize a codetypo.json file.')
            .option('-o, --output <codetypo.json>', 'define where to write file.')
            .option('--extends <codetypo.json>', 'extend an existing codetypo.json file.')
            .action((options: InitOptions) => {
                showHelp = false;
                CodeTypoApplication.createInit(options).then(
                    () => process.exit(0),
                    () => process.exit(1)
                );
                console.log('Init');
            });
    */

    prog.exitOverride();
    await prog.parseAsync(args);
}
