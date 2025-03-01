import { checkSnapshots } from 'codetypo-dict-file-checker/index.mjs';

const testFiles = ['samples/issue-1097.tex', 'samples/papers/**/*.tex'];

checkSnapshots(testFiles);
