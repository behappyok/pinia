// @ts-check

const META_URL = 'https://pinia.esm.dev'
const META_TITLE = 'Pinia 🍍'
const META_DESCRIPTION =
  'Intuitive, type safe, light and flexible Store for Vue'
const META_IMAGE = 'https://pinia.esm.dev/social.png'

const isProduction = process.env.NODE_ENV

/**
 * @type {import('vitepress').UserConfig['head']}
 */
const productionHead = [
  [
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
      type: 'text/javascript',
    },
  ],
]

const darkModeFix = require('fs').readFileSync(
  require('path').resolve(__dirname, './darkModeFix.js'),
  'utf-8'
)

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/pinia/',
  title: 'Pinia',
  lang: 'en-US',
  description: '您将会喜欢上的Vue状态管理库 ',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: META_URL,
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: META_TITLE,
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: META_DESCRIPTION,
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: META_IMAGE,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:url',
        content: META_URL,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:title',
        content: META_TITLE,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: META_DESCRIPTION,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: META_IMAGE,
      },
    ],

    [
      'link',
      {
        rel: 'preload',
        href: '/dank-mono.css',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
      },
    ],

    ['script', {}, darkModeFix],
    ...(isProduction ? productionHead : []),
  ],

  themeConfig: {
    repo: 'posva/pinia',
    logo: '/logo.svg',
    docsDir: 'packages/docs',
    docsBranch: 'v2',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    algolia: {
      apiKey: 'd526df143dcebc3c6de61189345348d1',
      indexName: 'pinia',
    },

    carbonAds: {
      carbon: 'CEBICK3I',
      custom: 'CEBICK3M',
      placement: 'routervuejsorg',
    },

    nav: [
      { text: 'Guide', link: '/introduction.html' },
      { text: 'API', link: '/api/' },
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Discussions',
            link: 'https://github.com/posva/pinia/discussions',
          },
          {
            text: 'Chat',
            link: 'https://chat.vuejs.org',
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/posva',
          },
          {
            text: 'Changelog',
            link: 'https://github.com/posva/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      // catch-all fallback
      '/': [
        {
          text: '介绍',
          children: [
            {
              text: '什么是Pinia？',
              link: '/introduction.html',
            },
            {
              text: '入门',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: '核心概念',
          children: [
            { text: '定义一个Store', link: '/core-concepts/' },
            { text: 'State', link: '/core-concepts/state.html' },
            { text: 'Getters', link: '/core-concepts/getters.html' },
            { text: 'Actions', link: '/core-concepts/actions.html' },
            { text: '插件', link: '/core-concepts/plugins.html' },
            {
              text: '在组件外使用Store',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: '服务端渲染（SSR）',
          children: [
            {
              text: 'Vue 和 Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt.html',
            },
          ],
        },
        {
          text: 'Cookbook',
          link: '/cookbook/',
          children: [
            {
              text: '模块热替换（HMR）',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: '测试',
              link: '/cookbook/testing.html',
            },
            {
              text: '不使用 setup()的选项式使用方式',
              link: '/cookbook/options-api.html',
            },
            {
              text: '组合式stores',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: '从 v0/v1 迁移到 v2',
              link: '/cookbook/migration-v1-v2.html',
            },
          ],
        },
      ],
    },
  },
}
