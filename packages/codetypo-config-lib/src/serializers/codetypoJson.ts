import type { CodeTypoConfigFile, ICodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import { CodeTypoConfigFileJson, parseCodeTypoConfigFileJson } from '../CodeTypoConfigFile/CodeTypoConfigFileJson.js';
import type { DeserializerNext, DeserializerParams, SerializerMiddleware, SerializerNext } from '../Serializer.js';

function deserializer(params: DeserializerParams, next: DeserializerNext): CodeTypoConfigFile {
    if (!isJsonFile(params.url.pathname)) return next(params);

    return parseCodeTypoConfigFileJson(params);
}

function isJsonFile(pathname: string) {
    pathname = pathname.toLowerCase();
    return pathname.endsWith('.json') || pathname.endsWith('.jsonc');
}

function serializer(settings: ICodeTypoConfigFile, next: SerializerNext): string {
    if (!(settings instanceof CodeTypoConfigFileJson)) return next(settings);
    return settings.serialize();
}

export const serializerCodeTypoJson: SerializerMiddleware = { deserialize: deserializer, serialize: serializer };
