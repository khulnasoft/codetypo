import type {
    ErrorLike,
    Issue,
    MessageType,
    ProgressFileComplete,
    ProgressItem,
    RunResult,
} from '@codetypo/codetypo-types';

export type CodeTypoJSONReporterOutput = {
    /**
     * Found spelling issues
     */
    issues: Array<Issue>;
    /**
     * CodeTypo execution logs
     */
    info?: Array<{ message: string; msgType: MessageType }>;
    /**
     * CodeTypo debug logs
     */
    debug?: Array<{ message: string }>;
    /**
     * CodeTypo error logs
     */
    error?: Array<{ message: string; error: ErrorLike }>;
    /**
     * CodeTypo file progress logs
     */
    progress?: Array<ProgressItem | ProgressFileComplete>;
    /**
     * Execution result
     */
    result: RunResult;
};
