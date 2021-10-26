import Theme from 'vitepress/theme'
import { Layout } from './Layout'
import './custom.css'
import './code-theme.css'
// import { createPinia } from '../../../src'
import { watch } from 'vue'
/** @type {import('vitepress').Theme} */
const config = {
  ...Theme,

  Layout,

  enhanceApp({ app, router }) {
    // app.use(createPinia())
    if (globalThis && globalThis.gtag)
      watch(router.route, () => {
        gtag('config', window.GA_MEASUREMENT_ID, {
          page_path: router.route.path,
        })
      })
  },
}

export default config
