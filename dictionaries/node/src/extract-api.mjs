
/**
 * This script tries to extract word relevant to the NodeJS API into a text file that
 * can be used to generate a dictionary file.
 *
 * It is designed to scan the markdown files used to document the Node API and extract
 * text between the back ticks ``
 *
 * It reads all files given on the command line into a single text file.
 *
 * Note: this script doesn't try to be perfect. The goal is to get a good representation of
 * the API while trying to avoid any misspellings that might be in the general text.
 *
 */

import { readFileSync, writeFileSync } from 'node:fs';

function processFile(file) {
    const content = readFileSync(file, 'utf8');
    const words = extract(content);
    return `
# From ${file}

${words}
`;
}

function processFiles(files) {
    const fileContents = [];
    for (const file of files) {
        fileContents.push(processFile(file));
    }

    const content = fileContents.join('\n') + '\n';

    writeFileSync('src/node.txt', content);
}

/**
 * @param {string} content
 */
function extract(content) {
    const regexpCodeBlock = /(```)[\s\S]+?\1/g;
    const regexpMetaData = /<!--[\s\S]+?-->/g;
    const regexpUnicode = /U\+[0-9A-F]{4}|0x[0-9A-F]{2,4}/gi;

    let text = content;
    text = text.replaceAll('\r\n', '\n');
    text = text.replaceAll('\r', '\n');

    // Ignore example code blocks
    text = text.replaceAll(regexpCodeBlock, '');

    // Ignore Document Mega Data
    text = text.replaceAll(regexpMetaData, '');

    // Remove Unicode
    text = text.replaceAll(regexpUnicode, '');

    text = text
        .split('\n')
        .map((text) => text.replace(/<code>(.*)<\/code>/, '`$&`'))
        .map((text) => text.replaceAll(/^[^`]+$/gm, ''))
        .map((text) => text.replaceAll(/[^`]*`([^`]*)`[^`\n]*/gm, '<<<$1>>>\n'))
        .join('\n');

    text = text
        .split('\n')
        .filter((text) => text.match(/<<<(.*?)>>>/))
        .map((text) => text.replaceAll(/^[^A-Z]*$/gim, ''))
        .map((text) => text.replaceAll(/[#']+/g, ' '))
        .map((text) => text.replace(/.*?<<<(.*?)>>>.*?/, '$1'))
        .map((text) => text.trim())
        .filter((t) => !!t)
        .sort()
        .join('\n');

    // Remove duplicate lines
    text = text.replaceAll(/(.*\n)\1+/g, '$1');

    return text;
}

processFiles(process.argv.slice(2));
