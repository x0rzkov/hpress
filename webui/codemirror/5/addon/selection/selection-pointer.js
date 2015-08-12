// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(e){typeof exports=="object"&&typeof module=="object"?e(require("../../lib/codemirror")):typeof define=="function"&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){"use strict";function t(e,t){var n=e.state.selectionPointer;(t.buttons==null?t.which:t.buttons)?n.mouseX=n.mouseY=null:(n.mouseX=t.clientX,n.mouseY=t.clientY),i(e)}function n(e,t){if(!e.getWrapperElement().contains(t.relatedTarget)){var n=e.state.selectionPointer;n.mouseX=n.mouseY=null,i(e)}}function r(e){e.state.selectionPointer.rects=null,i(e)}function i(e){e.state.selectionPointer.willUpdate||(e.state.selectionPointer.willUpdate=!0,setTimeout(function(){s(e),e.state.selectionPointer.willUpdate=!1},50))}function s(e){var t=e.state.selectionPointer;if(!t)return;if(t.rects==null&&t.mouseX!=null){t.rects=[];if(e.somethingSelected())for(var n=e.display.selectionDiv.firstChild;n;n=n.nextSibling)t.rects.push(n.getBoundingClientRect())}var r=!1;if(t.mouseX!=null)for(var i=0;i<t.rects.length;i++){var s=t.rects[i];s.left<=t.mouseX&&s.right>=t.mouseX&&s.top<=t.mouseY&&s.bottom>=t.mouseY&&(r=!0)}var o=r?t.value:"";e.display.lineDiv.style.cursor!=o&&(e.display.lineDiv.style.cursor=o)}e.defineOption("selectionPointer",!1,function(i,s){var o=i.state.selectionPointer;o&&(e.off(i.getWrapperElement(),"mousemove",o.mousemove),e.off(i.getWrapperElement(),"mouseout",o.mouseout),e.off(window,"scroll",o.windowScroll),i.off("cursorActivity",r),i.off("scroll",r),i.state.selectionPointer=null,i.display.lineDiv.style.cursor=""),s&&(o=i.state.selectionPointer={value:typeof s=="string"?s:"default",mousemove:function(e){t(i,e)},mouseout:function(e){n(i,e)},windowScroll:function(){r(i)},rects:null,mouseX:null,mouseY:null,willUpdate:!1},e.on(i.getWrapperElement(),"mousemove",o.mousemove),e.on(i.getWrapperElement(),"mouseout",o.mouseout),e.on(window,"scroll",o.windowScroll),i.on("cursorActivity",r),i.on("scroll",r))})});