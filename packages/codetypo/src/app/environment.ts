export interface CodeTypoEnvironmentVariables {
    /**
     * Enable logging ALL dictionary requests.
     * Acceptable values are: 'true', 'false', 't', 'f', 'on', 'off', 'yes', 'no', '1', '0'
     */
    CODETYPO_ENABLE_DICTIONARY_LOGGING?: string;
    /**
     * The path to the dictionary log file.
     */
    CODETYPO_ENABLE_DICTIONARY_LOG_FILE?: string;
    /**
     * A Csv list of fields to log.
     * Fields:
     * - time: the time the check was made in milliseconds
     * - word: the word being checked
     * - value: the result of the check
     */
    CODETYPO_ENABLE_DICTIONARY_LOG_FIELDS?: string;
    CODETYPO_GLOB_ROOT?: string;
}

export type EnvironmentKeys = keyof CodeTypoEnvironmentVariables;

type EnvironmentKeyNames = {
    [K in EnvironmentKeys]: K;
};

export const environmentKeys: EnvironmentKeyNames = {
    CODETYPO_ENABLE_DICTIONARY_LOGGING: 'CODETYPO_ENABLE_DICTIONARY_LOGGING',
    CODETYPO_ENABLE_DICTIONARY_LOG_FILE: 'CODETYPO_ENABLE_DICTIONARY_LOG_FILE',
    CODETYPO_ENABLE_DICTIONARY_LOG_FIELDS: 'CODETYPO_ENABLE_DICTIONARY_LOG_FIELDS',
    CODETYPO_GLOB_ROOT: 'CODETYPO_GLOB_ROOT',
};

export function getEnvironmentVariables(): CodeTypoEnvironmentVariables {
    return process.env as CodeTypoEnvironmentVariables;
}

export function setEnvironmentVariable<K extends EnvironmentKeys>(
    key: K,
    value: CodeTypoEnvironmentVariables[K],
): void {
    process.env[key] = value;
}

export function getEnvironmentVariable<K extends EnvironmentKeys>(key: K): CodeTypoEnvironmentVariables[K] | undefined {
    return process.env[key];
}

export function truthy(value: string | undefined): boolean {
    switch (value?.toLowerCase().trim()) {
        case 't':
        case 'true':
        case 'on':
        case 'yes':
        case '1': {
            return true;
        }
    }
    return false;
}
