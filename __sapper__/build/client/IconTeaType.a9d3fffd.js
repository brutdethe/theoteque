import{S as t,i as s,s as a,e,b as o,f as i,d as r,l as n,h as c,j as l,n as p,o as h}from"./client.aebc9542.js";function u(t){let s;return{c(){s=e("div"),this.h()},l(t){s=o(t,"DIV",{style:!0,class:!0}),i(s).forEach(r),this.h()},h(){n(s,"background",f(t[0],t[1])),c(s,"class","svelte-lmn4a6")},m(t,a){l(t,s,a)},p(t,[a]){3&a&&n(s,"background",f(t[0],t[1]))},i:p,o:p,d(t){t&&r(s)}}}function f(t,s){const a=s.filter(s=>s.ideogram===t)[0]||{};return"color"in a?a.color:"white"}function d(t,s,a){let{type:e}=s,o=[];return h(async()=>{const t=await fetch("https://api-tea.oisiflorus.com/api/v1/type");if(!t.ok)throw new Error(text);a(1,o=(await t.json()).api)}),t.$set=t=>{"type"in t&&a(0,e=t.type)},[e,o]}class y extends t{constructor(t){super(),s(this,t,d,u,a,{type:0})}}export{y as I};
