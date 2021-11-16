import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const f='{"title":"Usage without setup()","description":"","frontmatter":{},"headers":[{"level":2,"title":"Giving access to the whole store","slug":"giving-access-to-the-whole-store"},{"level":2,"title":"TypeScript","slug":"typescript"}],"relativePath":"cookbook/options-api.md","lastUpdated":1637048271678}',e={},o=t(`__VP_STATIC_START__<h1 id="usage-without-setup" tabindex="-1">Usage without <code>setup()</code> <a class="header-anchor" href="#usage-without-setup" aria-hidden="true">#</a></h1><p>Pinia can be used even if you are not using the composition API (if you are using Vue 2, you still need to install the <code>@vue/composition-api</code> plugin though). While we recommend you to give the Composition API a try and learn it, it might not be the time for you and your team yet, you might be in the process of migrating an application, or any other reason. There are a few functions:</p><ul><li><a href="#giving-access-to-the-whole-store">mapStores</a></li><li><a href="./../core-concepts/state.html#options-api">mapState</a></li><li><a href="./../core-concepts/state.html#modifiable-state">mapWritableState</a></li><li>\u26A0\uFE0F <a href="./../core-concepts/getters.html#options-api">mapGetters</a> (just for migration convenience, use <code>mapState()</code> instead)</li><li><a href="./../core-concepts/actions.html#options-api">mapActions</a></li></ul><h2 id="giving-access-to-the-whole-store" tabindex="-1">Giving access to the whole store <a class="header-anchor" href="#giving-access-to-the-whole-store" aria-hidden="true">#</a></h2><p>If you need to access pretty much everything from the store, it might be too much to map every single property of the store... Instead you can get access to the whole store with <code>mapStores()</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapStores <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// given two stores with the following ids</span>
<span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> useCartStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;cart&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// note we are not passing an array, just one store after the other</span>
    <span class="token comment">// each store will be accessible as its id + &#39;Store&#39;</span>
    <span class="token operator">...</span><span class="token function">mapStores</span><span class="token punctuation">(</span>useCartStore<span class="token punctuation">,</span> useUserStore<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">buyStuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// use them anywhere!</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userStore<span class="token punctuation">.</span><span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cartStore<span class="token punctuation">.</span><span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/purchased&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>By default, Pinia will add the <code>&quot;Store&quot;</code> suffix to the <code>id</code> of each store. You can customize this behavior by calling the <code>setMapStoreSuffix()</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia<span class="token punctuation">,</span> setMapStoreSuffix <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// completely remove the suffix: this.user, this.cart</span>
<span class="token function">setMapStoreSuffix</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// this.user_store, this.cart_store (it&#39;s okay, I won&#39;t judge you)</span>
<span class="token function">setMapStoreSuffix</span><span class="token punctuation">(</span><span class="token string">&#39;_store&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="typescript" tabindex="-1">TypeScript <a class="header-anchor" href="#typescript" aria-hidden="true">#</a></h2><p>By default, all map helpers support autocompletion and you don&#39;t need to do anything. If you call <code>setMapStoreSuffix()</code> to change the <code>&quot;Store&quot;</code> suffix, you will need to also add it somewhere in a TS file or your <code>global.d.ts</code> file. The most convenient place would be the same place where you call <code>setMapStoreSuffix()</code>:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia<span class="token punctuation">,</span> setMapStoreSuffix <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token function">setMapStoreSuffix</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// completely remove the suffix</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;pinia&#39;</span> <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">MapStoresCustomization</span> <span class="token punctuation">{</span>
    <span class="token comment">// set it to the same value as above</span>
    suffix<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are using a TypeScript declaration file (like <code>global.d.ts</code>), make sure to <code>import &#39;pinia&#39;</code> at the top of it to expose all existing types.</p></div>__VP_STATIC_END__`,12),p=[o];function c(i,u,l,r,k,d){return a(),s("div",null,p)}var m=n(e,[["render",c]]);export{f as __pageData,m as default};
