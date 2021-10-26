## 安装

你可以使用你喜欢的包管理器安装 `pinia` :

```bash
yarn add pinia
#或使用 npm
npm install pinia
```

:::tip
如果您的应用程序使用 Vue 2，您还需要安装组合式 api: @vue/composition-api。如果您使用 Nuxt，则应遵循[这些说明](/ssr/nuxt.md)。
:::

如果你使用的是 Vue CLI，你可以试试这个[**非官方插件**](https://github.com/wobsoriano/vue-cli-plugin-pinia) 。 

创建一个 pinia（根store）并将其传给app:

```js
import { createPinia } from 'pinia'

app.use(createPinia())
```

如果您使用的是 Vue 2，您还需要注册PiniaVuePlugin插件并将创建的`pinia`（根store） 注入到app的根配置上:

```js
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他选项...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

这也将添加 devtools 支持。在 Vue 3 中，仍然不支持时间旅行和编辑等一些功能，因为 vue-devtools 还没有公开必要的 API， but the devtools have way more features and the developer experience as a whole is far superior. In Vue 2, Pinia uses the existing interface for Vuex (and can therefore not be used alongside it).

## What is a Store?

A Store (like Pinia) is an entity holding state and business logic that isn't bound to your Component tree. In other words, **it hosts global state**. It's a bit like a component that is always there and that everybody can read off and write to. It has **three concepts**, the [state](./core-concepts/state.md), [getters](./core-concepts/getters.md) and [actions](./core-concepts/actions.md) and it's safe to assume these concepts are the equivalent of `data`, `computed` and `methods` in components.

## When should I use a Store

A store should contain data that can be accessed throughout your application. This includes data that is used in many places, e.g. User information that is displayed in the navbar, as well as data that needs to be preserved through pages, e.g. a very complicated multi-step form.

On the other hand, you should avoid including in the store local data that could be hosted in a component instead, e.g. the visibility of an element local to a page.

Not all applications need access to a global state, but if yours need one, Pinia will make your life easier.
