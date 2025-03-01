import { readFileText } from 'codetypo-io';

export function run(file: string) {
    return read(file);
}

export function read(name: string): Promise<string> {
    return readFileText(name);
}
