import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';

const config: Config = {
    title: 'CodeTypo',
    tagline: 'A spell checker for code!',
    favicon: 'img/favicon.ico',
    staticDirectories: ['public', 'static'],

    // Set the production url of your site here
    url: 'https://codetypo.org',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/docsV2/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'khulnasoft', // Usually your GitHub org/user name.
    projectName: 'codetypo', // Usually your repo name.

    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    plugins: [
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-codetypo-types',
                out: './docs/api/codetypo-types',
                entryPoints: ['../packages/codetypo-types/src/index.ts'],
                tsconfig: '../packages/codetypo-types/tsconfig.json',
                // outputFileStrategy: 'modules',
                fileExtension: '.md',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-codetypo-lib',
                out: './docs/api/codetypo-lib',
                entryPoints: ['../packages/codetypo-lib/src/lib/index.ts'],
                tsconfig: '../packages/codetypo-lib/tsconfig.json',
                // outputFileStrategy: 'modules',
                fileExtension: '.md',
            },
        ],
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'api-codetypo',
                out: './docs/api/codetypo',
                entryPoints: ['../packages/codetypo/src/app/index.mts'],
                tsconfig: '../packages/codetypo/tsconfig.json',
                // outputFileStrategy: 'modules',
                fileExtension: '.md',
            },
        ],
        // [
        //     'docusaurus-plugin-typedoc',
        //     {
        //         id: 'api-codetypo-trie-lib',
        //         out: './docs/api/codetypo-trie-lib',
        //         entryPoints: ['../packages/codetypo-trie-lib/src/lib/index.ts'],
        //         tsconfig: '../packages/codetypo-trie-lib/tsconfig.json',
        //         // outputFileStrategy: 'modules',
        //         fileExtension: '.md',
        //     },
        // ],
    ],

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/khulnasoft/codetypo/tree/main/website/docs',
                    remarkPlugins: [npm2yarn],
                },
                // blog: {
                //   showReadingTime: true,
                //   // Please change this to your repo.
                //   // Remove this to remove the "edit this page" links.
                //   editUrl:
                //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                // },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        // image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: 'CodeTypo',
            logo: {
                alt: 'Street Side Software Logo',
                src: 'img/logo.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                { to: '/about', label: 'About', position: 'left' },
                { label: 'Street Side Software', href: 'https://khulnasoft.com', position: 'right' },
                // {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/khulnasoft/codetypo',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            // links: [
            //     {
            //         title: 'Docs',
            //         items: [
            //             {
            //                 label: 'Tutorial',
            //                 to: '/docs/intro',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Community',
            //         items: [
            //             {
            //                 label: 'Stack Overflow',
            //                 href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            //             },
            //             {
            //                 label: 'Discord',
            //                 href: 'https://discordapp.com/invite/docusaurus',
            //             },
            //             {
            //                 label: 'Twitter',
            //                 href: 'https://twitter.com/docusaurus',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'More',
            //         items: [
            //             {
            //                 label: 'Blog',
            //                 to: '/blog',
            //             },
            //             {
            //                 label: 'GitHub',
            //                 href: 'https://github.com/facebook/docusaurus',
            //             },
            //         ],
            //     },
            // ],
            copyright: `Copyright © ${new Date().getFullYear()} Street Side Software`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['json', 'json5', 'bash'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
