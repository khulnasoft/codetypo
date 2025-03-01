import type { ServiceRequestFactoryRequestType } from '@codetypo/codetypo-service-bus';
import { requestFactory } from '@codetypo/codetypo-service-bus';

import type { Stats } from '../models/index.js';

const RequestTypeStat = 'fs:stat' as const;
interface RequestStatParams {
    readonly url: URL;
}
export const RequestFsStat = requestFactory<typeof RequestTypeStat, RequestStatParams, Promise<Stats>>(RequestTypeStat);
export type RequestFsStat = ServiceRequestFactoryRequestType<typeof RequestFsStat>;

const RequestTypeStatSync = 'fs:statSync' as const;
export const RequestFsStatSync = requestFactory<typeof RequestTypeStatSync, RequestStatParams, Stats>(
    RequestTypeStatSync,
);
export type RequestFsStatSync = ServiceRequestFactoryRequestType<typeof RequestFsStatSync>;
