// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.nightOwlLight;
const darkCodeTheme = require("prism-react-renderer").themes.nightOwl;
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Think and Do",
  tagline: "Empoered with knowledge",
  url: "https://gong.host",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "visualDust",
  projectName: "blog.gong.host", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.dev/visualDust/gavin.gong.host/blob/master/",
          remarkPlugins: [math],
          rehypePlugins: [[katex, { strict: false }]],
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.dev/visualDust/gavin.gong.host/blob/master/",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          blogTitle: "Blogs",
          blogDescription: "Gavin's blog posts",
          remarkPlugins: [math],
          rehypePlugins: [[katex, { strict: false }]],
        },
        gtag: {
          trackingID: "G-8L21D1SXCL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://fastly.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  plugins: [require.resolve("docusaurus-plugin-image-zoom")],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Gavin Gong",
        logo: {
          alt: "Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/blog",
            label: "Blogs",
            position: "left",
          },
          {
            to: "/blog/archive",
            label: "Archive",
            position: "left",
          },
          {
            href: "/about",
            label: "About",
            position: "right",
          },
          {
            href: "/links",
            label: "Friends",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Pages",
            items: [
              {
                label: "Blogs",
                to: "/blog",
              },
              {
                label: "NEETBox",
                to: "https://neetbox.550w.host",
              },
              {
                label: "ml.akasaki.space",
                to: "https://ml.akasaki.space",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Home of Wolfpack",
                href: "https://www.ncsu.edu/spirit-and-traditions/wolfpack-nickname/",
              },
              {
                label: "Sanyuan Kexie",
                href: "https://hello.kexie.space",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Github",
                href: "https://github.com/VisualDust",
              },
              {
                label: "Powered by docusaurus",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `@VisualDust ${new Date().getFullYear()} all rights reserved | <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2021025239号</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultMode: "dark",
      },
      zoom: {
        selector: ".markdown :not(em) > img",
        config: {
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
        },
      },
    }),
};

module.exports = config;
