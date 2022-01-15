// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Akasaki Focusing',
  tagline: 'Empoered learning life',
  url: 'https://focus.akasaki.space',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'visualDust', // Usually your GitHub org/user name.
  projectName: 'focus.akasaki.space', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //todo
          editUrl: 'https://github.com/visualDust/focus.akasaki.space/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/visualDust/focus.akasaki.space/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Akasaki Focusing',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blogs', position: 'left'},
          {
            href: 'https://ml.akasaki.space',
            label: 'MechineLearning Part',
            position: 'left',
          },
          {
            href: '/about',
            label: 'About & Links',
            position: 'right',
          },
          {
            href: 'https://github.com/VisualDust',
            label: 'Me on GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documents',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'NEET CV',
                href: 'https://github.com/neet-cv',
              },
              {
                label: 'sanyuankexie',
                href: 'https://github.com/sanyuankexie',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'ml.akasaki.space',
                to: 'https://ml.akasaki.space',
              },
              {
                label: 'See me on Github',
                href: 'https://github.com/VisualDust',
              },
              {
                label: 'Powered by docusaurus',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `${new Date().getFullYear()}  @VisualDust (aka ${()=>{return "Miya Akasaki"}} aka ${()=>{return "Gavin Gong"}}).`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
