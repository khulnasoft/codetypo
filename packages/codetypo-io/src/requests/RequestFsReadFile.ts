import type { ServiceRequestFactoryRequestType } from '@codetypo/codetypo-service-bus';
import { requestFactory } from '@codetypo/codetypo-service-bus';

import type { FileResourceRequest, TextFileResource } from '../models/FileResource.js';

const RequestType = 'fs:readFile' as const;
type RequestParams = FileResourceRequest;

export const RequestFsReadFile = requestFactory<typeof RequestType, RequestParams, Promise<TextFileResource>>(
    RequestType,
);
export type RequestFsReadFile = ServiceRequestFactoryRequestType<typeof RequestFsReadFile>;
