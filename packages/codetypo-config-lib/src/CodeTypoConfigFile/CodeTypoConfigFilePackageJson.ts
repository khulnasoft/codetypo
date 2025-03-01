import type { CodeTypoSettings } from '@codetypo/codetypo-types';

import { ImplCodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import type { SerializeSettingsFn } from '../Serializer.js';
import { detectIndent } from '../serializers/util.js';
import type { TextFile } from '../TextFile.js';

export class CodeTypoConfigFilePackageJson extends ImplCodeTypoConfigFile {
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

export function parseCodeTypoConfigFilePackageJson(file: TextFile): CodeTypoConfigFilePackageJson {
    const { url, content } = file;
    const packageJson = JSON.parse(content);
    if (!packageJson || typeof packageJson !== 'object' || Array.isArray(packageJson)) {
        throw new Error(`Unable to parse ${url}`);
    }
    packageJson['codetypo'] = packageJson['codetypo'] || {};
    const codetypo = packageJson['codetypo'];
    if (typeof codetypo !== 'object' || Array.isArray(codetypo)) {
        throw new TypeError(`Unable to parse ${url}`);
    }

    const indent = detectIndent(content);

    function serialize(settings: CodeTypoSettings) {
        packageJson['codetypo'] = settings;
        return JSON.stringify(packageJson, undefined, indent) + '\n';
    }

    return new CodeTypoConfigFilePackageJson(url, codetypo, serialize);
}
