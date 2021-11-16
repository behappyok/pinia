import{_ as e,c as n,o as s,a}from"./app.fb0cb03d.js";const f='{"title":"Migrating from 0.x (v1) to v2","description":"","frontmatter":{},"headers":[{"level":2,"title":"Deprecations","slug":"deprecations"},{"level":2,"title":"Breaking changes","slug":"breaking-changes"},{"level":3,"title":"Generic Store type","slug":"generic-store-type"},{"level":2,"title":"DefineStoreOptions for plugins","slug":"definestoreoptions-for-plugins"},{"level":2,"title":"@vue/composition-api version","slug":"vue-composition-api-version"},{"level":2,"title":"Devtools","slug":"devtools"},{"level":2,"title":"Nuxt","slug":"nuxt"}],"relativePath":"cookbook/migration-v1-v2.md","lastUpdated":1637048271678}',t={},o=a(`<h1 id="migrating-from-0-x-v1-to-v2" tabindex="-1">Migrating from 0.x (v1) to v2 <a class="header-anchor" href="#migrating-from-0-x-v1-to-v2" aria-hidden="true">#</a></h1><p>Starting at version <code>2.0.0-rc.4</code>, pinia supports both Vue 2 and Vue 3! This means, all new updates will be applied to this version 2 so both Vue 2 and Vue 3 users can benefit from it. If you are using Vue 3, this doesn&#39;t change anything for you as you were already using the rc and you can check <a href="https://github.com/posva/pinia/blob/v2/packages/pinia/CHANGELOG.md" target="_blank" rel="noopener noreferrer">the CHANGELOG</a> for detailed explanation of everything that changed. Otherwise, <strong>this guide is for you</strong>!</p><h2 id="deprecations" tabindex="-1">Deprecations <a class="header-anchor" href="#deprecations" aria-hidden="true">#</a></h2><p>Let&#39;s take a look at all the changes you need to apply to your code. First, make sure you are already running the latest 0.x version to see any deprecations:</p><div class="language-shell"><pre><code><span class="token function">npm</span> i <span class="token string">&#39;pinia@^0.x.x&#39;</span>
<span class="token comment"># or with yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token string">&#39;pinia@^0.x.x&#39;</span>
</code></pre></div><p>If you are using ESLint, consider using <a href="https://github.com/gund/eslint-plugin-deprecation" target="_blank" rel="noopener noreferrer">this plugin</a> to find all deprecated usages. Otherwise, you should be able to see them as they appear crossed. These are the APIs that were deprecated that were removed:</p><ul><li><code>createStore()</code> becomes <code>defineStore()</code></li><li>In subscriptions, <code>storeName</code> becomes <code>storeId</code></li></ul><h2 id="breaking-changes" tabindex="-1">Breaking changes <a class="header-anchor" href="#breaking-changes" aria-hidden="true">#</a></h2><p>After removing these, you can upgrade to v2 with:</p><div class="language-shell"><pre><code><span class="token function">npm</span> i <span class="token string">&#39;pinia@^2.x.x&#39;</span>
<span class="token comment"># or with yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token string">&#39;pinia@^2.x.x&#39;</span>
</code></pre></div><p>And start updating your code.</p><h3 id="generic-store-type" tabindex="-1">Generic Store type <a class="header-anchor" href="#generic-store-type" aria-hidden="true">#</a></h3><p>Added in <a href="https://github.com/posva/pinia/blob/v2/packages/pinia/CHANGELOG.md#200-rc0-2021-07-28" target="_blank" rel="noopener noreferrer">2.0.0-rc.0</a></p><p>Replace any usage of the type <code>GenericStore</code> with <code>StoreGeneric</code>. This is the new generic store type that should accept any kind of store. If you were writing functions using the type <code>Store</code> without passing its generics (e.g. <code>Store&lt;Id, State, Getters, Actions&gt;</code>), you should also use <code>StoreGeneric</code> as the <code>Store</code> type without generics creates an empty store type.</p><div class="language-diff"><pre><code><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">function takeAnyStore(store: Store) {}
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">function takeAnyStore(store: StoreGeneric) {}
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">function takeAnyStore(store: GenericStore) {}
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">function takeAnyStore(store: StoreGeneric) {}
</span></span></code></pre></div><h2 id="definestoreoptions-for-plugins" tabindex="-1"><code>DefineStoreOptions</code> for plugins <a class="header-anchor" href="#definestoreoptions-for-plugins" aria-hidden="true">#</a></h2><p>If you were writing plugins, using TypeScript, and extending the type <code>DefineStoreOptions</code> to add custom options, you should rename it to <code>DefineStoreOptionsBase</code>. This type will apply to both setup and options stores.</p><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">declare module &#39;pinia&#39; {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">  export interface DefineStoreOptions&lt;S, Store&gt; {
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  export interface DefineStoreOptionsBase&lt;S, Store&gt; {
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">    debounce?: {
</span><span class="token prefix unchanged"> </span><span class="token line">      [k in keyof A]?: number
</span><span class="token prefix unchanged"> </span><span class="token line">    }
</span><span class="token prefix unchanged"> </span><span class="token line">  }
</span><span class="token prefix unchanged"> </span><span class="token line">}
</span></span></code></pre></div><h2 id="vue-composition-api-version" tabindex="-1"><code>@vue/composition-api</code> version <a class="header-anchor" href="#vue-composition-api-version" aria-hidden="true">#</a></h2><p>Since pinia now relies on <code>effectScope()</code>, you must use at least the version <code>1.1.0</code> of <code>@vue/composition-api</code>:</p><div class="language-shell"><pre><code><span class="token function">npm</span> i @vue/composition-api@latest
<span class="token comment"># or with yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> @vue/composition-api@latest
</code></pre></div><h2 id="devtools" tabindex="-1">Devtools <a class="header-anchor" href="#devtools" aria-hidden="true">#</a></h2><p>Pinia v2 no longer hijacks Vue Devtools v5, it requires Vue Devtools v6. Find the download link on the <a href="https://devtools.vuejs.org/guide/installation.html#chrome" target="_blank" rel="noopener noreferrer">Vue Devtools documentation</a> for the <strong>beta channel</strong> of the extension.</p><h2 id="nuxt" tabindex="-1">Nuxt <a class="header-anchor" href="#nuxt" aria-hidden="true">#</a></h2><p>If you are using Nuxt, pinia has now it&#39;s dedicated Nuxt package \u{1F389}. Install it with:</p><div class="language-shell"><pre><code><span class="token function">npm</span> i @pinia/nuxt
<span class="token comment"># or with yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> @pinia/nuxt
</code></pre></div><p>Also make sure to <strong>update your <code>@nuxtjs/composition-api</code> package</strong>.</p><p>Then adapt your <code>nuxt.config.js</code> and your <code>tsconfig.json</code> if you are using TypeScript:</p><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">// nuxt.config.js
</span><span class="token prefix unchanged"> </span><span class="token line">module.exports {
</span><span class="token prefix unchanged"> </span><span class="token line">  buildModules: [
</span><span class="token prefix unchanged"> </span><span class="token line">    &#39;@nuxtjs/composition-api/module&#39;,
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">    &#39;pinia/nuxt&#39;,
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    &#39;@pinia/nuxt&#39;,
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  ],
</span><span class="token prefix unchanged"> </span><span class="token line">}
</span></span></code></pre></div><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">// tsconfig.json
</span><span class="token prefix unchanged"> </span><span class="token line">{
</span><span class="token prefix unchanged"> </span><span class="token line">  &quot;types&quot;: [
</span><span class="token prefix unchanged"> </span><span class="token line">    // ...
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">    &quot;pinia/nuxt/types&quot;
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    &quot;@pinia/nuxt&quot;
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  ]
</span><span class="token prefix unchanged"> </span><span class="token line">}
</span></span></code></pre></div><p>It is also recommended to give <a href="./../ssr/nuxt.html">the dedicated Nuxt section</a> a read.</p>`,31),i=[o];function p(r,c,d,l,u,h){return s(),n("div",null,i)}var k=e(t,[["render",p]]);export{f as __pageData,k as default};