/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import { onMounted, watch, nextTick } from 'vue';
import MyLayout from './components/MyLayout.vue' // 导入布局组件
import mediumZoom from 'medium-zoom';
import { useRoute, useData, inBrowser } from 'vitepress';
import busuanzi from 'busuanzi.pure.js'
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import DataPanel from "./components/DataPanel.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import HomeUnderline from "./components/HomeUnderline.vue"

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined
export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  setup() {
    const { frontmatter } = useData();
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
        // giscus配置
        giscusTalk({
          repo: 'MEILIN-CN/meilin-document', //仓库
          repoId: 'R_kgDOMWTe0A', //仓库ID
          category: 'General', // 讨论分类
          categoryId: 'DIC_kwDOMWTe0M4Cu_lp', //讨论分类ID
          mapping: 'pathname',
          inputPosition: 'bottom',
          lang: 'zh-CN',
          }, 
          {
            frontmatter, route
          },
          //默认值为true，表示已启用，此参数可以忽略；
          //如果为false，则表示未启用
          //您可以使用“comment:true”序言在页面上单独启用它
          true
        );
  },
  enhanceApp({ app, router }) {
    app.component('DataPanel' , DataPanel)
    app.component('ArticleMetadata', ArticleMetadata);
    app.component('HomeUnderline' , HomeUnderline);
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
         busuanzi.fetch()
         NProgress.done() // 停止进度条
      }
    }
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
}
// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
