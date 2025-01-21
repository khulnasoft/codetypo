#!/usr/bin/env node

import fs from 'node:fs/promises';

async function main() {
    const pkg = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const codetypoExt = JSON.parse(await fs.readFile('codetypo-ext.json', 'utf8'));

    const dicts = Object.keys(pkg.dependencies).filter((dep) => dep.startsWith('@codetypo/dict-'));
    codetypoExt.import = dicts.map((dict) => dict + `/codetypo-ext.json`).sort();
    await fs.writeFile('codetypo-ext.json', JSON.stringify(codetypoExt, null, 4) + '\n');
}

main();
