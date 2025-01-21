import type { SerializerMiddleware } from '../Serializer.js';
import { serializerCodeTypoJson } from './codetypoJson.js';
import { serializerCodeTypoYaml } from './codetypoYaml.js';
import { serializerPackageJson } from './packageJson.js';

export const defaultDeserializers: SerializerMiddleware[] = [
    serializerCodeTypoJson,
    serializerCodeTypoYaml,
    serializerPackageJson,
];
