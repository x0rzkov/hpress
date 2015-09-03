// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror"),require("./foldcode")):typeof define=="function"&&define.amd?define(["../../lib/codemirror","./foldcode"],e):e(CodeMirror)})(function(e){"use strict";function n(e){this.options=e,this.from=this.to=0}function r(e){return e===!0&&(e={}),e.gutter==null&&(e.gutter="CodeMirror-foldgutter"),e.indicatorOpen==null&&(e.indicatorOpen="CodeMirror-foldgutter-open"),e.indicatorFolded==null&&(e.indicatorFolded="CodeMirror-foldgutter-folded"),e}function i(e,n){var r=e.findMarksAt(t(n));for(var i=0;i<r.length;++i)if(r[i].__isFold&&r[i].find().from.line==n)return r[i]}function s(e){if(typeof e=="string"){var t=document.createElement("div");return t.className=e+" CodeMirror-guttermarker-subtle",t}return e.cloneNode(!0)}function o(e,n,r){var o=e.state.foldGutter.options,u=n,a=e.foldOption(o,"minFoldSize"),f=e.foldOption(o,"rangeFinder");e.eachLine(n,r,function(n){var r=null;if(i(e,u))r=s(o.indicatorFolded);else{var l=t(u,0),c=f&&f(e,l);c&&c.to.line-c.from.line>=a&&(r=s(o.indicatorOpen))}e.setGutterMarker(n,o.gutter,r),++u})}function u(e){var t=e.getViewport(),n=e.state.foldGutter;if(!n)return;e.operation(function(){o(e,t.from,t.to)}),n.from=t.from,n.to=t.to}function a(e,n,r){var s=e.state.foldGutter;if(!s)return;var o=s.options;if(r!=o.gutter)return;var u=i(e,n);u?u.clear():e.foldCode(t(n,0),o.rangeFinder)}function f(e){var t=e.state.foldGutter;if(!t)return;var n=t.options;t.from=t.to=0,clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout(function(){u(e)},n.foldOnChangeTimeSpan||600)}function l(e){var t=e.state.foldGutter;if(!t)return;var n=t.options;clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout(function(){var n=e.getViewport();t.from==t.to||n.from-t.to>20||t.from-n.to>20?u(e):e.operation(function(){n.from<t.from&&(o(e,n.from,t.from),t.from=n.from),n.to>t.to&&(o(e,t.to,n.to),t.to=n.to)})},n.updateViewportTimeSpan||400)}function c(e,t){var n=e.state.foldGutter;if(!n)return;var r=t.line;r>=n.from&&r<n.to&&o(e,r,r+1)}e.defineOption("foldGutter",!1,function(t,i,s){s&&s!=e.Init&&(t.clearGutter(t.state.foldGutter.options.gutter),t.state.foldGutter=null,t.off("gutterClick",a),t.off("change",f),t.off("viewportChange",l),t.off("fold",c),t.off("unfold",c),t.off("swapDoc",u)),i&&(t.state.foldGutter=new n(r(i)),u(t),t.on("gutterClick",a),t.on("change",f),t.on("viewportChange",l),t.on("fold",c),t.on("unfold",c),t.on("swapDoc",u))});var t=e.Pos});