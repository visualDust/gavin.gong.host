// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Akasaki Focusing",
  tagline: "Empoered learning life",
  url: "https://focus.akasaki.space",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "visualDust", // Usually your GitHub org/user name.
  projectName: "focus.akasaki.space", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/visualDust/focus.akasaki.space/edit/master/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/visualDust/focus.akasaki.space/edit/master/",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
        translations: {
          search_placeholder: "Search",
          see_all_results: "See all results",
          no_results: "No results.",
          search_results_for: 'Search results for "{{ keyword }}"',
          search_the_documentation: "Search the documentation",
          count_documents_found: "{{ count }} document found",
          count_documents_found_plural: "{{ count }} documents found",
          no_documents_were_found: "No documents were found",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Akasaki Focusing",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/blog/tags", label: "Blogs", position: "left" },
          {
            href: "https://ml.akasaki.space",
            label: "Machine Learning Part",
            position: "left",
          },
          {
            href: "/about",
            label: "About & Links",
            position: "right",
          },
          {
            href: "https://github.com/VisualDust",
            label: "Me on GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documents",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "NEET CV",
                href: "https://github.com/neet-cv",
              },
              {
                label: "sanyuankexie",
                href: "https://github.com/sanyuankexie",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "ml.akasaki.space",
                to: "https://ml.akasaki.space",
              },
              {
                label: "See me on Github",
                href: "https://github.com/VisualDust",
              },
              {
                label: "Powered by docusaurus",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `${new Date().getFullYear()}  @VisualDust (aka ${() => {
          return "Miya Akasaki";
        }} aka ${() => {
          return "Gavin Gong";
        }}).`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
