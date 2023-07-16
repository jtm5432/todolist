(()=>{"use strict";var e,n,t,o,r,i,a,c,l,s,d,p,u,A,m,f={424:(e,n,t)=>{t.d(n,{Z:()=>c});var o=t(537),r=t.n(o),i=t(645),a=t.n(i)()(r());a.push([e.id,"#app {\n    width: 400px;\n    margin: 0 auto;\n    font-family: Arial, sans-serif;\n  }\n  \n  #todo-input {\n    width: 100%;\n    padding: 10px;\n    font-size: 16px;\n    margin-bottom: 10px;\n    border:1px solid;\n  }\n  \n  #all-list {\n    list-style: none;\n    padding: 0;\n  }\n  \n  #all-list li {\n    padding: 10px;\n    border: 1px solid #ccc;\n    margin-bottom: 5px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    position: relative;\n    opacity: 1;\n    transition: opacity 0.3s;\n  }\n  \n  #all-info {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 10px;\n  }\n  \n  #all-info button {\n    padding: 5px 10px;\n  }\n  \n  #mirror-item {\n    visibility: hidden;\n    position: absolute;\n    background: rgba(0, 0, 0, 0.5);\n    border-radius: 4px;\n  }\n  \n  #total-count {\n    font-weight: bold;\n  }\n  \n  #delete-complete {\n    background-color: red;\n    color: white;\n    border: none;\n    cursor: pointer;\n  }","",{version:3,sources:["webpack://./src/index.css"],names:[],mappings:"AAAA;IACI,YAAY;IACZ,cAAc;IACd,8BAA8B;EAChC;;EAEA;IACE,WAAW;IACX,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;IAChB,UAAU;EACZ;;EAEA;IACE,aAAa;IACb,sBAAsB;IACtB,kBAAkB;IAClB,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,UAAU;IACV,wBAAwB;EAC1B;;EAEA;IACE,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,gBAAgB;EAClB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,kBAAkB;IAClB,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;EACpB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,qBAAqB;IACrB,YAAY;IACZ,YAAY;IACZ,eAAe;EACjB",sourcesContent:["#app {\r\n    width: 400px;\r\n    margin: 0 auto;\r\n    font-family: Arial, sans-serif;\r\n  }\r\n  \r\n  #todo-input {\r\n    width: 100%;\r\n    padding: 10px;\r\n    font-size: 16px;\r\n    margin-bottom: 10px;\r\n    border:1px solid;\r\n  }\r\n  \r\n  #all-list {\r\n    list-style: none;\r\n    padding: 0;\r\n  }\r\n  \r\n  #all-list li {\r\n    padding: 10px;\r\n    border: 1px solid #ccc;\r\n    margin-bottom: 5px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    position: relative;\r\n    opacity: 1;\r\n    transition: opacity 0.3s;\r\n  }\r\n  \r\n  #all-info {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-top: 10px;\r\n  }\r\n  \r\n  #all-info button {\r\n    padding: 5px 10px;\r\n  }\r\n  \r\n  #mirror-item {\r\n    visibility: hidden;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    border-radius: 4px;\r\n  }\r\n  \r\n  #total-count {\r\n    font-weight: bold;\r\n  }\r\n  \r\n  #delete-complete {\r\n    background-color: red;\r\n    color: white;\r\n    border: none;\r\n    cursor: pointer;\r\n  }"],sourceRoot:""}]);const c=a},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(a[l]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);o&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),n.push(d))}},n}},537:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),i="/*# ".concat(r," */");return[n].concat([i]).join("\n")}return[n].join("\n")}},379:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var i={},a=[],c=0;c<e.length;c++){var l=e[c],s=o.base?l[0]+o.base:l[0],d=i[s]||0,p="".concat(s," ").concat(d);i[s]=d+1;var u=t(p),A={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)n[u].references++,n[u].updater(A);else{var m=r(A,o);o.byIndex=c,n.splice(c,0,{identifier:p,updater:m,references:1})}a.push(p)}return a}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var i=o(e=e||[],r=r||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var c=t(i[a]);n[c].references--}for(var l=o(e,r),s=0;s<i.length;s++){var d=t(i[s]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}i=l}}},569:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},605:(e,n)=>{n.j=void 0,n.j=function(e){let n=[],t=[];const o=document.getElementById(e);if(!o)throw new Error(`Element with id "${e}" not found`);const r=o.querySelector("#todo-input"),i=o.querySelector("#todo-list"),a=o.querySelector("#todo-info"),c=o.querySelector("#total-count");let l,s,d,p,u,A,m,f=!1,y=0,g=0,v=document.getElementById("mirror-item"),b=null;function B(e){const t={id:Date.now(),content:e,complete:!1};n=[t,...n],I("all")}function C(e,t){const o=n.findIndex((n=>n.id===Number(e))),r=n.findIndex((e=>e.id===Number(t)));if(o>-1&&r>-1){const t=n[o];n.splice(o,1),n.splice(r,0,t),E();const a=i.querySelector(`[data-id="${e}"]`);a&&(a.style.opacity="0.5")}}function h(e){n=n.filter((n=>n.id!==e)),I("all")}function E(){n.sort(((e,n)=>e.complete===n.complete?0:e.complete?1:-1)),I(l)}function x(e){n=n.map((n=>n.id===e?Object.assign(Object.assign({},n),{complete:!n.complete}):n)),E()}function I(e){i.innerHTML="",n.forEach((n=>{const t=document.createElement("li");t.dataset.id=String(n.id);const o=document.createElement("input");o.type="checkbox",o.checked=n.complete,o.hidden=!0,t.appendChild(o);const r=document.createTextNode(n.content);t.appendChild(r);const a=document.createElement("button");a.textContent="Delete",t.appendChild(a),n.complete&&(t.style.textDecoration="line-through",t.style.color="gray"),t.hidden=!("all"===e||"complete"===e&&n.complete||"complete"!==e&&("active"!==e||!n.complete)),i.appendChild(t)})),c.textContent=String(n.length)}r.addEventListener("keypress",(e=>{"Enter"===e.key&&(B(r.value),r.value="")})),i.addEventListener("click",(e=>{var n;e.stopPropagation();const t=e.target;console.log("click",t.tagName),"LI"===t.tagName?x(Number(t.dataset.id)):"BUTTON"===t.tagName&&h(Number(null===(n=t.parentElement)||void 0===n?void 0:n.dataset.id))})),document.addEventListener("mousedown",(function(e){const o=e.target,r=o.querySelector('input[type="checkbox"]');"LI"===o.nodeName&&r&&!r.checked&&(t=[...n],console.log("dragStart",d,y),u=e.clientX-y,A=e.clientY-g,s=o,o.style.opacity="0.5",o&&(f=!0,v.innerHTML=o.innerHTML,v.style.position="absolute",v.style.opacity="0.5",v.style.pointerEvents="none",v.style.zIndex="1000",v.style.left=`${e.clientX}px`,v.style.top=`${e.clientY}px`,v.style.display="block"))}),!1),document.addEventListener("mouseup",(function(e){u=d,A=p,f=!1;const o=e.target;if(s){s.style.opacity="1";let o=N(s),r=N(e.target);console.log("dragEnd",r,t),r&&o!==r?C(o,r):null===r&&(n=t,I(l))}m&&(clearTimeout(m),m=null),y=u=d=0,g=A=p=0,v.style.display="none",o.style.opacity="1"}),!1),document.addEventListener("mousemove",(function(e){if(f){e.preventDefault(),d=e.clientX-u,p=e.clientY-A,y=d,g=p,v&&(n=d,t=p,v.style.transform=`translate3d(${n}px, ${t}px, 0)`,m&&clearTimeout(m),m=setTimeout((()=>{v.style.opacity="0.5"}),2e3));let o=document.elementFromPoint(e.clientX,e.clientY);"LI"===(null==o?void 0:o.nodeName)&&o!==b?(b&&(b.style.backgroundColor=""),b=o,b.style.backgroundColor="lightgrey",s&&T(s,b),k()):o&&"LI"===o.nodeName||b&&(b.style.backgroundColor="",b=null,T.cancel())}var n,t}),!1),document.addEventListener("keydown",(e=>{"Escape"===e.key&&(n=t,I(l),v&&(v.style.display="none"))})),a.addEventListener("click",(e=>{const o=e.target;let r="all";"BUTTON"===o.tagName&&("delete-complete"===o.id?t=n=n.filter((e=>!e.complete)):r=o.id.split("-")[1],console.log(n),l=r,I(r))}));let k=w((()=>{b&&(b.style.backgroundColor="",b=null)}),500);function w(e,n){let t;const o=(...o)=>{clearTimeout(t),t=setTimeout((()=>{clearTimeout(t),e(...o)}),n)};return o.cancel=function(){clearTimeout(t)},o}let T=w(((e,n)=>{let t=N(e),o=N(n);t!==o&&C(t,o)}),2e3);function N(e){return e.getAttribute("data-id")}return{addTodo:B,toggleTodo:x,deleteTodo:h,initRender:function(){console.log("inputis",r)},moveTodo:C}}}},y={};function g(e){var n=y[e];if(void 0!==n)return n.exports;var t=y[e]={id:e,exports:{}};return f[e](t,t.exports,g),t.exports}g.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return g.d(n,{a:n}),n},g.d=(e,n)=>{for(var t in n)g.o(n,t)&&!g.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},g.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),g.nc=void 0,e=g(605),n=g(379),t=g.n(n),o=g(795),r=g.n(o),i=g(569),a=g.n(i),c=g(565),l=g.n(c),s=g(216),d=g.n(s),p=g(589),u=g.n(p),A=g(424),(m={}).styleTagTransform=u(),m.setAttributes=l(),m.insert=a().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=d(),t()(A.Z,m),A.Z&&A.Z.locals&&A.Z.locals,new e.j("app").addTodo()})();
//# sourceMappingURL=bundle.js.map