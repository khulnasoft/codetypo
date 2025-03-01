import { getDefaultCodeTypoIO } from '../CodeTypoIONode.js';
import { toError } from '../errors/index.js';
import type { BufferEncoding } from '../models/BufferEncoding.js';
import type { Stats } from '../models/index.js';

export async function readFileText(filename: string | URL, encoding?: BufferEncoding): Promise<string> {
    const fr = await getDefaultCodeTypoIO().readFile(filename, encoding);
    return fr.getText();
}

export function readFileTextSync(filename: string | URL, encoding?: BufferEncoding): string {
    return getDefaultCodeTypoIO().readFileSync(filename, encoding).getText();
}

export async function getStat(filenameOrUri: string): Promise<Stats | Error> {
    try {
        return await getDefaultCodeTypoIO().getStat(filenameOrUri);
    } catch (e) {
        return toError(e);
    }
}

export function getStatSync(filenameOrUri: string): Stats | Error {
    try {
        return getDefaultCodeTypoIO().getStatSync(filenameOrUri);
    } catch (e) {
        return toError(e);
    }
}
