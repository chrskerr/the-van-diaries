import{S as s,i as a,s as r,e,p as t,c as n,a as l,q as c,d as i,o as m,f as o,r as h,w as f,x as p,y as g,g as $,j as u,t as d,l as v,b as w,h as k,D as E,K as j,C as D}from"../../chunks/index-24dd8b8a.js";import{H as I,F as x}from"../../chunks/Footer-c07475a9.js";import{M as V}from"../../chunks/Map-430ad4c5.js";import"../../chunks/singletons-99df0d8a.js";function y(s){let a,r,$;return r=new V({props:{centre:s[0].latLng,zoom:12,size:"small",markers:[s[0]],preventInteraction:!0}}),{c(){a=e("div"),t(r.$$.fragment),this.h()},l(s){a=n(s,"DIV",{class:!0});var e=l(a);c(r.$$.fragment,e),e.forEach(i),this.h()},h(){m(a,"class","post-header-map svelte-1r03nwk")},m(s,e){o(s,a,e),h(r,a,null),$=!0},p(s,a){const e={};1&a&&(e.centre=s[0].latLng),1&a&&(e.markers=[s[0]]),r.$set(e)},i(s){$||(f(r.$$.fragment,s),$=!0)},o(s){p(r.$$.fragment,s),$=!1},d(s){s&&i(a),g(r)}}}function L(s){let a,r,t;return{c(){a=e("div"),r=e("img"),this.h()},l(s){a=n(s,"DIV",{class:!0});var e=l(a);r=n(e,"IMG",{src:!0,alt:!0,class:!0}),e.forEach(i),this.h()},h(){r.src!==(t=s[0].image)&&m(r,"src",t),m(r,"alt",""),m(r,"class","svelte-1r03nwk"),m(a,"class","image right svelte-1r03nwk")},m(s,e){o(s,a,e),$(a,r)},p(s,a){1&a&&r.src!==(t=s[0].image)&&m(r,"src",t)},d(s){s&&i(a)}}}function H(s){let a,r,V,H,M,b,z,F,q,A,C,G,K,P,R,S,B,J,N=s[0].title+"",O=s[0].summary+"",Q=s[0].html+"";a=new I({});let T=s[0].latLng&&y(s),U=s[0].image&&L(s);return B=new x({}),{c(){t(a.$$.fragment),r=u(),V=e("div"),H=e("div"),M=e("div"),b=e("header"),z=e("h1"),F=d(N),q=u(),T&&T.c(),A=u(),C=e("p"),G=d(O),K=u(),U&&U.c(),P=u(),S=u(),t(B.$$.fragment),this.h()},l(s){c(a.$$.fragment,s),r=v(s),V=n(s,"DIV",{id:!0,class:!0});var e=l(V);H=n(e,"DIV",{class:!0});var t=l(H);M=n(t,"DIV",{class:!0});var m=l(M);b=n(m,"HEADER",{class:!0});var o=l(b);z=n(o,"H1",{class:!0});var h=l(z);F=w(h,N),h.forEach(i),q=v(o),T&&T.l(o),A=v(o),C=n(o,"P",{class:!0});var f=l(C);G=w(f,O),f.forEach(i),o.forEach(i),K=v(m),U&&U.l(m),P=v(m),m.forEach(i),t.forEach(i),e.forEach(i),S=v(s),c(B.$$.fragment,s),this.h()},h(){m(z,"class","svelte-1r03nwk"),m(C,"class","svelte-1r03nwk"),m(b,"class","major svelte-1r03nwk"),R=new j(null),m(M,"class","inner svelte-1r03nwk"),m(H,"class","wrapper svelte-1r03nwk"),m(V,"id","main"),m(V,"class","svelte-1r03nwk")},m(s,e){h(a,s,e),o(s,r,e),o(s,V,e),$(V,H),$(H,M),$(M,b),$(b,z),$(z,F),$(b,q),T&&T.m(b,null),$(b,A),$(b,C),$(C,G),$(M,K),U&&U.m(M,null),$(M,P),R.m(Q,M),o(s,S,e),h(B,s,e),J=!0},p(s,[a]){(!J||1&a)&&N!==(N=s[0].title+"")&&k(F,N),s[0].latLng?T?(T.p(s,a),1&a&&f(T,1)):(T=y(s),T.c(),f(T,1),T.m(b,A)):T&&(D(),p(T,1,1,(()=>{T=null})),E()),(!J||1&a)&&O!==(O=s[0].summary+"")&&k(G,O),s[0].image?U?U.p(s,a):(U=L(s),U.c(),U.m(M,P)):U&&(U.d(1),U=null),(!J||1&a)&&Q!==(Q=s[0].html+"")&&R.p(Q)},i(s){J||(f(a.$$.fragment,s),f(T),f(B.$$.fragment,s),J=!0)},o(s){p(a.$$.fragment,s),p(T),p(B.$$.fragment,s),J=!1},d(s){g(a,s),s&&i(r),s&&i(V),T&&T.d(),U&&U.d(),s&&i(S),g(B,s)}}}async function M({page:s,fetch:a}){const r=`/writing/${s.params.slug}.json`,e=await a(r);return e.ok?{props:await e.json()}:{status:301,redirect:"/writing"}}function b(s,a,r){let{place:e}=a;return s.$$set=s=>{"place"in s&&r(0,e=s.place)},[e]}export default class extends s{constructor(s){super(),a(this,s,b,H,r,{place:0})}}export{M as load};
