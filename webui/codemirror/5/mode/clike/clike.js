// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror")):typeof define=="function"&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){"use strict";function t(e){var t={},n=e.split(" ");for(var r=0;r<n.length;++r)t[n[r]]=!0;return t}function i(e,t){if(!t.startOfLine)return!1;for(;;){if(!e.skipTo("\\")){e.skipToEnd(),t.tokenize=null;break}e.next();if(e.eol()){t.tokenize=i;break}}return"meta"}function s(e,t){return t.prevToken=="variable-3"?"variable-3":!1}function o(e,t){e.backUp(1);if(e.match(/(R|u8R|uR|UR|LR)/)){var n=e.match(/"([^\s\\()]{0,16})\(/);return n?(t.cpp11RawStringDelim=n[1],t.tokenize=f,f(e,t)):!1}return e.match(/(u8|u|U|L)/)?e.match(/["']/,!1)?"string":!1:(e.next(),!1)}function u(e){var t=/(\w+)::(\w+)$/.exec(e);return t&&t[1]==t[2]}function a(e,t){var n;while((n=e.next())!=null)if(n=='"'&&!e.eat('"')){t.tokenize=null;break}return"string"}function f(e,t){var n=t.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&"),r=e.match(new RegExp(".*?\\)"+n+'"'));return r?t.tokenize=null:e.skipToEnd(),"string"}function l(t,n){function i(e){if(e)for(var t in e)e.hasOwnProperty(t)&&r.push(t)}typeof t=="string"&&(t=[t]);var r=[];i(n.keywords),i(n.types),i(n.builtin),i(n.atoms),r.length&&(n.helperType=t[0],e.registerHelper("hintWords",t[0],r));for(var s=0;s<t.length;++s)e.defineMIME(t[s],n)}function c(e,t){var n=!1;while(!e.eol()){if(!n&&e.match('"""')){t.tokenize=null;break}n=e.next()=="\\"&&!n}return"string"}e.defineMode("clike",function(t,n){function w(e,t){var n=e.next();if(h[n]){var r=h[n](e,t);if(r!==!1)return r}if(n=='"'||n=="'")return t.tokenize=E(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return y=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if(n=="/"){if(e.eat("*"))return t.tokenize=S,S(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(g.test(n))return e.eatWhile(g),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);if(m)while(e.match(m))e.eatWhile(/[\w\$_\xa1-\uffff]/);var i=e.current();return o.propertyIsEnumerable(i)?(f.propertyIsEnumerable(i)&&(y="newstatement"),l.propertyIsEnumerable(i)&&(b=!0),"keyword"):u.propertyIsEnumerable(i)?"variable-3":a.propertyIsEnumerable(i)?(f.propertyIsEnumerable(i)&&(y="newstatement"),"builtin"):c.propertyIsEnumerable(i)?"atom":"variable"}function E(e){return function(t,n){var r=!1,i,s=!1;while((i=t.next())!=null){if(i==e&&!r){s=!0;break}r=!r&&i=="\\"}if(s||!r&&!p)n.tokenize=null;return"string"}}function S(e,t){var n=!1,r;while(r=e.next()){if(r=="/"&&n){t.tokenize=null;break}n=r=="*"}return"comment"}function x(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function T(e){return e=="statement"||e=="switchstatement"||e=="namespace"}function N(e,t,n){var r=e.indented;return e.context&&T(e.context.type)&&!T(n)&&(r=e.context.indented),e.context=new x(r,t,n,null,e.context)}function C(e){var t=e.context.type;if(t==")"||t=="]"||t=="}")e.indented=e.context.indented;return e.context=e.context.prev}function k(e,t){if(t.prevToken=="variable"||t.prevToken=="variable-3")return!0;if(/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0,e.start)))return!0}function L(e){for(;;){if(!e||e.type=="top")return!0;if(e.type=="}"&&e.prev.type!="namespace")return!1;e=e.prev}}var r=t.indentUnit,i=n.statementIndentUnit||r,s=n.dontAlignCalls,o=n.keywords||{},u=n.types||{},a=n.builtin||{},f=n.blockKeywords||{},l=n.defKeywords||{},c=n.atoms||{},h=n.hooks||{},p=n.multiLineStrings,d=n.indentStatements!==!1,v=n.indentSwitch!==!1,m=n.namespaceSeparator,g=/[+\-*&%=<>!?|\/]/,y,b;return{startState:function(e){return{tokenize:null,context:new x((e||0)-r,0,"top",!1),indented:0,startOfLine:!0,prevToken:null}},token:function(e,t){var r=t.context;e.sol()&&(r.align==null&&(r.align=!1),t.indented=e.indentation(),t.startOfLine=!0);if(e.eatSpace())return null;y=b=null;var i=(t.tokenize||w)(e,t);if(i=="comment"||i=="meta")return i;r.align==null&&(r.align=!0);if(y==";"||y==":"||y==",")while(T(t.context.type))C(t);else if(y=="{")N(t,e.column(),"}");else if(y=="[")N(t,e.column(),"]");else if(y=="(")N(t,e.column(),")");else if(y=="}"){while(T(r.type))r=C(t);r.type=="}"&&(r=C(t));while(T(r.type))r=C(t)}else if(y==r.type)C(t);else if(d&&((r.type=="}"||r.type=="top")&&y!=";"||T(r.type)&&y=="newstatement")){var s="statement";y=="newstatement"&&v&&e.current()=="switch"?s="switchstatement":i=="keyword"&&e.current()=="namespace"&&(s="namespace"),N(t,e.column(),s)}i=="variable"&&(t.prevToken=="def"||n.typeFirstDefinitions&&k(e,t)&&L(t.context)&&e.match(/^\s*\(/,!1))&&(i="def");if(h.token){var o=h.token(e,t,i);o!==undefined&&(i=o)}return i=="def"&&n.styleDefs===!1&&(i="variable"),t.startOfLine=!1,t.prevToken=b?"def":i||y,i},indent:function(t,n){if(t.tokenize!=w&&t.tokenize!=null)return e.Pass;var o=t.context,u=n&&n.charAt(0);T(o.type)&&u=="}"&&(o=o.prev);var a=u==o.type,f=o.prev&&o.prev.type=="switchstatement";return T(o.type)?o.indented+(u=="{"?0:i):o.align&&(!s||o.type!=")")?o.column+(a?0:1):o.type==")"&&!a?o.indented+i:o.indented+(a?0:r)+(!a&&f&&!/^(?:case|default)\b/.test(n)?r:0)},electricInput:v?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});var n="auto if break case register continue return default do sizeof static else struct switch extern typedef float union for goto while enum const volatile",r="int long char short double float unsigned signed void size_t ptrdiff_t";l(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:t(n),types:t(r+" bool _Complex _Bool float_t double_t intptr_t intmax_t "+"int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t "+"uint32_t uint64_t"),blockKeywords:t("case do else for if switch while struct"),defKeywords:t("struct"),typeFirstDefinitions:!0,atoms:t("null true false"),hooks:{"#":i,"*":s},modeProps:{fold:["brace","include"]}}),l(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:t(n+" asm dynamic_cast namespace reinterpret_cast try explicit new "+"static_cast typeid catch operator template typename class friend private "+"this using const_cast inline public throw virtual delete mutable protected "+"alignas alignof constexpr decltype nullptr noexcept thread_local final "+"static_assert override"),types:t(r+" bool wchar_t"),blockKeywords:t("catch class do else finally for if struct switch try while"),defKeywords:t("class namespace struct enum union"),typeFirstDefinitions:!0,atoms:t("true false null"),hooks:{"#":i,"*":s,u:o,U:o,L:o,R:o,token:function(e,t,n){if(n=="variable"&&e.peek()=="("&&(t.prevToken==";"||t.prevToken==null||t.prevToken=="}")&&u(e.current()))return"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}}),l("text/x-java",{name:"clike",keywords:t("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while"),types:t("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),blockKeywords:t("catch class do else finally for if switch try while"),defKeywords:t("class interface package enum"),typeFirstDefinitions:!0,atoms:t("true false null"),hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"}},modeProps:{fold:["brace","import"]}}),l("text/x-csharp",{name:"clike",keywords:t("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),types:t("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:t("catch class do else finally for foreach if struct switch try while"),defKeywords:t("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:t("true false null"),hooks:{"@":function(e,t){return e.eat('"')?(t.tokenize=a,a(e,t)):(e.eatWhile(/[\w\$_]/),"meta")}}}),l("text/x-scala",{name:"clike",keywords:t("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble :: #:: "),types:t("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),multiLineStrings:!0,blockKeywords:t("catch class do else finally for forSome if match switch try while"),defKeywords:t("class def object package trait type val var"),atoms:t("true false null"),indentStatements:!1,indentSwitch:!1,hooks:{"@":function(e){return e.eatWhile(/[\w\$_]/),"meta"},'"':function(e,t){return e.match('""')?(t.tokenize=c,t.tokenize(e,t)):!1},"'":function(e){return e.eatWhile(/[\w\$_\xa1-\uffff]/),"atom"}},modeProps:{closeBrackets:{triples:'"'}}}),l(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:t("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:t("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:t("for while do if else struct"),builtin:t("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),atoms:t("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),indentSwitch:!1,hooks:{"#":i},modeProps:{fold:["brace","include"]}}),l("text/x-nesc",{name:"clike",keywords:t(n+"as atomic async call command component components configuration event generic "+"implementation includes interface module new norace nx_struct nx_union post provides "+"signal task uses abstract extends"),types:t(r),blockKeywords:t("case do else for if switch while struct"),atoms:t("null true false"),hooks:{"#":i},modeProps:{fold:["brace","include"]}}),l("text/x-objectivec",{name:"clike",keywords:t(n+"inline restrict _Bool _Complex _Imaginery BOOL Class bycopy byref id IMP in "+"inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),types:t(r),atoms:t("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(e){return e.eatWhile(/[\w\$]/),"keyword"},"#":i},modeProps:{fold:"brace"}}),l("text/x-squirrel",{name:"clike",keywords:t("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),types:t(r),blockKeywords:t("case catch class else for foreach if switch try while"),defKeywords:t("function local class"),typeFirstDefinitions:!0,atoms:t("true false null"),hooks:{"#":i},modeProps:{fold:["brace","include"]}})});