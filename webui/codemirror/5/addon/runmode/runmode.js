// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror")):typeof define=="function"&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){"use strict";e.runMode=function(t,n,r,i){var s=e.getMode(e.defaults,n),o=/MSIE \d/.test(navigator.userAgent),u=o&&(document.documentMode==null||document.documentMode<9);if(r.appendChild){var a=i&&i.tabSize||e.defaults.tabSize,f=r,l=0;f.innerHTML="",r=function(e,t){if(e=="\n"){f.appendChild(document.createTextNode(u?"\r":e)),l=0;return}var n="";for(var r=0;;){var i=e.indexOf("	",r);if(i==-1){n+=e.slice(r),l+=e.length-r;break}l+=i-r,n+=e.slice(r,i);var s=a-l%a;l+=s;for(var o=0;o<s;++o)n+=" ";r=i+1}if(t){var c=f.appendChild(document.createElement("span"));c.className="cm-"+t.replace(/ +/g," cm-"),c.appendChild(document.createTextNode(n))}else f.appendChild(document.createTextNode(n))}}var c=e.splitLines(t),h=i&&i.state||e.startState(s);for(var p=0,d=c.length;p<d;++p){p&&r("\n");var v=new e.StringStream(c[p]);!v.string&&s.blankLine&&s.blankLine(h);while(!v.eol()){var m=s.token(v,h);r(v.current(),m,p,v.start,h),v.start=v.pos}}}});