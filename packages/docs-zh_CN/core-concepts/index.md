# 定义一个store

在深入研究核心概念之前，我们需要知道 store 是通过 `defineStore` 来定义的，它需要一个**唯一**名称作为第一个参数传递：

```js
import { defineStore } from 'pinia'

// useStore 也可以命名为 useUser, useCart
// 第一个参数是应用程序中store的唯一标识
export const useStore = defineStore('main', {
  // 其他选项...
})
```
这个 _唯一名称_，也称为 _id_，是必须的，Pinia 使用它来将store与开发工具联系起来。将返回的函数命名为 _use..._ 是一种惯用的组合式使用的约定。
 

## 使用store

我们称之前的行为是 _定义_ 一个store而不是创建store，因为store是在`setup()`函数内通过调用 `useStore()` 时创建的：
```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以在template中可以使用整个返回的store实例
      store,
    }
  },
}
```

您可以根据需要定义任意数量的store，但您**应当在不同的文件中定义每个store**以便充分使用 pinia 的功能 (例如使您的bundle包能够自动进行代码拆分以及TypeScript 类型引用)。

如果您还没有使用setup组件, [你依然可以通过 _map辅助函数_ 来调用 Pinia状态库](../cookbook/options-api.md).

store实例化完成后，你便可以直接访问store中定义的 `state`, `getters`,`actions`属性。我们将在接下来的篇幅中详细介绍这些内容。but autocompletion will help you.

值得注意的是 `store` 是一个包装在`reactive` 中的一个对象 , 这就意味着我们不需要在使用 getter 之后再写 `.value` ，但是，如同在 `setup`中的`props` 一样 , **我们无法对其进行解构**:

```js
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ This won't work because it breaks reactivity
    // it's the same as destructuring from `props`
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // will always be "eduardo"
      name,
      // will always be 2
      doubleCount,
      // this one will be reactive
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

为了使从store中获取的属性依然具备响应式特性，您需要使用`storeToRefs()`函数. 它能够为响应式属性创建引用。这在您仅使用 store 中的状态但不调用任何操作时很有用：

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
})
```
