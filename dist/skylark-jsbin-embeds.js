/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
!function(e,n){var t=n.define,require=n.require,r="function"==typeof t&&t.amd,i=!r&&"undefined"!=typeof exports;if(!r&&!t){var s={};t=n.define=function(e,n,t){"function"==typeof t?(s[e]={factory:t,deps:n.map(function(n){return function(e,n){if("."!==e[0])return e;var t=n.split("/"),r=e.split("/");t.pop();for(var i=0;i<r.length;i++)"."!=r[i]&&(".."==r[i]?t.pop():t.push(r[i]));return t.join("/")}(n,e)}),resolved:!1,exports:null},require(e)):s[e]={factory:null,resolved:!0,exports:t}},require=n.require=function(e){if(!s.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=s[e];if(!module.resolved){var t=[];module.deps.forEach(function(e){t.push(require(e))}),module.exports=module.factory.apply(n,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-jsbin-embeds/jsbin",["skylark-langx-ns"],function(e){var n=e.attach("intg.jsbin");return n}),e("skylark-jsbin-embeds/embeds",["./jsbin"],function(e){return e.embeds={}}),e("skylark-jsbin-embeds/inview",["./embeds"],function(e){"use strict";var n=document&&document.documentElement;return e.inview=function(e,t){var r=function(e,n){var t={};return n=+n||0,t.width=(t.right=e.right+n)-(t.left=e.left-n),t.height=(t.bottom=e.bottom+n)-(t.top=e.top-n),t}(e.getBoundingClientRect(),t);return!!r&&r.bottom>=0&&r.right>=0&&r.top<=(i=n.clientHeight,s=window.innerHeight,i<s?i:s)&&r.left<=function(){var e=n.clientWidth,t=window.innerWidth;return e<t?t:e}();var i,s}}),e("skylark-jsbin-embeds/hookMessaging",["./embeds"],function(e){"use strict";return e.hookMessaging=function(e){window.addEventListener("message",function(n){n||(n=window.event);e.style.height=1*n.data.height+2+"px"})}}),e("skylark-jsbin-embeds/embed",["skylark-langx-urls/getQuery","./embeds","./inview","./hookMessaging"],function(e,n,t,r){"use strict";return n.embed=function(n){var i=document.createElement("iframe"),s=n.href.replace(/edit/,"embed");i.className=n.className,i.id=n.id,i.style.border="1px solid #aaa";var o=e(n.search);i.style.width=o.width||"100%",i.style.minHeight=o.height||"300px",o.height&&(i.style.maxHeight=o.height);t(n,100)?(i.src=s.split("&")[0],i._src=s.split("&")[0],r(i)):(i.setAttribute("data-url",s),i.src="https://jsbin.com/embed-holding",pending.push(i));n.parentNode.replaceChild(i,n)}}),e("skylark-jsbin-embeds/findCode",["./embeds"],function(e){"use strict";var n=void 0===document.createElement("i").innerText?"textContent":"innerText";return e.findCode=function(e){var t,r,i=e.rel;i&&(t=document.getElementById(i.substring(1)))?r=t[n]:(t=function e(n){var t=n;for(;(t=t.previousSibling)&&"PRE"!==t.nodeName;)if(t.getElementsByTagName&&(t=t.getElementsByTagName("pre")).length){t=t[0];break}if(t)return t;t=n.parentNode.getElementsByTagName("pre");if(!t.length)return n.parentNode?e(n.parentNode):null;return t[0]}(e))&&(r=t[n]);return r}}),e("skylark-jsbin-embeds/loadRealEmbed",["./embeds","./hookMessaging"],function(e,n){return embed.loadRealEmbed=function(e){var t=e.cloneNode(),r=t.getAttribute("data-url");t.src=r.split("&")[0],t._src=r.split("&")[0],e.parentNode.replaceChild(t,e),n(t)}}),e("skylark-jsbin-embeds/scoop",["./embeds"],function(e){return e.scoop=function(e){var n=findCode(e),t=function(e){var n=e.split("<").length-1,t=e.split("{").length-1,r=e.split(".").length-1;return n>t&&n>r?"html":t>n&&t>r?"css":"javascript"}(n),r=e.search.substring(1);"html"===t&&-1===n.toLowerCase().indexOf("<html")&&(t="code");-1===r.indexOf(t)?r+=","+t+"="+encodeURIComponent(n):r=r.replace(t,t+"="+encodeURIComponent(n));e.search="?"+r}}),e("skylark-jsbin-embeds/init",["./embeds","./embed","./scoop","./inview","./loadRealEmbed"],function(e,n,t,r,i){"use strict";var s=document&&document.documentElement;function o(){for(var e=function(){var e,n,t=[],r=0;for(e=document.getElementsByTagName("a"),n=e.length;r<n;r++)-1!==(" "+e[r].className).indexOf(" jsbin-")&&t.push(e[r]);return t}(),r=0,i=e.length,s="";r<i;r++)-1!==(s=" "+e[r].className+" ").indexOf(" jsbin-scoop ")?t(e[r]):-1!==s.indexOf(" jsbin-embed ")&&(e[r].className=e[r].className.replace(/jsbin\-embed/,""),n(e[r]))}function a(){var e=0,n=[];for(e=0;e<d.length;e++)r(d[e],400)&&n.unshift({iframe:d[e],i:e});for(e=0;e<n.length;e++)d.splice(n[e].i,1),i(n[e].iframe)}var d=[];return e.init=function(){o();var e=null;function n(){d.length&&(cancelAnimationFrame(e),e=requestAnimationFrame(a))}s.addEventListener("scroll",n,!0),window.addEventListener("scroll",n,!0)}}),e("skylark-jsbin-embeds/main",["./embeds","./embed","./findCode","./hookMessaging","./inview","./loadRealEmbed","./scoop","./init"],function(e){return e}),e("skylark-jsbin-embeds",["skylark-jsbin-embeds/main"],function(e){return e})}(t),!r){var o=require("skylark-langx-ns");i?module.exports=o:n.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-jsbin-embeds.js.map