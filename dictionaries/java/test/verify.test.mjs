import { checkSnapshots } from 'codetypo-dict-file-checker/index.mjs';

const testFiles = ['samples/**/*.java'];

checkSnapshots(testFiles);
