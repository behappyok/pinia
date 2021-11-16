import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const f='{"title":"\u5B9A\u4E49\u4E00\u4E2Astore","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528store","slug":"\u4F7F\u7528store"}],"relativePath":"core-concepts/index.md","lastUpdated":1637048271678}',o={},e=t(`<h1 id="\u5B9A\u4E49\u4E00\u4E2Astore" tabindex="-1">\u5B9A\u4E49\u4E00\u4E2Astore <a class="header-anchor" href="#\u5B9A\u4E49\u4E00\u4E2Astore" aria-hidden="true">#</a></h1><p>\u5728\u6DF1\u5165\u7814\u7A76\u6838\u5FC3\u6982\u5FF5\u4E4B\u524D\uFF0C\u6211\u4EEC\u9700\u8981\u77E5\u9053 store \u662F\u901A\u8FC7 <code>defineStore</code> \u6765\u5B9A\u4E49\u7684\uFF0C\u5B83\u9700\u8981\u4E00\u4E2A<strong>\u552F\u4E00</strong>\u540D\u79F0\u4F5C\u4E3A\u7B2C\u4E00\u4E2A\u53C2\u6570\u4F20\u9012\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token comment">// useStore \u4E5F\u53EF\u4EE5\u547D\u540D\u4E3A useUser, useCart</span>
<span class="token comment">// \u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5E94\u7528\u7A0B\u5E8F\u4E2Dstore\u7684\u552F\u4E00\u6807\u8BC6</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5176\u4ED6\u9009\u9879...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\u8FD9\u4E2A <em>\u552F\u4E00\u540D\u79F0</em>\uFF0C\u4E5F\u79F0\u4E3A <em>id</em>\uFF0C\u662F\u5FC5\u987B\u7684\uFF0CPinia \u4F7F\u7528\u5B83\u6765\u5C06store\u4E0E\u5F00\u53D1\u5DE5\u5177\u8054\u7CFB\u8D77\u6765\u3002\u5C06\u8FD4\u56DE\u7684\u51FD\u6570\u547D\u540D\u4E3A <em>use...</em> \u662F\u4E00\u79CD\u60EF\u7528\u7684\u7EC4\u5408\u5F0F\u4F7F\u7528\u7684\u7EA6\u5B9A\u3002</p><h2 id="\u4F7F\u7528store" tabindex="-1">\u4F7F\u7528store <a class="header-anchor" href="#\u4F7F\u7528store" aria-hidden="true">#</a></h2><p>\u6211\u4EEC\u79F0\u4E4B\u524D\u7684\u884C\u4E3A\u662F <em>\u5B9A\u4E49</em> \u4E00\u4E2Astore\u800C\u4E0D\u662F\u521B\u5EFAstore\uFF0C\u56E0\u4E3Astore\u662F\u5728<code>setup()</code>\u51FD\u6570\u5185\u901A\u8FC7\u8C03\u7528 <code>useStore()</code> \u65F6\u521B\u5EFA\u7684\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/stores/counter&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u60A8\u53EF\u4EE5\u5728template\u4E2D\u53EF\u4EE5\u4F7F\u7528\u6574\u4E2A\u8FD4\u56DE\u7684store\u5B9E\u4F8B</span>
      store<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u60A8\u53EF\u4EE5\u6839\u636E\u9700\u8981\u5B9A\u4E49\u4EFB\u610F\u6570\u91CF\u7684store\uFF0C\u4F46\u60A8<strong>\u5E94\u5F53\u5728\u4E0D\u540C\u7684\u6587\u4EF6\u4E2D\u5B9A\u4E49\u6BCF\u4E2Astore</strong>\u4EE5\u4FBF\u5145\u5206\u4F7F\u7528 pinia \u7684\u529F\u80FD (\u4F8B\u5982\u4F7F\u60A8\u7684bundle\u5305\u80FD\u591F\u81EA\u52A8\u8FDB\u884C\u4EE3\u7801\u62C6\u5206\u4EE5\u53CATypeScript \u7C7B\u578B\u5F15\u7528)\u3002</p><p>\u5982\u679C\u60A8\u8FD8\u6CA1\u6709\u4F7F\u7528setup\u7EC4\u4EF6, <a href="./../cookbook/options-api.html">\u4F60\u4F9D\u7136\u53EF\u4EE5\u901A\u8FC7 <em>map\u8F85\u52A9\u51FD\u6570</em> \u6765\u8C03\u7528 Pinia\u72B6\u6001\u5E93</a>.</p><p>store\u5B9E\u4F8B\u5316\u5B8C\u6210\u540E\uFF0C\u4F60\u4FBF\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EEstore\u4E2D\u5B9A\u4E49\u7684 <code>state</code>, <code>getters</code>,<code>actions</code>\u5C5E\u6027\u3002\u6211\u4EEC\u5C06\u5728\u63A5\u4E0B\u6765\u7684\u7BC7\u5E45\u4E2D\u8BE6\u7EC6\u4ECB\u7ECD\u8FD9\u4E9B\u5185\u5BB9\u3002but autocompletion will help you.</p><p>\u503C\u5F97\u6CE8\u610F\u7684\u662F <code>store</code> \u662F\u4E00\u4E2A\u5305\u88C5\u5728<code>reactive</code> \u4E2D\u7684\u4E00\u4E2A\u5BF9\u8C61 , \u8FD9\u5C31\u610F\u5473\u7740\u6211\u4EEC\u4E0D\u9700\u8981\u5728\u4F7F\u7528 getter \u4E4B\u540E\u518D\u5199 <code>.value</code> \uFF0C\u4F46\u662F\uFF0C\u5982\u540C\u5728 <code>setup</code>\u4E2D\u7684<code>props</code> \u4E00\u6837 , <strong>\u6211\u4EEC\u65E0\u6CD5\u5BF9\u5176\u8FDB\u884C\u89E3\u6784</strong>:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// \u274C This won&#39;t work because it breaks reactivity</span>
    <span class="token comment">// it&#39;s the same as destructuring from \`props\`</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> doubleCount <span class="token punctuation">}</span> <span class="token operator">=</span> store

    name <span class="token comment">// &quot;eduardo&quot;</span>
    doubleCount <span class="token comment">// 2</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token comment">// will always be &quot;eduardo&quot;</span>
      name<span class="token punctuation">,</span>
      <span class="token comment">// will always be 2</span>
      doubleCount<span class="token punctuation">,</span>
      <span class="token comment">// this one will be reactive</span>
      doubleValue<span class="token operator">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span>doubleCount<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\u4E3A\u4E86\u4F7F\u4ECEstore\u4E2D\u83B7\u53D6\u7684\u5C5E\u6027\u4F9D\u7136\u5177\u5907\u54CD\u5E94\u5F0F\u7279\u6027\uFF0C\u60A8\u9700\u8981\u4F7F\u7528<code>storeToRefs()</code>\u51FD\u6570. \u5B83\u80FD\u591F\u4E3A\u54CD\u5E94\u5F0F\u5C5E\u6027\u521B\u5EFA\u5F15\u7528\u3002\u8FD9\u5728\u60A8\u4EC5\u4F7F\u7528 store \u4E2D\u7684\u72B6\u6001\u4F46\u4E0D\u8C03\u7528\u4EFB\u4F55\u64CD\u4F5C\u65F6\u5F88\u6709\u7528\uFF1A</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> storeToRefs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// \`name\` and \`doubleCount\` are reactive refs</span>
    <span class="token comment">// This will also create refs for properties added by plugins</span>
    <span class="token comment">// but skip any action or non reactive (non ref/reactive) property</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> doubleCount <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">storeToRefs</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      name<span class="token punctuation">,</span>
      doubleCount
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,14),p=[e];function c(u,l,r,i,k,d){return a(),s("div",null,p)}var w=n(o,[["render",c]]);export{f as __pageData,w as default};
