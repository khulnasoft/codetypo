import type { Issue, TextOffset as TextOffsetRW } from '@codetypo/codetypo-types';

export interface ValidationResult extends TextOffsetRW, Pick<Issue, 'message' | 'issueType'> {
    line: TextOffsetRW;
    isFlagged?: boolean | undefined;
    isFound?: boolean | undefined;
}
