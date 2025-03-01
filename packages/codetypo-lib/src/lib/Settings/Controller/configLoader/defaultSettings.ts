import { createCodeTypoSettingsInternal as csi } from '../../../Models/CodeTypoSettingsInternalDef.js';
import { currentSettingsFileVersion } from '../../constants.js';
import type { CodeTypoSettingsI } from './types.js';

export const defaultSettings: CodeTypoSettingsI = csi({
    id: 'default',
    name: 'default',
    version: currentSettingsFileVersion,
});
