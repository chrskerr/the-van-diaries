import{r as e,a as t,g as s,_ as o}from"./singletons-99df0d8a.js";import{S as a,i as r,s as n,e as i,c,a as p,d as l,o as m,G as d,f as h,n as u,B as f}from"./index-24dd8b8a.js";const v=async function(t,s){return e.goto(t,s,[])},_=function(e){return t.prefetch(new URL(e,s(document)))};function g(e){let t,s;return{c(){t=i("div"),this.h()},l(e){t=c(e,"DIV",{id:!0,class:!0}),p(t).forEach(l),this.h()},h(){m(t,"id","map"),m(t,"class",s=d(`${e[0]}`)+" svelte-me4sil")},m(e,s){h(e,t,s)},p(e,[o]){1&o&&s!==(s=d(`${e[0]}`)+" svelte-me4sil")&&m(t,"class",s)},i:u,o:u,d(e){e&&l(t)}}}function z(e,t,s){let{size:a}=t,{zoom:r}=t,{centre:n}=t,{markers:i}=t,{preventInteraction:c=!1}=t;return f((async()=>{{const e=await o((()=>import("./leaflet-src-a890f36b.js").then((function(e){return e.l}))),["/_app/chunks/leaflet-src-a890f36b.js","/_app/chunks/Footer-c07475a9.js","/_app/assets/Footer-9b8a2b02.css","/_app/chunks/index-24dd8b8a.js"]),t=await o((()=>import("./geosearch.module-e9e7908c.js")),["/_app/chunks/geosearch.module-e9e7908c.js","/_app/chunks/leaflet-src-a890f36b.js","/_app/chunks/Footer-c07475a9.js","/_app/assets/Footer-9b8a2b02.css","/_app/chunks/index-24dd8b8a.js"]),s=e.map("map").setView(n,r);e.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',detectRetina:!0}).addTo(s),setTimeout((()=>s.invalidateSize()),50),c||s.addControl(new t.GeoSearchControl({provider:new t.OpenStreetMapProvider,style:"bar"}));const a=e.divIcon({html:"<span class='feather-location' />"});i.forEach((({title:t,latLng:o,slug:r})=>{const n=e.marker(o,{icon:a}).addTo(s).bindTooltip(t,{direction:"top"});c||(n.on("click",(()=>{v(`/posts/${r}`)})),n.on("mouseover",(()=>{_(`/posts/${r}`)})))}))}})),e.$$set=e=>{"size"in e&&s(0,a=e.size),"zoom"in e&&s(1,r=e.zoom),"centre"in e&&s(2,n=e.centre),"markers"in e&&s(3,i=e.markers),"preventInteraction"in e&&s(4,c=e.preventInteraction)},[a,r,n,i,c]}class w extends a{constructor(e){super(),r(this,e,z,g,n,{size:0,zoom:1,centre:2,markers:3,preventInteraction:4})}}export{w as M};
