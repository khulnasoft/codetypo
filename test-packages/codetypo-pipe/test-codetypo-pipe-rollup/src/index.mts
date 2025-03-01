import { reduce } from '@codetypo/codetypo-pipe/sync';

export function sumValues(numbers: Iterable<number>): number {
    return reduce(numbers, (a, b) => a + b, 0);
}
