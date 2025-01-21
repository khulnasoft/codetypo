import type { CodeTypoSettings } from '@codetypo/codetypo-types';

import type { CodeTypoConfigFile, ICodeTypoConfigFile } from './CodeTypoConfigFile.js';
import type { TextFile } from './TextFile.js';

export interface SerializerNext {
    (content: ICodeTypoConfigFile): string;
}

export interface SerializerReducer {
    /**
     * If a Serializer can handle a given request, it returns a CodeTypoConfigFile, otherwise it calls `next`.
     */
    (settings: ICodeTypoConfigFile, next: SerializerNext): string;
}

export type SerializeSettingsFn = (settings: CodeTypoSettings) => string;

export interface DeserializerParams extends TextFile {}

export interface DeserializerNext {
    (content: DeserializerParams): CodeTypoConfigFile;
}

export interface DeserializerReducer {
    /**
     * If a Deserializer can handle a given request, it returns a CodeTypoConfigFile, otherwise it calls `next`.
     */
    (params: DeserializerParams, next: DeserializerNext): CodeTypoConfigFile;
}

export interface SerializerMiddleware {
    serialize: SerializerReducer;
    deserialize: DeserializerReducer;
}
