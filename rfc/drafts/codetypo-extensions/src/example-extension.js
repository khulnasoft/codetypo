/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check
export const name = 'name of extension';
/**
 * @param {import("./types.ts").Context} context
 * @param {unknown[]} params
 * @returns {Promise<import("@codetypo/codetypo-types").CodeTypoUserSettings>}
 */
export default async function getConfiguration(context, params) {
    return {
        name,
    };
}
