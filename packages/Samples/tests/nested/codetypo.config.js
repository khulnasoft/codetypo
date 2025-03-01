"use strict";

module.exports = /** @type {import("@codetypo/codetypo-types").FileSettings} */ ({
    version: "0.2",
    language: "en-GB",
    files: ["**/*.{js,json,md}", "**/.*.js"],
    ignorePaths: ["package-lock.json"],
    ignoreWords: []
});
