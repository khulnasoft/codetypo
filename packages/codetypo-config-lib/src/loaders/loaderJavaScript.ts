import { extname } from 'node:path/posix';

import type { CodeTypoConfigFile } from '../CodeTypoConfigFile.js';
import { CodeTypoConfigFileJavaScript } from '../CodeTypoConfigFile/CodeTypoConfigFileJavaScript.js';
import type { FileLoaderMiddleware, LoaderNext, LoadRequest } from '../FileLoader.js';

type Log = typeof console.log;

const _debug = false;
const _log: Log = _debug ? console.warn.bind(console) : () => undefined;

async function importJavaScript(url: URL, hashSuffix: number | string): Promise<CodeTypoConfigFileJavaScript> {
    try {
        const _url = new URL(url.href);
        _url.hash = `${_url.hash};loaderSuffix=${hashSuffix}`;
        _log('importJavaScript: %o', { url: _url.href });
        const result = await import(_url.href);
        const settingsOrFunction = await (result.default ?? result);
        const settings = typeof settingsOrFunction === 'function' ? await settingsOrFunction() : settingsOrFunction;
        return new CodeTypoConfigFileJavaScript(url, settings);
    } catch (e) {
        _log('importJavaScript Error: %o', { url: url.href, error: e, hashSuffix });
        throw e;
    } finally {
        _log('importJavaScript Done: %o', { url: url.href, hashSuffix });
    }
}

export class LoaderJavaScript implements FileLoaderMiddleware {
    private hashSuffix = 1;

    async _load(req: LoadRequest, next: LoaderNext): Promise<CodeTypoConfigFile> {
        const { url } = req;
        const ext = extname(url.pathname).toLowerCase();

        switch (ext) {
            case '.js':
            case '.cjs':
            case '.mjs': {
                return importJavaScript(url, this.hashSuffix);
            }
        }
        return next(req);
    }

    load = this._load.bind(this);

    reset(): void {
        this.hashSuffix += 1;
    }
}

export const loaderJavaScript = new LoaderJavaScript();
