import{S as s,i as a,s as e,e as i,a as t,t as c,c as l,b as r,d as o,f as n,g as p,h as d,j as h,k as u,l as f,r as v,m,n as y,o as k,p as g}from"./client.dbc18878.js";function E(s){let a,e,E,q,w,A,b,x,D,I,N,P,j,C,F;return{c(){a=i("aside"),e=i("span"),E=t(),q=i("a"),w=i("audio"),A=i("source"),x=t(),D=i("span"),I=c(s[1]),N=t(),P=i("span"),j=c(s[0]),this.h()},l(i){a=l(i,"ASIDE",{class:!0});var t=r(a);e=l(t,"SPAN",{class:!0,style:!0}),r(e).forEach(o),E=n(t),q=l(t,"A",{class:!0,href:!0});var c=r(q);w=l(c,"AUDIO",{id:!0});var d=r(w);A=l(d,"SOURCE",{src:!0,type:!0}),d.forEach(o),x=n(c),D=l(c,"SPAN",{class:!0,title:!0});var h=r(D);I=p(h,s[1]),N=n(h),P=l(h,"SPAN",{class:!0,title:!0});var u=r(P);j=p(u,s[0]),u.forEach(o),h.forEach(o),c.forEach(o),t.forEach(o),this.h()},h(){d(e,"class","color svelte-k9qalw"),h(e,"background",s[2][s[0]]),A.src!==(b="assets/audio/"+s[0]+".mp3")&&d(A,"src",b),d(A,"type","audio/mpeg"),d(w,"id",s[0]),d(P,"class","ideogram voice svelte-k9qalw"),d(P,"title","voix"),d(D,"class","pinyin voice svelte-k9qalw"),d(D,"title","voix"),d(q,"class","text svelte-k9qalw"),d(q,"href",C="/liste-des-thes-"+s[0]),d(a,"class","type svelte-k9qalw")},m(i,t,c){u(i,a,t),f(a,e),f(a,E),f(a,q),f(q,w),f(w,A),f(q,x),f(q,D),f(D,I),f(D,N),f(D,P),f(P,j),c&&v(F),F=[m(P,"click",(function(){y(S(s[0]))&&S(s[0]).apply(this,arguments)})),m(D,"click",(function(){y(S(s[0]))&&S(s[0]).apply(this,arguments)}))]},p(a,[i]){s=a,1&i&&h(e,"background",s[2][s[0]]),1&i&&A.src!==(b="assets/audio/"+s[0]+".mp3")&&d(A,"src",b),1&i&&d(w,"id",s[0]),2&i&&k(I,s[1]),1&i&&k(j,s[0]),1&i&&C!==(C="/liste-des-thes-"+s[0])&&d(q,"href",C)},i:g,o:g,d(s){s&&o(a),v(F)}}}function S(s){document.querySelector(`#${s}`).play()}function q(s,a,e){let{ideogram:i}=a,{pinyin:t}=a;return s.$set=s=>{"ideogram"in s&&e(0,i=s.ideogram),"pinyin"in s&&e(1,t=s.pinyin)},[i,t,{"綠茶":"#58D68D","白茶":"white","黃茶":"#F4D03F","青茶":"#002fa7","紅茶":"#C0392B","黑茶":"black"}]}class w extends s{constructor(s){super(),a(this,s,q,E,e,{ideogram:0,pinyin:1})}}export{w as I};
