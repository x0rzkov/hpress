// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror")):typeof define=="function"&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineOption("showTrailingSpace",!1,function(t,n,r){r==e.Init&&(r=!1),r&&!n?t.removeOverlay("trailingspace"):!r&&n&&t.addOverlay({token:function(e){for(var t=e.string.length,n=t;n&&/\s/.test(e.string.charAt(n-1));--n);return n>e.pos?(e.pos=n,null):(e.pos=t,"trailingspace")},name:"trailingspace"})})});