import type { CodeTypoSettings } from '@codetypo/codetypo-types';

export interface CodeTypoConfigFileReference {
    readonly url: URL;
}

export interface ICodeTypoConfigFile {
    /**
     * The url of the config file, used to resolve imports.
     */
    readonly url: URL;
    /**
     * The settings from the config file.
     */
    readonly settings: CodeTypoSettings;
    /**
     * Indicate that the config file is readonly.
     */
    readonly?: boolean;
    /**
     * Indicate that the config file is virtual and not associated with a file on disk.
     */
    virtual?: boolean;
    /**
     * Indicate that the config file is remote and not associated with a file on disk.
     */
    remote?: boolean;
}

export abstract class CodeTypoConfigFile implements ICodeTypoConfigFile {
    constructor(readonly url: URL) {}

    abstract readonly settings: CodeTypoSettings;
    abstract addWords(words: string[]): this;

    get readonly(): boolean {
        return this.settings.readonly || this.url.protocol !== 'file:';
    }

    get virtual(): boolean {
        return false;
    }

    get remote(): boolean {
        return this.url.protocol !== 'file:';
    }
}

export abstract class ImplCodeTypoConfigFile extends CodeTypoConfigFile {
    constructor(
        readonly url: URL,
        readonly settings: CodeTypoSettings,
    ) {
        super(url);
    }

    addWords(words: string[]): this {
        if (this.readonly) throw new Error(`Config file is readonly: ${this.url.href}`);
        const w = this.settings.words || [];
        this.settings.words = w;
        addUniqueWordsToListAndSort(w, words);
        return this;
    }
}

/**
 * Adds words to a list, sorts the list and makes sure it is unique.
 * Note: this method is used to try and preserve comments in the config file.
 * @param list - list to be modified
 * @param toAdd - words to add
 */
function addUniqueWordsToListAndSort(list: string[], toAdd: string[]): void {
    list.unshift(...toAdd);
    list.sort();
    for (let i = 1; i < list.length; ++i) {
        if (list[i] === list[i - 1]) {
            list.splice(i, 1);
            --i;
        }
    }
}

export function satisfiesCodeTypoConfigFile(obj: unknown): obj is ICodeTypoConfigFile {
    const r: boolean =
        obj instanceof CodeTypoConfigFile ||
        (!!obj &&
            typeof obj === 'object' &&
            'url' in obj &&
            obj.url instanceof URL &&
            'settings' in obj &&
            !!obj.settings &&
            typeof obj.settings === 'object');
    return r;
}

export const __testing__ = {
    addUniqueWordsToListAndSort,
};
