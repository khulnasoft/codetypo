import type { CodeTypoConfigFile, ICodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import {
    CodeTypoConfigFilePackageJson,
    parseCodeTypoConfigFilePackageJson,
} from '../CodeTypoConfigFile/CodeTypoConfigFilePackageJson.js';
import type { DeserializerNext, DeserializerParams, SerializerMiddleware, SerializerNext } from '../Serializer.js';

const isSupportedFormat = /\bpackage\.json$/i;

function deserializer(params: DeserializerParams, next: DeserializerNext): CodeTypoConfigFile {
    if (!isSupportedFormat.test(params.url.pathname)) return next(params);

    return parseCodeTypoConfigFilePackageJson(params);
}

function serializer(settings: ICodeTypoConfigFile, next: SerializerNext): string {
    if (!(settings instanceof CodeTypoConfigFilePackageJson)) return next(settings);
    return settings.serialize();
}

export const serializerPackageJson: SerializerMiddleware = { deserialize: deserializer, serialize: serializer };
