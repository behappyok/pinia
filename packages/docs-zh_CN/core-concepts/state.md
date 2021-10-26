# State

大多数情况下，状态(state) 是store的核心。人们通常首先定义应用程序的状态。在 Pinia 中，状态被定义为一个返回初始状态的函数。这使得 Pinia 在服务器端和客户端都能正常运行。
```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

:::tip
如果您使用的是 Vue 2，则您在`state`中创建的数据遵循与Vue 实例中的`data`属性具有相同的约束，即状态对象必须是纯粹的对象 (含有零个或多个的 key/value 对)，您需要通过`Vue.set()`函数来在向state**添加新** 属性。 **另见：[Vue#data](https://vuejs.org/v2/api/#data)**。
:::

## 获取 `state`

默认情况下，您可以通过 `store` 实例直接读写 state:

```js
const store = useStore()

store.counter++
```

## 重置 state

您可以通过调用 store 上的 `$reset()` 方法将状态 _重置_ 为其初始值:

```js
const store = useStore()

store.$reset()
```

### 以选项式 API 的方式使用

如果您不打算使用组合式 API，而是使用 `computed`， `methods`， ...，则您可以通过mapState()辅助函数将state映射为只读计算属性：
```js
import { mapState } from 'pinia'

export default {
  computed: {
    // gives access to this.counter inside the component
    // same as reading from store.counter
    ...mapState(useStore, ['counter'])
    // same as above but registers it as this.myOwnName
    ...mapState(useStore, {
      myOwnName: 'counter',
      // you can also write a function that gets access to the store
      double: store => store.counter * 2,
      // it can have access to `this` but it won't be typed correctly...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

#### 可修改的state

如果您希望能够使映射的state属性可写（例如，在处理表单时），则可以使用`mapWritableState()`函数。需要注意的是，您不能通过`mapState()`来pass a function like：
```js
import { mapWritableState } from 'pinia'

export default {
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(useStore, ['counter'])
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useStore, {
      myOwnName: 'counter',
    }),
  },
}
```

:::tip
You don't need `mapWritableState()` for collections like arrays unless you are replacing the whole array with `cartItems = []`, `mapState()` still allows you to call methods on your collections.
:::

## 改变(Mutating) state

<!-- TODO: disable this with `strictMode` -->

Apart from directly mutating the store with `store.counter++`, you can also call the `$patch` method. It allows you to apply multiple changes at the same time with a partial `state` object:

```js
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
})
```

However, some mutations are really hard or costly to apply with this syntax: any collection modification (e.g. pushing, removing, splicing an element from an array) requires you to create a new collection. Because of this, the `$patch` method also accepts a function to group this kind of mutations that are difficult to apply with a patch object:

```js
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

<!-- TODO: disable this with `strictMode`, `{ noDirectPatch: true }` -->

The main difference here is that `$patch()` allows you to group multiple changes into one single entry in the devtools. Note **both, direct changes to `state` and `$patch()` appear in the devtools** and can be time travelled (not yet in Vue 3).

## 替换 `state`

您可以通过将store的`$state` 属性设置为新对象来替换store的整个state：
```js
store.$state = { counter: 666, name: 'Paimon' }
```
您也可以通过更改 `pinia` 实例的`state`来替换您的应用程序的整个state。 This is used during [SSR for hydration](../ssr/#state-hydration).

```js
pinia.state.value = {}
```

## Subscribing to the state

You can watch the state and its changes through the `$subscribe()` method of a store, similar to Vuex's [subscribe method](https://vuex.vuejs.org/api/#subscribe). The advantage of using `$subscribe()` over a regular `watch()` is that _subscriptions_ will trigger only once after _patches_ (e.g. when using the function version from above).

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
})
```

By default, _state subscriptions_ are bound to the component where they are added (if the store is inside a component's `setup()`). Meaning, they will be automatically removed when the component is unmounted. If you want to keep them after the component is unmounted, pass `true` as the second argument to _detach_ the _state subscription_ from the current component:

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$subscribe(callback, true)

    // ...
  },
}
```

:::tip
You can watch the whole state on the `pinia` instance:

```js
watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
