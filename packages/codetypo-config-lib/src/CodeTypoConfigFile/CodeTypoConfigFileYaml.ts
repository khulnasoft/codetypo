import type { CodeTypoSettings } from '@codetypo/codetypo-types';
import { parse, stringify } from 'yaml';

import { ImplCodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import type { SerializeSettingsFn } from '../Serializer.js';
import { detectIndentAsNum } from '../serializers/util.js';
import type { TextFile } from '../TextFile.js';

export class CodeTypoConfigFileYaml extends ImplCodeTypoConfigFile {
    constructor(
        readonly url: URL,
        readonly settings: CodeTypoSettings,
        readonly serializer: SerializeSettingsFn,
    ) {
        super(url, settings);
    }

    serialize() {
        return this.serializer(this.settings);
    }
}

export function parseCodeTypoConfigFileYaml(file: TextFile): CodeTypoConfigFileYaml {
    const { url, content } = file;

    const codetypo = parse(content) || {};
    if (!codetypo || typeof codetypo !== 'object' || Array.isArray(codetypo)) {
        throw new Error(`Unable to parse ${url}`);
    }

    const indent = detectIndentAsNum(content);

    function serialize(settings: CodeTypoSettings) {
        return stringify(settings, { indent });
    }

    return new CodeTypoConfigFileYaml(url, codetypo, serialize);
}
