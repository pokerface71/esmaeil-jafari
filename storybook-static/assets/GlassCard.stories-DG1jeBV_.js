import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";import{a as n,d as r,i,n as a,o,p as s,u as c}from"./fa-CvQaGEOO.js";import{i as l,n as u,r as d,t as f}from"./IconBox-Dy_53nsv.js";var p,m,h,g,_,v,y;function b(){return(b=e((()=>{p=t(),s(),l(),u(),m={title:`Design System/Atoms/Surfaces`,parameters:{docs:{autodocs:!1}}},h={name:`GlassCard`,render:()=>(0,p.jsx)(d,{className:`rounded-3xl p-8 w-80`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{className:`font-bold text-lg mb-2`,children:`Frosted surface`}),(0,p.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`The base surface of every card in the design system.`})]})})},g={name:`GlassCard (spotlight)`,render:()=>(0,p.jsx)(d,{spotlight:!0,className:`rounded-3xl p-8 w-80`,children:(0,p.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Move the cursor over this card — the radial glow follows the pointer.`})})},_={violet:(0,p.jsx)(r,{}),fuchsia:(0,p.jsx)(a,{}),sky:(0,p.jsx)(o,{}),amber:(0,p.jsx)(a,{}),green:(0,p.jsx)(c,{}),blue:(0,p.jsx)(i,{}),pink:(0,p.jsx)(n,{})},v={name:`IconBox tone × size matrix`,render:()=>(0,p.jsx)(`div`,{className:`flex flex-col gap-6`,children:[`sm`,`md`,`lg`].map(e=>(0,p.jsx)(`div`,{className:`flex items-center gap-4`,children:[`violet`,`fuchsia`,`sky`,`amber`,`green`,`blue`,`pink`].map(t=>(0,p.jsx)(f,{tone:t,size:e,icon:_[t]},t))},e))})},y=[`GlassCardDefault`,`GlassCardSpotlight`,`IconBoxMatrix`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "GlassCard",
  render: () => <GlassCard className="rounded-3xl p-8 w-80">\r
      <div>\r
        <h3 className="font-bold text-lg mb-2">Frosted surface</h3>\r
        <p className="text-sm text-muted-foreground">\r
          The base surface of every card in the design system.\r
        </p>\r
      </div>\r
    </GlassCard>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "GlassCard (spotlight)",
  render: () => <GlassCard spotlight className="rounded-3xl p-8 w-80">\r
      <p className="text-sm text-muted-foreground">\r
        Move the cursor over this card — the radial glow follows the pointer.\r
      </p>\r
    </GlassCard>
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "IconBox tone × size matrix",
  render: () => <div className="flex flex-col gap-6">\r
      {(["sm", "md", "lg"] as const).map(size => <div key={size} className="flex items-center gap-4">\r
          {(["violet", "fuchsia", "sky", "amber", "green", "blue", "pink"] as const).map(tone => <IconBox key={tone} tone={tone} size={size} icon={toneIcons[tone]} />)}\r
        </div>)}\r
    </div>
}`,...v.parameters?.docs?.source}}}})))()}b();export{h as GlassCardDefault,g as GlassCardSpotlight,v as IconBoxMatrix,y as __namedExportsOrder,m as default};