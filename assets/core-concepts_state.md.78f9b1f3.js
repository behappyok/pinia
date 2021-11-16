import{_ as a,c as t,b as s,a as n,o as e}from"./app.fb0cb03d.js";const f='{"title":"State","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u83B7\u53D6 state","slug":"\u83B7\u53D6-state"},{"level":2,"title":"\u91CD\u7F6E state","slug":"\u91CD\u7F6E-state"},{"level":3,"title":"\u4EE5\u9009\u9879\u5F0F API \u7684\u65B9\u5F0F\u4F7F\u7528","slug":"\u4EE5\u9009\u9879\u5F0F-api-\u7684\u65B9\u5F0F\u4F7F\u7528"},{"level":2,"title":"\u6539\u53D8(Mutating) state","slug":"\u6539\u53D8-mutating-state"},{"level":2,"title":"\u66FF\u6362 state","slug":"\u66FF\u6362-state"},{"level":2,"title":"Subscribing to the state","slug":"subscribing-to-the-state"}],"relativePath":"core-concepts/state.md","lastUpdated":1637048271678}',o={},p=n(`<h1 id="state" tabindex="-1">State <a class="header-anchor" href="#state" aria-hidden="true">#</a></h1><p>\u5927\u591A\u6570\u60C5\u51B5\u4E0B\uFF0C\u72B6\u6001(state) \u662Fstore\u7684\u6838\u5FC3\u3002\u4EBA\u4EEC\u901A\u5E38\u9996\u5148\u5B9A\u4E49\u5E94\u7528\u7A0B\u5E8F\u7684\u72B6\u6001\u3002\u5728 Pinia \u4E2D\uFF0C\u72B6\u6001\u88AB\u5B9A\u4E49\u4E3A\u4E00\u4E2A\u8FD4\u56DE\u521D\u59CB\u72B6\u6001\u7684\u51FD\u6570\u3002\u8FD9\u4F7F\u5F97 Pinia \u5728\u670D\u52A1\u5668\u7AEF\u548C\u5BA2\u6237\u7AEF\u90FD\u80FD\u6B63\u5E38\u8FD0\u884C\u3002</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;storeId&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// arrow function recommended for full type inference</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token comment">// all these properties will have their type inferred automatically</span>
      counter<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">&#39;Eduardo&#39;</span><span class="token punctuation">,</span>
      isAdmin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u5982\u679C\u60A8\u4F7F\u7528\u7684\u662F Vue 2\uFF0C\u5219\u60A8\u5728<code>state</code>\u4E2D\u521B\u5EFA\u7684\u6570\u636E\u9075\u5FAA\u4E0EVue \u5B9E\u4F8B\u4E2D\u7684<code>data</code>\u5C5E\u6027\u5177\u6709\u76F8\u540C\u7684\u7EA6\u675F\uFF0C\u5373\u72B6\u6001\u5BF9\u8C61\u5FC5\u987B\u662F\u7EAF\u7CB9\u7684\u5BF9\u8C61 (\u542B\u6709\u96F6\u4E2A\u6216\u591A\u4E2A\u7684 key/value \u5BF9)\uFF0C\u60A8\u9700\u8981\u901A\u8FC7<code>Vue.set()</code>\u51FD\u6570\u6765\u5728\u5411state<strong>\u6DFB\u52A0\u65B0</strong> \u5C5E\u6027\u3002 <strong>\u53E6\u89C1\uFF1A<a href="https://vuejs.org/v2/api/#data" target="_blank" rel="noopener noreferrer">Vue#data</a></strong>\u3002</p></div><h2 id="\u83B7\u53D6-state" tabindex="-1">\u83B7\u53D6 <code>state</code> <a class="header-anchor" href="#\u83B7\u53D6-state" aria-hidden="true">#</a></h2><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7 <code>store</code> \u5B9E\u4F8B\u76F4\u63A5\u8BFB\u5199 state:</p><div class="language-js"><pre><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span>counter<span class="token operator">++</span>
</code></pre></div><h2 id="\u91CD\u7F6E-state" tabindex="-1">\u91CD\u7F6E state <a class="header-anchor" href="#\u91CD\u7F6E-state" aria-hidden="true">#</a></h2><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u8C03\u7528 store \u4E0A\u7684 <code>$reset()</code> \u65B9\u6CD5\u5C06\u72B6\u6001 <em>\u91CD\u7F6E</em> \u4E3A\u5176\u521D\u59CB\u503C:</p><div class="language-js"><pre><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">$reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="\u4EE5\u9009\u9879\u5F0F-api-\u7684\u65B9\u5F0F\u4F7F\u7528" tabindex="-1">\u4EE5\u9009\u9879\u5F0F API \u7684\u65B9\u5F0F\u4F7F\u7528 <a class="header-anchor" href="#\u4EE5\u9009\u9879\u5F0F-api-\u7684\u65B9\u5F0F\u4F7F\u7528" aria-hidden="true">#</a></h3><p>\u5982\u679C\u60A8\u4E0D\u6253\u7B97\u4F7F\u7528\u7EC4\u5408\u5F0F API\uFF0C\u800C\u662F\u4F7F\u7528 <code>computed</code>\uFF0C <code>methods</code>\uFF0C ...\uFF0C\u5219\u60A8\u53EF\u4EE5\u901A\u8FC7mapState()\u8F85\u52A9\u51FD\u6570\u5C06state\u6620\u5C04\u4E3A\u53EA\u8BFB\u8BA1\u7B97\u5C5E\u6027\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// gives access to this.counter inside the component</span>
    <span class="token comment">// same as reading from store.counter</span>
    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;counter&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// same as above but registers it as this.myOwnName</span>
    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      myOwnName<span class="token operator">:</span> <span class="token string">&#39;counter&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">// you can also write a function that gets access to the store</span>
      <span class="token function-variable function">double</span><span class="token operator">:</span> <span class="token parameter">store</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span>counter <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token comment">// it can have access to \`this\` but it won&#39;t be typed correctly...</span>
      <span class="token function">magicValue</span><span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> store<span class="token punctuation">.</span>someGetter <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>double
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u53EF\u4FEE\u6539\u7684state" tabindex="-1">\u53EF\u4FEE\u6539\u7684state <a class="header-anchor" href="#\u53EF\u4FEE\u6539\u7684state" aria-hidden="true">#</a></h4><p>\u5982\u679C\u60A8\u5E0C\u671B\u80FD\u591F\u4F7F\u6620\u5C04\u7684state\u5C5E\u6027\u53EF\u5199\uFF08\u4F8B\u5982\uFF0C\u5728\u5904\u7406\u8868\u5355\u65F6\uFF09\uFF0C\u5219\u53EF\u4EE5\u4F7F\u7528<code>mapWritableState()</code>\u51FD\u6570\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u60A8\u4E0D\u80FD\u901A\u8FC7<code>mapState()</code>\u6765pass a function like\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapWritableState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// gives access to this.counter inside the component and allows setting it</span>
    <span class="token comment">// this.counter++</span>
    <span class="token comment">// same as reading from store.counter</span>
    <span class="token operator">...</span><span class="token function">mapWritableState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;counter&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// same as above but registers it as this.myOwnName</span>
    <span class="token operator">...</span><span class="token function">mapWritableState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      myOwnName<span class="token operator">:</span> <span class="token string">&#39;counter&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You don&#39;t need <code>mapWritableState()</code> for collections like arrays unless you are replacing the whole array with <code>cartItems = []</code>, <code>mapState()</code> still allows you to call methods on your collections.</p></div><h2 id="\u6539\u53D8-mutating-state" tabindex="-1">\u6539\u53D8(Mutating) state <a class="header-anchor" href="#\u6539\u53D8-mutating-state" aria-hidden="true">#</a></h2>`,18),c=n(`<p>Apart from directly mutating the store with <code>store.counter++</code>, you can also call the <code>$patch</code> method. It allows you to apply multiple changes at the same time with a partial <code>state</code> object:</p><div class="language-js"><pre><code>store<span class="token punctuation">.</span><span class="token function">$patch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  counter<span class="token operator">:</span> store<span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Abalam&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>However, some mutations are really hard or costly to apply with this syntax: any collection modification (e.g. pushing, removing, splicing an element from an array) requires you to create a new collection. Because of this, the <code>$patch</code> method also accepts a function to group this kind of mutations that are difficult to apply with a patch object:</p><div class="language-js"><pre><code>cartStore<span class="token punctuation">.</span><span class="token function">$patch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  state<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;shoes&#39;</span><span class="token punctuation">,</span> quantity<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  state<span class="token punctuation">.</span>hasChanged <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,4),u=n(`<p>The main difference here is that <code>$patch()</code> allows you to group multiple changes into one single entry in the devtools. Note <strong>both, direct changes to <code>state</code> and <code>$patch()</code> appear in the devtools</strong> and can be time travelled (not yet in Vue 3).</p><h2 id="\u66FF\u6362-state" tabindex="-1">\u66FF\u6362 <code>state</code> <a class="header-anchor" href="#\u66FF\u6362-state" aria-hidden="true">#</a></h2><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u5C06store\u7684<code>$state</code> \u5C5E\u6027\u8BBE\u7F6E\u4E3A\u65B0\u5BF9\u8C61\u6765\u66FF\u6362store\u7684\u6574\u4E2Astate\uFF1A</p><div class="language-js"><pre><code>store<span class="token punctuation">.</span>$state <span class="token operator">=</span> <span class="token punctuation">{</span> counter<span class="token operator">:</span> <span class="token number">666</span><span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">&#39;Paimon&#39;</span> <span class="token punctuation">}</span>
</code></pre></div><p>\u60A8\u4E5F\u53EF\u4EE5\u901A\u8FC7\u66F4\u6539 <code>pinia</code> \u5B9E\u4F8B\u7684<code>state</code>\u6765\u66FF\u6362\u60A8\u7684\u5E94\u7528\u7A0B\u5E8F\u7684\u6574\u4E2Astate\u3002 This is used during <a href="./../ssr/#state-hydration">SSR for hydration</a>.</p><div class="language-js"><pre><code>pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h2 id="subscribing-to-the-state" tabindex="-1">Subscribing to the state <a class="header-anchor" href="#subscribing-to-the-state" aria-hidden="true">#</a></h2><p>You can watch the state and its changes through the <code>$subscribe()</code> method of a store, similar to Vuex&#39;s <a href="https://vuex.vuejs.org/api/#subscribe" target="_blank" rel="noopener noreferrer">subscribe method</a>. The advantage of using <code>$subscribe()</code> over a regular <code>watch()</code> is that <em>subscriptions</em> will trigger only once after <em>patches</em> (e.g. when using the function version from above).</p><div class="language-js"><pre><code>cartStore<span class="token punctuation">.</span><span class="token function">$subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">mutation<span class="token punctuation">,</span> state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// import { MutationType } from &#39;pinia&#39;</span>
  mutation<span class="token punctuation">.</span>type <span class="token comment">// &#39;direct&#39; | &#39;patch object&#39; | &#39;patch function&#39;</span>
  <span class="token comment">// same as cartStore.$id</span>
  mutation<span class="token punctuation">.</span>storeId <span class="token comment">// &#39;cart&#39;</span>
  <span class="token comment">// only available with mutation.type === &#39;patch object&#39;</span>
  mutation<span class="token punctuation">.</span>payload <span class="token comment">// patch object passed to cartStore.$patch()</span>

  <span class="token comment">// persist the whole state to the local storage whenever it changes</span>
  localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;cart&#39;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>By default, <em>state subscriptions</em> are bound to the component where they are added (if the store is inside a component&#39;s <code>setup()</code>). Meaning, they will be automatically removed when the component is unmounted. If you want to keep them after the component is unmounted, pass <code>true</code> as the second argument to <em>detach</em> the <em>state subscription</em> from the current component:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> someStore <span class="token operator">=</span> <span class="token function">useSomeStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// this subscription will be kept after the component is unmounted</span>
    someStore<span class="token punctuation">.</span><span class="token function">$subscribe</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can watch the whole state on the <code>pinia</code> instance:</p><div class="language-js"><pre><code><span class="token function">watch</span><span class="token punctuation">(</span>
  pinia<span class="token punctuation">.</span>state<span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// persist the whole state to the local storage whenever it changes</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;piniaState&#39;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> deep<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre></div></div>`,12);function i(l,r,k,d,m,h){return e(),t("div",null,[p,s(" TODO: disable this with `strictMode` "),c,s(" TODO: disable this with `strictMode`, `{ noDirectPatch: true }` "),u])}var b=a(o,[["render",i]]);export{f as __pageData,b as default};
