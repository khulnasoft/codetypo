import type { CodeTypoConfigFileReference, ICodeTypoConfigFile } from './CodeTypoConfigFile.js';

export interface ConfigReadWriteHandler {
    read(
        ref: CodeTypoConfigFileReference,
        next: (ref: CodeTypoConfigFileReference) => Promise<ICodeTypoConfigFile>,
    ): Promise<ICodeTypoConfigFile>;
    write?: (
        configFile: ICodeTypoConfigFile,
        next: (configFile: ICodeTypoConfigFile) => Promise<CodeTypoConfigFileReference>,
    ) => Promise<CodeTypoConfigFileReference>;
}
