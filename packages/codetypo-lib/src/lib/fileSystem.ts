import type { TextEncoding, VFileSystemProvider } from 'codetypo-io';
import { getDefaultVirtualFs } from 'codetypo-io';

export type { VFileSystemProvider, VfsDirEntry, VirtualFS } from 'codetypo-io';
export { FSCapabilityFlags, VFileSystem } from 'codetypo-io';

export function getVirtualFS() {
    return getDefaultVirtualFs();
}

export function getFileSystem() {
    return getVirtualFS().fs;
}

export function registerCodeTypo(fsp: VFileSystemProvider) {
    const vfs = getVirtualFS();
    vfs.registerFileSystemProvider(fsp);
}

export async function readTextFile(url: URL, encoding: TextEncoding = 'utf8'): Promise<string> {
    const file = await getFileSystem().readFile(url, encoding);
    return file.getText();
}
