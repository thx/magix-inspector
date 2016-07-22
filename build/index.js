!function(){var e=document;if(!e._magix){e._magix=1;var t={created:"#008B00",init:"#FF3030",alter:"#BC8F8F",isolated:"#FF3030",build:"#9AC0CD"},a={width:550,height:470,canvasWidth:530,canvasHeight:400,moreInfoWidth:490,titleHeight:34,circleMargin:6,managerCols:5,managerMargin:5,managerHeight:40,managerGroupSpace:40},i=["FFC125","C71585","0000AA","CDBA96","FF7F00","BA55D3","8B4726","7CFC00","4A4A4A","EE7AE9"],r={cache:"#CC9966",cleaned:"#99CCCC",cleans:"#FF9999",normal:"#CCCC99"},n=function(e,t){var a=document.createElement("style");document.body.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))};n("i-bca",".i-bca-icon:before{width:12px;content:'M';height:12px;border-radius:6px;position:absolute;background-color:#008b00;opacity:.4;font-size:10px;line-height:12px;text-align:center;color:#fff;z-index:10}.i-bca-tab{background:#eee;cursor:move}.i-bca-main{position:fixed;right:20px;top:20px;width:550px;height:470px;z-index:100000;box-shadow:0 0 10px #b9b9b9;background-color:#fff;font-size:12px;line-height:1.5}.i-bca-main ul{list-style:none;padding:0}.i-bca-m5{margin-left:5px}.i-bca-fl{float:left}.i-bca-fr{float:right}.i-bca-cp{cursor:pointer}.i-bca-p8{padding:8px}.i-bca-move{cursor:move}.i-bca-red{color:red}.i-bca-clearfix:after,.i-bca-clearfix:before{content:\"\";display:table}.i-bca-clearfix:after{clear:both}.i-bca-clearfix{*zoom:1}.i-bca-bar{height:1px;border:0;padding:0;margin:5px;background:rgba(0,0,0,.2);background:-webkit-gradient(linear,left top,right top,from(rgba(165,69,243,0)),color-stop(.5,hsla(270,6%,49%,.33)),to(rgba(165,69,243,0)))}#mx_manager_moreinfo,#mx_moreinfo{position:absolute;background-color:#eee;padding:8px;width:440px;display:none;box-shadow:0 5px 10px #b9b9b9}");var o={main:'<div class="i-bca-main" id="mx"><ul class="i-bca-clearfix i-bca-tab" id="mx_tabs"><li class="i-bca-fl i-bca-p8 i-bca-cp">VOM</li><li class="i-bca-fl i-bca-p8 i-bca-cp">Tracer</li><li class="i-bca-fl i-bca-p8 i-bca-cp">Manager</li><li class="i-bca-fr i-bca-p8 i-bca-cp" id="mx_min">△</li></ul><div id="mx_painter"><canvas width="{width}" height="{canvasHeight}" id="mx_view_canvas"></canvas><ul class="i-bca-clearfix i-bca-p8" id="mx_view_total"></ul></div><div id="mx_trancer" style="height:{canvasHeight}px;overflow:scroll;overflow-x:auto;display:none;padding:8px"></div><div id="mx_manager" style="height:{canvasHeight}px;overflow:scroll;overflow-x:auto;display:none"><canvas width="{canvasWidth}" height="{canvasHeight}" id="mx_manager_canvas"></canvas><ul class="i-bca-clearfix i-bca-p8" id="mx_manager_total"></ul></div><div id="mx_moreinfo"></div><div id="mx_manager_moreinfo"></div></div>',moreInfo:'<ul><li><b>id:</b>{id}</li><li><b>view:</b>{view}</li><li class="i-bca-red">{ex}</li><li><b>resources:</b></li><li style="{moreInfoWidth}px;overflow:auto;max-height:200px">{res}</li></ul>',moreManagerInfo:"<ul><li><b>key:</b>{id}</li><li><b>url:</b>{url}</li><li><b>描述:</b>{desc}</li><li><b>缓存:</b>{cache}</li><li><b>清理缓存:</b>{cleans}</li><li><b>预处理:</b>{hasAfter}</li></ul>",total:'<li class="i-bca-fl">共{total}个view</li><li class="i-bca-fl ml5 i-bca-red">{ex}</li>',managerTotal:'<li class="i-bca-fl">{groups}个接口文件，共{total}个接口</li>',setup:function(){var t=e.createElement("div");t.innerHTML=o.main.replace(/\{(\w+)\}/g,function(e,t){return a[t]}),e.documentElement.appendChild(t),o.attachEvent();var i=f.getEnv();i.dragIt("#mx","#mx_tabs")},attachEvent:function(){o.detachEvent();var t,i=f.getEnv();i.bind("mx_view_canvas","mousemove",o.$mousemove=function(e){clearTimeout(t),t=setTimeout(function(){var t=i.getDOMOffset("mx_view_canvas");o.onMousemove({x:e.pageX-t.left,y:e.pageY-t.top})},10)}),i.bind("mx_view_canvas","mouseout",o.$mouseout=function(){clearTimeout(t),o.onMousemove({x:-1,y:-1})}),i.bind("mx_manager_canvas","mousemove",o.$mangerMousemove=function(e){clearTimeout(t),t=setTimeout(function(){var t=i.getDOMOffset("mx_manager_canvas");o.onManagerMousemove({x:e.pageX-t.left,y:e.pageY-t.top})},10)}),i.bind("mx_manager_canvas","mouseout",o.$managerMouseout=function(){clearTimeout(t),o.onManagerMousemove({x:-1,y:-1})}),i.bind("mx_moreinfo","mouseover",o.$imouseover=function(){clearTimeout(o.$hideTimer)}),i.bind("mx_moreinfo","mouseout",o.$imouseout=function(){o.hideMoreInfo()}),i.bind("mx","click",o.$click=function(t){var i;"mx_min"==t.target.id?(i=e.getElementById("mx"),"△"==t.target.innerHTML?(i.style.height=a.titleHeight+"px",i.style.overflow="hidden",t.target.innerHTML="▽"):(i.style.height=a.height+"px",i.style.overflow="inherit",t.target.innerHTML="△")):"VOM"==t.target.innerHTML?(i=e.getElementById("mx_painter"),i.style.display="block",i=e.getElementById("mx_trancer"),i.style.display="none",i=e.getElementById("mx_manager"),i.style.display="none"):"Tracer"==t.target.innerHTML?(i=e.getElementById("mx_painter"),i.style.display="none",i=e.getElementById("mx_manager"),i.style.display="none",i=e.getElementById("mx_trancer"),i.style.display="block"):"Manager"==t.target.innerHTML&&(i=e.getElementById("mx_painter"),i.style.display="none",i=e.getElementById("mx_trancer"),i.style.display="none",i=e.getElementById("mx_manager"),i.style.display="block")})},detachEvent:function(){var e=f.getEnv();e.unbind("mx_view_canvas","mousemove",o.$mousemove),e.unbind("mx_view_canvas","mouseout",o.$mouseout),e.unbind("mx_manager_canvas","mousemove",o.$managerMousemove),e.unbind("mx_manager_canvas","mouseout",o.$managerMouseout),e.unbind("mx_min","click",o.$click),e.unbind("mx_moreinfo","mouseoout",o.$imouseout),e.unbind("mx_moreinfo","mouseover",o.$imouseover)},showMoreInfo:function(t,i){clearTimeout(o.$hideTimer);var r=e.getElementById("mx_cover");r||(r=e.createElement("div"),r.style.cssText="position:absolute;opacity:0.7;background-color:#90EE90;z-index:99999;",r.id="mx_cover",e.body.appendChild(r));var n=e.getElementById("mx_moreinfo");n.style.display="block";var s=i.center.x-a.moreInfoWidth/2;n.style.left=s+"px",n.style.top=i.center.y+i.radius+a.titleHeight+5+"px";var l=f.getEnv();l.updateDOMStyle(r.style,t.id),r.style.display="block",n.innerHTML=o.moreInfo.replace(/\{(\w+)\}/g,function(e,r){switch(r){case"id":return i.id;case"view":return t?t.path||t.view&&t.view.path||"":"";case"ex":if(i.il)return"被孤立的节点，好可怜……";if(!t)return"vframe已被销毁，但未从vom中移除";if(t.path){if(t.cM&&!t.view||t.$c&&!t.$v)return"未加载view"}else if(!t.view)return"未加载view";if(t.cM){if(!t.fcc)return t.rC!=t.cC?"正等待子view加载":"正等待view加载"}else if(!t.$cr)return t.$rc!=t.$cc?"正等待子view加载":"正等待view加载";return t.fca||t.$ca?"等待view渲染":"";case"res":var n,o=[],s=t&&t.view&&t.view.$res;if(s||(n=!0,s=t&&t.$v&&t.$v.$res),s){var c;for(var d in s){c=!0;break}if(c){o.push('<table style="width:100%"><tr><td>key</td><td>type</td></tr>');for(var d in s)o.push("<tr><td>",d,"</td><td>",l.getResType(s[d]),"</td></tr>");o.push("</table>")}}return o.join("");default:return a[r]}})},hideMoreInfo:function(){var t=e.getElementById("mx_moreinfo"),a=e.getElementById("mx_cover");o.$hideTimer=setTimeout(function(){t.style.display="none",a.style.display="none"},150)},showManagerMoreInfo:function(t){clearTimeout(o.$hideManagerTimer);var i=e.getElementById("mx_manager_moreinfo");i.style.display="block",i.style.left=t.rect[0]+"px";var r=t.rect[1]+t.rect[3]+a.titleHeight,n=e.getElementById("mx_manager").scrollTop;r-=n,i.style.top=r+"px",i.innerHTML=o.moreManagerInfo.replace(/\{(\w+)\}/g,function(e,a){switch(a){case"id":return t.id;default:return t[a]}})},hideManagerMoreInfo:function(){var t=e.getElementById("mx_manager_moreinfo");o.$hideManagerTimer=setTimeout(function(){t.style.display="none"},150)},showManagerTotal:function(t){var a=e.getElementById("mx_manager_total");a.innerHTML=o.managerTotal.replace(/\{(\w+)\}/g,function(e,a){switch(a){case"groups":return t.groups.length;case"total":return t.total}})},showTotal:function(t,a){var i=e.getElementById("mx_view_total");i.innerHTML=o.total.replace(/\{(\w+)\}/g,function(e,a){switch(a){case"total":return t.vomTotal;case"ex":return t.total!=t.vomTotal?'<b style="color:red">vom中共'+t.vomTotal+"个view，而只有"+t.total+"个存在关联</b>":""}})},updateManagerCanvasHeight:function(t){e.getElementById("mx_manager_canvas").height=0|t},onMousemove:function(e){},onManagerMousemove:function(e){}},s={log:function(t,a){var i=e.getElementById("mx_trancer");if(s.idle){var r=e.createElement("hr");r.className="i-bca-bar",i.insertBefore(r,i.firstChild),delete s.idle}var n=e.createElement("div");n.innerHTML=t,a&&(n.style.color=a),i.insertBefore(n,i.firstChild),i.getElementsByTagName("div").length>200&&(i.removeChild(i.lastChild),i.removeChild(i.lastChild)),clearTimeout(s.$timer),s.$timer=setTimeout(function(){s.idle=!0},1500)}},l={captureItmes:function(){var e=l;e.list=[],delete e.$last,o.onMousemove=function(t){var a,i,r;if(e.$last?(i=e.$last,r=Math.pow(Math.pow(i.center.x-t.x,2)+Math.pow(i.center.y-t.y,2),.5),r>i.radius&&(e.onHoverItem({item:i,action:"leave"}),delete e.$last,a=!0)):a=!0,a)for(var n=e.list.length-1;n>=0;n--)if(i=e.list[n],r=Math.pow(Math.pow(i.center.x-t.x,2)+Math.pow(i.center.y-t.y,2),.5),r<=i.radius){e.$last!=i&&(e.$last=i,e.onHoverItem({item:i,action:"enter"}));break}}},captureManagerItmes:function(){var e=l;e.managerList=[],delete e.$managerLast,o.onManagerMousemove=function(t){var a,i,r;if(e.$managerLast?(i=e.$managerLast,r=i.rect,(t.x<r[0]||t.y<r[1]||t.x>r[0]+r[2]||t.y>r[1]+r[3])&&(e.onHoverManagerItem({item:i,action:"leave"}),delete e.$managerLast,a=!0)):a=!0,a)for(var n=e.managerList.length-1;n>=0;n--)i=e.managerList[n],r=i.rect,t.x>=r[0]&&t.y>=r[1]&&t.x<=r[0]+r[2]&&t.y<=r[1]+r[3]&&e.$managerLast!=i&&(e.$managerLast=i,e.onHoverManagerItem({item:i,action:"enter"}))}},getBestParams:function(e,t,i){var r=0,n=0,o={},s=0,l=function(e,t){e.deep=t,e.children.length>s&&(s=e.children.length),e.deep>n&&(n=e.deep),o[t]?o[t]+=e.children.length:o[t]=e.children.length,o[t]>r&&(r=o[t]);for(var a=e.children.length-1;a>=0;a--)l(e.children[a],e.deep+1)};return l(e,1),r=Math.max(r,e.isolated.length+1),{max:r,maxOne:s,deep:n,margin:a.circleMargin,radius:Math.floor(Math.min(i/n-a.circleMargin,t/r-a.circleMargin)/2)}},getChildrenCountByDeep:function(e,t){var a=0,i=function(e){e.deep==t&&e.children.length&&(e.leftIndex=a,a+=e.children.length);for(var r=0;r<e.children.length;r++)i(e.children[r])};return i(e),a},drawTree:function(t){if(t.id){var r=a.width,n=a.canvasHeight,s=l;s.captureItmes();var c=s.getBestParams(t,r,n),d=e.getElementById("mx_view_canvas").getContext("2d");d.clearRect(0,0,r,n);var m=(c.radius/20).toFixed(1);c.radius<2&&(c.radius=2);var g=2*c.radius-2*(m+1)-1;s.$tWidth||(s.$tWidth={});var u=function(e){return s.$tWidth[e]||(d.font="normal 12px Arial",s.$tWidth[e]=d.measureText(e).width),s.$tWidth[e]},h=function(e){for(var t=1,a=0;t<=e.length;){if(a+=u(e.substring(t-1,t)),!(a<g))return e.substring(0,t-3)+"..";t+=1}return e},f=0,v=function(e,a,n,o){if(n){d.beginPath();var g=180*Math.atan((a.y-n.y)/(a.x-n.x))/Math.PI;g<0&&(g+=180);var u=Math.round(n.x+c.radius*Math.cos(g*Math.PI/180)),p=Math.round(n.y+c.radius*Math.sin(g*Math.PI/180));d.moveTo(u,p),d.lineTo(a.x,a.y),d.lineWidth=1,d.strokeStyle=o,d.stroke()}d.moveTo(a.x,a.y),d.beginPath(),d.arc(a.x,a.y,c.radius,0,2*Math.PI,!0),d.fillStyle=e.status,d.fill(),d.moveTo(a.x,a.y),d.beginPath(),d.arc(a.x,a.y,c.radius-m-1,0,2*Math.PI,!0),d.lineWidth=m,d.strokeStyle="#fff",d.stroke(),s.list.push({id:e.id,center:a,il:e.il,radius:c.radius}),d.beginPath(),d.moveTo(a.x,a.y),d.font="normal 12px Arial",d.fillStyle="#eee";var x=h(e.id),M=Math.round(d.measureText(x).width),b=(2*c.radius-M)/2;d.fillText(x,a.x+b-c.radius,a.y+4);var y=l.getChildrenCountByDeep(t,e.deep);if(y)for(var w=(r-(y*c.radius*2+(y-1)*c.margin))/2,I="#"+i[f++%i.length],_=0;_<e.children.length;_++)v(e.children[_],{x:w+(_+e.leftIndex)*(2*c.radius+c.margin)+c.radius,y:a.y+c.margin+2*c.radius},a,I)},p=t.isolated,x=r/2;if(p.length){x=(r-(p.length+1)*c.radius*2+p.length*c.margin)/2;for(var M=0;M<p.length;M++)v(p[M],{x:x+(M+1)*(2*c.radius+c.margin)+c.radius,y:c.margin+c.radius});x+=c.radius}v(t,{x:x,y:c.margin+c.radius}),o.showTotal(t,c)}},drawManagerTree:function(t){var r=l;r.captureManagerItmes();var n=a.managerMargin*(t.rows+1)+t.rows*a.managerHeight+(a.managerGroupSpace+a.managerMargin)*t.groups.length;o.updateManagerCanvasHeight(n);var s=e.getElementById("mx_manager_canvas").getContext("2d");s.clearRect(0,0,a.canvasWidth,n);var c=a.managerMargin,d=(a.canvasWidth-(1+a.managerCols)*a.managerMargin)/a.managerCols|0,m=function(){s.font="normal 14px Arial";var e=s.measureText("M").width;return e}(),g=function(e,t,a,i){e.beginPath(),e.moveTo(t[0],t[1]),e.fillStyle=a.color,e.fillRect(t[0],t[1],t[2],t[3]),e.beginPath(),e.moveTo(t[0],t[1]+10),e.font="normal 14px Arial",e.fillStyle="#282828";for(var n,o=a.id;(o.length-3)*m>t[2];)o=o.slice(0,-1),n=!0;n&&(o=o.slice(0,-3)+"..."),e.fillText(o,t[0]+5,t[1]+25),a["package"]=i,a.rect=t,r.managerList.push(a)},u=function(e){for(var t=0;t<e.length;t++){var r=e[t],n=a.managerMargin,o=!1;s.beginPath(),s.moveTo(n,c),s.font="normal 14px Arial",s.fillStyle="#282828",s.fillText(r.name,n+5,c+25),c+=a.managerGroupSpace;var l,m,u=Math.max(r.maxLeft,r.maxRight),h={},f=0,v=(u-r.maxLeft)/2*(a.managerHeight+a.managerMargin),p=(u-r.maxRight)/2*(a.managerHeight+a.managerMargin);for(l=0;l<u;l++){var x=r.cleans.left[l],M=r.cleans.right[l];x&&(g(s,[n,c+v,150,a.managerHeight],x,r.name),h[x.id]=x),M&&(g(s,[a.canvasWidth-a.managerMargin-150,c+p,150,a.managerHeight],M,r.name),h[M.id]=M,M.lineColor=i[f++%i.length]),c+=a.managerMargin+a.managerHeight}for(var b in h)if(m=h[b],m.cleans)for(var y={x:m.rect[0]+m.rect[2],y:m.rect[1]+(m.rect[3]/2|0)},w=(m.cleans+"").split(","),I=w.length-1;I>=0;I--){var _=h[w[I]],S={x:_.rect[0],y:_.rect[1]+(_.rect[3]/2|0)};s.beginPath(),s.moveTo(y.x,y.y),s.lineTo(S.x,S.y),s.lineWidth=1,s.strokeStyle="#"+(_.lineColor||"996699"),s.stroke()}for(l=0;l<r.caches.length;l++)g(s,[n,c,d,a.managerHeight],r.caches[l],r.name),(l+1)%a.managerCols===0?(n=a.managerMargin,c+=a.managerMargin+a.managerHeight,o=!1):(n+=d+a.managerMargin,o=!0);for(n=a.managerMargin,o&&(c+=a.managerMargin+a.managerHeight),l=0;l<r.items.length;l++)m=r.items[l],g(s,[n,c,d,a.managerHeight],m,r.name),(l+1)%a.managerCols===0?(n=a.managerMargin,c+=a.managerMargin+a.managerHeight,o=!1):(n+=d+a.managerMargin,o=!0);n=a.managerMargin,o&&(c+=a.managerGroupSpace)}};u(t.groups),o.showManagerTotal(t)},onHoverItem:function(e){var t=f.getEnv(),a=t.getVOM();"enter"==e.action?o.showMoreInfo(a.get(e.item.id),e.item):o.hideMoreInfo()},onHoverManagerItem:function(e){"enter"==e.action?o.showManagerMoreInfo(e.item):o.hideManagerMoreInfo()}},c={prepare:function(){KISSY.use("node")},getRootId:function(){var e,t=KISSY.Env.mods["magix/magix"];return e=t?KISSY.require("magix/magix"):KISSY.require("magix"),e.config("rootId")},getVOM:function(){var e=KISSY.Env.mods["magix/magix"];if(e)return KISSY.require("magix/vom");var t=KISSY.require("magix");return t.VOM||t.Vframe},getMangerMods:function(){var e=KISSY.Env.mods,t=[];for(var a in e){var i=e[a].exports||e[a].value;i&&(i.$mMetas&&i.$mCache||i.$mm&&i.$mc||i.$m&&i.$c)&&t.push({name:e[a].name,exports:i})}return t},isReady:function(){var e=KISSY.Env.mods["magix/magix"],t=KISSY.Env.mods.node;if(e){var a=KISSY.Env.mods["magix/vom"];return e.status===KISSY.Loader.Status.ATTACHED&&a&&a.status===KISSY.Loader.Status.ATTACHED&&t&&t.status===KISSY.Loader.Status.ATTACHED}return e=KISSY.Env.mods.magix,e&&e.status===KISSY.Loader.Status.ATTACHED&&t&&t.status===KISSY.Loader.Status.ATTACHED},updateDOMStyle:function(e,t){var a=KISSY.require("node").one("#"+t);if(a){var i=a,r={height:i.outerHeight?i.outerHeight():i.height(),width:i.outerWidth?i.outerWidth():i.width()};if(r.height){var n=a.offset();e.left=n.left+"px",e.top=n.top+"px",e.position="absolute",r.width=Math.max(r.width,a.children().width());var o=-1;do{var s=parseInt(a.css("z-index"))||1;s&&s>o&&(o=s),a=a.parent()}while(a);e.zIndex=o+1}else{var l=4,c=i;do{if(l--,!l)break;if(c=c.children(),r.height=c.height(),r.height){r.width=c.width();var d=c.css("position");if("fixed"==d){i=c.css("left"),e.left=i,e.position=d,i=c.css("top"),e.top=i,i=c.css("right"),e.right=i,i=c.css("bottom"),e.bottom=i;var o=parseInt(c.css("z-index"))||1;e.zIndex=o+1}else{var n=c.offset();e.left=n.left+"px",e.top=n.top+"px",e.position="absolute",r.width=Math.max(r.width,c.children().width());var o=-1;do{var s=parseInt(c.css("z-index"))||1;s&&s>o&&(o=s),c=c.parent()}while(c);e.zIndex=o+1}break}}while(!r.height)}e.width=r.width+"px",e.height=r.height+"px"}},getDOMOffset:function(e){var t=KISSY.require("node");return t.one("#"+e).offset()},bind:function(e,t,a){var i=KISSY.require("node");return KISSY.isString(e)&&(e="#"+e),i.one(e).on(t,a)},unbind:function(e,t,a){var i=KISSY.require("node");return KISSY.isString(e)&&(e="#"+e),i.one(e).detach(t,a)},getResType:function(e){var t="",a=e.res||e.e;if(a)if(a.fetchAll||a.all&&a.one&&a.next&&a.then)t="Model Manager";else if(a.bricks)t="Pagelet";else if(a.__attrs&&a.__attrVals&&a.constructor){var i,r=KISSY.Env.mods;for(var n in r){var o=r[n],s=o.value||o.exports;if(s&&a.constructor==s){t=o.name,i=!0;break}}i||(t=a.hasOwnProperty("pagelet")?"Brick":"extend KISSY Attribute")}else t=KISSY.isFunction(a)?"函数或构造器":KISSY.type(a);else t=KISSY.type(a);return t},hookAttachMod:function(e){var t=KISSY.Loader.Utils.attachMod;KISSY.Loader.Utils.attachMod=function(){t.apply(KISSY.Loader.Utils,arguments),e()}},dragIt:function(e,t){KISSY.use("dd",function(a,i){new i.Draggable({node:e,move:!0,handlers:[t]})})},drawIcons:function(){var e=this.getVOM().all();for(var t in e){var a=KISSY.one("#"+t);a.addClass("i-bca-icon")}}},d={prepare:function(){},hookAttachMod:function(){},getMod:function(e){return require.s.contexts._.defined[e]},getDL:function(){return this.getMod("$")||this.getMod("jquery")||this.getMod("zepto")},getRootId:function(){var e,t=this.getMod("magix/magix");return e=t?t:this.getMod("magix"),e.config("rootId")},getVOM:function(){var e=this.getMod("magix/vom");if(e)return e;var t=this.getMod("magix");return t.VOM||t.Vframe},getMangerMods:function(){var e=require.s.contexts._.defined,t=[];for(var a in e){var i=e[a];i&&(i.$mMetas&&i.$mCache||i.$mm&&i.$mc||i.$m&&i.$c)&&t.push({name:a,exports:i})}return t},isReady:function(){return this.getMod("magix/magix")||this.getMod("magix")},updateDOMStyle:function(e,t){var a=this.getDL(),i=a("#"+t),r=i,n={height:r.outerHeight?r.outerHeight():r.height(),width:r.outerWidth?r.outerWidth():r.width()};if(n.height){var o=i.offset();e.left=o.left+"px",e.top=o.top+"px",e.position="absolute",n.width=Math.max(n.width,i.children().width());var s=-1;do{var l=parseInt(i.css("z-index"))||1;l&&l>s&&(s=l),i=i.parent()}while(i.size()&&a.contains(document.body,i[0]));e.zIndex=s+1}else{var c=4,d=r;do{if(c--,!c)break;if(d=d.children(),n.height=d.height(),n.height){var m=d.css("position");if("fixed"==m){r=d.css("left"),e.left=r,e.position=m,r=d.css("top"),e.top=r,r=d.css("right"),e.right=r,r=d.css("bottom"),e.bottom=r;var s=parseInt(d.css("z-index"))||1;e.zIndex=s+1}else{var o=d.offset();e.left=o.left+"px",e.top=o.top+"px",e.position="absolute",n.width=Math.max(n.width,d.children().width());var s=-1;do{var l=parseInt(d.css("z-index"))||1;l&&l>s&&(s=l),d=d.parent()}while(d.size()&&a.contains(document.body,d[0]));e.zIndex=s+1}break}}while(!n.height)}e.width=n.width+"px",e.height=n.height+"px"},getDOMOffset:function(e){var t=this.getDL();return t("#"+e).offset()},bind:function(e,t,a){var i=this.getDL();return"string"==i.type(e)&&(e="#"+e),i(e).on(t,a)},unbind:function(e,t,a){var i=this.getDL();return"string"==i.type(e)&&(e="#"+e),i(e).off(t,a)},getResType:function(e){var t=e.res||e.e,a=this.getDL(),i=a.type(e);return t&&(t.fetchAll||t.all&&t.one&&t.next&&t.then?i="Model Manager":t.bricks?i="Pagelet":a.isFunction(t)&&(i="函数或构造器")),i},dragIt:function(e,t){var a=this.getDL(),i=a(e);a(t).on("mousedown",function(e){var t=parseInt(i.css("right"),10),r=parseInt(i.css("top"),10),n=e.pageX,o=e.pageY,s=function(e){var a=e.pageX-n,s=e.pageY-o;i.css({right:t-a,top:r+s})},l=function(){c.off("mousemove",s).off("mouseup",l)},c=a(document);c.on("mousemove",s).on("mouseup",l)})},drawIcons:function(){var e=this.getVOM().all(),t=this.getDL();for(var a in e){var i=t("#"+a);i.addClass("i-bca-icon")}}},m={},g={},u={};for(var h in d)m[h]=g[h]=u[h]=d[h];m.getMod=function(e){try{var t=seajs.require(e);return t}catch(a){}var i=seajs.cache;for(var r in i){var n=i[r];if(n.id===e)return n.exports}},m.getMangerMods=function(){var e=seajs.cache,t=[];for(var a in e){var i=e[a],r=i.exports;r&&r.$m&&r.$s&&t.push({name:i.id,exports:r})}return t},g.getMod=function(e){try{return require(e)}catch(t){return null}},g.getMangerMods=function(){return[]},u.getDL=function(){return window.$||window.jQuery},u.getRootId=function(){return Magix.config("rootId")},u.getVOM=function(){return Magix.VOM||Magix.Vframe},u.getMangerMods=function(){return[]},u.isReady=function(){return!0};var f={getEnv:function(){if(window.KISSY)return c;if(window.requirejs)return d;if(window.seajs)return m;if(window.define&&window.require)return g;if(window.Magix)return u;throw new Error("unsupport")},getTree:function(e){var a=e.getRootId(),i=e.getVOM(),r={total:0,vomTotal:0,children:[]},n=i.all(),o={};for(var s in n)n.hasOwnProperty(s)&&r.vomTotal++,o[s]=1;var l=function(e,a){var n=i.get(e);if(n){r.total++,a.id=n.id,delete o[n.id],n.fcc||n.$cr?a.status=t.created:n.fca||n.$ca?a.status=t.alter:a.status=t.init;var s=n.cM||n.$c;for(var c in s){var d={children:[]};l(c,d),d.id&&a.children.push(d)}}};l(a,r);var c=[];for(var d in o)c.push({id:d,il:!0,status:t.isolated,children:[]});return r.isolated=c,r},getManagerTree:function(e){for(var t=e.getMangerMods(),i=[],n=0,o={},s=0,l={},c=0,d=0;d<t.length;d++){var m=t[d],g=m.exports.$mMetas||m.exports.$mm||m.exports.$m;g._$id||(g._$id="t"+c++),l[g._$id]&&(l[g._$id].continued=!0),l[g._$id]=m}for(var u=0;u<t.length;u++){var h,f,v=t[u],p=[],x={left:[],right:[]},M=[],b=0,y=0,w=0,I=v.exports.$mMetas||v.exports.$mm||v.exports.$m;if(delete I._$id,!v.continued){for(h in I)if(f=I[h],f.cleans)for(var _=(f.cleans+"").split(","),S=0;S<_.length;S++)o[_[S]]=h;for(h in I){f=I[h];var T=r.normal,$={id:h,color:T,url:f.url||f.uri,cache:(f.cache||0|f.cacheTime)/1e3+"sec",desc:f.desc||"",cleans:f.cleans||"",cleaned:o[h]||"",hasAfter:!!f.after};f.cleans?(T=r.cleans,$.color=T,x.left.push($),y++):o[h]?(T=r.cleaned,$.color=T,x.right.push($),w++):f.cache||f.cacheTime?(T=r.cache,$.color=T,M.push($)):(p.push($),b++),s++}}n+=Math.ceil(b/a.managerCols),n+=Math.max(y,w),n+=Math.ceil(M.length/a.managerCols),i.push({name:v.name,rows:n,cleans:x,caches:M,maxLeft:y,maxRight:w,items:p})}return{groups:i,rows:n,total:s}},prepare:function(t){var a=f.getEnv();a.prepare();var i=function(){e.body&&a.isReady()?t():setTimeout(i,500)};i()},start:function(){f.prepare(function(){o.setup();var e,a=f.getEnv(),i=function(e){e.on("created",function(){s.log("vframe:"+e.id+"("+(e.path||e.view.path||"")+")渲染完毕",t.created),n()}),e.on("alter",function(a){s.log("vframe:"+e.id+"或子(孙)view"+(a.id?"("+a.id+")":"")+"正在更改",t.alter),n()}),e.on("viewInited",function(){s.log("vframe:"+e.id+"的view("+e.view.path+")，init调用完毕",t.created)}),e.on("viewUnmounted",function(){s.log("vframe:"+e.id+"的view("+(e.path||e.view&&e.view.path||"")+")销毁完毕",t.isolated)}),e.on("viewMounted",function(){s.log("vframe:"+e.id+"的view("+(e.path||e.view.path||"")+")，首次渲染完毕",t.created)}),e.___mh=!0},r=function(){var e=c.all();for(var t in e){var a=c.get(t);a.___mh||i(a)}},n=function(i){if(i)if("remove"==i.type)if(i.vframe){var n=i.vframe.path;!n&&i.vframe.view&&(n=i.vframe.view.path),n=n?"("+n+")":"",s.log("销毁vframe:"+i.vframe.id+n,t.isolated)}else s.log("remove:",i);else"created"==i.type&&r();clearTimeout(e),e=setTimeout(function(){var e=f.getTree(a);l.drawTree(e),a.drawIcons()},0)},c=a.getVOM();c.on("add",function(e){n(),e.vframe.pId&&s.log("找到vframe:"+e.vframe.pId+"的子vframe:"+e.vframe.id,t.build),s.log("创建vframe:"+e.vframe.id,t.build),i(e.vframe)}),c.on("remove",n);var d=c.get(a.getRootId());d&&d.on("created",n),r(),n();var m,g=function(){clearTimeout(m),m=setTimeout(function(){var e=f.getManagerTree(a);l.drawManagerTree(e)},500)};a.hookAttachMod(g),g()})}};f.start()}}();