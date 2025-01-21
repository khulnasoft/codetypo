import type { FeatureFlags } from 'codetypo-lib';
import { getSystemFeatureFlags } from 'codetypo-lib';

import { console } from '../console.js';

export function getFeatureFlags(): FeatureFlags {
    return getSystemFeatureFlags();
}

export function parseFeatureFlags(flags: string[] | undefined, featureFlags = getFeatureFlags()): FeatureFlags {
    if (!flags) return featureFlags;

    const flagsKvP = flags.map((f) => f.split(':', 2));

    for (const flag of flagsKvP) {
        const [name, value] = flag;
        try {
            featureFlags.setFlag(name, value);
        } catch {
            console.warn(`Unknown flag: "${name}"`);
        }
    }

    return featureFlags;
}
