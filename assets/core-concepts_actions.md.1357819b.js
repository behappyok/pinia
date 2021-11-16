import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const h='{"title":"Actions","description":"","frontmatter":{},"headers":[{"level":2,"title":"Accessing other stores actions","slug":"accessing-other-stores-actions"},{"level":2,"title":"Usage with setup()","slug":"usage-with-setup"},{"level":2,"title":"Usage with the options API","slug":"usage-with-the-options-api"},{"level":2,"title":"Subscribing to actions","slug":"subscribing-to-actions"}],"relativePath":"core-concepts/actions.md","lastUpdated":1637048271678}',o={},p=t(`<h1 id="actions" tabindex="-1">Actions <a class="header-anchor" href="#actions" aria-hidden="true">#</a></h1><p>Actions are the equivalent of <a href="https://v3.vuejs.org/guide/data-methods.html#methods" target="_blank" rel="noopener noreferrer">methods</a> in components. They can be defined with the <code>actions</code> property in <code>defineStore()</code> and <strong>they are perfect to define business logic</strong>:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> useStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>counter<span class="token operator">++</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">randomizeCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>counter <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token number">100</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Like <a href="./getters.html">getters</a>, actions get access to the <em>whole store instance</em> through <code>this</code> with <strong>full typing (and autocompletion \u2728) support</strong>. <strong>Unlike them, <code>actions</code> can be asynchronous</strong>, you can <code>await</code> inside of them any API call or even other actions! Here is an example using <a href="https://github.com/posva/mande" target="_blank" rel="noopener noreferrer">Mande</a>. Note the library you use doesn&#39;t matter as long as you get a <code>Promise</code>, you could even use the native <code>fetch</code> function (browser only):</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mande <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mande&#39;</span>

<span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token function">mande</span><span class="token punctuation">(</span><span class="token string">&#39;/api/users&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useUsers <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    data<span class="token operator">:</span> userData<span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">registerUser</span><span class="token punctuation">(</span><span class="token parameter">login<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userData <span class="token operator">=</span> <span class="token keyword">await</span> api<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span> login<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">showTooltip</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Welcome back </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>userData<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">showTooltip</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
        <span class="token comment">// let the form component display the error</span>
        <span class="token keyword">return</span> error
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>You are also completely free to set whatever arguments you want and return anything. When calling actions, everything will be automatically inferred!</p><p>Actions are invoked like methods:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// call the action as a method of the store</span>
    main<span class="token punctuation">.</span><span class="token function">randomizeCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="accessing-other-stores-actions" tabindex="-1">Accessing other stores actions <a class="header-anchor" href="#accessing-other-stores-actions" aria-hidden="true">#</a></h2><p>To use another store, you can directly <em>use it</em> inside of the <em>action</em>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useAuthStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./auth-store&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useSettingsStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;settings&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchUserPreferences</span><span class="token punctuation">(</span><span class="token parameter">preferences</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> auth <span class="token operator">=</span> <span class="token function">useAuthStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>auth<span class="token punctuation">.</span>isAuthenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>preferences <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchPreferences</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;User must be authenticated&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="usage-with-setup" tabindex="-1">Usage with <code>setup()</code> <a class="header-anchor" href="#usage-with-setup" aria-hidden="true">#</a></h2><p>You can directly call any action as a method of the store:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    store<span class="token punctuation">.</span><span class="token function">randomizeCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="usage-with-the-options-api" tabindex="-1">Usage with the options API <a class="header-anchor" href="#usage-with-the-options-api" aria-hidden="true">#</a></h2><p>If you are not using the composition API, and you are using <code>computed</code>, <code>methods</code>, ..., you can use the <code>mapActions()</code> helper to map actions properties as methods in your component:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapActions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// gives access to this.increment() inside the component</span>
    <span class="token comment">// same as calling from store.increment()</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// same as above but registers it as this.myOwnName()</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span>useStore<span class="token punctuation">,</span> <span class="token punctuation">{</span> myOwnName<span class="token operator">:</span> <span class="token string">&#39;doubleCounter&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="subscribing-to-actions" tabindex="-1">Subscribing to actions <a class="header-anchor" href="#subscribing-to-actions" aria-hidden="true">#</a></h2><blockquote><p><a href="https://github.com/posva/pinia/issues/240" target="_blank" rel="noopener noreferrer">Give feedback on <code>$onAction()</code></a></p></blockquote><p>It is possible to observe actions and their outcome with <code>store.$onAction()</code>. The callback passed to it is executed before the action itself. <code>after</code> handle promises and allows you to change the returned value of the action. <code>onError</code> allows you to stop the error from propagating. These are useful for tracking errors at runtime, similar to <a href="https://v3.vuejs.org/guide/tooling/deployment.html#tracking-runtime-errors" target="_blank" rel="noopener noreferrer">this tip in the Vue docs</a>.</p><p>Here is an example that logs before running actions and after they resolve/reject.</p><div class="language-js"><pre><code><span class="token keyword">const</span> unsubscribe <span class="token operator">=</span> someStore<span class="token punctuation">.</span><span class="token function">$onAction</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token punctuation">,</span> <span class="token comment">// name of the action</span>
    store<span class="token punctuation">,</span> <span class="token comment">// store instance, same as \`someStore\`</span>
    args<span class="token punctuation">,</span> <span class="token comment">// array of parameters passed to the action</span>
    after<span class="token punctuation">,</span> <span class="token comment">// hook after the action returns or resolves</span>
    onError<span class="token punctuation">,</span> <span class="token comment">// hook if the action throws or rejects</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// a shared variable for this specific action call</span>
    <span class="token keyword">const</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// this will trigger before an action on \`store\` is executed</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Start &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; with params [</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>args<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">].</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>

    <span class="token comment">// this will trigger if the action succeeds and after it has fully run.</span>
    <span class="token comment">// it waits for any returned promised</span>
    <span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Finished &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; after </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
          Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime
        <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">ms.\\nResult: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>result<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// this will trigger if the action throws or returns a promise that rejects</span>
    <span class="token function">onError</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Failed &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; after </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">ms.\\nError: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>error<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">// manually remove the listener</span>
<span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>By default, <em>action subscriptions</em> are bound to the component where they are added (if the store is inside a component&#39;s <code>setup()</code>). Meaning, they will be automatically removed when the component is unmounted. If you want to keep them after the component is unmounted, pass <code>true</code> as the second argument to <em>detach</em> the <em>action subscription</em> from the current component:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> someStore <span class="token operator">=</span> <span class="token function">useSomeStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// this subscription will be kept after the component is unmounted</span>
    someStore<span class="token punctuation">.</span><span class="token function">$onAction</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div>`,24),e=[p];function c(u,i,l,r,k,d){return a(),s("div",null,e)}var g=n(o,[["render",c]]);export{h as __pageData,g as default};
