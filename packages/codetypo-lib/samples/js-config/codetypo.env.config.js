'use strict';

/** @type { import("@codetypo/codetypo-types").CodeTypoUserSettings } */
const codetypo = {
    description: 'Example config using environment variables.',
    dictionaryDefinitions: [
        {
            name: 'repo-dict',
            path: `${process.env['GITHUB_WORKSPACE']}/.github/etc/dictionary.txt`,
        },
    ],
    dictionaries: ['repo-dict'],
};

module.exports = codetypo;
