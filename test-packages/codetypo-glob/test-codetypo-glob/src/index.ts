import { resolve } from 'node:path';

import * as glob from 'codetypo-glob';

export function run(filename: string) {
    return glob.fileOrGlobToGlob(filename, resolve('.')).glob;
}
