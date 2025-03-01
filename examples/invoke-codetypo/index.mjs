import { lint } from 'codetypo';

await lint(['.'], {
    progress: true,
    summary: true,
    // progress: false,
    // summary: false,
    // wordsOnly: true,
    // config: './codetypo.config.yaml',
});
