// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror")):typeof define=="function"&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function u(e){return e.scopes[e.scopes.length-1]}var n=t(["and","or","not","is"]),r=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"],i=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"],s={builtins:["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"],keywords:["exec","print"]},o={builtins:["ascii","bytes","exec","print"],keywords:["nonlocal","False","True","None","async","await"]};e.registerHelper("hintWords","python",r.concat(i)),e.defineMode("python",function(a,f){function x(e,t){if(e.sol()&&u(t).type=="py"){var n=u(t).offset;if(e.eatSpace()){var r=e.indentation();return r>n?C(e,t,"py"):r<n&&k(e,t)&&(t.errorToken=!0),null}var i=T(e,t);return n>0&&k(e,t)&&(i+=" "+l),i}return T(e,t)}function T(e,t){if(e.eatSpace())return null;var r=e.peek();if(r=="#")return e.skipToEnd(),"comment";if(e.match(/^[0-9\.]/,!1)){var i=!1;e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)&&(i=!0),e.match(/^\d+\.\d*/)&&(i=!0),e.match(/^\.\d+/)&&(i=!0);if(i)return e.eat(/J/i),"number";var s=!1;e.match(/^0x[0-9a-f]+/i)&&(s=!0),e.match(/^0b[01]+/i)&&(s=!0),e.match(/^0o[0-7]+/i)&&(s=!0),e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)&&(e.eat(/J/i),s=!0),e.match(/^0(?![\dx])/i)&&(s=!0);if(s)return e.eat(/L/i),"number"}return e.match(w)?(t.tokenize=N(e.current()),t.tokenize(e,t)):e.match(d)||e.match(p)?null:e.match(h)||e.match(v)?"operator":e.match(c)?null:e.match(E)||e.match(n)?"keyword":e.match(S)?"builtin":e.match(/^(self|cls)\b/)?"variable-2":e.match(m)?t.lastToken=="def"||t.lastToken=="class"?"def":"variable":(e.next(),l)}function N(e){function r(r,i){while(!r.eol()){r.eatWhile(/[^'"\\]/);if(r.eat("\\")){r.next();if(t&&r.eol())return n}else{if(r.match(e))return i.tokenize=x,n;r.eat(/['"]/)}}if(t){if(f.singleLineStringErrors)return l;i.tokenize=x}return n}while("rub".indexOf(e.charAt(0).toLowerCase())>=0)e=e.substr(1);var t=e.length==1,n="string";return r.isString=!0,r}function C(e,t,n){var r=0,i=null;if(n=="py")while(u(t).type!="py")t.scopes.pop();r=u(t).offset+(n=="py"?a.indentUnit:g),n!="py"&&!e.match(/^(\s|#.*)*$/,!1)&&(i=e.column()+1),t.scopes.push({offset:r,type:n,align:i})}function k(e,t){var n=e.indentation();while(u(t).offset>n){if(u(t).type!="py")return!0;t.scopes.pop()}return u(t).offset!=n}function L(e,t){var n=t.tokenize(e,t),r=e.current();if(r==".")return n=e.match(m,!1)?null:l,n==null&&t.lastStyle=="meta"&&(n="meta"),n;if(r=="@")return f.version&&parseInt(f.version,10)==3?e.match(m,!1)?"meta":"operator":e.match(m,!1)?"meta":l;(n=="variable"||n=="builtin")&&t.lastStyle=="meta"&&(n="meta");if(r=="pass"||r=="return")t.dedent+=1;r=="lambda"&&(t.lambda=!0),r==":"&&!t.lambda&&u(t).type=="py"&&C(e,t,"py");var i=r.length==1?"[({".indexOf(r):-1;i!=-1&&C(e,t,"])}".slice(i,i+1)),i="])}".indexOf(r);if(i!=-1){if(u(t).type!=r)return l;t.scopes.pop()}return t.dedent>0&&e.eol()&&u(t).type=="py"&&(t.scopes.length>1&&t.scopes.pop(),t.dedent-=1),n}var l="error",c=f.singleDelimiters||new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),h=f.doubleOperators||new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),p=f.doubleDelimiters||new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),d=f.tripleDelimiters||new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");if(f.version&&parseInt(f.version,10)==3)var v=f.singleOperators||new RegExp("^[\\+\\-\\*/%&|\\^~<>!@]"),m=f.identifiers||new RegExp("^[_A-Za-z¡-￿][_A-Za-z0-9¡-￿]*");else var v=f.singleOperators||new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"),m=f.identifiers||new RegExp("^[_A-Za-z][_A-Za-z0-9]*");var g=f.hangingIndent||a.indentUnit,y=r,b=i;f.extra_keywords!=undefined&&(y=y.concat(f.extra_keywords)),f.extra_builtins!=undefined&&(b=b.concat(f.extra_builtins));if(f.version&&parseInt(f.version,10)==3){y=y.concat(o.keywords),b=b.concat(o.builtins);var w=new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i")}else{y=y.concat(s.keywords),b=b.concat(s.builtins);var w=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var E=t(y),S=t(b),A={startState:function(e){return{tokenize:x,scopes:[{offset:e||0,type:"py",align:null}],lastStyle:null,lastToken:null,lambda:!1,dedent:0}},token:function(e,t){var n=t.errorToken;n&&(t.errorToken=!1);var r=L(e,t);t.lastStyle=r;var i=e.current();return i&&r&&(t.lastToken=i),e.eol()&&t.lambda&&(t.lambda=!1),n?r+" "+l:r},indent:function(t,n){if(t.tokenize!=x)return t.tokenize.isString?e.Pass:0;var r=u(t),i=n&&n.charAt(0)==r.type;return r.align!=null?r.align-(i?1:0):i&&t.scopes.length>1?t.scopes[t.scopes.length-2].offset:r.offset},closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"};return A}),e.defineMIME("text/x-python","python");var a=function(e){return e.split(" ")};e.defineMIME("text/x-cython",{name:"python",extra_keywords:a("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")})});