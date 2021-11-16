import{_ as n,c as s,o as e,a}from"./app.fb0cb03d.js";const h='{"title":"Migrating from 0.0.7","description":"","frontmatter":{},"headers":[{"level":2,"title":"No more store.state","slug":"no-more-store-state"},{"level":2,"title":"Rename of store properties","slug":"rename-of-store-properties"},{"level":2,"title":"The Pinia instance","slug":"the-pinia-instance"},{"level":2,"title":"SSR changes","slug":"ssr-changes"}],"relativePath":"cookbook/migration-0-0-7.md","lastUpdated":1637048271678}',t={},p=a(`__VP_STATIC_START__<h1 id="migrating-from-0-0-7" tabindex="-1">Migrating from 0.0.7 <a class="header-anchor" href="#migrating-from-0-0-7" aria-hidden="true">#</a></h1><p>The versions after <code>0.0.7</code>: <code>0.1.0</code>, and <code>0.2.0</code>, came with a few big breaking changes. This guide helps you migrate whether you use Vue 2 or Vue 3. The whole changelog can be found in the repository:</p><ul><li><a href="https://github.com/posva/pinia/blob/v1/CHANGELOG.md" target="_blank" rel="noopener noreferrer">For Pinia &lt;= 1 for Vue 2</a></li><li><a href="https://github.com/posva/pinia/blob/v2/packages/pinia/CHANGELOG.md" target="_blank" rel="noopener noreferrer">For Pinia &gt;= 2 for Vue 3</a></li></ul><p>If you have questions or issues regarding the migration, feel free to <a href="https://github.com/posva/pinia/discussions/categories/q-a" target="_blank" rel="noopener noreferrer">open a discussion</a> to ask for help.</p><h2 id="no-more-store-state" tabindex="-1">No more <code>store.state</code> <a class="header-anchor" href="#no-more-store-state" aria-hidden="true">#</a></h2><p>You no longer access the store state via a <code>state</code> property, you can directly access any state property.</p><p>Given a store defined with:</p><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Do</p><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">const store = useStore()
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">store.state.counter++
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">store.counter.++
</span></span></code></pre></div><p>You can still access the whole store state with <code>$state</code> when needed:</p><div class="language-diff"><pre><code><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">store.state = newState
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">store.$state = newState
</span></span></code></pre></div><h2 id="rename-of-store-properties" tabindex="-1">Rename of store properties <a class="header-anchor" href="#rename-of-store-properties" aria-hidden="true">#</a></h2><p>All store properties (<code>id</code>, <code>patch</code>, <code>reset</code>, etc) are now prefixed with <code>$</code> to allow properties defined on the store with the same names. Tip: you can refactor your whole codebase with F2 (or right-click + Refactor) on each of the store&#39;s properties</p><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">const store = useStore()
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">store.patch({ counter: 0 })
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">store.$patch({ counter: 0 })
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">store.reset()
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">store.$reset()
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">store.id
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">store.$id
</span></span></code></pre></div><h2 id="the-pinia-instance" tabindex="-1">The Pinia instance <a class="header-anchor" href="#the-pinia-instance" aria-hidden="true">#</a></h2><p>It&#39;s now necessary to create a pinia instance and install it:</p><p>If you are using Vue 2 (Pinia &lt;= 1):</p><div class="language-js"><pre><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia<span class="token punctuation">,</span> PiniaVuePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>PiniaVuePlugin<span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  pinia<span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>If you are using Vue 3 (Pinia &gt;= 2):</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia<span class="token punctuation">,</span> PiniaVuePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>The <code>pinia</code> instance is what holds the state and should <strong>be unique per application</strong>. Check the SSR section of the docs for more details.</p><h2 id="ssr-changes" tabindex="-1">SSR changes <a class="header-anchor" href="#ssr-changes" aria-hidden="true">#</a></h2><p>The SSR plugin <code>PiniaSsr</code> is no longer necessary and has been removed. With the introduction of pinia instances, <code>getRootState()</code> is no longer necessary and should be replaced with <code>pinia.state.value</code>:</p><p>If you are using Vue 2 (Pinia &lt;= 1):</p><div class="language-diff"><pre><code>// entry-server.js
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">import { getRootState, PiniaSsr } from &#39;pinia&#39;,
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">import { createPinia, PiniaVuePlugin } from &#39;pinia&#39;,
</span></span>

<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">// install plugin to automatically use correct context in setup and onServerPrefetch
</span><span class="token prefix deleted">-</span><span class="token line">Vue.use(PiniaSsr);
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">Vue.use(PiniaVuePlugin)
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">export default context =&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  const pinia = createPinia()
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  const app = new Vue({
</span><span class="token prefix unchanged"> </span><span class="token line">    // other options
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    pinia
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  })
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  context.rendered = () =&gt; {
</span><span class="token prefix unchanged"> </span><span class="token line">    // pass state to context
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">    context.piniaState = getRootState(context.req)
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    context.piniaState = pinia.state.value
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  };
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">   return { app }
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   return { app, pinia }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">}
</span></span></code></pre></div><p><code>setActiveReq()</code> and <code>getActiveReq()</code> have been replaced with <code>setActivePinia()</code> and <code>getActivePinia()</code> respectively. <code>setActivePinia()</code> can only be passed a <code>pinia</code> instance created with <code>createPinia()</code>. <strong>Note that most of the time you won&#39;t directly use these functions</strong>.</p>__VP_STATIC_END__`,27),o=[p];function i(c,r,l,d,u,k){return e(),s("div",null,o)}var f=n(t,[["render",i]]);export{h as __pageData,f as default};
