import { operators } from '@codetypo/codetypo-pipe';

export {
    helpers as asyncHelpers,
    toArray as asyncIterableToArray,
    operators as asyncOperators,
    pipeAsync as asyncPipe,
    toAsyncIterable as mergeAsyncIterables,
} from '@codetypo/codetypo-pipe';

export const {
    opMapAsync: asyncMap,
    opFilterAsync: asyncFilter,
    opAwaitAsync: asyncAwait,
    opFlattenAsync: asyncFlatten,
} = operators;
