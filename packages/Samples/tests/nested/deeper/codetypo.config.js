"use strict";

module.exports = /** @type {import("@codetypo/codetypo-types").FileSettings} */ ({
    language: "en-GB",
    dictionaries: ["typescript"],
    files: ["**/*.{html,js,json,md,scss,ts,vue}", "/.*.js"],
    ignorePaths: ["public/assets/", "src/ignore-me/"],
    ignoreWords: []
});
