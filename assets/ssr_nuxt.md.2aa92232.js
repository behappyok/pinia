import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const g='{"title":"Nuxt.js","description":"","frontmatter":{},"headers":[{"level":2,"title":"Installation","slug":"installation"},{"level":2,"title":"Using the store outside of setup()","slug":"using-the-store-outside-of-setup"},{"level":2,"title":"Using the Nuxt context in stores","slug":"using-the-nuxt-context-in-stores"},{"level":2,"title":"Using Pinia alongside Vuex","slug":"using-pinia-alongside-vuex"},{"level":2,"title":"Typescript","slug":"typescript"}],"relativePath":"ssr/nuxt.md","lastUpdated":1637048271682}',e={},o=t(`<h1 id="nuxt-js" tabindex="-1">Nuxt.js <a class="header-anchor" href="#nuxt-js" aria-hidden="true">#</a></h1><p>Using Pinia with <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">Nuxt.js</a> is easier since Nuxt takes care of a lot of things when it comes to <em>server side rendering</em>. For instance, <strong>you don&#39;t need to care about serialization nor XSS attacks</strong>.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><p>Make sure to install <a href="https://composition-api.nuxtjs.org/" target="_blank" rel="noopener noreferrer"><code>@nuxtjs/composition-api</code></a> alongside <code>pinia</code>:</p><div class="language-bash"><pre><code><span class="token function">yarn</span> <span class="token function">add</span> pinia @pinia/nuxt @nuxtjs/composition-api
<span class="token comment"># or with npm</span>
<span class="token function">npm</span> <span class="token function">install</span> pinia @pinia/nuxt @nuxtjs/composition-api
</code></pre></div><p>We supply a <em>module</em> to handle everything for you, you only need to add it to <code>buildModules</code> in your <code>nuxt.config.js</code> file:</p><div class="language-js"><pre><code><span class="token comment">// nuxt.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... other options</span>
  buildModules<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// Nuxt 2 only:</span>
    <span class="token comment">// https://composition-api.nuxtjs.org/getting-started/setup#quick-start</span>
    <span class="token string">&#39;@nuxtjs/composition-api/module&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;@pinia/nuxt&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>And that&#39;s it, use your store as usual!</p><h2 id="using-the-store-outside-of-setup" tabindex="-1">Using the store outside of <code>setup()</code> <a class="header-anchor" href="#using-the-store-outside-of-setup" aria-hidden="true">#</a></h2><p>If you want to use a store outside of <code>setup()</code>, remember to pass the <code>pinia</code> object to <code>useStore()</code>. We added it to <a href="https://nuxtjs.org/docs/2.x/internals-glossary/context" target="_blank" rel="noopener noreferrer">the context</a> so you have access to it in <code>asyncData()</code> and <code>fetch()</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;~/stores/myStore&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">asyncData</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> $pinia <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span>$pinia<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="using-the-nuxt-context-in-stores" tabindex="-1">Using the Nuxt context in stores <a class="header-anchor" href="#using-the-nuxt-context-in-stores" aria-hidden="true">#</a></h2><p>You can also use <a href="https://nuxtjs.org/docs/2.x/internals-glossary/context" target="_blank" rel="noopener noreferrer">the context</a> in any store by using the injected property <code>$nuxt</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useUserStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;~/stores/userStore&#39;</span>

<span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;cart&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">purchase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">useUserStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$nuxt<span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="using-pinia-alongside-vuex" tabindex="-1">Using Pinia alongside Vuex <a class="header-anchor" href="#using-pinia-alongside-vuex" aria-hidden="true">#</a></h2><p>It is recommended to <strong>avoid using both Pinia and Vuex</strong> but if you need to use both, you need to tell pinia to not disable it:</p><div class="language-js"><pre><code><span class="token comment">// nuxt.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  buildModules<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;@nuxtjs/composition-api/module&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;@pinia/nuxt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> disableVuex<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// ... other options</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="typescript" tabindex="-1">Typescript <a class="header-anchor" href="#typescript" aria-hidden="true">#</a></h2><p>If you are using TypeScript or have a <code>jsconfig.json</code>, you should also add the types for <code>context.pinia</code>:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// ...</span>
    <span class="token string">&quot;@pinia/nuxt&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This will also ensure you have autocompletion \u{1F609} .</p>`,21),p=[o];function c(i,u,l,r,d,k){return a(),s("div",null,p)}var x=n(e,[["render",c]]);export{g as __pageData,x as default};
