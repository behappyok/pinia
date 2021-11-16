import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const h='{"title":"Getters","description":"","frontmatter":{},"headers":[{"level":2,"title":"Accessing other getters","slug":"accessing-other-getters"},{"level":2,"title":"Passing arguments to getters","slug":"passing-arguments-to-getters"},{"level":2,"title":"Accessing other stores getters","slug":"accessing-other-stores-getters"},{"level":2,"title":"Usage with setup()","slug":"usage-with-setup"},{"level":2,"title":"Usage with the options API","slug":"usage-with-the-options-api"}],"relativePath":"core-concepts/getters.md","lastUpdated":1637048271678}',e={},p=t(`<h1 id="getters" tabindex="-1">Getters <a class="header-anchor" href="#getters" aria-hidden="true">#</a></h1><p>Getters are exactly the equivalent of <a href="https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values" target="_blank" rel="noopener noreferrer">computed values</a> for the state of a Store. They can be defined with the <code>getters</code> property in <code>defineStore()</code>. They receive the <code>state</code> as the first parameter <strong>to encourage</strong> the usage of arrow function:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>counter <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Most of the time, getters will only rely on the state, however, they might need to use other getters. Because of this, we can get access to the <em>whole store instance</em> through <code>this</code> when defining a regular function <strong>but it is necessary to define the type of the return type (in TypeScript)</strong>. This is due to a known limitation in TypeScript and <strong>doesn&#39;t affect getters defined with an arrow function nor getters not using <code>this</code></strong>:</p><div class="language-ts"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// automatically infers the return type as a number</span>
    <span class="token function">doubleCount</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span>counter <span class="token operator">*</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// the return type **must** be explicitly set</span>
    <span class="token function">doublePlusOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
      <span class="token comment">// autocompletion and typings for the whole store \u2728</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>counter <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Then you can access the getter directly on the store instance:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Double count is {{ store.doubleCount }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="accessing-other-getters" tabindex="-1">Accessing other getters <a class="header-anchor" href="#accessing-other-getters" aria-hidden="true">#</a></h2><p>As with computed properties, you can combine multiple getters. Access any other getter via <code>this</code>. Even if you are not using TypeScript, you can hint your IDE for types with the <a href="https://jsdoc.app/tags-returns.html" target="_blank" rel="noopener noreferrer">JSDoc</a>:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// type is automatically inferred because we are not using \`this\`</span>
    <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>counter <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// here we need to add the type ourselves (using JSDoc in JS). We can also</span>
    <span class="token comment">// use this to document the getter</span>
    <span class="token comment">/**
     * Returns the counter value times two plus one.
     *
     * @returns {number}
     */</span>
    <span class="token function">doubleCountPlusOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// autocompletion \u2728</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>doubleCount <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="passing-arguments-to-getters" tabindex="-1">Passing arguments to getters <a class="header-anchor" href="#passing-arguments-to-getters" aria-hidden="true">#</a></h2><p><em>Getters</em> are just <em>computed</em> properties behind the scenes, so it&#39;s not possible to pass any parameters to them. However, you can return a function from the <em>getter</em> to accept any arguments:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getUserById</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">userId</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> user<span class="token punctuation">.</span>id <span class="token operator">===</span> userId<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>and use in component:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> getUserById<span class="token operator">:</span> store<span class="token punctuation">.</span>getUserById <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
User 2: {{ getUserById(2) }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Note that when doing this, <strong>getters are not cached anymore</strong>, they are simply functions that you invoke. You can however cache some results inside of the getter itself, which is uncommon but should prove more performant:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">getActiveUserById</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> activeUsers <span class="token operator">=</span> state<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> user<span class="token punctuation">.</span>active<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">userId</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> activeUsers<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> user<span class="token punctuation">.</span>id <span class="token operator">===</span> userId<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="accessing-other-stores-getters" tabindex="-1">Accessing other stores getters <a class="header-anchor" href="#accessing-other-stores-getters" aria-hidden="true">#</a></h2><p>To use another store getters, you can directly <em>use it</em> inside of the <em>getter</em>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useOtherStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./other-store&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  getters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">otherGetter</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> otherStore <span class="token operator">=</span> <span class="token function">useOtherStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span>localData <span class="token operator">+</span> otherStore<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="usage-with-setup" tabindex="-1">Usage with <code>setup()</code> <a class="header-anchor" href="#usage-with-setup" aria-hidden="true">#</a></h2><p>You can directly access any getter as a property of the store (exactly like state properties):</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    store<span class="token punctuation">.</span>counter <span class="token operator">=</span> <span class="token number">3</span>
    store<span class="token punctuation">.</span>doubleCount <span class="token comment">// 6</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="usage-with-the-options-api" tabindex="-1">Usage with the options API <a class="header-anchor" href="#usage-with-the-options-api" aria-hidden="true">#</a></h2><p>You can use the same <code>mapState()</code> function used in the <a href="./state.html#options-api">previous section of state</a> to map to getters:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// gives access to this.doubleCounter inside the component</span>
    <span class="token comment">// same as reading from store.doubleCounter</span>
    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;doubleCount&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// same as above but registers it as this.myOwnName</span>
    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      myOwnName<span class="token operator">:</span> <span class="token string">&#39;doubleCounter&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">// you can also write a function that gets access to the store</span>
      <span class="token function-variable function">double</span><span class="token operator">:</span> <span class="token parameter">store</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span>doubleCount<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div>`,26),o=[p];function c(u,l,r,i,k,d){return a(),s("div",null,o)}var m=n(e,[["render",c]]);export{h as __pageData,m as default};
