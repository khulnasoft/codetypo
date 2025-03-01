import { dynamicImport } from '@codetypo/dynamic-import';

export function getPipes(): Promise<typeof import('@codetypo/codetypo-pipe')> {
    return dynamicImport('@codetypo/codetypo-pipe', __dirname);
}
