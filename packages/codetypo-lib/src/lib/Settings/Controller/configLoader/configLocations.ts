const supportedExtensions = ['.json', '.jsonc', '.yaml', '.yml', '.mjs', '.cjs', '.js'];

/**
 * Logic of the locations:
 * - Support backward compatibility with the VS Code Spell Checker
 *   the spell checker extension can only write to `.json` files because
 *   it would be too difficult to automatically modify a `.js` or `.cjs` file.
 * - To support `codetypo.config.js` in a VS Code environment, have a `codetypo.json` import
 *   the `codetypo.config.js`.
 */
const setOfLocations = new Set([
    'package.json',
    // Original locations
    '.codetypo.json',
    'codetypo.json',
    '.codeTypo.json',
    'codeTypo.json',
    // Original locations jsonc
    '.codetypo.jsonc',
    'codetypo.jsonc',
    // Alternate locations
    '.vscode/codetypo.json',
    '.vscode/codeTypo.json',
    '.vscode/.codetypo.json',
    // Standard Locations
    '.codetypo.config.json',
    '.codetypo.config.jsonc',
    '.codetypo.config.yaml',
    '.codetypo.config.yml',
    'codetypo.config.json',
    'codetypo.config.jsonc',
    'codetypo.config.yaml',
    'codetypo.config.yml',
    // Dynamic config is looked for last
    ...genCfgLoc('codetypo.config', supportedExtensions),
    ...genCfgLoc('.codetypo.config', supportedExtensions),
    // .config
    '.codetypo.yaml',
    '.codetypo.yml',
    'codetypo.yaml',
    'codetypo.yml',
    '.config/.codetypo.json',
    '.config/codetypo.json',
    '.config/.codeTypo.json',
    '.config/codeTypo.json',
    '.config/.codetypo.jsonc',
    '.config/codetypo.jsonc',
    ...genCfgLoc('.config/codetypo.config', supportedExtensions),
    ...genCfgLoc('.config/.codetypo.config', supportedExtensions),
    '.config/codetypo.yaml',
    '.config/codetypo.yml',
]);

export const searchPlaces = Object.freeze([...setOfLocations]);

export const defaultConfigFilenames = Object.freeze([...searchPlaces]);

function genCfgLoc(filename: string, extensions: string[]) {
    return extensions.map((ext) => filename + ext);
}
