import{_ as t,a,i as s,s as e,b as c,S as i,e as n,c as r,t as o,d as l,f as u,g as f,h as p,j as h,k as v,l as d,m as y,n as m,r as k,o as g,p as E,q as S,u as q,v as w,w as D,x}from"./client.6179a4a3.js";function A(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function R(t){var a,s,e,c,i,D,x,A,R,P,I,N,j,C,F;return{c:function(){a=n("aside"),s=n("span"),e=r(),c=n("a"),i=n("audio"),D=n("source"),A=r(),R=n("span"),P=o(t[1]),I=r(),N=n("span"),j=o(t[0]),this.h()},l:function(n){a=l(n,"ASIDE",{class:!0});var r=u(a);s=l(r,"SPAN",{class:!0,style:!0}),u(s).forEach(f),e=p(r),c=l(r,"A",{class:!0,href:!0});var o=u(c);i=l(o,"AUDIO",{id:!0});var v=u(i);D=l(v,"SOURCE",{src:!0,type:!0}),v.forEach(f),A=p(o),R=l(o,"SPAN",{class:!0,title:!0});var d=u(R);P=h(d,t[1]),I=p(d),N=l(d,"SPAN",{class:!0,title:!0});var y=u(N);j=h(y,t[0]),y.forEach(f),d.forEach(f),o.forEach(f),r.forEach(f),this.h()},h:function(){v(s,"class","color svelte-k9qalw"),d(s,"background",t[2][t[0]]),D.src!==(x="assets/audio/"+t[0]+".mp3")&&v(D,"src",x),v(D,"type","audio/mpeg"),v(i,"id",t[0]),v(N,"class","ideogram voice svelte-k9qalw"),v(N,"title","voix"),v(R,"class","pinyin voice svelte-k9qalw"),v(R,"title","voix"),v(c,"class","text svelte-k9qalw"),v(c,"href",C="/liste-des-thes-"+t[0]),v(a,"class","type svelte-k9qalw")},m:function(n,r,o){y(n,a,r),m(a,s),m(a,e),m(a,c),m(c,i),m(i,D),m(c,A),m(c,R),m(R,P),m(R,I),m(R,N),m(N,j),o&&k(F),F=[g(N,"click",(function(){E(b(t[0]))&&b(t[0]).apply(this,arguments)})),g(R,"click",(function(){E(b(t[0]))&&b(t[0]).apply(this,arguments)}))]},p:function(a,e){var n=S(e,1)[0];t=a,1&n&&d(s,"background",t[2][t[0]]),1&n&&D.src!==(x="assets/audio/"+t[0]+".mp3")&&v(D,"src",x),1&n&&v(i,"id",t[0]),2&n&&q(P,t[1]),1&n&&q(j,t[0]),1&n&&C!==(C="/liste-des-thes-"+t[0])&&v(c,"href",C)},i:w,o:w,d:function(t){t&&f(a),k(F)}}}function b(t){document.querySelector("#".concat(t)).play()}function P(t,a,s){var e=a.ideogram,c=a.pinyin;return t.$set=function(t){"ideogram"in t&&s(0,e=t.ideogram),"pinyin"in t&&s(1,c=t.pinyin)},[e,c,{"綠茶":"#58D68D","白茶":"white","黃茶":"#F4D03F","青茶":"#002fa7","紅茶":"#C0392B","黑茶":"black"}]}var I=function(n){t(l,i);var r,o=(r=l,function(){var t,a=D(r);if(A()){var s=D(this).constructor;t=Reflect.construct(a,arguments,s)}else t=a.apply(this,arguments);return x(this,t)});function l(t){var i;return a(this,l),i=o.call(this),s(c(i),t,P,R,e,{ideogram:0,pinyin:1}),i}return l}();export{I};
