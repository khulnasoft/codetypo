import { describe, expect, test, vi } from 'vitest';

import { CodeTypoConfigFileReaderWriterImpl } from './CodeTypoConfigFileReaderWriter.js';
import { createReaderWriter } from './createReaderWriter.js';
import type { IO } from './IO.js';
import { defaultDeserializers } from './serializers/index.js';

describe('createReaderWriter', () => {
    test('createReaderWriter default', () => {
        expect(createReaderWriter()).toBeInstanceOf(CodeTypoConfigFileReaderWriterImpl);
    });

    test('createReaderWriter', () => {
        const io: IO = {
            readFile: vi.fn(),
            writeFile: vi.fn(),
        };
        const rw = createReaderWriter(undefined, undefined, io);
        expect(rw).toBeInstanceOf(CodeTypoConfigFileReaderWriterImpl);
        expect(rw.middleware).toHaveLength(defaultDeserializers.length);
    });
});
