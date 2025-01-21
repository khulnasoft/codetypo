import type { CodeTypoConfigFile, ICodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import { CodeTypoConfigFileYaml, parseCodeTypoConfigFileYaml } from '../CodeTypoConfigFile/CodeTypoConfigFileYaml.js';
import type { DeserializerNext, DeserializerParams, SerializerMiddleware, SerializerNext } from '../Serializer.js';

function deserializer(params: DeserializerParams, next: DeserializerNext): CodeTypoConfigFile {
    if (!isYamlFile(params.url.pathname)) return next(params);

    return parseCodeTypoConfigFileYaml(params);
}

function isYamlFile(pathname: string) {
    pathname = pathname.toLowerCase();
    return pathname.endsWith('.yml') || pathname.endsWith('.yaml');
}

function serializer(settings: ICodeTypoConfigFile, next: SerializerNext): string {
    if (!(settings instanceof CodeTypoConfigFileYaml)) return next(settings);
    return settings.serialize();
}

export const serializerCodeTypoYaml: SerializerMiddleware = { deserialize: deserializer, serialize: serializer };
