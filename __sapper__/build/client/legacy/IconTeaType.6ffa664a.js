import{_ as t,a as n,i as r,s as e,b as a,S as s,e as c,g as o,h as i,d as u,r as f,k as l,l as p,u as h,n as v,v as y,w as d,x,o as m,p as k}from"./client.28fe6c4b.js";function b(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function w(t){var n;return{c:function(){n=c("div"),this.h()},l:function(t){n=o(t,"DIV",{style:!0,class:!0}),i(n).forEach(u),this.h()},h:function(){f(n,"background",g(t[0],t[1])),l(n,"class","svelte-lmn4a6")},m:function(t,r){p(t,n,r)},p:function(t,r){3&h(r,1)[0]&&f(n,"background",g(t[0],t[1]))},i:v,o:v,d:function(t){t&&u(n)}}}function g(t,n){var r=n.filter((function(n){return n.ideogram===t}))[0]||{};return"color"in r?r.color:"white"}function R(t,n,r){var e=n.type,a=[];return y(d(x.mark((function t(){var n;return x.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api-tea.oisiflorus.com/api/v1/type");case 2:if(!(n=t.sent).ok){t.next=11;break}return t.t0=r,t.next=7,n.json();case 7:t.t1=a=t.sent.api,(0,t.t0)(1,t.t1),t.next=12;break;case 11:throw new Error(text);case 12:case"end":return t.stop()}}),t)})))),t.$set=function(t){"type"in t&&r(0,e=t.type)},[e,a]}var D=function(c){t(u,s);var o,i=(o=u,function(){var t,n=m(o);if(b()){var r=m(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return k(this,t)});function u(t){var s;return n(this,u),s=i.call(this),r(a(s),t,R,w,e,{type:0}),s}return u}();export{D as I};
