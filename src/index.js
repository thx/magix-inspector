(function(){
//kissy drawIcons  removeClass报错
var D = document;
if (D._magix) {
    window.postMessage({
        from: 'mx_ispt',
        action: 'expand'
    }, '*');
} else {
    window.addEventListener('message', function(e) {
        var d = e.data;
        if (d && d.from == 'mx_ispt') {
            if (d.action == 'expand') {
                UI.expand();
            }
        }
    }, false);
    D._magix = 1;
    var Status = {
        created: '#008B00',
        init: '#FF3030',
        alter: '#BC8F8F',
        isolated: '#FF3030',
        build: '#9AC0CD',
        destroy: '#8B5F65',
        remove: '#EED5B7'
    };
    var Consts = {
        width: 550,
        height: 470,
        canvasWidth: 530,
        canvasHeight: 400,
        moreInfoWidth: 490,
        titleHeight: 34,
        circleMargin: 6,
        minCircleRadius: 15,
        managerCols: 5,
        managerMargin: 5,
        managerHeight: 40,
        managerGroupSpace: 40,
        gradualStartColor: {
            r: 0,
            g: 153,
            b: 102
        },
        gradualEndColor: {
            r: 255,
            g: 255,
            b: 0
        },
        eventsCommonCount: 15,
        sharedCount: 5,
        locationCount: 12
    };
    var Lines = [
    'FFC125',
    'C71585',
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
    ApplyStyle("mx_ispt_6a99",".mx_ispt_6a99-icon:before{width:12px;content:\"M\";height:12px;border-radius:6px;position:absolute;background-color:#008b00;opacity:.4;font-size:10px;line-height:12px;text-align:center;color:#fff}.mx_ispt_6a99-icon-bad:before{background-color:#ff3030}.mx_ispt_6a99-icon-alter:before{background-color:#bc8f8f}.mx_ispt_6a99-tle{padding-right:5px}.mx_ispt_6a99-tab{background:#eee;cursor:move;margin:0;padding:0}.mx_ispt_6a99-main{position:fixed;right:20px;top:20px;width:550px;height:470px;z-index:2147483647;box-shadow:0 0 5px #b9b9b9;background-color:#fff;font-size:12px;line-height:1.5}.mx_ispt_6a99-mask{position:absolute;opacity:.7;background-color:#90ee90}.mx_ispt_6a99-main ul{list-style:none;padding:0;margin:0}.mx_ispt_6a99-m5{margin-left:5px}.mx_ispt_6a99-binfo{padding:5px}.mx_ispt_6a99-console{height:28px;line-height:28px;margin:0 0 0 5px;padding:0}.mx_ispt_6a99-mr3{margin-right:3px}.mx_ispt_6a99-fl{float:left}.mx_ispt_6a99-fr{float:right}.mx_ispt_6a99-cp{cursor:pointer}.mx_ispt_6a99-p8{padding:8px}.mx_ispt_6a99-move{cursor:move}.mx_ispt_6a99-red{color:red}.mx_ispt_6a99-clearfix:after,.mx_ispt_6a99-clearfix:before{content:\"\";display:table}.mx_ispt_6a99-clearfix:after{clear:both}.mx_ispt_6a99-clearfix{*zoom:1}.mx_ispt_6a99-bar{height:1px;border:0;padding:0;margin:5px;background:rgba(0,0,0,.2);background:-webkit-gradient(linear,left top,right top,from(rgba(165,69,243,0)),color-stop(.5,hsla(270,6%,49%,.33)),to(rgba(165,69,243,0)))}#mx_manager_moreinfo,#mx_moreinfo{position:absolute;background-color:#eee;padding:8px;width:440px;display:none;box-shadow:0 2px 2px 2px #b9b9b9;word-break:break-all}.mx_ispt_6a99-shrink:before{left:4px;bottom:5px}.mx_ispt_6a99-shrink:after,.mx_ispt_6a99-shrink:before{content:\" \";position:absolute;top:10px;border:2px dotted #b9b1b1;height:10px;cursor:move}.mx_ispt_6a99-shrink:after{left:9px}");
    var Drag = {
        get: function($, off, isFn) {
            var Win = $(window);
            var Doc = $(document);
            var ClearSelection = function(t) {
                if ((t = window.getSelection)) {
                    t().removeAllRanges();
                } else if ((t = window.document.selection)) {
                    if (t.empty) t.empty();
                    else t = null;
                }
            };
            var DragObject;
            var DragPrevent = function(e) {
                e.preventDefault();
            };
            var DragMove = function(event) {
                if (DragObject.iMove) {
                    DragObject.move(event);
                }
            };
            var DragMoveEvent = 'mousemove touchmove';
            var DragEndEvent = 'mouseup touchend';
            var DragPreventEvent = 'keydown mousewheel DOMMouseScroll';
            var DragStop = function(e) {
                if (DragObject) {
                    Doc[off](DragMoveEvent, DragMove)[off](DragEndEvent, DragStop)[off](DragPreventEvent, DragPrevent);
                    Win[off]('blur', DragStop);
                    var node = DragObject.node;
                    $(node)[off]('losecapture', DragStop);
                    if (node.setCapture) node.releaseCapture();
                    if (DragObject.iStop) {
                        DragObject.stop(e);
                    }
                    DragObject = null;
                }
            };
            return {
                begin: function(node, moveCallback, endCallback) {
                    DragStop();
                    if (node) {
                        ClearSelection();
                        if (node.setCapture) {
                            node.setCapture();
                        }
                        DragObject = {
                            move: moveCallback,
                            stop: endCallback,
                            node: node,
                            iMove: isFn(moveCallback),
                            iStop: isFn(endCallback)
                        };
                        Doc.on(DragMoveEvent, DragMove)
                            .on(DragEndEvent, DragStop)
                            .on(DragPreventEvent, DragPrevent);
                        Win.on('blur', DragStop);
                        $(node).on('losecapture', DragStop);
                    }
                },
                clear: ClearSelection,
                end: DragStop
            };
        }
    };

    var UI = {
        main: "<div class=\"mx_ispt_6a99-main\" id=\"mx\"><ul class=\"mx_ispt_6a99-clearfix mx_ispt_6a99-tab\" id=\"mx_tabs\"><li class=\"mx_ispt_6a99-fr mx_ispt_6a99-p8 mx_ispt_6a99-cp\" id=\"mx_min\">△</li><li class=\"mx_ispt_6a99-fl mx_ispt_6a99-p8 mx_ispt_6a99-cp\">VOM</li><li class=\"mx_ispt_6a99-fl mx_ispt_6a99-p8 mx_ispt_6a99-cp\">Tracer</li><li class=\"mx_ispt_6a99-fl mx_ispt_6a99-p8 mx_ispt_6a99-cp\">Manager</li></ul><div id=\"mx_painter\"><div style=\"width:{width}px;height:{canvasHeight}px;overflow-x:auto;overflow-y:hidden\" id=\"mx_view_cnt\"><canvas width=\"{width}\" height=\"{canvasHeight}\" id=\"mx_view_canvas\"></canvas></div><label class=\"mx_ispt_6a99-fl mx_ispt_6a99-console\"><input type=\"checkbox\" class=\"mx_ispt_6a99-mr3\" id=\"mx_log_console\"/>控制台显示view信息</label><ul class=\"mx_ispt_6a99-clearfix mx_ispt_6a99-fl\" id=\"mx_view_total\"></ul></div><div id=\"mx_trancer\" style=\"height:{canvasHeight}px;overflow:scroll;overflow-x:auto;display:none;padding:8px\"></div><div id=\"mx_manager\" style=\"display:none\"><div style=\"height:{canvasHeight}px;overflow:scroll;overflow-x:auto\" id=\"mx_manager_cnt\"><canvas width=\"{canvasWidth}\" height=\"{canvasHeight}\" id=\"mx_manager_canvas\"></canvas></div><ul class=\"mx_ispt_6a99-clearfix mx_ispt_6a99-p8\" id=\"mx_manager_total\"></ul></div><div id=\"mx_moreinfo\"></div><div id=\"mx_manager_moreinfo\"></div></div>",
        moreInfo: "<ul><li><b class=\"mx_ispt_6a99-tle\">id:</b>{id}</li><li><b class=\"mx_ispt_6a99-tle\">view:</b>{view}</li>{events} {location} {share}<li class=\"mx_ispt_6a99-red\">{ex}</li><li><b class=\"mx_ispt_6a99-tle\">resources</b></li><li style=\"{moreInfoWidth}px;overflow:auto;max-height:200px\">{res}</li></ul>",
        moreManagerInfo: "<ul><li><b>key:</b>{id}</li><li><b>url:</b>{url}</li><li><b>描述:</b>{desc}</li><li><b>缓存:</b>{cache}</li><li><b>清理缓存:</b>{cleans}</li><li><b>预处理:</b>{hasAfter}</li></ul>",
        total: "<li class=\"mx_ispt_6a99-fl mx_ispt_6a99-binfo\">共{total}个view</li><li class=\"mx_ispt_6a99-fl ml5 mx_ispt_6a99-red mx_ispt_6a99-binfo\">{ex}</li>",
        managerTotal: "<li class=\"mx_ispt_6a99-fl mx_ispt_6a99-binfo\">{groups}个接口文件，共{total}个接口</li>",
        setup: function() {
            var div = D.createElement('div');
            div.innerHTML = UI.main.replace(/\{(\w+)\}/g, function(m, v) {
                return Consts[v];
            });
            D.documentElement.appendChild(div);
            UI.attachEvent();
            var env = Inspector.getEnv();
            env.dragIt('#mx', '#mx_tabs');
        },
        attachEvent: function() {
            UI.detachEvent();
            var moveTimer;
            var env = Inspector.getEnv();
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
            env.bind('mx_log_console', 'click', function() {
                var logNode = D.getElementById('mx_log_console');
                if (logNode.checked)
                    window.console.dir(env.getVOM().all());
            });
            env.bind('mx', 'click', UI.$click = function(e) {
                var node;
                if (e.target.id == 'mx_min') {
                    node = D.getElementById('mx');
                    if (e.target.innerHTML == '△') {
                        node.style.height = Consts.titleHeight + 'px';
                        node.style.width = '40px';
                        node.style.overflow = 'hidden';
                        e.target.innerHTML = '▽';
                        env.getNode('#mx_tabs').addClass('mx_ispt_6a99-shrink');
                    } else {
                        node.style.height = Consts.height + 'px';
                        node.style.width = Consts.width + 'px';
                        node.style.overflow = 'inherit';
                        e.target.innerHTML = '△';
                        env.getNode('#mx_tabs').removeClass('mx_ispt_6a99-shrink');
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
        expand: function() {
            var min = D.getElementById('mx_min');
            var env = Inspector.getEnv();
            if (min.innerHTML == '▽') {
                var node = D.getElementById('mx');
                node.style.height = Consts.height + 'px';
                node.style.width = Consts.width + 'px';
                node.style.overflow = 'inherit';
                min.innerHTML = '△';
                env.getNode('#mx_tabs').removeClass('mx_ispt_6a99-shrink');
            }
        },
        detachEvent: function() {
            var env = Inspector.getEnv();
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
            var logNode = D.getElementById('mx_log_console');
            if (logNode.checked) {
                window.console.log(vf);
            }
            var cover = D.getElementById('mx_cover');
            if (!cover) {
                cover = D.createElement('div');
                cover.className = 'mx_ispt_6a99-mask';
                cover.id = 'mx_cover';
                D.body.appendChild(cover);
            }

            var node = D.getElementById('mx_moreinfo');
            node.style.display = 'block';
            var left = item.center.x - Consts.moreInfoWidth / 2 - D.getElementById('mx_view_cnt').scrollLeft;
            node.style.left = left + 'px';
            node.style.top = item.center.y + item.radius + Consts.titleHeight + 5 + 'px';
            var env = Inspector.getEnv();
            env.updateDOMStyle(cover.style, vf.id);
            cover.style.display = 'block';

            node.innerHTML = UI.moreInfo.replace(/\{(\w+)\}/g, function(m, v) {
                switch (v) {
                    case 'id':
                        return item.id;
                    case 'view':
                        if (vf) {
                            if (vf.$v || vf.path) {
                                return vf.path;
                            }
                            if (vf.view) {
                                return vf.view.path;
                            }
                        }
                        return '';
                    case 'events':
                        var evts = Inspector.getEvents(vf);
                        return evts.total ? '<li><b class="mx_ispt_6a99-tle">listen:</b>' + evts.list + '</li>' : '';
                    case 'share':
                        var s = Inspector.getShared(vf);
                        return s.length ? '<li><b class="mx_ispt_6a99-tle">share:</b>' + s + '</li>' : '';
                    case 'location':
                        var l = Inspector.getLocation(vf);
                        var f = l.path || (l.keys && l.keys.length);
                        if (f) {
                            var r = [];
                            if (l.path) {
                                r.push('<span style="color:#FFC125">path</span>');
                            }
                            if (l.keys) {
                                r = r.concat(l.keys);
                            }
                            return '<li><b class="mx_ispt_6a99-tle">location:</b>' + r + '</li>';
                        }
                        return '';
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
                        res = res || vf && vf.$v && vf.$v.$r;
                        var hasRrs;
                        if (res) {
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
            var st = D.getElementById('mx_manager_cnt').scrollTop;
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
        showTotal: function(tree) {
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
        updateVOMCanvansWidth: function(width) {
            var c = D.getElementById('mx_view_canvas');
            c.width = width | 0;
            c.parentNode.scrollLeft = (c.width - Consts.canvasWidth) / 2;
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
                t.className = 'mx_ispt_6a99-bar';
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
                deepMap = {};
            var walk = function(item, level) {
                item.deep = level;
                if (level > deep) {
                    deep = level;
                }
                if (!deepMap[level]) {
                    deepMap[level] = 0;
                }
                item.leftCount = deepMap[level];
                deepMap[level]++;
                if (deepMap[level] > maxChildren) {
                    maxChildren = deepMap[level];
                }
                for (var i = 0, one; i < item.children.length; i++) {
                    one = item.children[i];
                    walk(item.children[i], item.deep + 1);
                }
            };
            tree.deepMap = deepMap;
            walk(tree, 1, 0);
            maxChildren = Math.max(maxChildren, tree.isolated.length + 1);
            var hRadius = width / maxChildren - Consts.circleMargin;
            var vRadius = height / deep - Consts.circleMargin;
            var tw = width;
            var dMinRadius = 2 * Consts.minCircleRadius;
            if (hRadius < dMinRadius) {
                hRadius = dMinRadius;
                tw = dMinRadius * maxChildren + (maxChildren + 1) * Consts.circleMargin;
                if (tw > 30000) {
                    tw = 30000;
                }
                UI.updateVOMCanvansWidth(tw);
            } else {
                UI.updateVOMCanvansWidth(tw);
            }
            var radius = Math.floor(Math.min(vRadius, hRadius) / 2);
            var band = (radius / 20).toFixed(1);
            return {
                width: tw,
                margin: Consts.circleMargin,
                radius: radius,
                band: band
            };
        },
        drawTree: function(tree) {
            if (tree.id) {
                var width = Consts.width,
                    height = Consts.canvasHeight,
                    g = Graphics;
                g.captureItmes();
                var params = g.getBestParams(tree, width, height);
                width = params.width;
                var ctx = D.getElementById('mx_view_canvas').getContext('2d');
                ctx.clearRect(0, 0, width, height);
                var max = params.radius * 2 - 2 * (params.band + 1) - 1;
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
                var drawLine = function(item, pos, ppos, lineColor) {
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
                        ctx.lineWidth = params.band / 1.5; // 设置线宽
                        ctx.strokeStyle = lineColor;
                        ctx.stroke(); // 进行线的着色，这时整条线才变得可见
                    }
                    var count = tree.deepMap[item.deep + 1];
                    if (count) {
                        var space = (width - (count * params.radius * 2 + (count - 1) * params.margin)) / 2;
                        var lcolor = '#' + Lines[linecolorIndex++ % Lines.length]; // Lines[Math.floor(Math.random() * (Lines.length - 1))];
                        for (var i = 0, one; i < item.children.length; i++) {
                            one = item.children[i];
                            drawLine(one, {
                                x: space + one.leftCount * (params.radius * 2 + params.margin) + params.radius,
                                y: pos.y + params.margin + 2 * params.radius
                            }, pos, lcolor);
                        }
                    }
                };
                var drawCircle = function(item, pos) {
                    ctx.moveTo(pos.x, pos.y);
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, params.radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.status;
                    ctx.fill();

                    //bottom small cicle
                    var radius = Math.max(0.5, params.radius / 10);
                    var ly = pos.y + params.radius / 2;
                    //left
                    if (item.event) {
                        var lx = pos.x - params.radius / 2 + radius;
                        ctx.moveTo(lx, ly);
                        ctx.beginPath();
                        ctx.arc(lx, ly, radius, 0, Math.PI * 2, true);
                        ctx.fillStyle = item.event;
                        ctx.fill();
                    }
                    //center
                    if (item.location) {
                        ctx.moveTo(pos.x, ly + radius);
                        ctx.beginPath();
                        ctx.arc(pos.x, ly + radius, radius, 0, Math.PI * 2, true);
                        ctx.fillStyle = item.location;
                        ctx.fill();
                    }
                    //right
                    if (item.shared) {
                        var rx = pos.x + params.radius / 2 - radius;

                        ctx.moveTo(rx, ly);
                        ctx.beginPath();
                        ctx.arc(rx, ly, radius, 0, Math.PI * 2, true);
                        ctx.fillStyle = item.shared;
                        ctx.fill();
                    }

                    ctx.moveTo(pos.x, pos.y);
                    ctx.beginPath();

                    //white slot
                    ctx.arc(pos.x, pos.y, params.radius - params.band - 1, 0, Math.PI * 2, true);
                    ctx.lineWidth = params.band;
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
                    var count = tree.deepMap[item.deep + 1];
                    if (count) {
                        var space = (width - (count * params.radius * 2 + (count - 1) * params.margin)) / 2;
                        for (var i = 0, one; i < item.children.length; i++) {
                            one = item.children[i];
                            drawCircle(one, {
                                x: space + one.leftCount * (params.radius * 2 + params.margin) + params.radius,
                                y: pos.y + params.margin + 2 * params.radius
                            });
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
                drawLine(tree, {
                    x: space,
                    y: params.margin + params.radius
                });
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
            var env = Inspector.getEnv();
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
    var S = window.KISSY;
    var KISSYEnv = {
        prepare: function() {
            S.use('node');
        },
        getRootId: function() {
            var old = S.Env.mods['magix/magix'];
            var magix;
            if (old) {
                magix = S.require('magix/magix');
            } else {
                magix = S.require('magix');
            }
            return magix.config('rootId');
        },
        getVOM: function() {
            var old = S.Env.mods['magix/magix'];
            if (old) {
                return S.require('magix/vom');
            }
            var magix = S.require('magix');
            return magix.VOM || magix.Vframe;
        },
        getMangerMods: function() {
            var mods = S.Env.mods;
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
            var magix = S.Env.mods['magix/magix'];
            var node = S.Env.mods.node;
            if (magix) {
                var vom = S.Env.mods['magix/vom'];
                return magix.status === S.Loader.Status.ATTACHED && vom && vom.status === S.Loader.Status.ATTACHED && node && node.status === S.Loader.Status.ATTACHED;
            } else {
                try {
                    magix = S.require('magix');
                    return magix && magix.toTry && node && node.status === S.Loader.Status.ATTACHED;
                } catch (e) {
                    return false;
                }
            }
        },
        updateDOMStyle: function(style, id) {
            var node = S.require('node').one('#' + id);
            if (!node) return;
            var n = node;
            if (n.nodeName() == 'vframe') {
                n = n.children();
            }
            var size = {
                height: n.outerHeight ? n.outerHeight() : n.height(),
                width: n.outerWidth ? n.outerWidth() : n.width()
            };
            var startZINode, offset;
            if (!size.height) {
                var max = 4;
                do {
                    n = n.children();
                    size.height = n.height();
                    startZINode = n;
                    if (size.height) {
                        var pos = n.css('position');
                        if (pos == 'fixed') {
                            pos = n.css('left');
                            style.left = pos;
                            style.position = pos;
                            pos = n.css('top');
                            style.top = pos;
                            pos = n.css('right');
                            style.right = pos;
                            pos = n.css('bottom');
                            style.bottom = pos;
                        } else {
                            offset = n.offset();
                            style.left = offset.left + 'px';
                            style.top = offset.top + 'px';
                            style.position = 'absolute';
                            size.width = Math.max(size.width, n.children().width());
                        }
                        break;
                    }
                    max--;
                } while (n.length && !size.height && max >= 0);
            } else {
                offset = n.offset();
                style.left = offset.left + 'px';
                style.top = offset.top + 'px';
                style.position = 'absolute';
                size.width = Math.max(size.width, n.children().width());
                startZINode = n;
            }
            var zIndex = -1;
            var hide;
            do {
                if (!hide) hide = node.css('display') == 'none';
                var z = parseInt(node.css('z-index')) || 1;
                if (z && z > zIndex) zIndex = z;
                node = node.parent();
            } while (node);
            if (hide) {
                size = {
                    width: 0,
                    height: 0
                };
            }
            if (zIndex == 1) {
                zIndex = 2147483640;
            }
            style.zIndex = zIndex + 1;
            style.width = size.width + 'px';
            style.height = size.height + 'px';
        },
        getDOMOffset: function(id) {
            var node = S.require('node');
            return node.one('#' + id).offset();
        },
        bind: function(id, type, fn) {
            var node = S.require('node');
            if (S.isString(id)) id = '#' + id;
            return node.one(id).on(type, fn);
        },
        unbind: function(id, type, fn) {
            var node = S.require('node');
            if (S.isString(id)) id = '#' + id;
            return node.one(id).detach(type, fn);
        },
        getResType: function(r) {
            var type = '';
            var e = r.res || r.e;
            if (e) {
                if (e.all && e.constructor && e.constructor.cached) {
                    type = 'Magix.Service';
                } else if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                    type = 'Model Manager';
                } else if (e.bricks) {
                    type = 'Pagelet';
                } else if (e.__attrs && e.__attrVals && e.constructor) {
                    var mods = S.Env.mods,
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
                            type = 'extend S Attribute';
                        }
                    }
                } else if (!S.isFunction(e)) {
                    type = S.type(e);
                } else {
                    type = '函数或构造器';
                }
            } else {
                type = S.type(e);
            }
            return type;
        },
        hookAttachMod: function(callback) {
            var old = S.Loader.Utils.attachMod;
            S.Loader.Utils.attachMod = function() {
                old.apply(S.Loader.Utils, arguments);
                callback();
            };
        },
        dragIt: function(node, handle) {
            var root = S.one(node);
            var dd = Drag.get(S.one, 'detach', S.isFunction);
            S.one(handle).on('mousedown', function(e) {
                if (e.target.id != handle.slice(1)) return;
                var right = parseInt(root.css('right'), 10);
                var top = parseInt(root.css('top'), 10);
                var x = e.pageX;
                var y = e.pageY;
                dd.begin(e.target, function(e) {
                    dd.clear();
                    var fx = e.pageX - x,
                        fy = e.pageY - y;
                    if (top + fy < 0) fy = -top;
                    root.css({
                        right: right - fx,
                        top: top + fy
                    });
                });
            });
        },
        drawIcons: function(flattened) {
            for (var i = flattened.length - 1; i >= 0; i--) {
                var f = flattened[i];
                var root = S.one('#' + f.id);
                if (root) {
                    root.removeClass('mx_ispt_6a99-icon-bad').removeClass('mx_ispt_6a99-icon-alter').addClass('mx_ispt_6a99-icon');
                }
                if (f.cls && root) {
                    root.addClass('mx_ispt_6a99-icon' + '-' + f.cls);
                }
            }
        },
        getNode: function(node) {
            return S.one(node);
        },
        hookViewShare: function(cb) {
            var magix = S.Env.mods.magix;
            if (magix) {
                magix = S.require('magix');
                if (magix && magix.View && magix.View.prototype.share) {
                    var old = magix.View.prototype.share;
                    magix.View.prototype.share = function() {
                        old.apply(this, arguments);
                        cb();
                    };
                }
            }
        }
    };
    var ModulesFeatures = {
        $: ['zepto', 'fn.jquery'],
        jquery: ['fn.jquery'],
        zepto: ['zepto'],
        magix: ['safeExec', 'toTry']
    };
    var ModuleIdMap = {};
    var RequireEnv = {
        prepare: function() {},
        hookAttachMod: function() {},
        getMod: function(key) {
            var ms = require.s.contexts._.defined;
            var o = ms[key] || ModuleIdMap[key];
            if (!o && ModulesFeatures[key]) {
                var rules = ModulesFeatures[key];
                for (var p in ms) {
                    var found = false;
                    for (var i = rules.length - 1; i >= 0; i--) {
                        var r = rules[i];
                        var parts = r.split('.');
                        var root = ms[p];
                        while (parts.length) {
                            if (root) {
                                root = root[parts.shift()];
                            } else {
                                break;
                            }
                        }
                        if (root) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        o = ms[p];
                        ModuleIdMap[key] = o;
                        break;
                    }
                }
            }
            return o;
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
            var startZINode, offset;
            if (!size.height) {
                var max = 4;
                do {
                    n = n.children();
                    size.height = n.height();
                    startZINode = n;
                    if (size.height) {
                        var pos = n.css('position');
                        if (pos == 'fixed') {
                            pos = n.css('left');
                            style.left = pos;
                            style.position = pos;
                            pos = n.css('top');
                            style.top = pos;
                            pos = n.css('right');
                            style.right = pos;
                            pos = n.css('bottom');
                            style.bottom = pos;
                        } else {
                            offset = n.offset();
                            style.left = offset.left + 'px';
                            style.top = offset.top + 'px';
                            style.position = 'absolute';
                            size.width = Math.max(size.width, n.children().width());
                        }
                        break;
                    }
                    max--;
                } while (n.length && !size.height && max >= 0);
            } else {
                offset = n.offset();
                style.left = offset.left + 'px';
                style.top = offset.top + 'px';
                style.position = 'absolute';
                size.width = Math.max(size.width, n.children().width());
                startZINode = n;
            }
            var zIndex = -1;
            var hide;
            do {
                if (!hide) hide = node.css('display') == 'none';
                var z = parseInt(node.css('z-index')) || 1;
                if (z && z > zIndex) zIndex = z;
                node = node.parent();
            } while (node.length && $.contains(document.body, node[0]));
            if (hide) {
                size = {
                    width: 0,
                    height: 0
                };
            }
            if (zIndex == 1) {
                zIndex = 2147483640;
            }
            style.zIndex = zIndex + 1;
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
                if (e.all && e.constructor && e.constructor.cached) {
                    type = 'Magix.Service';
                } else if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
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
            var dd = Drag.get($, 'off', $.isFunction);
            $(handle).on('mousedown', function(e) {
                if (e.target.id != handle.slice(1)) return;
                var right = parseInt(root.css('right'), 10);
                var top = parseInt(root.css('top'), 10);
                var x = e.pageX;
                var y = e.pageY;
                dd.begin(e.target, function(e) {
                    dd.clear();
                    var fx = e.pageX - x,
                        fy = e.pageY - y;
                    if (top + fy < 0) fy = -top;
                    root.css({
                        right: right - fx,
                        top: top + fy
                    });
                });
            });
        },
        drawIcons: function(flattened) {
            var $ = this.getDL();
            for (var i = flattened.length - 1; i >= 0; i--) {
                var f = flattened[i];
                var root = $('#' + f.id);
                if (root)
                    root.removeClass('mx_ispt_6a99-icon-bad').removeClass('mx_ispt_6a99-icon-alter').addClass('mx_ispt_6a99-icon');
                if (f.cls && root) {
                    root.addClass('mx_ispt_6a99-icon' + '-' + f.cls);
                }
            }
        },
        getNode: function(node) {
            var $ = this.getDL();
            return $(node);
        },
        hookViewShare: function(cb) {
            var magix = this.getMod('magix');
            if (magix && magix.View && magix.View.prototype.share) {
                var old = magix.View.prototype.share;
                magix.View.prototype.share = function() {
                    old.apply(this, arguments);
                    cb();
                };
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
        // try {
        //     var entity = seajs.require(key); //seajs有别名，优先使用内置的require获取
        //     if (entity)
        //         return entity;
        // } catch (e) {
        //     console.log(e);
        // }
        var mods = seajs.cache;
        var o = ModuleIdMap[key];
        if (!o) {
            for (var p in mods) {
                var mod = mods[p];
                if (mod.id === key) {
                    return mod.exports;
                }
            }
        }
        if (!o && ModulesFeatures[key]) {
            var rules = ModulesFeatures[key];
            for (var p in mods) {
                var found = false;
                for (var i = rules.length - 1; i >= 0; i--) {
                    var r = rules[i];
                    var parts = r.split('.');
                    var root = mods[p].exports;
                    while (parts.length) {
                        if (root) {
                            root = root[parts.shift()];
                        } else {
                            break;
                        }
                    }
                    if (root) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    o = mods[p].exports;
                    ModuleIdMap[key] = o;
                    break;
                }
            }
        }
        return o;
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
        var o;
        try {
            o = require(key);
        } catch (e) {}
        if (!o) {
            window.console.warn('seajs standalone模式下无法找到模块：' + key + '，也无法智能探测。如需更多帮助信息请旺旺联系：行列');
        }
        return o;
    };
    SeajsSEnv.getMangerMods = function() {
        return [];
    };
    MagixEnv.getMod = function(key) {
        if (key == 'magix') {
            return window.Magix;
        }
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
    var Inspector = {
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
            window.console.error('getEnvError:无法在当前环境下启动Magix Inspector，如需更多帮助，请旺旺联系：行列');
        },
        getEvents: function(vf) {
            var evts = [],
                total = 0;
            if (vf) {
                var evto = (vf.view && (vf.view.events || vf.view.$evts)) || (vf.$v && vf.$v.$eo);
                var commons = [];
                for (var p in evto) {
                    total++;
                    commons.push(p);
                }
                var evetnsList = (vf.view && vf.view.tmplEvents); //2.0
                if (evetnsList && evetnsList.length) {
                    commons = commons.concat(evetnsList);
                    total += evetnsList.length;
                }
                if (commons.length) {
                    evts.push('&lt;' + commons + '&gt;');
                }
                var list = vf.$v && vf.$v.$el;
                var globalWins = [],
                    globalDocs = [],
                    selectors = [],
                    selectorsMap = {};
                if (list) {
                    for (var i = 0, one; i < list.length; i++) {
                        one = list[i];
                        total++;
                        if (one.e) {
                            if (one.e == window) {
                                globalWins.push(one.n);
                            } else if (one.e == document) {
                                globalDocs.push(one.n);
                            }
                        } else {
                            var coll = selectorsMap[one.s];
                            if (!coll) {
                                selectorsMap[one.s] = [one.n];
                            } else {
                                coll.push(one.n);
                            }
                        }
                    }
                    for (p in selectorsMap) {
                        selectors.push('$' + p + '&lt;' + selectorsMap[p] + '&gt;');
                    }
                }
                if (globalWins.length) { //1 3 4
                    evts.push('<span style="color:#' + Lines[1] + '">$win&lt;' + globalWins + '&gt;</span>');
                }
                if (globalDocs.length) {
                    evts.push('<span style="color:#' + Lines[3] + '">$doc&lt;' + globalDocs + '&gt;</span>');
                }
                if (selectors.length) {
                    evts.push('<span style="color:#' + Lines[4] + '">' + selectors + '</span>');
                }
            }
            return {
                list: evts,
                total: total
            };
        },
        getShared: function(vf) {
            var shares = [];
            if (vf && vf.$v) {
                var sd = vf.$v.$sd;
                if (sd) {
                    for (var p in sd) {
                        shares.push(p);
                    }
                }
            }
            return shares;
        },
        getLocation: function(vf) {
            var path, keys = [];
            if (vf) {
                if (vf.view) {
                    var ol = vf.view.$ol;
                    if (ol) {
                        path = ol.pn;
                        keys = ol.keys || ol.ks;
                    }
                }
                if (vf.$v) {
                    var l = vf.$v.$l;
                    if (l && l.f) {
                        path = l.p;
                        keys = l.k;
                    }
                }
            }
            return {
                path: path,
                keys: keys
            };
        },
        getGradualColor: function(current, max) {
            var sc = Consts.gradualStartColor;
            var ec = Consts.gradualEndColor;
            var rs = (ec.r - sc.r) / max;
            var gs = (ec.g - sc.g) / max;
            var bs = (ec.b - sc.b) / max;
            var hexr = ('0' + parseInt(sc.r + current * rs).toString(16)).slice(-2);
            var hexg = ('0' + parseInt(sc.g + current * gs).toString(16)).slice(-2);
            var hexb = ('0' + parseInt(sc.b + current * bs).toString(16)).slice(-2);
            return '#' + hexr + hexg + hexb;
        },
        getTree: function(env) {
            var rootId = env.getRootId();
            var vom = env.getVOM();
            var flattened = [];
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
                var finfo = {};
                if (vf) {
                    tree.total++;
                    info.id = vf.id;
                    finfo.id = vf.id;
                    delete allMap[vf.id];
                    if (vf.fcc || vf.$cr) {
                        info.status = Status.created;
                        finfo.cls = '';
                    } else if (vf.fca || vf.$ca) {
                        info.status = Status.alter;
                        finfo.cls = 'alter';
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            info.status = Status.init;
                            finfo.cls = 'bad';
                        }
                    } else {
                        info.status = Status.init;
                        finfo.cls = 'bad';
                    }
                    flattened.push(finfo);
                    var evts = Inspector.getEvents(vf);
                    var total = evts.total;
                    if (total) {
                        var cc = Consts.eventsCommonCount;
                        total = Math.min(total, cc);
                        info.event = Inspector.getGradualColor(total, cc);
                    }
                    var shared = Inspector.getShared(vf);
                    if (shared.length) {
                        var sc = Consts.sharedCount;
                        var current = Math.min(shared.length, sc);
                        info.shared = Inspector.getGradualColor(current, sc);
                    }
                    var location = Inspector.getLocation(vf);
                    if (location.path || (location.keys && location.keys.length)) {
                        var lc = Consts.locationCount;
                        var keys = location.keys || [];
                        var current = Math.min(lc, keys.length);
                        info.location = Inspector.getGradualColor(current, lc);
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
                flattened.push({
                    id: p,
                    cls: 'bad'
                });
            }
            tree.isolated = il;
            return {
                tree: tree,
                flattened: flattened
            };
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
                            hasAfter: (info.after ? (info.after + '').substr(0, 200) : '')
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
            var env = Inspector.getEnv();
            env.prepare();
            var max = 50;
            var poll = function() {
                max--;
                if (!max) {
                    window.console.error('prepareError:无法在当前环境下启动Magix Inspector(需要的模块如jquery,magix等检测不到)，如需更多帮助，请旺旺联系：行列');
                } else {
                    if (D.body) {
                        if (env.isReady()) {
                            callback();
                        } else {
                            setTimeout(poll, 500);
                        }
                    } else {
                        setTimeout(poll, 500);
                    }
                }
            };
            poll();
        },
        start: function() {
            Inspector.prepare(function() {
                UI.setup();
                var env = Inspector.getEnv();
                var vom = env.getVOM();
                var drawTimer;
                var attachVframe = function(vf) {
                    vf.on('created', function() {
                        Tracer.log('vframe:' + vf.id + '[' + (vf.path || vf.view.path || '') + ']渲染完毕', Status.created);
                        drawTree();
                    });
                    vf.on('alter', function(e) {
                        if (e.id && !e.logged) {
                            e.logged = 1;
                            var f = vom.get(e.id);
                            if (f) {
                                Tracer.log('从vframe:' + f.id + '[' + (f.path || f.view.path || '') + '] 发起界面变更', Status.build);
                            }
                        }
                        Tracer.log('vframe:' + vf.id + '收到变更消息', Status.alter);
                        drawTree();
                    });
                    vf.on('viewInited', function() {
                        Tracer.log('vframe:' + vf.id + '的view[' + vf.view.path + ']，init调用完毕', Status.created);
                    });
                    vf.on('viewUnmounted', function() {
                        var path = (vf.path || (vf.view && vf.view.path || ''));
                        if (path) {
                            path = '[' + path + ']';
                        }
                        Tracer.log('vframe:' + vf.id + '的view' + path + '销毁完毕', Status.destroy);
                    });
                    vf.on('viewMounted', function() {
                        Tracer.log('vframe:' + vf.id + '的view[' + (vf.path || vf.view.path ||
                            '') + ']，首次渲染完毕', Status.created);
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
                                Tracer.log('从VOM中移除vframe:' + e.vframe.id + path, Status.remove);
                            } else {
                                Tracer.log('remove:', e);
                            }
                        } else if (e.type == 'created') {
                            attachVframes();
                        }
                    }
                    clearTimeout(drawTimer);
                    drawTimer = setTimeout(function() {
                        var treeInfo = Inspector.getTree(env);
                        Graphics.drawTree(treeInfo.tree);
                        env.drawIcons(treeInfo.flattened);
                    }, 0);
                };
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
                        var tree = Inspector.getManagerTree(env);
                        Graphics.drawManagerTree(tree);
                    }, 500);
                };
                env.hookAttachMod(drawManagerTree);
                env.hookViewShare(drawTree);
                drawManagerTree();
            });
        }
    };
    Inspector.start();
}
})();