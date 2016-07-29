(function(){
var D = document;
if (D._magix) return;
D._magix = 1;
var Status = {
    created: '#008B00',
    init: '#FF3030',
    alter: '#BC8F8F',
    isolated: '#FF3030',
    build: '#9AC0CD'
};
var Consts = {
    width: 550,
    height: 470,
    canvasWidth: 530,
    canvasHeight: 400,
    moreInfoWidth: 490,
    titleHeight: 34,
    circleMargin: 6,
    managerCols: 5,
    managerMargin: 5,
    managerHeight: 40,
    managerGroupSpace: 40
};
var Lines = [
    'FFC125',
    'C71585',
    '0000AA',
    'CDBA96',
    'FF7F00',
    'BA55D3',
    '8B4726',
    '7CFC00',
    '4A4A4A',
    'EE7AE9'
];
var ManagerColors = {
    cache: '#CC9966',
    cleaned: '#99CCCC',
    cleans: '#FF9999',
    normal: '#CCCC99'
};
var ApplyStyle = function(x, h) {
    var i = document.createElement('style');
    document.documentElement.appendChild(i);
    if (i.styleSheet) {
        i.styleSheet.cssText = h;
    } else {
        i.appendChild(document.createTextNode(h));
    }
};
ApplyStyle('i-bca',".i-bca-icon:before{width:12px;content:'M';height:12px;border-radius:6px;position:absolute;background-color:#008b00;opacity:.4;font-size:10px;line-height:12px;text-align:center;color:#fff;z-index:10}.i-bca-tab{background:#eee;cursor:move}.i-bca-main{position:fixed;right:20px;top:20px;width:550px;height:470px;z-index:100000;box-shadow:0 0 10px #b9b9b9;background-color:#fff;font-size:12px;line-height:1.5}.i-bca-main ul{list-style:none;padding:0}.i-bca-m5{margin-left:5px}.i-bca-fl{float:left}.i-bca-fr{float:right}.i-bca-cp{cursor:pointer}.i-bca-p8{padding:8px}.i-bca-move{cursor:move}.i-bca-red{color:red}.i-bca-clearfix:after,.i-bca-clearfix:before{content:\"\";display:table}.i-bca-clearfix:after{clear:both}.i-bca-clearfix{*zoom:1}.i-bca-bar{height:1px;border:0;padding:0;margin:5px;background:rgba(0,0,0,.2);background:-webkit-gradient(linear,left top,right top,from(rgba(165,69,243,0)),color-stop(.5,hsla(270,6%,49%,.33)),to(rgba(165,69,243,0)))}#mx_manager_moreinfo,#mx_moreinfo{position:absolute;background-color:#eee;padding:8px;width:440px;display:none;box-shadow:0 5px 10px #b9b9b9}");
var UI = {
    main: "<div class=\"i-bca-main\" id=\"mx\"><ul class=\"i-bca-clearfix i-bca-tab\" id=\"mx_tabs\"><li class=\"i-bca-fl i-bca-p8 i-bca-cp\">VOM</li><li class=\"i-bca-fl i-bca-p8 i-bca-cp\">Tracer</li><li class=\"i-bca-fl i-bca-p8 i-bca-cp\">Manager</li><li class=\"i-bca-fr i-bca-p8 i-bca-cp\" id=\"mx_min\">△</li></ul><div id=\"mx_painter\"><canvas width=\"{width}\" height=\"{canvasHeight}\" id=\"mx_view_canvas\"></canvas><ul class=\"i-bca-clearfix i-bca-p8\" id=\"mx_view_total\"></ul></div><div id=\"mx_trancer\" style=\"height:{canvasHeight}px;overflow:scroll;overflow-x:auto;display:none;padding:8px\"></div><div id=\"mx_manager\" style=\"height:{canvasHeight}px;overflow:scroll;overflow-x:auto;display:none\"><canvas width=\"{canvasWidth}\" height=\"{canvasHeight}\" id=\"mx_manager_canvas\"></canvas><ul class=\"i-bca-clearfix i-bca-p8\" id=\"mx_manager_total\"></ul></div><div id=\"mx_moreinfo\"></div><div id=\"mx_manager_moreinfo\"></div></div>",
    moreInfo: "<ul><li><b>id:</b>{id}</li><li><b>view:</b>{view}</li><li class=\"i-bca-red\">{ex}</li><li><b>resources:</b></li><li style=\"{moreInfoWidth}px;overflow:auto;max-height:200px\">{res}</li></ul>",
    moreManagerInfo: "<ul><li><b>key:</b>{id}</li><li><b>url:</b>{url}</li><li><b>描述:</b>{desc}</li><li><b>缓存:</b>{cache}</li><li><b>清理缓存:</b>{cleans}</li><li><b>预处理:</b>{hasAfter}</li></ul>",
    total: "<li class=\"i-bca-fl\">共{total}个view</li><li class=\"i-bca-fl ml5 i-bca-red\">{ex}</li>",
    managerTotal: "<li class=\"i-bca-fl\">{groups}个接口文件，共{total}个接口</li>",
    setup: function() {
        var div = D.createElement('div');
        div.innerHTML = UI.main.replace(/\{(\w+)\}/g, function(m, v) {
            return Consts[v];
        });
        D.documentElement.appendChild(div);
        UI.attachEvent();
        var env = Helper.getEnv();
        env.dragIt('#mx', '#mx_tabs');
    },
    attachEvent: function() {
        UI.detachEvent();
        var moveTimer;
        var env = Helper.getEnv();
        env.bind('mx_view_canvas', 'mousemove', UI.$mousemove = function(e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function() {
                var offset = env.getDOMOffset('mx_view_canvas');
                UI.onMousemove({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env.bind('mx_view_canvas', 'mouseout', UI.$mouseout = function() {
            clearTimeout(moveTimer);
            UI.onMousemove({
                x: -1,
                y: -1
            });
        });
        env.bind('mx_manager_canvas', 'mousemove', UI.$mangerMousemove = function(e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function() {
                var offset = env.getDOMOffset('mx_manager_canvas');
                UI.onManagerMousemove({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env.bind('mx_manager_canvas', 'mouseout', UI.$managerMouseout = function() {
            clearTimeout(moveTimer);
            UI.onManagerMousemove({
                x: -1,
                y: -1
            });
        });
        env.bind('mx_moreinfo', 'mouseover', UI.$imouseover = function() {
            clearTimeout(UI.$hideTimer);
        });
        env.bind('mx_moreinfo', 'mouseout', UI.$imouseout = function() {
            UI.hideMoreInfo();
        });
        env.bind('mx', 'click', UI.$click = function(e) {
            var node;
            if (e.target.id == 'mx_min') {
                node = D.getElementById('mx');
                if (e.target.innerHTML == '△') {
                    node.style.height = Consts.titleHeight + 'px';
                    node.style.overflow = 'hidden';
                    e.target.innerHTML = '▽';
                } else {
                    node.style.height = Consts.height + 'px';
                    node.style.overflow = 'inherit';
                    e.target.innerHTML = '△';
                }
            } else if (e.target.innerHTML == 'VOM') {
                node = D.getElementById('mx_painter');
                node.style.display = 'block';
                node = D.getElementById('mx_trancer');
                node.style.display = 'none';
                node = D.getElementById('mx_manager');
                node.style.display = 'none';
            } else if (e.target.innerHTML == 'Tracer') {
                node = D.getElementById('mx_painter');
                node.style.display = 'none';
                node = D.getElementById('mx_manager');
                node.style.display = 'none';
                node = D.getElementById('mx_trancer');
                node.style.display = 'block';
            } else if (e.target.innerHTML == 'Manager') {
                node = D.getElementById('mx_painter');
                node.style.display = 'none';
                node = D.getElementById('mx_trancer');
                node.style.display = 'none';
                node = D.getElementById('mx_manager');
                node.style.display = 'block';
            }
        });
    },
    detachEvent: function() {
        var env = Helper.getEnv();
        env.unbind('mx_view_canvas', 'mousemove', UI.$mousemove);
        env.unbind('mx_view_canvas', 'mouseout', UI.$mouseout);
        env.unbind('mx_manager_canvas', 'mousemove', UI.$managerMousemove);
        env.unbind('mx_manager_canvas', 'mouseout', UI.$managerMouseout);
        env.unbind('mx_min', 'click', UI.$click);
        env.unbind('mx_moreinfo', 'mouseoout', UI.$imouseout);
        env.unbind('mx_moreinfo', 'mouseover', UI.$imouseover);
        //env.unbind('mx_mover', 'mousedown', UI.$mousedown);
    },
    showMoreInfo: function(vf, item) {
        clearTimeout(UI.$hideTimer);
        var cover = D.getElementById('mx_cover');
        if (!cover) {
            cover = D.createElement('div');
            cover.style.cssText = 'position:absolute;opacity:0.7;background-color:#90EE90;z-index:99999;';
            cover.id = 'mx_cover';
            D.body.appendChild(cover);
        }

        var node = D.getElementById('mx_moreinfo');
        node.style.display = 'block';
        var left = item.center.x - Consts.moreInfoWidth / 2;
        node.style.left = left + 'px';
        node.style.top = item.center.y + item.radius + Consts.titleHeight + 5 + 'px';
        var env = Helper.getEnv();
        env.updateDOMStyle(cover.style, vf.id);
        cover.style.display = 'block';

        node.innerHTML = UI.moreInfo.replace(/\{(\w+)\}/g, function(m, v) {
            switch (v) {
                case 'id':
                    return item.id;
                case 'view':
                    return vf ? (vf.path || vf.view && vf.view.path || '') : '';
                case 'ex':
                    if (item.il) {
                        return '被孤立的节点，好可怜……';
                    }
                    if (!vf) {
                        return 'vframe已被销毁，但未从vom中移除';
                    }
                    if (!vf.path) {
                        if (!vf.view) {
                            return '未加载view';
                        }
                    } else {
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            return '未加载view';
                        }
                    }
                    if (vf.cM) {
                        if (!vf.fcc) {
                            return vf.rC != vf.cC ? '正等待子view加载' : '正等待view加载';
                        }
                    } else {
                        if (!vf.$cr) {
                            return vf.$rc != vf.$cc ? '正等待子view加载' : '正等待view加载';
                        }
                    }
                    if (vf.fca || vf.$ca) {
                        return '等待view渲染';
                    }
                    return '';
                case 'res':
                    var t = [];
                    var res = vf && vf.view && vf.view.$res;
                    var nKey;
                    if (!res) {
                        nKey = true;
                        res = vf && vf.$v && vf.$v.$res;
                    }
                    if (res) {
                        var hasRrs;
                        for (var p in res) {
                            hasRrs = true;
                            break;
                        }
                        if (hasRrs) {
                            t.push('<table style="width:100%"><tr><td>key</td><td>type</td></tr>');
                            for (var p in res) {
                                t.push('<tr><td>', p, '</td><td>', env.getResType(res[p]), '</td></tr>');
                            }
                            t.push('</table>');
                        }
                    }
                    return t.join('');
                default:
                    return Consts[v];
            }
        });
    },
    hideMoreInfo: function() {
        var node = D.getElementById('mx_moreinfo');
        var cover = D.getElementById('mx_cover');
        UI.$hideTimer = setTimeout(function() {
            node.style.display = 'none';
            cover.style.display = 'none';
        }, 150);
    },
    showManagerMoreInfo: function(item) {
        clearTimeout(UI.$hideManagerTimer);
        var node = D.getElementById('mx_manager_moreinfo');
        node.style.display = 'block';
        node.style.left = item.rect[0] + 'px';
        var top = item.rect[1] + item.rect[3] + Consts.titleHeight;
        var st = D.getElementById('mx_manager').scrollTop;
        top -= st;
        node.style.top = top + 'px';
        node.innerHTML = UI.moreManagerInfo.replace(/\{(\w+)\}/g, function(m, v) {
            switch (v) {
                case 'id':
                    return item.id;
                default:
                    return item[v];
            }
        });
    },
    hideManagerMoreInfo: function() {
        var node = D.getElementById('mx_manager_moreinfo');
        UI.$hideManagerTimer = setTimeout(function() {
            node.style.display = 'none';
        }, 150);
    },
    showManagerTotal: function(tree) {
        var node = D.getElementById('mx_manager_total');
        node.innerHTML = UI.managerTotal.replace(/\{(\w+)\}/g, function(m, v) {
            switch (v) {
                case 'groups':
                    return tree.groups.length;
                case 'total':
                    return tree.total;
            }
        });
    },
    showTotal: function(tree, extra) {
        var node = D.getElementById('mx_view_total');
        node.innerHTML = UI.total.replace(/\{(\w+)\}/g, function(m, v) {
            switch (v) {
                case 'total':
                    return tree.vomTotal;
                case 'ex':
                    if (tree.total != tree.vomTotal) {
                        return '<b style="color:red">vom中共' + tree.vomTotal + '个view，而只有' + tree.total + '个存在关联</b>';
                    }
                    return '';
            }
        });
    },
    updateManagerCanvasHeight: function(height) {
        D.getElementById('mx_manager_canvas').height = height | 0;
    },
    onMousemove: function(e) {
        console.log(e);
    },
    onManagerMousemove: function(e) {
        console.log(e);
    }
};
var Tracer = {
    log: function(info, color) {
        var node = D.getElementById('mx_trancer');
        if (Tracer.idle) {
            var t = D.createElement('hr');
            t.className = 'i-bca-bar';
            node.insertBefore(t, node.firstChild);
            delete Tracer.idle;
        }
        var d = D.createElement('div');
        d.innerHTML = info;
        if (color) d.style.color = color;
        node.insertBefore(d, node.firstChild);
        if (node.getElementsByTagName('div').length > 200) {
            node.removeChild(node.lastChild);
            node.removeChild(node.lastChild);
        }
        clearTimeout(Tracer.$timer);
        Tracer.$timer = setTimeout(function() {
            Tracer.idle = true;
        }, 1500);
    }
};
var Graphics = {
    captureItmes: function() {
        var g = Graphics;
        g.list = [];
        delete g.$last;
        UI.onMousemove = function(e) {
            var loop, one, dis;
            if (g.$last) {
                one = g.$last;
                dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                if (dis > one.radius) {
                    g.onHoverItem({
                        item: one,
                        action: 'leave'
                    });
                    delete g.$last;
                    loop = true;
                }
            } else {
                loop = true;
            }
            if (loop) {
                for (var i = g.list.length - 1; i >= 0; i--) {
                    one = g.list[i];
                    dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                    if (dis <= one.radius) {
                        if (g.$last != one) {
                            g.$last = one;
                            g.onHoverItem({
                                item: one,
                                action: 'enter'
                            });
                        }
                        break;
                    }
                }
            }
        };
    },
    captureManagerItmes: function() {
        var g = Graphics;
        g.managerList = [];
        delete g.$managerLast;

        UI.onManagerMousemove = function(e) {
            var loop, one, rect;
            if (g.$managerLast) {
                one = g.$managerLast;
                rect = one.rect;
                if (e.x < rect[0] || e.y < rect[1] || e.x > (rect[0] + rect[2]) || e.y > (rect[1] + rect[3])) {
                    g.onHoverManagerItem({
                        item: one,
                        action: 'leave'
                    });
                    delete g.$managerLast;
                    loop = true;
                }
            } else {
                loop = true;
            }
            if (loop) {
                for (var i = g.managerList.length - 1; i >= 0; i--) {
                    one = g.managerList[i];
                    rect = one.rect;
                    if (e.x >= rect[0] && e.y >= rect[1] && e.x <= (rect[0] + rect[2]) && e.y <= (rect[1] + rect[3])) {
                        if (g.$managerLast != one) {
                            g.$managerLast = one;
                            g.onHoverManagerItem({
                                item: one,
                                action: 'enter'
                            });
                        }
                    }
                }
            }
        };
    },
    getBestParams: function(tree, width, height) {
        var maxChildren = 0,
            deep = 0,
            deepMap = {},
            maxOneChildren = 0;
        var walk = function(item, level) {
            item.deep = level;
            if (item.children.length > maxOneChildren) {
                maxOneChildren = item.children.length;
            }
            if (item.deep > deep) {
                deep = item.deep;
            }
            if (!deepMap[level]) {
                deepMap[level] = item.children.length;
            } else {
                deepMap[level] += item.children.length;
            }
            if (deepMap[level] > maxChildren) {
                maxChildren = deepMap[level];
            }
            for (var i = item.children.length - 1; i >= 0; i--) {
                walk(item.children[i], item.deep + 1);
            }
        };
        walk(tree, 1);
        maxChildren = Math.max(maxChildren, tree.isolated.length + 1);
        return {
            max: maxChildren,
            maxOne: maxOneChildren,
            deep: deep,
            margin: Consts.circleMargin,
            radius: Math.floor(Math.min(height / deep - Consts.circleMargin, width / maxChildren - Consts.circleMargin) / 2)
        };
    },
    getChildrenCountByDeep: function(tree, deep) {
        var count = 0;
        var walk = function(item) {
            if (item.deep == deep && item.children.length) {
                item.leftIndex = count;
                count += item.children.length;
            }
            for (var i = 0; i < item.children.length; i++) {
                walk(item.children[i]);
            }
        };
        walk(tree);
        return count;
    },
    drawTree: function(tree) {
        if (tree.id) {
            var width = Consts.width,
                height = Consts.canvasHeight,
                g = Graphics;
            g.captureItmes();
            var params = g.getBestParams(tree, width, height);
            var ctx = D.getElementById('mx_view_canvas').getContext('2d');
            ctx.clearRect(0, 0, width, height);
            var band = (params.radius / 20).toFixed(1);
            if (params.radius < 2) params.radius = 2;
            var max = params.radius * 2 - 2 * (band + 1) - 1;
            if (!g.$tWidth) g.$tWidth = {};
            var getWidth = function(text) {
                if (!g.$tWidth[text]) {
                    ctx.font = 'normal 12px Arial';
                    g.$tWidth[text] = ctx.measureText(text).width;
                }
                return g.$tWidth[text];
            };
            var cutText = function(text) {
                var len = 1,
                    width = 0;
                while (len <= text.length) {
                    width += getWidth(text.substring(len - 1, len));
                    if (width < max) {
                        len += 1;
                    } else {
                        return text.substring(0, len - 3) + '..';
                    }
                }
                return text;
            };
            var linecolorIndex = 0;
            var drawCircle = function(item, pos, ppos, lineColor) {
                if (ppos) {
                    ctx.beginPath();
                    var deg = Math.atan((pos.y - ppos.y) / (pos.x - ppos.x)) * 180 / Math.PI;
                    if (deg < 0) {
                        deg += 180;
                    }
                    var tx = Math.round(ppos.x + params.radius * Math.cos(deg * Math.PI / 180));
                    var ty = Math.round(ppos.y + params.radius * Math.sin(deg * Math.PI / 180));
                    ctx.moveTo(tx, ty); // 设置路径起点，坐标为(20,20)
                    ctx.lineTo(pos.x, pos.y); // 绘制一条到(200,20)的直线
                    ctx.lineWidth = 1.0; // 设置线宽
                    ctx.strokeStyle = lineColor;
                    ctx.stroke(); // 进行线的着色，这时整条线才变得可见
                }

                ctx.moveTo(pos.x, pos.y);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, params.radius, 0, Math.PI * 2, true);
                ctx.fillStyle = item.status;
                ctx.fill();

                ctx.moveTo(pos.x, pos.y);
                ctx.beginPath();

                ctx.arc(pos.x, pos.y, params.radius - band - 1, 0, Math.PI * 2, true);
                ctx.lineWidth = band;
                ctx.strokeStyle = '#fff';
                ctx.stroke();

                g.list.push({
                    id: item.id,
                    center: pos,
                    il: item.il,
                    radius: params.radius
                });
                //text
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.font = 'normal 12px Arial';
                ctx.fillStyle = '#eee';
                var id = cutText(item.id);
                var textWidth = Math.round(ctx.measureText(id).width);
                var left = (2 * params.radius - textWidth) / 2;
                ctx.fillText(id, pos.x + left - params.radius, pos.y + 4);
                var count = Graphics.getChildrenCountByDeep(tree, item.deep);
                if (count) {
                    var space = (width - (count * params.radius * 2 + (count - 1) * params.margin)) / 2;
                    var lcolor = '#' + Lines[linecolorIndex++ % Lines.length]; // Lines[Math.floor(Math.random() * (Lines.length - 1))];
                    for (var i = 0; i < item.children.length; i++) {
                        drawCircle(item.children[i], {
                            x: space + (i + item.leftIndex) * (params.radius * 2 + params.margin) + params.radius,
                            y: pos.y + params.margin + 2 * params.radius
                        }, pos, lcolor);
                    }
                }
            };
            var temp = tree.isolated;
            var space = width / 2;
            if (temp.length) {
                space = (width - (temp.length + 1) * params.radius * 2 + temp.length * params.margin) / 2;
                for (var i = 0; i < temp.length; i++) {
                    drawCircle(temp[i], {
                        x: space + (i + 1) * (params.radius * 2 + params.margin) + params.radius,
                        y: params.margin + params.radius
                    });
                }
                space += params.radius;
            }

            drawCircle(tree, {
                x: space,
                y: params.margin + params.radius
            });
            UI.showTotal(tree, params);
        }
    },
    drawManagerTree: function(tree) {
        var gs = Graphics;
        gs.captureManagerItmes();
        var height = Consts.managerMargin * (tree.rows + 1) + tree.rows * Consts.managerHeight + (Consts.managerGroupSpace + Consts.managerMargin) * tree.groups.length;
        UI.updateManagerCanvasHeight(height);
        var ctx = D.getElementById('mx_manager_canvas').getContext('2d');
        ctx.clearRect(0, 0, Consts.canvasWidth, height);
        var top = Consts.managerMargin;
        var managerWidth = ((Consts.canvasWidth - (1 + Consts.managerCols) * Consts.managerMargin) / Consts.managerCols) | 0;
        var oneWidth = (function() {
            ctx.font = 'normal 14px Arial';
            var width = ctx.measureText('M').width;
            return width;
        })();
        var drawRect = function(ctx, rect, one, pname) {
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1]);
            ctx.fillStyle = one.color;
            ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
            //text
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1] + 10);
            ctx.font = 'normal 14px Arial';
            ctx.fillStyle = '#282828';
            var id = one.id,
                tail;
            while ((id.length - 3) * oneWidth > rect[2]) {
                id = id.slice(0, -1);
                tail = true;
            }
            if (tail) {
                id = id.slice(0, -3) + '...';
            }
            ctx.fillText(id, rect[0] + 5, rect[1] + 25);

            one.package = pname;
            one.rect = rect;
            gs.managerList.push(one);
        };
        var draw = function(groups) {
            for (var i = 0; i < groups.length; i++) {
                var g = groups[i];
                var left = Consts.managerMargin;
                var pad = false;
                ctx.beginPath();
                ctx.moveTo(left, top);
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = '#282828';
                ctx.fillText(g.name, left + 5, top + 25);
                top += Consts.managerGroupSpace;
                var u, one;
                var max = Math.max(g.maxLeft, g.maxRight);
                var maps = {};
                var linecolorIndex = 0;
                var leftTopSpace = ((max - g.maxLeft) / 2) * (Consts.managerHeight + Consts.managerMargin);
                var rightTopSpace = ((max - g.maxRight) / 2) * (Consts.managerHeight + Consts.managerMargin);
                for (u = 0; u < max; u++) {
                    var lo = g.cleans.left[u];
                    var ro = g.cleans.right[u];
                    if (lo) {
                        drawRect(ctx, [
                                left,
                                top + leftTopSpace,
                                150,
                                Consts.managerHeight
                            ], lo, g.name);
                        maps[lo.id] = lo;
                    }
                    if (ro) {
                        drawRect(ctx, [
                                Consts.canvasWidth - Consts.managerMargin - 150,
                                top + rightTopSpace,
                                150,
                                Consts.managerHeight
                            ], ro, g.name);
                        maps[ro.id] = ro;
                        ro.lineColor = Lines[linecolorIndex++ % Lines.length];
                    }
                    top += Consts.managerMargin + Consts.managerHeight;
                }
                for (var p in maps) {
                    one = maps[p];
                    if (one.cleans) {
                        var beginPos = {
                            x: one.rect[0] + one.rect[2],
                            y: one.rect[1] + (one.rect[3] / 2 | 0)
                        };
                        var a = (one.cleans + '').split(',');
                        for (var x = a.length - 1; x >= 0; x--) {
                            var endOne = maps[a[x]];
                            var endPos = {
                                x: endOne.rect[0],
                                y: endOne.rect[1] + (endOne.rect[3] / 2 | 0)
                            };
                            ctx.beginPath();

                            ctx.moveTo(beginPos.x, beginPos.y); // 设置路径起点，坐标为(20,20)
                            ctx.lineTo(endPos.x, endPos.y); // 绘制一条到(200,20)的直线
                            ctx.lineWidth = 1.0; // 设置线宽
                            ctx.strokeStyle = '#' + (endOne.lineColor || '996699');
                            ctx.stroke();
                        }
                    }
                }
                for (u = 0; u < g.caches.length; u++) {
                    drawRect(ctx, [left, top, managerWidth, Consts.managerHeight], g.caches[u], g.name);
                    if ((u + 1) % Consts.managerCols === 0) {
                        left = Consts.managerMargin;
                        top += Consts.managerMargin + Consts.managerHeight;
                        pad = false;
                    } else {
                        left += managerWidth + Consts.managerMargin;
                        pad = true;
                    }
                }
                left = Consts.managerMargin;
                if (pad) {
                    top += Consts.managerMargin + Consts.managerHeight;
                }
                for (u = 0; u < g.items.length; u++) {
                    one = g.items[u];

                    drawRect(ctx, [left, top, managerWidth, Consts.managerHeight], one, g.name);

                    if ((u + 1) % Consts.managerCols === 0) {
                        left = Consts.managerMargin;
                        top += Consts.managerMargin + Consts.managerHeight;
                        pad = false;
                    } else {
                        left += managerWidth + Consts.managerMargin;
                        pad = true;
                    }
                }
                left = Consts.managerMargin;
                if (pad) {
                    top += Consts.managerGroupSpace;
                }
            }
        };
        draw(tree.groups);
        UI.showManagerTotal(tree);
    },
    onHoverItem: function(e) {
        var env = Helper.getEnv();
        var vom = env.getVOM();
        if (e.action == 'enter') {
            UI.showMoreInfo(vom.get(e.item.id), e.item);
        } else {
            UI.hideMoreInfo();
        }
    },
    onHoverManagerItem: function(e) {
        if (e.action == 'enter') {
            UI.showManagerMoreInfo(e.item);
        } else {
            UI.hideManagerMoreInfo();
        }
    }
};
var KISSYEnv = {
    prepare: function() {
        KISSY.use('node');
    },
    getRootId: function() {
        var old = KISSY.Env.mods['magix/magix'];
        var magix;
        if (old) {
            magix = KISSY.require('magix/magix');
        } else {
            magix = KISSY.require('magix');
        }
        return magix.config('rootId');
    },
    getVOM: function() {
        var old = KISSY.Env.mods['magix/magix'];
        if (old) {
            return KISSY.require('magix/vom');
        }
        var magix = KISSY.require('magix');
        return magix.VOM || magix.Vframe;
    },
    getMangerMods: function() {
        var mods = KISSY.Env.mods;
        var result = [];
        for (var p in mods) {
            var v = mods[p].exports || mods[p].value;
            if (v && ((v.$mMetas && v.$mCache) || (v.$mm && v.$mc) || (v.$m && v.$c))) {
                result.push({
                    name: mods[p].name,
                    exports: v
                });
            }
        }
        return result;
    },
    isReady: function() {
        var magix = KISSY.Env.mods['magix/magix'];
        var node = KISSY.Env.mods.node;
        if (magix) {
            var vom = KISSY.Env.mods['magix/vom'];
            return magix.status === KISSY.Loader.Status.ATTACHED && vom && vom.status === KISSY.Loader.Status.ATTACHED && node && node.status === KISSY.Loader.Status.ATTACHED;
        } else {
            magix = KISSY.Env.mods.magix;
            return magix && magix.status === KISSY.Loader.Status.ATTACHED && node && node.status === KISSY.Loader.Status.ATTACHED;
        }
    },
    updateDOMStyle: function(style, id) {
        var node = KISSY.require('node').one('#' + id);
        if (!node) return;
        var n = node;
        var size = {
            height: n.outerHeight ? n.outerHeight() : n.height(),
            width: n.outerWidth ? n.outerWidth() : n.width()
        };
        if (!size.height) {
            var max = 4;
            var nodes = n;
            do {
                max--;
                if (!max) break;
                nodes = nodes.children();
                size.height = nodes.height();
                console.log(nodes);
                if (size.height) {
                    size.width = nodes.width();
                    var pos = nodes.css('position');
                    if (pos == 'fixed') {
                        n = nodes.css('left');
                        style.left = n;
                        style.position = pos;
                        n = nodes.css('top');
                        style.top = n;
                        n = nodes.css('right');
                        style.right = n;
                        n = nodes.css('bottom');
                        style.bottom = n;
                        var zIndex = parseInt(nodes.css('z-index')) || 1;
                        style.zIndex = zIndex + 1;
                    } else {
                        var offset = nodes.offset();
                        style.left = offset.left + 'px';
                        style.top = offset.top + 'px';
                        style.position = 'absolute';
                        size.width = Math.max(size.width, nodes.children().width());
                        var zIndex = -1;
                        do {
                            var z = parseInt(nodes.css('z-index')) || 1;
                            if (z && z > zIndex) zIndex = z;
                            nodes = nodes.parent();
                        } while (nodes);
                        style.zIndex = zIndex + 1;
                    }
                    break;
                }
            } while (!size.height);
        } else {
            var offset = node.offset();
            style.left = offset.left + 'px';
            style.top = offset.top + 'px';
            style.position = 'absolute';
            size.width = Math.max(size.width, node.children().width());
            var zIndex = -1;
            do {
                var z = parseInt(node.css('z-index')) || 1;
                if (z && z > zIndex) zIndex = z;
                node = node.parent();
            } while (node);
            style.zIndex = zIndex + 1;
        }

        style.width = size.width + 'px';
        style.height = size.height + 'px';
    },
    getDOMOffset: function(id) {
        var node = KISSY.require('node');
        return node.one('#' + id).offset();
    },
    bind: function(id, type, fn) {
        var node = KISSY.require('node');
        if (KISSY.isString(id)) id = '#' + id;
        return node.one(id).on(type, fn);
    },
    unbind: function(id, type, fn) {
        var node = KISSY.require('node');
        if (KISSY.isString(id)) id = '#' + id;
        return node.one(id).detach(type, fn);
    },
    getResType: function(r) {
        var type = '';
        var e = r.res || r.e;
        if (e) {
            if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                type = 'Model Manager';
            } else if (e.bricks) {
                type = 'Pagelet';
            } else if (e.__attrs && e.__attrVals && e.constructor) {
                var mods = KISSY.Env.mods,
                    found;
                for (var p in mods) {
                    var info = mods[p];
                    var v = info.value || info.exports;
                    if (v && e.constructor == v) {
                        type = info.name;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    if (e.hasOwnProperty('pagelet')) {
                        type = 'Brick';
                    } else {
                        type = 'extend KISSY Attribute';
                    }
                }
            } else if (!KISSY.isFunction(e)) {
                type = KISSY.type(e);
            } else {
                type = '函数或构造器';
            }
        } else {
            type = KISSY.type(e);
        }
        return type;
    },
    hookAttachMod: function(callback) {
        var old = KISSY.Loader.Utils.attachMod;
        KISSY.Loader.Utils.attachMod = function() {
            old.apply(KISSY.Loader.Utils, arguments);
            callback();
        };
    },
    dragIt: function(node, handler) {
        KISSY.use('dd', function(S, DD) {
            new DD.Draggable({
                node: node,
                move: true,
                handlers: [handler]
            });
        });
    },
    drawIcons: function() {
        var vfs = this.getVOM().all();
        for (var p in vfs) {
            var root = KISSY.one('#' + p);
            root.addClass('i-bca-icon');
        }
    }
};
var RequireEnv = {
    prepare: function() {},
    hookAttachMod: function() {},
    getMod: function(key) {
        return require.s.contexts._.defined[key];
    },
    getDL: function() {
        return this.getMod('$') || this.getMod('jquery') || this.getMod('zepto');
    },
    getRootId: function() {
        var old = this.getMod('magix/magix');
        var magix;
        if (old) {
            magix = old;
        } else {
            magix = this.getMod('magix');
        }
        return magix.config('rootId');
    },
    getVOM: function() {
        var old = this.getMod('magix/vom');
        if (old) {
            return old;
        }
        var magix = this.getMod('magix');
        return magix.VOM || magix.Vframe;
    },
    getMangerMods: function() {
        var mods = require.s.contexts._.defined;
        var result = [];
        for (var p in mods) {
            var v = mods[p];
            if (v && ((v.$mMetas && v.$mCache) || (v.$mm && v.$mc) || (v.$m && v.$c))) {
                result.push({
                    name: p,
                    exports: v
                });
            }
        }
        return result;
    },
    isReady: function() {
        return this.getMod('magix/magix') || this.getMod('magix');
    },
    updateDOMStyle: function(style, id) {
        var $ = this.getDL();
        var node = $('#' + id);
        var n = node;
        var size = {
            height: n.outerHeight ? n.outerHeight() : n.height(),
            width: n.outerWidth ? n.outerWidth() : n.width()
        };
        if (!size.height) {
            var max = 4;
            var nodes = n;
            do {
                max--;
                if (!max) break;
                nodes = nodes.children();
                size.height = nodes.height();
                if (size.height) {
                    var pos = nodes.css('position');
                    if (pos == 'fixed') {
                        n = nodes.css('left');
                        style.left = n;
                        style.position = pos;
                        n = nodes.css('top');
                        style.top = n;
                        n = nodes.css('right');
                        style.right = n;
                        n = nodes.css('bottom');
                        style.bottom = n;
                        var zIndex = parseInt(nodes.css('z-index')) || 1;
                        style.zIndex = zIndex + 1;
                    } else {
                        var offset = nodes.offset();
                        style.left = offset.left + 'px';
                        style.top = offset.top + 'px';
                        style.position = 'absolute';
                        size.width = Math.max(size.width, nodes.children().width());
                        var zIndex = -1;
                        do {
                            var z = parseInt(nodes.css('z-index')) || 1;
                            if (z && z > zIndex) zIndex = z;
                            nodes = nodes.parent();
                        } while (nodes.length && $.contains(document.body, nodes[0]));
                        style.zIndex = zIndex + 1;
                    }
                    break;
                }
            } while (!size.height);
        } else {
            var offset = node.offset();
            style.left = offset.left + 'px';
            style.top = offset.top + 'px';
            style.position = 'absolute';
            size.width = Math.max(size.width, node.children().width());
            var zIndex = -1;
            do {
                var z = parseInt(node.css('z-index')) || 1;
                if (z && z > zIndex) zIndex = z;
                node = node.parent();
            } while (node.length && $.contains(document.body, node[0]));
            style.zIndex = zIndex + 1;
        }

        style.width = size.width + 'px';
        style.height = size.height + 'px';
    },
    getDOMOffset: function(id) {
        var $ = this.getDL();
        return $('#' + id).offset();
    },
    bind: function(id, type, fn) {
        var $ = this.getDL();
        if ($.type(id) == 'string') id = '#' + id;
        return $(id).on(type, fn);
    },
    unbind: function(id, type, fn) {
        var $ = this.getDL();
        if ($.type(id) == 'string') id = '#' + id;
        return $(id).off(type, fn);
    },
    getResType: function(r) {
        var e = r.res || r.e;
        var $ = this.getDL();
        var type = $.type(r);
        if (e) {
            if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                type = 'Model Manager';
            } else if (e.bricks) {
                type = 'Pagelet';
            } else if ($.isFunction(e)) {
                type = '函数或构造器';
            }
        }
        return type;
    },
    dragIt: function(node, handle) {
        var $ = this.getDL();
        var root = $(node);
        $(handle).on('mousedown', function(e) {
            var right = parseInt(root.css('right'), 10);
            var top = parseInt(root.css('top'), 10);
            var x = e.pageX;
            var y = e.pageY;
            var move = function(e) {
                var fx = e.pageX - x,
                    fy = e.pageY - y;
                root.css({
                    right: right - fx,
                    top: top + fy
                });
            };
            var up = function() {
                doc.off('mousemove', move).off('mouseup', up);
            };
            var doc = $(document);
            doc.on('mousemove', move).on('mouseup', up);
        });
    },
    drawIcons: function() {
        var vfs = this.getVOM().all();
        var $ = this.getDL();
        for (var p in vfs) {
            var root = $('#' + p);
            root.addClass('i-bca-icon');
        }
    }
};
var SeajsEnv = {},
    SeajsSEnv = {},
    MagixEnv = {};
for (var p in RequireEnv) {
    SeajsEnv[p] = SeajsSEnv[p] = MagixEnv[p] = RequireEnv[p];
}
SeajsEnv.getMod = function(key) {
    try {
        var entity = seajs.require(key);//seajs有别名，优先使用内置的require获取
        return entity;
    } catch (e) {
        console.log(e);
    }
    var mods = seajs.cache;
    for (var p in mods) {
        var mod = mods[p];
        if (mod.id === key) {
            return mod.exports;
        }
    }
    return;
};
SeajsEnv.getMangerMods = function() {
    var mods = seajs.cache;
    var result = [];
    for (var p in mods) {
        var v = mods[p];
        var exports = v.exports;
        if (exports && (exports.$m && exports.$s)) {
            result.push({
                name: v.id,
                exports: exports
            });
        }
    }
    return result;
};
SeajsSEnv.getMod = function(key) {
    try {
        return require(key);
    } catch (e) {
        return null;
    }
};
SeajsSEnv.getMangerMods = function() {
    return [];
};
MagixEnv.getDL = function() {
    return window.$ || window.jQuery;
};

MagixEnv.getRootId = function() {
    return Magix.config('rootId');
};
MagixEnv.getVOM = function() {
    return Magix.VOM || Magix.Vframe;
};
MagixEnv.getMangerMods = function() {
    return [];
};
MagixEnv.isReady = function() {
    return true;
};
var Helper = {
    getEnv: function() {
        if (window.KISSY) {
            return KISSYEnv;
        }
        if (window.requirejs) {
            return RequireEnv;
        }
        if (window.seajs) {
            return SeajsEnv;
        }
        if (window.define && window.require) {
            return SeajsSEnv;
        }
        if (window.Magix) {
            return MagixEnv;
        }
        throw new Error('unsupport');
    },
    getTree: function(env) {
        var rootId = env.getRootId();
        var vom = env.getVOM();
        var tree = {
            total: 0,
            vomTotal: 0,
            children: []
        };
        var all = vom.all();
        var allMap = {};
        for (var a in all) {
            if (all.hasOwnProperty(a)) {
                tree.vomTotal++;
            }
            allMap[a] = 1;
        }
        var walk = function(id, info) {
            var vf = vom.get(id);
            if (vf) {
                tree.total++;
                info.id = vf.id;
                delete allMap[vf.id];
                if (vf.fcc || vf.$cr) {
                    info.status = Status.created;
                } else if (vf.fca || vf.$ca) {
                    info.status = Status.alter;
                } else {
                    info.status = Status.init;
                }
                var cm = vf.cM || vf.$c;
                for (var p in cm) {
                    var newInfo = {
                        children: []
                    };
                    walk(p, newInfo);
                    if (newInfo.id) {
                        info.children.push(newInfo);
                    }
                }
            }
        };
        walk(rootId, tree);
        var il = [];
        for (var p in allMap) {
            il.push({
                id: p,
                il: true,
                status: Status.isolated,
                children: []
            });
        }
        tree.isolated = il;
        return tree;
    },
    getManagerTree: function(env) {
        var managers = env.getMangerMods();
        var result = [],
            rows = 0,

            cleanedMap = {},
            total = 0;
        var temp = {},
            id = 0;
        for (var i = 0; i < managers.length; i++) {
            var t = managers[i];
            var o = t.exports.$mMetas || t.exports.$mm || t.exports.$m;
            if (!o._$id) o._$id = 't' + id++;
            if (temp[o._$id]) temp[o._$id].continued = true;
            temp[o._$id] = t;
        }
        for (var j = 0; j < managers.length; j++) {
            var m = managers[j];
            var r = [];
            var cleans = {
                left: [],
                right: []
            };
            var caches = [];
            var counter = 0,
                maxLeft = 0,
                maxRight = 0,
                p, info;
            var metas = m.exports.$mMetas || m.exports.$mm || m.exports.$m;
            delete metas._$id;
            if (!m.continued) {
                for (p in metas) {
                    info = metas[p];
                    if (info.cleans) {
                        var a = (info.cleans + '').split(',');
                        for (var x = 0; x < a.length; x++) {
                            cleanedMap[a[x]] = p;
                        }
                    }
                }
                for (p in metas) {
                    info = metas[p];
                    var c = ManagerColors.normal;
                    var ti = {
                        id: p,
                        color: c,
                        url: info.url || info.uri,
                        cache: ((info.cache || info.cacheTime | 0) / 1000) + 'sec',
                        desc: info.desc || '',
                        cleans: info.cleans || '',
                        cleaned: cleanedMap[p] || '',
                        hasAfter: !!info.after
                    };
                    if (info.cleans) {
                        c = ManagerColors.cleans;
                        ti.color = c;
                        cleans.left.push(ti);
                        maxLeft++;
                    } else if (cleanedMap[p]) {
                        c = ManagerColors.cleaned;
                        ti.color = c;
                        cleans.right.push(ti);
                        maxRight++;
                    } else {
                        if (info.cache || info.cacheTime) {
                            c = ManagerColors.cache;
                            ti.color = c;
                            caches.push(ti);
                        } else {
                            r.push(ti);
                            counter++;
                        }
                    }
                    total++;
                }
            }
            rows += Math.ceil(counter / Consts.managerCols);
            rows += Math.max(maxLeft, maxRight);
            rows += Math.ceil(caches.length / Consts.managerCols);
            result.push({
                name: m.name,
                rows: rows,
                cleans: cleans,
                caches: caches,
                maxLeft: maxLeft,
                maxRight: maxRight,
                items: r
            });
        }
        return {
            groups: result,
            rows: rows,
            total: total
        };
    },
    prepare: function(callback) {
        var env = Helper.getEnv();
        env.prepare();
        var poll = function() {
            if (D.body) {
                if (env.isReady()) {
                    callback();
                } else {
                    setTimeout(poll, 500);
                }
            } else {
                setTimeout(poll, 500);
            }
        };
        poll();
    },
    start: function() {
        Helper.prepare(function() {
            UI.setup();
            var env = Helper.getEnv();
            var drawTimer;
            var attachVframe = function(vf) {
                vf.on('created', function() {
                    Tracer.log('vframe:' + vf.id + '(' + (vf.path || vf.view.path || '') + ')渲染完毕', Status.created);
                    drawTree();
                });
                vf.on('alter', function(e) {
                    Tracer.log('vframe:' + vf.id + '或子(孙)view' + (e.id ? '(' + e.id + ')' : '') + '正在更改', Status.alter);
                    drawTree();
                });
                vf.on('viewInited', function() {
                    Tracer.log('vframe:' + vf.id + '的view(' + vf.view.path + ')，init调用完毕', Status.created);
                });
                vf.on('viewUnmounted', function() {
                    Tracer.log('vframe:' + vf.id + '的view(' + (vf.path || (vf.view && vf.view.path || '')) + ')销毁完毕', Status.isolated);
                });
                vf.on('viewMounted', function() {
                    Tracer.log('vframe:' + vf.id + '的view(' + (vf.path || vf.view.path ||
                        '') + ')，首次渲染完毕', Status.created);
                });
                vf.___mh = true;
            };
            var attachVframes = function() {
                var all = vom.all();
                for (var a in all) {
                    var vf = vom.get(a);
                    if (!vf.___mh) {
                        attachVframe(vf);
                    }
                }
            };
            var drawTree = function(e) {
                if (e) {
                    if (e.type == 'remove') {
                        if (e.vframe) {
                            var path = e.vframe.path;
                            if (!path && e.vframe.view) {
                                path = e.vframe.view.path;
                            }
                            if (path) {
                                path = '(' + path + ')';
                            } else {
                                path = '';
                            }
                            Tracer.log('销毁vframe:' + e.vframe.id + path, Status.isolated);
                        } else {
                            Tracer.log('remove:', e);
                        }
                    } else if (e.type == 'created') {
                        attachVframes();
                    }
                }
                clearTimeout(drawTimer);
                drawTimer = setTimeout(function() {
                    var tree = Helper.getTree(env);
                    Graphics.drawTree(tree);
                    env.drawIcons();
                }, 0);
            };
            var vom = env.getVOM();
            vom.on('add', function(e) {
                drawTree();
                if (e.vframe.pId) {
                    Tracer.log('找到vframe:' + e.vframe.pId + '的子vframe:' + e.vframe.id, Status.build);
                }
                Tracer.log('创建vframe:' + e.vframe.id, Status.build);
                attachVframe(e.vframe);
            });
            vom.on('remove', drawTree);
            var rootVf = vom.get(env.getRootId());
            if (rootVf) {
                rootVf.on('created', drawTree);
            }
            attachVframes();
            drawTree();

            var managerTimer;
            var drawManagerTree = function() {
                clearTimeout(managerTimer);
                managerTimer = setTimeout(function() {
                    var tree = Helper.getManagerTree(env);
                    Graphics.drawManagerTree(tree);
                }, 500);
            };
            env.hookAttachMod(drawManagerTree);
            drawManagerTree();
        });
    }
};
Helper.start();
})();