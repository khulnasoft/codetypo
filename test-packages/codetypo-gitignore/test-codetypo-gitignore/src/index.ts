import { GitIgnore } from 'codetypo-gitignore';

const gitIgnore = new GitIgnore();

export function run(filename: string) {
    return gitIgnore.isIgnored(filename);
}
