import type { CodeTypoSettings } from '@codetypo/codetypo-types';

import { ImplCodeTypoConfigFile } from '../CodeTypoConfigFile.js';

export class CodeTypoConfigFileInMemory extends ImplCodeTypoConfigFile {
    constructor(
        /** A url representing where it might exist, used to resolve imports. */
        readonly url: URL,
        readonly settings: CodeTypoSettings,
    ) {
        super(url, settings);
    }

    get virtual(): boolean {
        return true;
    }
}
