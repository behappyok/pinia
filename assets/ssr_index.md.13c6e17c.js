import{_ as n,c as s,o as a,a as t}from"./app.fb0cb03d.js";const f='{"title":"Server Side Rendering (SSR)","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using the store outside of setup()","slug":"using-the-store-outside-of-setup"},{"level":2,"title":"State hydration","slug":"state-hydration"}],"relativePath":"ssr/index.md","lastUpdated":1637048271682}',e={},p=t(`<h1 id="server-side-rendering-ssr" tabindex="-1">Server Side Rendering (SSR) <a class="header-anchor" href="#server-side-rendering-ssr" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you are using <strong>Nuxt.js,</strong> you need to read <a href="./nuxt.html"><strong>these instructions</strong></a> instead.</p></div><p>Creating stores with Pinia should work out of the box for SSR as long as you call your <code>useStore()</code> functions at the top of <code>setup</code> functions, <code>getters</code> and <code>actions</code>:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this works because pinia knows what application is running inside of</span>
    <span class="token comment">// \`setup()\`</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> main <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="using-the-store-outside-of-setup" tabindex="-1">Using the store outside of <code>setup()</code> <a class="header-anchor" href="#using-the-store-outside-of-setup" aria-hidden="true">#</a></h2><p>If you need to use the store somewhere else, you need to pass the <code>pinia</code> instance <a href="#install-the-plugin">that was passed to the app</a> to the <code>useStore()</code> function call:</p><div class="language-js"><pre><code><span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u2705 This will work make sure the correct store is used for the</span>
  <span class="token comment">// current running app</span>
  <span class="token keyword">const</span> main <span class="token operator">=</span> <span class="token function">useMainStore</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>requiresAuth <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>main<span class="token punctuation">.</span>isLoggedIn<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&#39;/login&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Pinia conveniently adds itself as <code>$pinia</code> to your app so you can use it in functions like <code>serverPrefetch()</code>:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">serverPrefetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$pinia<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="state-hydration" tabindex="-1">State hydration <a class="header-anchor" href="#state-hydration" aria-hidden="true">#</a></h2><p>To hydrate the initial state, you need to make sure the rootState is included somewhere in the HTML for Pinia to pick it up later on. Depending on what you are using for SSR, <strong>you should escape the state for security reasons</strong>. We recommend using <a href="https://github.com/nuxt-contrib/devalue" target="_blank" rel="noopener noreferrer">@nuxt/devalue</a> which is the one used by Nuxt.js:</p><div class="language-js"><pre><code><span class="token keyword">import</span> devalue <span class="token keyword">from</span> <span class="token string">&#39;@nuxt/devalue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createPinia <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>
<span class="token comment">// retrieve the rootState server side</span>
<span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>

<span class="token comment">// after rendering the page, the root state is build and can be read directly</span>
<span class="token comment">// on \`pinia.state.value\`.</span>

<span class="token comment">// serialize, escape (VERY important if the content of the state can be changed</span>
<span class="token comment">// by the user, which is almost always the case), and place it somewhere on</span>
<span class="token comment">// the page, for example, as a global variable.</span>
<span class="token function">devalue</span><span class="token punctuation">(</span>pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
</code></pre></div><p>Depending on what you are using for SSR, you will set an <em>initial state</em> variable that will be serialized in the HTML. You should also protect yourself from XSS attacks. For example, with <a href="https://github.com/frandiox/vite-ssr" target="_blank" rel="noopener noreferrer">vite-ssr</a> you can use the <a href="https://github.com/frandiox/vite-ssr#state-serialization" target="_blank" rel="noopener noreferrer"><code>transformState</code> option</a> and <code>@nuxt/devalue</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> devalue <span class="token keyword">from</span> <span class="token string">&#39;@nuxt/devalue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">viteSSR</span><span class="token punctuation">(</span>
  App<span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    routes<span class="token punctuation">,</span>
    <span class="token function">transformState</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span> <span class="token operator">?</span> <span class="token function">devalue</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token operator">:</span> state
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> initialState <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// this will be stringified and set to window.__INITIAL_STATE__</span>
      initialState<span class="token punctuation">.</span>pinia <span class="token operator">=</span> pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// on the client side, we restore the state</span>
      pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value <span class="token operator">=</span> initialState<span class="token punctuation">.</span>pinia
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre></div><p>You can use <a href="https://github.com/nuxt-contrib/devalue#see-also" target="_blank" rel="noopener noreferrer">other alternatives</a> to <code>@nuxt/devalue</code> depending on what you need, e.g. if you can serialize and parse your state with <code>JSON.stringify()</code>/<code>JSON.parse()</code>, <strong>you could improve your performance by a lot</strong>.</p><p>Adapt this strategy to your environment. Make sure to hydrate pinia&#39;s state before calling any <code>useStore()</code> function on client side. For example, if we serialize the state into a <code>&lt;script&gt;</code> tag to make it accessible globally on client side through <code>window.__pinia</code>, we can write this:</p><div class="language-js"><pre><code><span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>

<span class="token comment">// must be set by the user</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>isClient<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>__pinia<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div>`,17),o=[p];function c(i,u,l,r,k,d){return a(),s("div",null,o)}var m=n(e,[["render",c]]);export{f as __pageData,m as default};
