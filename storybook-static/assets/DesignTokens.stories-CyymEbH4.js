import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";var n,r,i,a,o,s,c,l;function u(){return(u=e((()=>{n=t(),r=[{name:`--background`,css:`hsl(var(--background))`},{name:`--foreground`,css:`hsl(var(--foreground))`},{name:`--card`,css:`hsl(var(--card))`},{name:`--primary`,css:`hsl(var(--primary))`},{name:`--secondary`,css:`hsl(var(--secondary))`},{name:`--muted`,css:`hsl(var(--muted))`},{name:`--accent`,css:`hsl(var(--accent))`},{name:`--destructive`,css:`hsl(var(--destructive))`},{name:`--border`,css:`hsl(var(--border))`},{name:`--ring`,css:`hsl(var(--ring))`}],i=[{name:`--gradient-primary`,css:`var(--gradient-primary)`},{name:`--gradient-cta`,css:`var(--gradient-cta)`},{name:`--gradient-accent`,css:`var(--gradient-accent)`},{name:`--gradient-warm`,css:`var(--gradient-warm)`},{name:`--gradient-cool`,css:`var(--gradient-cool)`}],a=[{name:`--radius-sm`,css:`calc(var(--radius) - 4px)`},{name:`--radius-md`,css:`calc(var(--radius) - 2px)`},{name:`--radius-lg`,css:`var(--radius)`}],o=({color:e,label:t})=>(0,n.jsxs)(`div`,{className:`flex flex-col items-center gap-2 w-24`,children:[(0,n.jsx)(`div`,{className:`w-20 h-20 rounded-2xl border border-white/10`,style:{background:e}}),(0,n.jsx)(`code`,{className:`text-[10px] text-muted-foreground text-center`,children:t})]}),s={title:`Design System/Foundations/Design Tokens`,parameters:{layout:`fullscreen`,docs:{description:{component:"Single source of truth from `styles/tokens.css`. Semantic colors are HSL triplets swapped by the `[data-theme='light']` override — switch the theme in the toolbar to see every swatch react. Nothing in the design system may hardcode a color; everything consumes these tokens."}}}},c={render:()=>(0,n.jsxs)(`div`,{className:`min-h-screen p-10 space-y-12`,children:[(0,n.jsxs)(`section`,{children:[(0,n.jsx)(`h2`,{className:`text-lg font-bold mb-1`,children:`Semantic Colors`}),(0,n.jsxs)(`p`,{className:`text-sm text-muted-foreground mb-5`,children:[`Consumed as `,(0,n.jsx)(`code`,{children:`hsl(var(--token))`}),` / Tailwind tokens via the`,(0,n.jsx)(`code`,{children:` @theme`}),` bridge.`]}),(0,n.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:r.map(e=>(0,n.jsx)(o,{color:e.css,label:e.name},e.name))})]}),(0,n.jsxs)(`section`,{children:[(0,n.jsx)(`h2`,{className:`text-lg font-bold mb-1`,children:`Gradients`}),(0,n.jsx)(`p`,{className:`text-sm text-muted-foreground mb-5`,children:`Brand gradients for text, CTAs and surfaces.`}),(0,n.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:i.map(e=>(0,n.jsxs)(`div`,{className:`flex flex-col items-center gap-2 w-40`,children:[(0,n.jsx)(`div`,{className:`w-36 h-16 rounded-2xl border border-white/10`,style:{background:e.css}}),(0,n.jsx)(`code`,{className:`text-[10px] text-muted-foreground`,children:e.name})]},e.name))})]}),(0,n.jsxs)(`section`,{children:[(0,n.jsx)(`h2`,{className:`text-lg font-bold mb-1`,children:`Radii`}),(0,n.jsx)(`div`,{className:`flex flex-wrap items-end gap-4`,children:a.map(e=>(0,n.jsxs)(`div`,{className:`flex flex-col items-center gap-2 w-24`,children:[(0,n.jsx)(`div`,{className:`w-20 h-16 border border-white/15 bg-white/5`,style:{borderRadius:e.css}}),(0,n.jsx)(`code`,{className:`text-[10px] text-muted-foreground`,children:e.name})]},e.name))})]}),(0,n.jsxs)(`section`,{children:[(0,n.jsx)(`h2`,{className:`text-lg font-bold mb-1`,children:`Glass surfaces`}),(0,n.jsx)(`p`,{className:`text-sm text-muted-foreground mb-5`,children:`Frosted utility classes layered on the page background.`}),(0,n.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-3 gap-4`,children:[`glass`,`glass-light`,`glass-card`].map(e=>(0,n.jsx)(`div`,{className:`${e} rounded-3xl p-6 h-28 flex items-center`,children:(0,n.jsxs)(`code`,{className:`text-xs text-muted-foreground`,children:[`.`,e]})},e))})]})]})},l=[`Overview`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="min-h-screen p-10 space-y-12">\r
      <section>\r
        <h2 className="text-lg font-bold mb-1">Semantic Colors</h2>\r
        <p className="text-sm text-muted-foreground mb-5">\r
          Consumed as <code>hsl(var(--token))</code> / Tailwind tokens via the\r
          <code> @theme</code> bridge.\r
        </p>\r
        <div className="flex flex-wrap gap-4">\r
          {semanticColors.map(c => <Swatch key={c.name} color={c.css} label={c.name} />)}\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 className="text-lg font-bold mb-1">Gradients</h2>\r
        <p className="text-sm text-muted-foreground mb-5">\r
          Brand gradients for text, CTAs and surfaces.\r
        </p>\r
        <div className="flex flex-wrap gap-4">\r
          {gradients.map(g => <div key={g.name} className="flex flex-col items-center gap-2 w-40">\r
              <div className="w-36 h-16 rounded-2xl border border-white/10" style={{
            background: g.css
          }} />\r
              <code className="text-[10px] text-muted-foreground">\r
                {g.name}\r
              </code>\r
            </div>)}\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 className="text-lg font-bold mb-1">Radii</h2>\r
        <div className="flex flex-wrap items-end gap-4">\r
          {radii.map(r => <div key={r.name} className="flex flex-col items-center gap-2 w-24">\r
              <div className="w-20 h-16 border border-white/15 bg-white/5" style={{
            borderRadius: r.css
          }} />\r
              <code className="text-[10px] text-muted-foreground">\r
                {r.name}\r
              </code>\r
            </div>)}\r
        </div>\r
      </section>\r
\r
      <section>\r
        <h2 className="text-lg font-bold mb-1">Glass surfaces</h2>\r
        <p className="text-sm text-muted-foreground mb-5">\r
          Frosted utility classes layered on the page background.\r
        </p>\r
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">\r
          {["glass", "glass-light", "glass-card"].map(cls => <div key={cls} className={\`\${cls} rounded-3xl p-6 h-28 flex items-center\`}>\r
              <code className="text-xs text-muted-foreground">.{cls}</code>\r
            </div>)}\r
        </div>\r
      </section>\r
    </div>
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Overview,l as __namedExportsOrder,s as default};