if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5YEkPeDbUPZ9nGrW-DpHv/_buildManifest.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/5YEkPeDbUPZ9nGrW-DpHv/_ssgManifest.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/3ef630e34cd10ba68f9d468ac363ff81c534e1e9.edbe301c064e4faedffa.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/commons.a94f124302cbaeafdd36.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/framework.1cddd991bfe63666dc71.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/main-b1bd618bda6b27f7bbaa.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/pages/_app-eb94000826224d7b72ed.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/pages/_error-0b2d585f318a127a1819.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/pages/index-8f730e8358f85b34eebf.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/pages/podcasts/%5Bid%5D-6b60b33eb9523da086bf.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/polyfills-8f31809deb7932dd0187.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/css/3e35cbb6ab49a296e936.css",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/_next/static/css/6e9ef204d6fd7ac61493.css",revision:"5YEkPeDbUPZ9nGrW-DpHv"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/icon-192x192.png",revision:"fb6c97cd6989e1f7e7a0922ebfbf713e"},{url:"/icon-256x256.png",revision:"9adbeea0a0dd63ab98145f076059a537"},{url:"/icon-384x384.png",revision:"76aba272ade14ea2b68241d69fb6a26d"},{url:"/icon-512x512.png",revision:"d35c7429a46be64f031e179a71f2c417"},{url:"/manifest.json",revision:"17f8a70514eaa3c4edca9df514db88e1"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/api\/(?!auth\/callback\/).*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/(?!api\/).*$/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
