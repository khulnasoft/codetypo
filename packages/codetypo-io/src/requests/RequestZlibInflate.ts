import type { ServiceRequestFactoryRequestType } from '@codetypo/codetypo-service-bus';
import { requestFactory } from '@codetypo/codetypo-service-bus';

const RequestType = 'zlib:inflate' as const;
interface RequestParams {
    readonly data: ArrayBufferView;
}
export const RequestZlibInflate = requestFactory<typeof RequestType, RequestParams, ArrayBufferView>(RequestType);
export type RequestZlibInflate = ServiceRequestFactoryRequestType<typeof RequestZlibInflate>;
