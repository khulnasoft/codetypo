'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./.pnp.cjs').setup();

/** @type { import("@codetypo/codetypo-types").CodeTypoUserSettings } */
const codetypo = {
    description: 'Make codetypo Yarn 2 PNP aware',
    import: ['@codetypo/dict-scientific-terms-us/codetypo-ext.json'],
};

module.exports = codetypo;
