(function(e){function n(n){for(var a,r,u=n[0],i=n[1],d=n[2],h=0,f=[];h<u.length;h++)r=u[h],c[r]&&f.push(c[r][0]),c[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);s&&s(n);while(f.length)f.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,r=1;r<t.length;r++){var u=t[r];0!==c[u]&&(a=!1)}a&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},r={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-030d24b0":"1a8490db","chunk-05169ae4":"54662d03","chunk-06db2872":"77eba7f4","chunk-13e2d89a":"71483d31","chunk-14da9915":"69860f17","chunk-00f412aa":"24a69c68","chunk-2d230f8d":"1ae7148f","chunk-6c5384d2":"dd74f2e2","chunk-2c2e9677":"5ada45ff","chunk-2d0aba9c":"99be17a6","chunk-2d0c1074":"1e6af150","chunk-2d21a3d2":"4b92c9b9","chunk-2d229803":"1d7e3761","chunk-2d230cb3":"a569fac4","chunk-4c765efe":"2698b8c7","chunk-5ad11704":"0c473e2c","chunk-795f3df8":"a3cae0d2"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-030d24b0":1,"chunk-05169ae4":1,"chunk-06db2872":1,"chunk-13e2d89a":1,"chunk-00f412aa":1,"chunk-6c5384d2":1,"chunk-2c2e9677":1,"chunk-4c765efe":1,"chunk-5ad11704":1,"chunk-795f3df8":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise(function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-030d24b0":"61966aca","chunk-05169ae4":"7b706af0","chunk-06db2872":"6f5c6b45","chunk-13e2d89a":"c17c91e2","chunk-14da9915":"31d6cfe0","chunk-00f412aa":"56babc01","chunk-2d230f8d":"31d6cfe0","chunk-6c5384d2":"56babc01","chunk-2c2e9677":"5682d2be","chunk-2d0aba9c":"31d6cfe0","chunk-2d0c1074":"31d6cfe0","chunk-2d21a3d2":"31d6cfe0","chunk-2d229803":"31d6cfe0","chunk-2d230cb3":"31d6cfe0","chunk-4c765efe":"8de67172","chunk-5ad11704":"a8caf56b","chunk-795f3df8":"1b74d6ea"}[e]+".css",c=i.p+a,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var d=o[u],h=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(h===a||h===c))return n()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){d=f[u],h=d.getAttribute("data-href");if(h===a||h===c)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var a=n&&n.target&&n.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.request=a,delete r[e],s.parentNode.removeChild(s),t(o)},s.href=c;var l=document.getElementsByTagName("head")[0];l.appendChild(s)}).then(function(){r[e]=0}));var a=c[e];if(0!==a)if(a)n.push(a[2]);else{var o=new Promise(function(n,t){a=c[e]=[n,t]});n.push(a[2]=o);var d,h=document.createElement("script");h.charset="utf-8",h.timeout=120,i.nc&&h.setAttribute("nonce",i.nc),h.src=u(e),d=function(n){h.onerror=h.onload=null,clearTimeout(f);var t=c[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src,o=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,t[1](o)}c[e]=void 0}};var f=setTimeout(function(){d({type:"timeout",target:h})},12e4);h.onerror=h.onload=d,document.head.appendChild(h)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],h=d.push.bind(d);d.push=n,d=d.slice();for(var f=0;f<d.length;f++)n(d[f]);var s=h;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var a=t("64a9"),r=t.n(a);r.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var a=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},c=[],o={name:"App"},u=o,i=(t("034f"),t("2877")),d=Object(i["a"])(u,r,c,!1,null,null,null),h=d.exports,f=t("75fc"),s=t("2f62");a["default"].use(s["a"]);var l=new s["a"].Store({state:{menuItems:[{name:"home",size:18,type:"md-home",text:"主页"},{text:"三维可视化",type:"ios-paper",children:[{type:"ios-grid",name:"weather",text:"24小时气温"},{type:"ios-grid",name:"rainfall",text:"24小时降水"},{type:"ios-grid",name:"day-temp",text:"日平均气温"},{type:"ios-grid",name:"day-rain",text:"日降水总量"}]},{text:"气象站查询",type:"ios-paper",children:[{type:"ios-grid",name:"station-info",text:"气象站信息"},{type:"ios-grid",name:"station-24hour",text:"24小时气温降水"},{type:"ios-grid",name:"station-day",text:"日气温降水"},{type:"ios-grid",name:"station-hour-windy",text:"24小时风速风向"}]},{text:"二级菜单",type:"ios-paper",children:[{type:"ios-grid",name:"t1",text:"表格"},{text:"三级菜单",type:"ios-paper",children:[{type:"ios-notifications-outline",name:"msg",text:"查看消息"},{type:"md-lock",name:"password",text:"修改密码"},{type:"md-person",name:"userinfo",text:"基本资料"}]}]}]},mutations:{setMenus:function(e,n){e.menuItems=Object(f["a"])(n)}}}),p=l,m=t("a18c"),b=t("e069"),k=t.n(b),y=t("bc3a"),g=t.n(y),v=(t("dcad"),t("96cf"),t("3b8d")),w=t("ed08"),x=!1;m["b"].beforeEach(function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(n,t,a){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(b["LoadingBar"].start(),localStorage.getItem("token"))if("/login"===n.path)a({path:"/"});else if(x)a();else try{r=Object(w["a"])(p.state.menuItems),m["b"].addRoutes(r),x=!0,a({path:n.path||"/"})}catch(t){Object(w["b"])(),a("/login?redirect=".concat(n.path))}else x=!1,"/login"===n.path?a():a("/login?redirect=".concat(n.path));case 2:case"end":return e.stop()}},e)}));return function(n,t,a){return e.apply(this,arguments)}}()),m["b"].afterEach(function(){b["LoadingBar"].finish()}),a["default"].config.productionTip=!1,a["default"].use(k.a),g.a.defaults.baseURL="",g.a.defaults.timeout=5e3,a["default"].prototype.$axios=g.a,new a["default"]({el:"#app",router:m["b"],store:p,render:function(e){return e(h)}})},"64a9":function(e,n,t){},a18c:function(e,n,t){"use strict";t.d(n,"a",function(){return o}),t.d(n,"c",function(){return d});var a=t("2b0e"),r=t("8c4f");a["default"].use(r["a"]);var c=[{path:"/login",name:"login",component:function(){return t.e("chunk-05169ae4").then(t.bind(null,"578a"))}},{path:"/",redirect:"/home"}],o={home:{path:"home",name:"home",component:function(){return t.e("chunk-2d21a3d2").then(t.bind(null,"bb51"))}},weather:{path:"weather",name:"weather",component:function(){return t.e("chunk-4c765efe").then(t.bind(null,"6a05"))}},rainfall:{path:"rainfall",name:"rainfall",component:function(){return t.e("chunk-5ad11704").then(t.bind(null,"d301"))}},"day-temp":{path:"day-temp",name:"day-temp",component:function(){return t.e("chunk-13e2d89a").then(t.bind(null,"96c2"))}},"day-rain":{path:"day-rain",name:"day-rain",component:function(){return t.e("chunk-2c2e9677").then(t.bind(null,"6c22"))}},"station-info":{path:"station-info",name:"station-info",component:function(){return t.e("chunk-030d24b0").then(t.bind(null,"e437"))}},"station-24hour":{path:"station-24hour",name:"station-24hour",component:function(){return Promise.all([t.e("chunk-14da9915"),t.e("chunk-6c5384d2")]).then(t.bind(null,"43b2"))}},"station-day":{path:"station-day",name:"station-day",component:function(){return Promise.all([t.e("chunk-14da9915"),t.e("chunk-00f412aa")]).then(t.bind(null,"1245"))}},"station-hour-windy":{path:"station-hour-windy",name:"station-hour-windy",component:function(){return Promise.all([t.e("chunk-14da9915"),t.e("chunk-2d230f8d")]).then(t.bind(null,"ef0f"))}},t1:{path:"t1",name:"t1",component:function(){return t.e("chunk-2d0aba9c").then(t.bind(null,"15df"))}},password:{path:"password",name:"password",component:function(){return t.e("chunk-2d0c1074").then(t.bind(null,"43fe"))}},msg:{path:"msg",name:"msg",component:function(){return t.e("chunk-2d229803").then(t.bind(null,"de5a"))}},userinfo:{path:"userinfo",name:"userinfo",component:function(){return t.e("chunk-2d230cb3").then(t.bind(null,"ee96"))}}},u=function(){return new r["a"]({routes:c})},i=u();function d(){var e=u();i.matcher=e.matcher}n["b"]=i},ed08:function(e,n,t){"use strict";t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o});t("7f7f");var a=t("a18c");function r(e){var n=[],a=[];return n.push({path:"/",component:function(){return t.e("chunk-795f3df8").then(t.bind(null,"86d6"))},children:a}),e.forEach(function(e){c(a,e)}),a.push({path:"error",name:"error",component:function(){return t.e("chunk-06db2872").then(t.bind(null,"3fb9"))}}),n.push({path:"*",redirect:"/error"}),n}function c(e,n){n.name?e.push(a["a"][n.name]):n.children&&n.children.forEach(function(n){c(e,n)})}function o(){localStorage.setItem("token",""),localStorage.setItem("userImg",""),localStorage.setItem("userName",""),Object(a["c"])()}}});
//# sourceMappingURL=app.ca0b0b80.js.map