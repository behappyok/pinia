import Theme from 'vitepress/theme'
import { h, nextTick } from 'vue'
import type { FunctionalComponent } from 'vue'
import sponsors from '../components/sponsors.json'
import './sponsors.css'
import { darkStorageConfig } from '../theme/dark-theme'
import { useDark } from '@vueuse/core'
import { withBase } from 'vitepress'
export const Layout: FunctionalComponent = () => {
  const isDark = useDark(darkStorageConfig)
  return h(
    Theme.Layout,
    {
      onVnodeMounted() {
        // wait to ticks to fix the problem of SSR with no color scheme
        nextTick(() => {
          isDark.value = !isDark.value
          return nextTick()
        }).then(() => {
          isDark.value = !isDark.value
        })
      },
    },
    {
      'sidebar-top': () =>
        h('div', { class: 'sponsors sponsors-top' }, [
          h('span', '白金赞助商'),
          ...sponsors.platinum.map(({ href, imgSrcDark, imgSrcLight, alt }) =>
            h(
              'a',
              {
                href,
                target: '_blank',
                rel: 'noopener',
              },
              [
                h('img', {
                  src: withBase(isDark.value ? imgSrcDark : imgSrcLight),
                  alt,
                }),
              ]
            )
          ),
        ]),
      'sidebar-bottom': () =>
        h('div', { class: 'sponsors' }, [
          h('span', '赞助商 '),
          ...sponsors.gold.map(({ href, imgSrcDark, imgSrcLight, alt }) =>
            h(
              'a',
              {
                href,
                target: '_blank',
                rel: 'noopener',
              },
              [
                h('img', {
                  src: withBase(isDark.value ? imgSrcDark : imgSrcLight),
                  alt,
                }),
              ]
            )
          ),
        ]),
    }
  )
}

Layout.displayName = 'CustomLayout'
