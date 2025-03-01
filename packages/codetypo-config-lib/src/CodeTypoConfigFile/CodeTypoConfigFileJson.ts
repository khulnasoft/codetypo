import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { parse, stringify } from 'comment-json';

import { ImplCodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import { detectIndent } from '../serializers/util.js';
import type { TextFile } from '../TextFile.js';

export class CodeTypoConfigFileJson extends ImplCodeTypoConfigFile {
    public indent: string | number = 2;

    constructor(
        readonly url: URL,
        readonly settings: CodeTypoSettings,
    ) {
        super(url, settings);
    }

    serialize() {
        return stringify(this.settings, undefined, this.indent) + '\n';
    }

    public static parse(file: TextFile): CodeTypoConfigFileJson {
        try {
            const codetypo: CodeTypoSettings | unknown = parse(file.content);
            if (!isCodeTypoSettings(codetypo)) {
                throw new ParseError(file.url);
            }

            const indent = detectIndent(file.content);
            const cfg = new CodeTypoConfigFileJson(file.url, codetypo);
            cfg.indent = indent;
            return cfg;
        } catch (cause) {
            if (cause instanceof ParseError) {
                throw cause;
            }
            throw new ParseError(file.url, undefined, { cause });
        }
    }
}

export function parseCodeTypoConfigFileJson(file: TextFile): CodeTypoConfigFileJson {
    return CodeTypoConfigFileJson.parse(file);
}

function isCodeTypoSettings(cfg: unknown): cfg is CodeTypoSettings {
    return !(!cfg || typeof cfg !== 'object' || Array.isArray(cfg));
}

class ParseError extends Error {
    constructor(
        readonly url: URL,
        message?: string,
        options?: ErrorOptions,
    ) {
        super(message || `Unable to parse ${url}`, options);
    }
}
