# 介绍

Pinia [起源于](https://github.com/posva/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)2019 年 11 月左右利用 [组合式API(Composition API)](https://github.com/vuejs/composition-api)重新设计一个适用于 Vue 状态管理的实验项目。从那时起, 实验项目和Pinia的目的一直保持一致,但是 Pinia 同时适用于 Vue 2 和 Vue 3  **，并且不需要您使用组合式 API**. 除了 _安装_ 和 _服务端渲染（SSR）_ 之外，对于Vue 2 和 Vue 3 两者API 是一致的, 本文档以Vue3为例，并在必要时**提供有关 Vue 2 的注释** 以便 Vue 2 和 Vue 3 用户阅读!

## 我需要使用Pinia吗？

Pinia 是 Vue 的状态管理库, 它使您可以跨组件/页面共享状态. 如果您熟悉 Composition API, 您可能会认为您只需要使用一行代码`export const state = reactive({})`就可以达到共享全局状态的目的. 对于单页应用程序这样的确可以，但是对于服务端渲染来说这样会带来 **暴露应用数据的安全问题** 。 而如果您使用Pinia, 你将受益多多，即使你的应用是一个小型单页面应用:

- 支持开发工具
  - 可以跟踪操作、突变的时间线
  - 状态库仅出现在被使用的组件中
  - 时间旅行并且更易于调试
- 模块热更换
  - 无需重新加载页面即可修改您的状态库
  - 开发时的状态保持
- 插件: 使用插件扩展 Pania 功能
- 为 JS 用户提供适当的 TypeScript 支持或**自动补全**
- 支持服务器端渲染

## 基础示例

这是一个调用 API 的示例(请务必查看 [入门](./getting-started.md)以获取完整说明)。 首先创建一个Store:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这么定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    }
  }
})
```

然后你就可以在组件中使用它：:

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    counter.count++
    // 使用自动补全代码的方式 ✨
    counter.$patch({ count: counter.count + 1 })
    // 或者使用操作
    counter.increment();
  },
}
```
您也可以使用函数式（类似于组件`setup()`）来定义一个Store 

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

如果你对组件 `setup()` 和复合式 API还不了解, 不用担心, Pania 也支持 [类似于Vuex的 _map辅助函数_ ](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). 你可以像使用Vuex一样创建Store并使用 `mapStores()`, `mapState()`, `mapActions()` 辅助函数:

```js
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

const useUserStore = defineStore('user', {
  // ...
})

export default {
  computed: {
    // 其他计算属性
    // ...
    // 映射 this.counterStore 和 this.userStore 属性
    ...mapStores(useCounterStore, useUserStore)
    // 只读映射 this.count 和 this.double 属性
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // 映射 this.increment() 操作
    ...mapActions(useCounterStore, ['increment']),
  },
}
```
您可以核心概念章节了解更多关于每个 _map功能_ 的信息。


##  _Pinia_ 是什么意思

Pinia (英语发音为 `/peenya/` ) 是最接近 _piña_ (西班牙语中的 _pineapple_ [菠萝])。 菠萝实际上是由一个个独立的花朵结合在一起形成的水果。状态管理stores也是一样, 每个store都是独立创建的， 但最终合在一起相互作用。Pinia既是一个状态管理库的包名，它也是一种原产于南美洲的美味热带水果。

## 一个更接近于实际开发的例子

这是一个更完整的**在JS中使用类型**的API 示例。 这对于某些人来说可能不需要需进一步阅读便可开始使用，但我们仍然建议您查看文档的其余部分。或者你也可以跳过此示例，等到你阅读完所有核心概念后再来查看本示例。

```js
import { defineStore } from 'pinia'

export const todos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // call other getters with autocompletion ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    addTodo(text) {
      // you can directly mutate the state
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## 与 Vuex 的比较

Pinia 尝试尽可能接近 Vuex 的理念。Pinia旨在测试 Vuex 下一次迭代的提案，我们在这个目的上很成功，我们目前有一个针对 Vuex 5 的开放 RFC [其 API ](https://github.com/vuejs/rfcs/discussions/270) 与Pinia 的 API 非常相似。 请注意，我 (Eduardo)作为Pinia 的作者本身是 Vue.js 核心团队的一员，并积极参与了 Router 和 Vuex 等 API 的设计。我个人做这个项目旨在重新设计一个使用全局 Store 的方式，同时保持 Vue 平易近人的哲学。我让 Pania在不断向前发展的同时，使其 API 尽量接近 Vuex ，以便人们可以随时轻松的迁移到 Vuex，甚至在未来以Vuex为主导融合这两个项目。

### RFCs

虽然 Vuex 通过 RFC 从社区收集尽可能多的反馈，但 Pania 没有。我根据我在开发应用程序、阅读其他人的代码和在 Discord 上回答问题的方式来测试我的一些想法。这使我能够提出一个行之有效的方案并快速发布，并且可以在人们使用它时也能根据必要在主要版本中进行大幅更改来改进它。（一般的项目在第一个稳定版本发布后不会做重大更改）

### 与 Vuex 3.x/4.x 的对比

> Vuex 3.x 用于 Vue 2, 而 Vuex 4.x 用于 Vue 3

Pinia API 与 Vuex ≤4 有很大不同:

- _mutations_ no longer exist. They were very often perceived as **_extremely_ verbose**. They initially brought devtools integration but that is no longer an issue.
- No need to create custom complex wrappers to support TypeScript, everything is typed and the API is designed in a way to leverage TS type inference as much as possible.
- No more magic strings to inject, import the functions, call them, enjoy autocompletion!
- No need to dynamically add stores, they are all dynamic by default and you won't even notice. Note you can still manually use a store to register it whenever you want but because it is automatic you don't need to worry about it.
- No more nested structuring of _modules_. You can still nest stores implicitly by importing and _using_ a store inside another but Pinia offers a flat structuring by design while still enabling ways of cross composition among stores.
- No _namespaced modules_. Given the flat architecture of stores, "namespacing" stores is inherent to how they are defined and you could say all stores are namespaced.
