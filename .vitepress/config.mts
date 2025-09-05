import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MEILIN",
  description: "Welcome to MEILIN Creative Interworking Server！",
  lang: 'zh-Hans',
  head: [
    ['link',{ rel: 'icon', href: 'me.jpg'}],
  ],
  sitemap: {
    hostname: 'https://wiki.bioc.fun',
  },
  lastUpdated: true,
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '团队', link: '/team' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    darkModeSwitchLabel: '深浅模式', 
    sidebarMenuLabel:'目录', 
        //本地搜索
    search: { 
     provider: 'local'
    }, 
    editLink: { 
      pattern: 'https://github.com/MEILIN-CN/meilin-document/edit/main/:path',
      text: '在GitHub编辑本页'
    },
    footer: { 
      message: 'Released under the MIT License.', 
      copyright: `Copyright © 2025-${new Date().getFullYear()} present Evan You`,
    },
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
