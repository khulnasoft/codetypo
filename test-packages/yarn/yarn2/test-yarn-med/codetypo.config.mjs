import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

require('./.pnp.cjs').setup();

/** @type { import("@codetypo/codetypo-types").CodeTypoUserSettings } */
const codetypo = {
    description: 'Make codetypo Yarn 2 PNP aware',
    usePnP: true,
    import: ['./codetypo.config.yaml'],
};

export default codetypo;
