// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror"),require("../yaml/yaml")):typeof define=="function"&&define.amd?define(["../../lib/codemirror","../yaml/yaml"],e):e(CodeMirror)})(function(e){var t=0,n=1,r=2;e.defineMode("yaml-frontmatter",function(i,s){function a(e){return e.state==r?u:o}var o=e.getMode(i,"yaml"),u=e.getMode(i,s&&s.base||"gfm");return{startState:function(){return{state:t,inner:e.startState(o)}},copyState:function(t){return{state:t.state,inner:e.copyState(a(t),t.inner)}},token:function(i,s){if(s.state==t)return i.match(/---/,!1)?(s.state=n,o.token(i,s.inner)):(i.state=r,s.inner=e.startState(u),u.token(i,s.inner));if(s.state==n){var a=i.sol()&&i.match(/---/,!1),f=o.token(i,s.inner);return a&&(s.state=r,s.inner=e.startState(u)),f}return u.token(i,s.inner)},innerMode:function(e){return{mode:a(e),state:e.inner}},blankLine:function(e){var t=a(e);if(t.blankLine)return t.blankLine(e.inner)}}})});