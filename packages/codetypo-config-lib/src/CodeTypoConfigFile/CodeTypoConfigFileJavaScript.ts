import type { CodeTypoSettings } from '@codetypo/codetypo-types';

import { ImplCodeTypoConfigFile } from '../CodeTypoConfigFile.js';

export class CodeTypoConfigFileJavaScript extends ImplCodeTypoConfigFile {
    get readonly(): boolean {
        return true;
    }

    constructor(
        readonly url: URL,
        readonly settings: CodeTypoSettings,
    ) {
        super(url, settings);
    }

    addWords(_words: string[]): this {
        throw new Error('Unable to add words to a JavaScript config file.');
    }
}
