/*
    generate by magix-combine@3.7.0: https://github.com/thx/magix-combine
    author: kooboy_li@163.com
    loader: iife
 */
(function(){
//kissy drawIcons  removeClass报错
var D = document;
var W = window;
if (D['__']) {
    W.postMessage({
        '_b': '_a',
        '_d': '_c'
    }, '*');
}
else {
    W.addEventListener('message', function (e) {
        var d = e.data;
        if (d && d['_b'] == '_a') {
            if (d['_d'] == '_c') {
                UI['_c']();
            }
        }
    }, false);
    D['__'] = 1;
    var Status = {
    '_q': '#008B00',
    '_s': '#FF3030',
    '_r': '#BC8F8F',
    '_A': '#FF3030',
    '_O': '#9AC0CD',
    '_P': '#8B5F65',
    '_Q': '#EED5B7',
    '_ag': '#94d694'
};
var Consts = {
    '_ah': 550,
    '_ai': 470,
    '_aj': 530,
    '_ak': 400,
    '_al': 490,
    '_am': 34,
    '_an': 6,
    '_ao': 15,
    '_H': 5,
    '_ap': 5,
    '_aq': 40,
    '_ar': 40,
    '_i': {
        r: 0,
        g: 153,
        b: 102
    },
    '_j': {
        r: 255,
        g: 255,
        b: 0
    },
    '_u': 15,
    '_v': 5,
    '_w': 12,
    '_x': 5,
    '_y': 12
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
    '_G': '#CC9966',
    '_F': '#99CCCC',
    '_E': '#FF9999',
    '_D': '#CCCC99'
};
var ApplyStyle = function (x, h) {
    var i = document.createElement('style');
    document.documentElement.appendChild(i);
    if (i.styleSheet) {
        i.styleSheet.cssText = h;
    }
    else {
        i.appendChild(document.createTextNode(h));
    }
};
var IconsMap = {
    '_r': 'mib',
    '_t': 'mia'
};
var getNode = function (id) {
    return D.getElementById(id);
};

    var Drag = {
    '_Y': function ($, off, isFn) {
        var Win = $(window);
        var Doc = $(document);
        var ClearSelection = function (t) {
            if ((t = window.getSelection)) {
                t().removeAllRanges();
            }
            else if ((t = window.document.selection)) {
                if (t.empty)
                    t.empty();
                else
                    t = null;
            }
        };
        var DragObject;
        var DragPrevent = function (e) {
            e.preventDefault();
        };
        var DragMove = function (event) {
            if (DragObject.iMove) {
                DragObject.move(event);
            }
        };
        var DragMoveEvent = 'mousemove touchmove';
        var DragEndEvent = 'mouseup touchend';
        var DragPreventEvent = 'keydown mousewheel DOMMouseScroll';
        var DragStop = function (e) {
            if (DragObject) {
                Doc[off](DragMoveEvent, DragMove)[off](DragEndEvent, DragStop)[off](DragPreventEvent, DragPrevent);
                Win[off]('blur', DragStop);
                var node = DragObject.node;
                $(node)[off]('losecapture', DragStop);
                if (node.setCapture)
                    node.releaseCapture();
                if (DragObject.iStop) {
                    DragObject.stop(e);
                }
                DragObject = null;
            }
        };
        return {
            '_W': function (node, moveCallback, endCallback) {
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
            '_X': ClearSelection
        };
    }
};

    var ehReg = /[&<>]/g;
var ehMap = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt'
};
var encodeHTML = function (src) {
    return src.replace(ehReg, function (m) { return '&' + ehMap[m] + ';'; });
};
var main = "<div class=\"mie\" id=\"_at\"><ul class=\"mip mid\" id=\"_au\"><li class=\"mil min mim\" id=\"_aL\">△</li><li class=\"mik min mim\">VOM</li><li class=\"mik min mim\">Tracer</li><li class=\"mik min mim\">Manager</li></ul><div id=\"_aM\"><div style=\"width:{_ah}px;height:{_ak}px;overflow-x:auto;overflow-y:hidden\" id=\"_aR\"><canvas width=\"{_ah}\" height=\"{_ak}\" id=\"_aw\"></canvas></div><label class=\"mik mih\"><input type=\"checkbox\" class=\"mij\" id=\"_aJ\">控制台显示view信息</label><label class=\"mik mih\"><input type=\"checkbox\" class=\"mij\" id=\"_z\" checked=\"checked\">显示组件view</label><ul class=\"mip mik\" id=\"_b_\"></ul></div><div id=\"_aN\" style=\"height:{_ak}px;overflow:scroll;overflow-x:auto;display:none;padding:8px\"></div><div id=\"_aO\" style=\"display:none\"><div style=\"height:{_ak}px;overflow:scroll;overflow-x:auto\" id=\"_aV\"><canvas width=\"{_aj}\" height=\"{_ak}\" id=\"_aA\"></canvas></div><ul class=\"mip min\" id=\"_aY\"></ul></div><div id=\"_aE\" class=\"mir\"></div><div id=\"_aU\" class=\"mir\"></div></div>";
var moreInfo = "<ul><li><b class=\"mic\">id:</b>{id}</li><li><b class=\"mic\">view:</b>{view}</li>{events} {location} {share} {mixins} {state}<li class=\"mio\">{ex}</li><li><b class=\"mic\">resources</b></li><li style=\"{_al}px;overflow:auto;max-height:200px\">{res}</li></ul>";
var moreManagerInfo = "<ul><li><b>key:</b>{id}</li><li><b>url:</b>{url}</li><li><b>描述:</b>{desc}</li><li><b>缓存:</b>{cache}</li><li><b>清理缓存:</b>{cleans}</li><li><b>预处理:</b>{hasAfter}</li></ul>";
var total = "<li class=\"mik mig mii\">view统计:[{count}]</li>";
var managerTotal = "<li class=\"mik mig\">{groups}个接口文件，共{total}个接口</li>";
var UI = {
    '_L': function () {
        var div = D.createElement('div');
        div.innerHTML = main.replace(/\{(\w+|(?:@\{[^\}]+\}))\}/g, function (m, v) {
            return Consts[v] || m;
        });
        D.documentElement.appendChild(div);
        UI['_as']();
        var env = Inspector['_e']();
        env['_ae']('#_at', '#_au');
    },
    '_as': function () {
        UI['_av']();
        var moveTimer;
        var env = Inspector['_e']();
        env['_aa']('_aw', 'mousemove', UI['_ax'] = function (e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function () {
                var offset = env['_a_']('_aw');
                UI['_ay']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['_aa']('_aw', 'mouseout', UI['_az'] = function () {
            clearTimeout(moveTimer);
            UI['_ay']({
                x: -1,
                y: -1
            });
        });
        env['_aa']('_aA', 'mousemove', UI['_aB'] = function (e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function () {
                var offset = env['_a_']('_aA');
                UI['_aC']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['_aa']('_aA', 'mouseout', UI['_aD'] = function () {
            clearTimeout(moveTimer);
            UI['_aC']({
                x: -1,
                y: -1
            });
        });
        env['_aa']('_aE', 'mouseover', UI['_aF'] = function () {
            clearTimeout(UI['_aG']);
        });
        env['_aa']('_aE', 'mouseout', UI['_aH'] = function () {
            UI['_aI']();
        });
        env['_aa']('_aJ', 'click', function () {
            var logNode = getNode('_aJ');
            if (logNode.checked)
                window.console.dir(env['_p']().all());
        });
        env['_aa']('_z', 'click', function () {
            Inspector['_M']();
        });
        env['_aa']('_at', 'click', UI['_aK'] = function (e) {
            var node;
            if (e.target.id == '_aL') {
                node = getNode('_at');
                if (e.target.innerHTML == '△') {
                    node.style.height = Consts['_am'] + 'px';
                    node.style.width = '40px';
                    node.style.overflow = 'hidden';
                    e.target.innerHTML = '▽';
                    env['_af']('#_au').addClass('mis');
                }
                else {
                    node.style.height = Consts['_ai'] + 'px';
                    node.style.width = Consts['_ah'] + 'px';
                    node.style.overflow = 'inherit';
                    e.target.innerHTML = '△';
                    env['_af']('#_au').removeClass('mis');
                }
            }
            else if (e.target.innerHTML == 'VOM') {
                node = getNode('_aM');
                node.style.display = 'block';
                node = getNode('_aN');
                node.style.display = 'none';
                node = getNode('_aO');
                node.style.display = 'none';
            }
            else if (e.target.innerHTML == 'Tracer') {
                node = getNode('_aM');
                node.style.display = 'none';
                node = getNode('_aO');
                node.style.display = 'none';
                node = getNode('_aN');
                node.style.display = 'block';
            }
            else if (e.target.innerHTML == 'Manager') {
                node = getNode('_aM');
                node.style.display = 'none';
                node = getNode('_aN');
                node.style.display = 'none';
                node = getNode('_aO');
                node.style.display = 'block';
            }
        });
    },
    '_c': function () {
        var min = getNode('_aL');
        var env = Inspector['_e']();
        if (min.innerHTML == '▽') {
            var node = getNode('_at');
            node.style.height = Consts['_ai'] + 'px';
            node.style.width = Consts['_ah'] + 'px';
            node.style.overflow = 'inherit';
            min.innerHTML = '△';
            env['_af']('#_au').removeClass('mis');
        }
    },
    '_av': function () {
        var env = Inspector['_e']();
        env['_ab']('_aw', 'mousemove', UI['_ax']);
        env['_ab']('_aw', 'mouseout', UI['_az']);
        env['_ab']('_aA', 'mousemove', UI['_aP']);
        env['_ab']('_aA', 'mouseout', UI['_aD']);
        env['_ab']('_aL', 'click', UI['_aK']);
        env['_ab']('_aE', 'mouseoout', UI['_aH']);
        env['_ab']('_aE', 'mouseover', UI['_aF']);
        //env['@{unbind}']('mx_mover', 'mousedown', UI['@{$mousedown}']);
    },
    '_aS': function (vf, item) {
        clearTimeout(UI['_aG']);
        var logNode = getNode('_aJ');
        if (logNode.checked) {
            window.console.log(vf);
        }
        var cover = getNode('_aQ');
        if (!cover) {
            cover = D.createElement('div');
            cover.className = 'mif';
            cover.id = '_aQ';
            D.body.appendChild(cover);
        }
        var node = getNode('_aE');
        node.style.display = 'block';
        var left = item.center.x - Consts['_al'] / 2 - getNode('_aR').scrollLeft;
        node.style.left = left + 'px';
        node.style.top = item.center.y + item.radius + Consts['_am'] + 5 + 'px';
        var env = Inspector['_e']();
        env['_Z'](cover.style, vf.id);
        cover.style.display = 'block';
        node.innerHTML = moreInfo.replace(/\{(\w+|(?:@\{[^\}]+\}))\}/g, function (m, v) {
            switch (v) {
                case 'id':
                    return item.id;
                case 'view':
                    if (vf) {
                        if (vf.$v || vf.path) {
                            return encodeHTML(vf.path);
                        }
                        if (vf.view) {
                            return encodeHTML(vf.view.path);
                        }
                    }
                    return '';
                case 'events':
                    var evts = Inspector['_f'](vf);
                    return evts.total ? '<li><b class="mic">listen:</b>' + evts.list + '</li>' : '';
                case 'share':
                    var s = Inspector['_g'](vf);
                    return s.length ? '<li><b class="mic">share:</b>' + s + '</li>' : '';
                case 'location':
                    var l = Inspector['_h'](vf);
                    var f = l.path || (l.keys && l.keys.length);
                    if (f) {
                        var r = [];
                        if (l.path) {
                            r.push('<span style="color:#FFC125">path</span>');
                        }
                        if (l.keys) {
                            r = r.concat(l.keys);
                        }
                        return '<li><b class="mic">location:</b>' + r + '</li>';
                    }
                    return '';
                case 'mixins':
                    var mixins = Inspector['_m'](vf);
                    if (mixins.length) {
                        var list = env['_ac'](mixins);
                        list = list.join(',');
                        return '<li><b class="mic">mixins:</b>' + list + '</li>';
                    }
                    return '';
                case 'state':
                    var state = Inspector['_n'](vf);
                    if (state.length) {
                        return '<li><b class="mic">state:</b>' + state.join(',') + '</li>';
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
                    }
                    else {
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            return '未加载view';
                        }
                    }
                    if (vf.cM) {
                        if (!vf.fcc) {
                            return vf.rC != vf.cC ? '正等待子view加载' : '正等待view加载';
                        }
                    }
                    else {
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
                    var hasRrs = void 0;
                    if (res) {
                        for (var p in res) {
                            hasRrs = true;
                            break;
                        }
                        if (hasRrs) {
                            t.push('<table style="width:100%"><tr><td>key</td><td>type</td></tr>');
                            for (var p in res) {
                                t.push('<tr><td>', p, '</td><td>', env['_ad'](res[p]), '</td></tr>');
                            }
                            t.push('</table>');
                        }
                    }
                    return t.join('');
                default:
                    return Consts[v] || m;
            }
        });
    },
    '_aI': function () {
        var node = getNode('_aE');
        var cover = getNode('_aQ');
        UI['_aG'] = setTimeout(function () {
            node.style.display = 'none';
            cover.style.display = 'none';
        }, 150);
    },
    '_aW': function (item) {
        clearTimeout(UI['_aT']);
        var node = getNode('_aU');
        node.style.display = 'block';
        node.style.left = item.rect[0] + 'px';
        var top = item.rect[1] + item.rect[3] + Consts['_am'];
        var st = getNode('_aV').scrollTop;
        top -= st;
        node.style.top = top + 'px';
        node.innerHTML = moreManagerInfo.replace(/\{(\w+)\}/g, function (m, v) {
            switch (v) {
                case 'id':
                    return item.id;
                default:
                    return item[v] || m;
            }
        });
    },
    '_aX': function () {
        var node = getNode('_aU');
        UI['_aT'] = setTimeout(function () {
            node.style.display = 'none';
        }, 150);
    },
    '_aZ': function (tree) {
        var node = getNode('_aY');
        node.innerHTML = managerTotal.replace(/\{(\w+)\}/g, function (m, v) {
            switch (v) {
                case 'groups':
                    return tree.groups.length;
                case 'total':
                    return tree.total;
                default:
                    return m;
            }
        });
    },
    '_ba': function (tree) {
        var node = getNode('_b_');
        node.innerHTML = total.replace(/\{(\w+)\}/g, function (m, v) {
            switch (v) {
                case 'count':
                    return 'com:' + tree.comTotal + ',vom:' + tree.vomTotal + ',total:' + tree.total;
                default:
                    return m;
            }
        });
    },
    '_bb': function (height) {
        getNode('_aA').height = height | 0;
    },
    '_bc': function (width) {
        var c = getNode('_aw');
        c.width = width | 0;
        c.parentNode.scrollLeft = (c.width - Consts['_aj']) / 2;
    },
    '_ay': function (e) {
        console.log(e);
    },
    '_aC': function (e) {
        console.log(e);
    }
};
ApplyStyle("mi_","vframe{display:block}.mi_:before{width:12px;content:\"M\";height:12px;border-radius:6px;position:absolute;background-color:#008b00;opacity:.4;font-size:10px;line-height:12px;text-align:center;color:#fff}.mia:before{background-color:#ff3030}.mib:before{background-color:#bc8f8f}.mic{padding-right:5px}.mid{background:#eee;cursor:move;margin:0;padding:0}.mie{position:fixed;right:20px;top:20px;width:550px;height:470px;z-index:2147483647;-webkit-box-shadow:0 0 5px #b9b9b9;box-shadow:0 0 5px #b9b9b9;background-color:#fff;font-size:12px;line-height:1.5}.mif{position:absolute;opacity:.7;background-color:#90ee90}.mie ul{list-style:none;padding:0;margin:0}.mig{padding:5px}.mih{height:28px;line-height:28px;margin:0 0 0 5px;padding:0}.mii{color:#bbb}.mij{margin-right:3px}.mik{float:left}.mil{float:right}.mim{cursor:pointer}.min{padding:8px}.mio{color:red}.mip:after,.mip:before{content:\"\";display:table}.mip:after{clear:both}.mip{*zoom:1}.miq{height:1px;border:0;padding:0;margin:5px;background:rgba(0,0,0,.2);background:-webkit-gradient(linear,left top,right top,from(rgba(165,69,243,0)),color-stop(.5,hsla(270,6%,49%,.33)),to(rgba(165,69,243,0)))}.mir{position:absolute;background-color:#eee;padding:8px;width:440px;display:none;-webkit-box-shadow:0 2px 2px 2px #b9b9b9;box-shadow:0 2px 2px 2px #b9b9b9;word-break:break-all}.mis:before{left:4px;bottom:5px}.mis:after,.mis:before{content:\" \";position:absolute;top:10px;border:2px dotted #b9b1b1;height:10px;cursor:move}.mis:after{left:9px}");

    var Tracer = {
    '_N': function (info, color) {
        var node = getNode('_aN');
        if (Tracer['_bd']) {
            var t = D.createElement('hr');
            t.className = 'miq';
            node.insertBefore(t, node.firstChild);
            delete Tracer['_bd'];
        }
        var d = D.createElement('div');
        d.innerHTML = info;
        if (color)
            d.style.color = color;
        node.insertBefore(d, node.firstChild);
        if (node.getElementsByTagName('div').length > 200) {
            node.removeChild(node.lastChild);
            node.removeChild(node.lastChild);
        }
        clearTimeout(Tracer['_be']);
        Tracer['_be'] = setTimeout(function () {
            Tracer['_bd'] = true;
        }, 1500);
    }
};

    var Graphics = {
    '_bh': function () {
        var g = Graphics;
        g.list = [];
        delete g['_bf'];
        UI['_ay'] = function (e) {
            var loop, one, dis;
            if (g['_bf']) {
                one = g['_bf'];
                dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                if (dis > one.radius) {
                    g['_bg']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['_bf'];
                    loop = true;
                }
            }
            else {
                loop = true;
            }
            if (loop) {
                for (var i = g.list.length - 1; i >= 0; i--) {
                    one = g.list[i];
                    dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                    if (dis <= one.radius) {
                        if (g['_bf'] != one) {
                            g['_bf'] = one;
                            g['_bg']({
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
    '_bk': function () {
        var g = Graphics;
        g.managerList = [];
        delete g['_bi'];
        UI['_aC'] = function (e) {
            var loop, one, rect;
            if (g['_bi']) {
                one = g['_bi'];
                rect = one.rect;
                if (e.x < rect[0] || e.y < rect[1] || e.x > (rect[0] + rect[2]) || e.y > (rect[1] + rect[3])) {
                    g['_bj']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['_bi'];
                    loop = true;
                }
            }
            else {
                loop = true;
            }
            if (loop) {
                for (var i = g.managerList.length - 1; i >= 0; i--) {
                    one = g.managerList[i];
                    rect = one.rect;
                    if (e.x >= rect[0] && e.y >= rect[1] && e.x <= (rect[0] + rect[2]) && e.y <= (rect[1] + rect[3])) {
                        if (g['_bi'] != one) {
                            g['_bi'] = one;
                            g['_bj']({
                                item: one,
                                action: 'enter'
                            });
                        }
                    }
                }
            }
        };
    },
    '_bl': function (tree, width, height) {
        var maxChildren = 0, deep = 0, deepMap = {};
        var walk = function (item, level) {
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
            for (var i = 0, one = void 0; i < item.children.length; i++) {
                one = item.children[i];
                walk(item.children[i], item.deep + 1);
            }
        };
        tree.deepMap = deepMap;
        walk(tree, 1, 0);
        maxChildren = Math.max(maxChildren, tree.isolated.length + 1);
        var hRadius = width / maxChildren - Consts['_an'];
        var vRadius = height / deep - Consts['_an'];
        var tw = width;
        var dMinRadius = 2 * Consts['_ao'];
        if (hRadius < dMinRadius) {
            hRadius = dMinRadius;
            tw = dMinRadius * maxChildren + (maxChildren + 1) * Consts['_an'];
            if (tw > 30000) {
                tw = 30000;
            }
            UI['_bc'](tw);
        }
        else {
            UI['_bc'](tw);
        }
        var radius = Math.floor(Math.min(vRadius, hRadius) / 2);
        var band = (radius / 20).toFixed(1);
        return {
            width: tw,
            margin: Consts['_an'],
            radius: radius,
            band: band
        };
    },
    '_M': function (tree, active) {
        if (tree.id) {
            var width_1 = Consts['_ah'], height = Consts['_ak'], g_1 = Graphics;
            g_1['_bh']();
            var params_1 = g_1['_bl'](tree, width_1, height);
            width_1 = params_1.width;
            var ctx_1 = getNode('_aw').getContext('2d');
            ctx_1.clearRect(0, 0, width_1, height);
            var max_1 = params_1.radius * 2 - 2 * (params_1.band + 1) - 1;
            if (!g_1.$tWidth)
                g_1.$tWidth = {};
            var getWidth_1 = function (text) {
                if (!g_1.$tWidth[text]) {
                    ctx_1.font = 'normal 12px Arial';
                    g_1.$tWidth[text] = ctx_1.measureText(text).width;
                }
                return g_1.$tWidth[text];
            };
            var cutText_1 = function (text) {
                var len = 1, width = 0;
                while (len <= text.length) {
                    width += getWidth_1(text.substring(len - 1, len));
                    if (width < max_1) {
                        len += 1;
                    }
                    else {
                        return text.substring(0, len - 3) + '..';
                    }
                }
                return text;
            };
            var linecolorIndex_1 = 0;
            var drawLine_1 = function (item, pos, ppos, lineColor) {
                if (ppos) {
                    ctx_1.beginPath();
                    var deg = Math.atan((pos.y - ppos.y) / (pos.x - ppos.x)) * 180 / Math.PI;
                    if (deg < 0) {
                        deg += 180;
                    }
                    var tx = Math.round(ppos.x + params_1.radius * Math.cos(deg * Math.PI / 180));
                    var ty = Math.round(ppos.y + params_1.radius * Math.sin(deg * Math.PI / 180));
                    ctx_1.moveTo(tx, ty); // 设置路径起点，坐标为(20,20)
                    ctx_1.lineTo(pos.x, pos.y); // 绘制一条到(200,20)的直线
                    ctx_1.lineWidth = params_1.band / 1.5; // 设置线宽
                    ctx_1.strokeStyle = lineColor;
                    ctx_1.stroke(); // 进行线的着色，这时整条线才变得可见
                }
                var count = tree.deepMap[item.deep + 1];
                if (count) {
                    var space_1 = (width_1 - (count * params_1.radius * 2 + (count - 1) * params_1.margin)) / 2;
                    var lcolor = '#' + Lines[linecolorIndex_1++ % Lines.length]; // Lines[Math.floor(Math.random() * (Lines.length - 1))];
                    for (var i = 0, one = void 0; i < item.children.length; i++) {
                        one = item.children[i];
                        drawLine_1(one, {
                            x: space_1 + one.leftCount * (params_1.radius * 2 + params_1.margin) + params_1.radius,
                            y: pos.y + params_1.margin + 2 * params_1.radius
                        }, pos, lcolor);
                    }
                }
            };
            var drawCircle_1 = function (item, pos) {
                ctx_1.moveTo(pos.x, pos.y);
                ctx_1.beginPath();
                ctx_1.arc(pos.x, pos.y, params_1.radius, 0, Math.PI * 2, true);
                ctx_1.fillStyle = item.status;
                if (item.id == active) {
                    if (item.flag) {
                        ctx_1.fillStyle = Status['_ag'];
                    }
                    else {
                        ctx_1.fillStyle = item.status;
                    }
                    item.flag = !item.flag;
                }
                ctx_1.fill();
                //bottom small cicle
                var radius = Math.max(0.5, params_1.radius / 10);
                var ly = pos.y + params_1.radius / 2;
                var lx = pos.x - params_1.radius / 2 + radius;
                //left
                if (item.event) {
                    ctx_1.beginPath();
                    ctx_1.arc(lx, ly, radius, 0, Math.PI * 2, true);
                    ctx_1.fillStyle = item.event;
                    ctx_1.fill();
                }
                //center
                if (item.location) {
                    ctx_1.beginPath();
                    ctx_1.arc(pos.x, ly + radius, radius, 0, Math.PI * 2, true);
                    ctx_1.fillStyle = item.location;
                    ctx_1.fill();
                }
                // center left top
                if (item.mixins) {
                    var x1 = lx, y1 = ly, x2 = pos.x, y2 = ly + radius;
                    var x3 = (x1 + x2 + Math.sqrt(3) * (y2 - y1)) / 2 - (x2 - x1) / 10;
                    var y3 = (y1 + y2 - Math.sqrt(3) * (x2 - x1)) / 2 + (x2 - x1) / 3;
                    ctx_1.beginPath();
                    ctx_1.arc(x3, y3, radius, 0, Math.PI * 2, true);
                    ctx_1.fillStyle = item.mixins;
                    ctx_1.fill();
                }
                //right
                if (item.shared) {
                    var rx = pos.x + params_1.radius / 2 - radius;
                    ctx_1.beginPath();
                    ctx_1.arc(rx, ly, radius, 0, Math.PI * 2, true);
                    ctx_1.fillStyle = item.shared;
                    ctx_1.fill();
                }
                // center right top
                if (item.state) {
                    var x1 = pos.x, y1 = ly + radius, x2 = pos.x + params_1.radius / 2 - radius, y2 = ly;
                    var x3 = (x1 + x2 + Math.sqrt(3) * (y2 - y1)) / 2 + (x2 - x1) / 10;
                    var y3 = (y1 + y2 - Math.sqrt(3) * (x2 - x1)) / 2 + (x2 - x1) / 3;
                    ctx_1.beginPath();
                    ctx_1.arc(x3, y3, radius, 0, Math.PI * 2, true);
                    ctx_1.fillStyle = item.state;
                    ctx_1.fill();
                }
                if (item.inline) {
                    ctx_1.beginPath();
                    var r = params_1.radius - params_1.band - 1;
                    var d60 = -2 * Math.PI / 360 * 60;
                    var d120 = -2 * Math.PI / 360 * 120;
                    var x1 = pos.x + r * Math.cos(d60);
                    var y1 = pos.y + r * Math.sin(d60);
                    var x2 = pos.x + r * Math.cos(d120);
                    var y2 = pos.y + r * Math.sin(d120);
                    ctx_1.moveTo(x1, y1);
                    ctx_1.quadraticCurveTo(pos.x, pos.y - r / 2, x2, y2);
                    ctx_1.moveTo(x1, y1);
                    ctx_1.quadraticCurveTo(pos.x, pos.y - params_1.radius - params_1.band, x2, y2);
                    ctx_1.fillStyle = '#fff';
                    ctx_1.fill();
                }
                ctx_1.moveTo(pos.x, pos.y);
                ctx_1.beginPath();
                //white slot
                ctx_1.arc(pos.x, pos.y, params_1.radius - params_1.band - 1, 0, Math.PI * 2, true);
                ctx_1.lineWidth = params_1.band;
                ctx_1.strokeStyle = '#fff';
                ctx_1.stroke();
                g_1.list.push({
                    id: item.id,
                    center: pos,
                    il: item.il,
                    radius: params_1.radius
                });
                //text
                ctx_1.beginPath();
                ctx_1.moveTo(pos.x, pos.y);
                ctx_1.font = 'normal 12px Arial';
                ctx_1.fillStyle = '#eee';
                var id = cutText_1(item.id);
                var textWidth = Math.round(ctx_1.measureText(id).width);
                var left = (2 * params_1.radius - textWidth) / 2;
                ctx_1.fillText(id, pos.x + left - params_1.radius, pos.y + 4);
                var count = tree.deepMap[item.deep + 1];
                if (count) {
                    var space_2 = (width_1 - (count * params_1.radius * 2 + (count - 1) * params_1.margin)) / 2;
                    for (var i = 0, one = void 0; i < item.children.length; i++) {
                        one = item.children[i];
                        drawCircle_1(one, {
                            x: space_2 + one.leftCount * (params_1.radius * 2 + params_1.margin) + params_1.radius,
                            y: pos.y + params_1.margin + 2 * params_1.radius
                        });
                    }
                }
            };
            var temp = tree.isolated;
            var space = width_1 / 2;
            if (temp.length) {
                space = (width_1 - (temp.length + 1) * params_1.radius * 2 + temp.length * params_1.margin) / 2;
                for (var i = 0; i < temp.length; i++) {
                    drawCircle_1(temp[i], {
                        x: space + (i + 1) * (params_1.radius * 2 + params_1.margin) + params_1.radius,
                        y: params_1.margin + params_1.radius
                    });
                }
                space += params_1.radius;
            }
            drawLine_1(tree, {
                x: space,
                y: params_1.margin + params_1.radius
            });
            drawCircle_1(tree, {
                x: space,
                y: params_1.margin + params_1.radius
            });
            UI['_ba'](tree, params_1);
        }
    },
    '_S': function (tree) {
        var gs = Graphics;
        gs['_bk']();
        var height = Consts['_ap'] * (tree.rows + 1) + tree.rows * Consts['_aq'] + (Consts['_ar'] + Consts['_ap']) * tree.groups.length;
        UI['_bb'](height);
        var ctx = getNode('_aA').getContext('2d');
        ctx.clearRect(0, 0, Consts['_aj'], height);
        var margin = Consts['_ap'];
        var managerWidth = ((Consts['_aj'] - (1 + Consts['_H']) * Consts['_ap']) / Consts['_H']) | 0;
        var oneWidth = (function () {
            ctx.font = 'normal 14px Arial';
            var width = ctx.measureText('M').width;
            return width;
        })();
        var drawRect = function (ctx, rect, one, pname) {
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1]);
            ctx.fillStyle = one.color;
            ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
            //text
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1] + 10);
            ctx.font = 'normal 14px Arial';
            ctx.fillStyle = '#282828';
            var id = one.id, tail;
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
        var draw = function (groups) {
            /* mc-uncheck */
            for (var i = 0; i < groups.length; i++) {
                var g = groups[i];
                var left = Consts['_ap'];
                var pad = false;
                ctx.beginPath();
                ctx.moveTo(left, margin);
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = '#282828';
                ctx.fillText(g.name, left + 5, margin + 25);
                margin += Consts['_ar'];
                var u = void 0, one = void 0;
                var max = Math.max(g.maxLeft, g.maxRight);
                var maps = {};
                var linecolorIndex = 0;
                var leftTopSpace = ((max - g.maxLeft) / 2) * (Consts['_aq'] + Consts['_ap']);
                var rightTopSpace = ((max - g.maxRight) / 2) * (Consts['_aq'] + Consts['_ap']);
                for (u = 0; u < max; u++) {
                    var lo = g.cleans.left[u];
                    var ro = g.cleans.right[u];
                    if (lo) {
                        drawRect(ctx, [
                            left,
                            margin + leftTopSpace,
                            150,
                            Consts['_aq']
                        ], lo, g.name);
                        maps[lo.id] = lo;
                    }
                    if (ro) {
                        drawRect(ctx, [
                            Consts['_aj'] - Consts['_ap'] - 150,
                            margin + rightTopSpace,
                            150,
                            Consts['_aq']
                        ], ro, g.name);
                        maps[ro.id] = ro;
                        ro.lineColor = Lines[linecolorIndex++ % Lines.length];
                    }
                    margin += Consts['_ap'] + Consts['_aq'];
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
                    drawRect(ctx, [left, margin, managerWidth, Consts['_aq']], g.caches[u], g.name);
                    if ((u + 1) % Consts['_H'] === 0) {
                        left = Consts['_ap'];
                        margin += Consts['_ap'] + Consts['_aq'];
                        pad = false;
                    }
                    else {
                        left += managerWidth + Consts['_ap'];
                        pad = true;
                    }
                }
                left = Consts['_ap'];
                if (pad) {
                    margin += Consts['_ap'] + Consts['_aq'];
                }
                for (u = 0; u < g.items.length; u++) {
                    one = g.items[u];
                    drawRect(ctx, [left, margin, managerWidth, Consts['_aq']], one, g.name);
                    if ((u + 1) % Consts['_H'] === 0) {
                        left = Consts['_ap'];
                        margin += Consts['_ap'] + Consts['_aq'];
                        pad = false;
                    }
                    else {
                        left += managerWidth + Consts['_ap'];
                        pad = true;
                    }
                }
                left = Consts['_ap'];
                if (pad) {
                    margin += Consts['_ar'];
                }
            }
        };
        draw(tree.groups);
        UI['_aZ'](tree);
    },
    '_bg': function (e) {
        var env = Inspector['_e']();
        var vom = env['_p']();
        if (e.action == 'enter') {
            UI['_aS'](vom.get(e.item.id), e.item);
        }
        else {
            UI['_aI']();
        }
    },
    '_bj': function (e) {
        if (e.action == 'enter') {
            UI['_aW'](e.item);
        }
        else {
            UI['_aX']();
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

    var S = window.KISSY;
var KISSYEnv = {
    '_J': function () {
        S.use('node');
    },
    '_o': function () {
        var old = S.Env.mods['magix/magix'];
        var magix;
        if (old) {
            magix = S.require('magix/magix');
        }
        else {
            magix = S.require('magix');
        }
        return magix.config('rootId');
    },
    '_p': function () {
        var old = S.Env.mods['magix/magix'];
        if (old) {
            return S.require('magix/vom');
        }
        var magix = S.require('magix');
        return magix.VOM || magix.Vframe;
    },
    '_C': function () {
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
    '_K': function () {
        var magix = S.Env.mods['magix/magix'];
        var node = S.Env.mods.node;
        if (magix) {
            var vom = S.Env.mods['magix/vom'];
            return magix.status === S.Loader.Status.ATTACHED && vom && vom.status === S.Loader.Status.ATTACHED && node && node.status === S.Loader.Status.ATTACHED;
        }
        else {
            try {
                magix = S.require('magix');
                return magix && magix.toTry && node && node.status === S.Loader.Status.ATTACHED;
            }
            catch (e) {
                return false;
            }
        }
    },
    '_Z': function (style, id) {
        var node = S.require('node').one('#' + id);
        if (!node)
            return;
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
                    }
                    else {
                        offset = n.offset();
                        style.left = offset.left + 'px';
                        style.top = offset.top + 'px';
                        style.position = 'absolute';
                        size.width = Math.max(size.width, n.children().width() || 0);
                    }
                    break;
                }
                max--;
            } while (n.length && !size.height && max >= 0);
        }
        else {
            offset = n.offset();
            style.left = offset.left + 'px';
            style.top = offset.top + 'px';
            style.position = 'absolute';
            size.width = Math.max(size.width, n.children().width() || 0);
            startZINode = n;
        }
        var zIndex = -1;
        var hide;
        do {
            if (!hide)
                hide = node.css('display') == 'none';
            var z = parseInt(node.css('z-index')) || 1;
            if (z && z > zIndex)
                zIndex = z;
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
    '_a_': function (id) {
        var node = S.require('node');
        return node.one('#' + id).offset();
    },
    '_aa': function (id, type, fn) {
        var node = S.require('node');
        if (S.isString(id))
            id = '#' + id;
        return node.one(id).on(type, fn);
    },
    '_ab': function (id, type, fn) {
        var node = S.require('node');
        if (S.isString(id))
            id = '#' + id;
        return node.one(id).detach(type, fn);
    },
    '_ac': function (mixins) {
        var mods = S.Env.mods;
        var ids = [];
        for (var i = 0; i < mixins.length; i++) {
            var mixin = mixins[i];
            if (mixin) {
                if (mixin['\x1e']) {
                    ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
                }
                else {
                    for (var p in mods) {
                        var mod = mods[p];
                        var v = mod.exports || mod.value;
                        if (v == mixin) {
                            ids.push(p);
                            break;
                        }
                    }
                }
            }
            if (ids.length <= i) {
                ids.push('unknown');
            }
        }
        return ids;
    },
    '_ad': function (r) {
        var type = '';
        var e = r.res || r.e;
        if (e) {
            if (e.all && e.constructor && e.constructor.cached) {
                type = 'Magix.Service';
            }
            else if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                type = 'Model Manager';
            }
            else if (e.bricks) {
                type = 'Pagelet';
            }
            else if (e.__attrs && e.__attrVals && e.constructor) {
                var mods = S.Env.mods, found = void 0;
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
                    }
                    else {
                        type = 'extend S Attribute';
                    }
                }
            }
            else if (!S.isFunction(e)) {
                type = S.type(e);
            }
            else {
                type = '函数或构造器';
            }
        }
        else {
            type = S.type(e);
        }
        return type;
    },
    '_T': function (callback) {
        var old = S.Loader.Utils.attachMod;
        S.Loader.Utils.attachMod = function () {
            old.apply(S.Loader.Utils, arguments);
            callback();
        };
    },
    '_ae': function (node, handle) {
        var root = S.one(node);
        var dd = Drag['_Y'](S.one, 'detach', S.isFunction);
        S.one(handle).on('mousedown', function (e) {
            if (e.target.id != handle.slice(1))
                return;
            var right = parseInt(root.css('right'), 10);
            var top = parseInt(root.css('top'), 10);
            var x = e.pageX;
            var y = e.pageY;
            dd['_W'](e.target, function (e) {
                dd['_X']();
                var fx = e.pageX - x, fy = e.pageY - y;
                if (top + fy < 0)
                    fy = -top;
                root.css({
                    right: right - fx,
                    top: top + fy
                });
            });
        });
    },
    '_R': function (flattened) {
        for (var i = flattened.length - 1; i >= 0; i--) {
            var f = flattened[i];
            var root = S.one('#' + f.id);
            if (root) {
                root.removeClass('mia').removeClass('mib').addClass('mi_');
            }
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '_af': function (node) {
        return S.one(node);
    },
    '_U': function (cb) {
        var magix = S.Env.mods.magix;
        if (magix) {
            magix = S.require('magix');
            if (magix && magix.View && magix.View.prototype.share) {
                var old_1 = magix.View.prototype.share;
                magix.View.prototype.share = function () {
                    old_1.apply(this, arguments);
                    cb();
                };
            }
        }
    }
};

    var RequireEnv = {
    '_J': function () { },
    '_T': function (cb) {
        if (window.MutationObserver) {
            var timer_1;
            var o = new window.MutationObserver(function () {
                clearTimeout(timer_1);
                setTimeout(cb, 1000);
            });
            o.observe(document.body, {
                subtree: true,
                childList: true,
                characterData: true
            });
        }
    },
    '_bm': function (key) {
        var ms = require.s.contexts._.defined;
        var o = ms[key] || ModuleIdMap[key];
        if (!o && ModulesFeatures[key]) {
            var rules = ModulesFeatures[key];
            /* mc-uncheck */
            for (var p in ms) {
                var found = false;
                for (var i = rules.length - 1; i >= 0; i--) {
                    var r = rules[i];
                    var parts = r.split('.');
                    var root = ms[p];
                    while (parts.length) {
                        if (root) {
                            root = root[parts.shift()];
                        }
                        else {
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
    '_bn': function () {
        return this['_bm']('$') || this['_bm']('jquery') || this['_bm']('zepto');
    },
    '_o': function () {
        var old = this['_bm']('magix/magix');
        var magix;
        if (old) {
            magix = old;
        }
        else {
            magix = this['_bm']('magix');
        }
        return magix.config('rootId');
    },
    '_p': function () {
        var old = this['_bm']('magix/vom');
        if (old) {
            return old;
        }
        var magix = this['_bm']('magix');
        return magix.VOM || magix.Vframe;
    },
    '_C': function () {
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
    '_K': function () {
        return this['_bm']('magix/magix') || this['_bm']('magix');
    },
    '_Z': function (style, id) {
        var $ = this['_bn']();
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
                    }
                    else {
                        offset = n.offset();
                        style.left = offset.left + 'px';
                        style.top = offset.top + 'px';
                        style.position = 'absolute';
                        size.width = Math.max(size.width, n.children().width() || 0);
                    }
                    break;
                }
                max--;
            } while (n.length && !size.height && max >= 0);
        }
        else {
            offset = n.offset();
            style.left = offset.left + 'px';
            style.top = offset.top + 'px';
            style.position = 'absolute';
            size.width = Math.max(size.width, n.children().width() || 0);
            startZINode = n;
        }
        var zIndex = -1;
        var hide;
        do {
            if (!hide)
                hide = node.css('display') == 'none';
            var z = parseInt(node.css('z-index')) || 1;
            if (z && z > zIndex)
                zIndex = z;
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
    '_a_': function (id) {
        var $ = this['_bn']();
        return $('#' + id).offset();
    },
    '_aa': function (id, type, fn) {
        var $ = this['_bn']();
        if ($.type(id) == 'string')
            id = '#' + id;
        return $(id).on(type, fn);
    },
    '_ab': function (id, type, fn) {
        var $ = this['_bn']();
        if ($.type(id) == 'string')
            id = '#' + id;
        return $(id).off(type, fn);
    },
    '_ac': function (mixins) {
        var mods = require.s.contexts._.defined;
        var ids = [];
        for (var i = 0; i < mixins.length; i++) {
            var mixin = mixins[i];
            if (mixin) {
                if (mixin['\x1e']) {
                    ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
                }
                else {
                    for (var p in mods) {
                        var mod = mods[p];
                        if (mod == mixin) {
                            ids.push(p);
                            break;
                        }
                    }
                }
            }
            if (ids.length <= i) {
                ids.push('unknown');
            }
        }
        return ids;
    },
    '_ad': function (r) {
        var e = r.res || r.e;
        var $ = this['_bn']();
        var type = $.type(r);
        if (e) {
            if (e.all && e.constructor && e.constructor.cached) {
                type = 'Magix.Service';
            }
            else if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                type = 'Model Manager';
            }
            else if (e.bricks) {
                type = 'Pagelet';
            }
            else if ($.isFunction(e)) {
                type = '函数或构造器';
            }
        }
        return type;
    },
    '_ae': function (node, handle) {
        var $ = this['_bn']();
        var root = $(node);
        var dd = Drag['_Y']($, 'off', $.isFunction);
        $(handle).on('mousedown', function (e) {
            if (e.target.id != handle.slice(1))
                return;
            var right = parseInt(root.css('right'), 10);
            var top = parseInt(root.css('top'), 10);
            var x = e.pageX;
            var y = e.pageY;
            dd['_W'](e.target, function (e) {
                dd['_X']();
                var fx = e.pageX - x, fy = e.pageY - y;
                if (top + fy < 0)
                    fy = -top;
                root.css({
                    right: right - fx,
                    top: top + fy
                });
            });
        });
    },
    '_R': function (flattened) {
        var $ = this['_bn']();
        for (var i = flattened.length - 1; i >= 0; i--) {
            var f = flattened[i];
            var root = $('#' + f.id);
            if (root)
                root.removeClass('mia').removeClass('mib').addClass('mi_');
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '_af': function (node) {
        var $ = this['_bn']();
        return $(node);
    },
    '_U': function (cb) {
        var magix = this['_bm']('magix');
        if (magix && magix.View && magix.View.prototype.share) {
            var old_1 = magix.View.prototype.share;
            magix.View.prototype.share = function () {
                old_1.apply(this, arguments);
                cb();
            };
        }
    }
};

    var SeajsEnv = {}, SeajsSEnv = {}, MagixEnv = {};
    for (var p in RequireEnv) {
        SeajsEnv[p] = SeajsSEnv[p] = MagixEnv[p] = RequireEnv[p];
    }
    SeajsEnv['_bm'] = function (key) {
    // try {
    //     let entity = seajs.require(key); //seajs有别名，优先使用内置的require获取
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
        /* mc-uncheck */
        for (var p in mods) {
            var found = false;
            for (var i = rules.length - 1; i >= 0; i--) {
                var r = rules[i];
                var parts = r.split('.');
                var root = mods[p].exports;
                while (parts.length) {
                    if (root) {
                        root = root[parts.shift()];
                    }
                    else {
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
SeajsEnv['_C'] = function () {
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
SeajsEnv['_ac'] = function (mixins) {
    var mods = seajs.cache;
    var ids = [];
    for (var i = 0; i < mixins.length; i++) {
        var mixin = mixins[i];
        if (mixin) {
            if (mixin['\x1e']) {
                ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
            }
            else {
                for (var p in mods) {
                    var mod = mods[p];
                    if (mod.exports == mixin) {
                        ids.push(mod.id);
                        break;
                    }
                }
            }
        }
        if (ids.length <= i) {
            ids.push('unknown');
        }
    }
    return ids;
};

    SeajsSEnv['_bm'] = function (key) {
    var o;
    try {
        o = require(key);
    }
    catch (e) { }
    if (!o) {
        window.console.warn('seajs standalone模式下无法找到模块：' + key + '，也无法智能探测。如需更多帮助信息请钉钉联系：行列');
    }
    return o;
};
SeajsSEnv['_C'] = function () {
    return [];
};
SeajsSEnv['_ac'] = function (mixins) {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};

    MagixEnv['_bm'] = function (k, ey) {
    if (key == 'magix') {
        return window.Magix;
    }
};
MagixEnv['_bn'] = function () {
    return window.$ || window.jQuery;
};
MagixEnv['_o'] = function () {
    return Magix.config('rootId');
};
MagixEnv['_p'] = function () {
    return Magix.VOM || Magix.Vframe;
};
MagixEnv['_C'] = function () {
    return [];
};
MagixEnv['_ac'] = function (mixins) {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};
MagixEnv['_K'] = function () {
    return true;
};

    var Inspector = {
        '_e': function () {
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
            window.console.error('getEnvError:无法在当前环境下启动Magix Inspector，如需更多帮助，请钉钉联系：行列');
        },
        '_f': function (vf) {
            var evts = [], total = 0;
            if (vf) {
                var evto = (vf.view && (vf.view.events || vf.view.$evts)) || (vf.$v && vf.$v.$eo);
                var commons = [];
                var selectorEvents = [];
                for (var p in evto) {
                    total++;
                    var v = evto[p];
                    if (isFinite(v)) {
                        if ((v & 1) === 1) {
                            commons.push(p);
                        }
                        if ((v & 2) === 2) {
                            selectorEvents.push(p);
                        }
                    }
                    else {
                        commons.push(p);
                    }
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
                var globalWins = [], globalDocs = [], selectors = [], selectorsMap = {};
                if (list) {
                    for (var i = 0, one = void 0; i < list.length; i++) {
                        one = list[i];
                        total++;
                        if (one.e) {
                            if (one.e == window) {
                                globalWins.push(one.n);
                            }
                            else if (one.e == document) {
                                globalDocs.push(one.n);
                            }
                        }
                        else {
                            var coll = selectorsMap[one.s];
                            if (!coll) {
                                selectorsMap[one.s] = [one.n];
                            }
                            else {
                                coll.push(one.n);
                            }
                        }
                    }
                    for (var p in selectorsMap) {
                        selectors.push('$' + p + '&lt;' + selectorsMap[p] + '&gt;');
                    }
                }
                var so = vf.$v && vf.$v.$so;
                if (selectorEvents.length) {
                    var sMap = {};
                    for (var j = 0, selector = void 0, eName = void 0; j < selectorEvents.length; j++) {
                        eName = selectorEvents[j];
                        selector = so[eName];
                        for (var s in selector) {
                            var c = sMap[s];
                            if (!c) {
                                sMap[s] = [eName];
                            }
                            else {
                                c.push(eName);
                            }
                        }
                    }
                    for (var p in sMap) {
                        selectors.push('$' + p + '&lt;' + sMap[p] + '&gt;');
                    }
                }
                if (globalWins.length) {
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
        '_g': function (vf) {
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
        '_h': function (vf) {
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
        '_k': function (current, max) {
            var sc = Consts['_i'];
            var ec = Consts['_j'];
            var rs = (ec.r - sc.r) / max;
            var gs = (ec.g - sc.g) / max;
            var bs = (ec.b - sc.b) / max;
            var hexr = ('0' + parseInt(sc.r + current * rs).toString(16)).slice(-2);
            var hexg = ('0' + parseInt(sc.g + current * gs).toString(16)).slice(-2);
            var hexb = ('0' + parseInt(sc.b + current * bs).toString(16)).slice(-2);
            return '#' + hexr + hexg + hexb;
        },
        '_l': function (vf) {
            if (vf) {
                var view = vf.view;
                if (view) {
                    if (view.template || view.tmpl) {
                        return false;
                    }
                    return true;
                }
                view = vf.$v;
                if (view) {
                    if (view.tmpl) {
                        return false;
                    }
                    return true;
                }
            }
            return false;
        },
        '_m': function (vf) {
            if (vf) {
                var view = vf.$v;
                if (view && view.mixins) {
                    return view.mixins;
                }
            }
            return [];
        },
        '_n': function (vf) {
            if (vf) {
                var view = vf.$v;
                if (view && view.$os) {
                    return view.$os;
                }
            }
            return [];
        },
        '_B': function (env) {
            var rootId = env['_o']();
            var vom = env['_p']();
            var flattened = [];
            var map = {};
            var tree = {
                total: 0,
                comTotal: 0,
                vomTotal: 0,
                children: []
            };
            var all = vom.all();
            var allMap = {};
            var rewalk = false;
            for (var a in all) {
                if (all.hasOwnProperty(a)) {
                    tree.vomTotal++;
                }
                allMap[a] = 1;
            }
            var walk = function (id, info) {
                var vf = vom.get(id);
                var finfo = {};
                if (vf) {
                    tree.total++;
                    info.id = vf.id;
                    finfo.id = vf.id;
                    delete allMap[vf.id];
                    if (vf.fcc || vf.$cr) {
                        info.status = Status['_q'];
                        finfo.cls = '';
                    }
                    else if (vf.fca || vf.$ca) {
                        info.status = Status['_r'];
                        finfo.cls = '_r';
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            info.status = Status['_s'];
                            finfo.cls = '_t';
                        }
                    }
                    else {
                        info.status = Status['_s'];
                        finfo.cls = '_t';
                    }
                    flattened.push(finfo);
                    map[vf.id] = info;
                    var evts = Inspector['_f'](vf);
                    var total = evts.total;
                    if (total) {
                        var cc = Consts['_u'];
                        total = Math.min(total, cc);
                        info.event = Inspector['_k'](total, cc);
                    }
                    var shared = Inspector['_g'](vf);
                    if (shared.length) {
                        var sc = Consts['_v'];
                        var current = Math.min(shared.length, sc);
                        info.shared = Inspector['_k'](current, sc);
                    }
                    var location = Inspector['_h'](vf);
                    if (location.path || (location.keys && location.keys.length)) {
                        var lc = Consts['_w'];
                        var keys = location.keys || [];
                        var current = Math.min(lc, keys.length);
                        info.location = Inspector['_k'](current, lc);
                    }
                    var mixins = Inspector['_m'](vf);
                    if (mixins.length) {
                        var mc = Consts['_x'];
                        var current = Math.min(mixins.length, mc);
                        info.mixins = Inspector['_k'](current, mc);
                    }
                    var state = Inspector['_n'](vf);
                    if (state.length) {
                        var sc = Consts['_y'];
                        var current = Math.min(state.length, sc);
                        info.state = Inspector['_k'](current, sc);
                    }
                    info.inline = Inspector['_l'](vf);
                    var path = vf.path;
                    //组件识别
                    //没有模板或在gallery目录下
                    if (info.inline || (path && path.indexOf('/gallery/') > 0)) {
                        rewalk = true;
                        info.component = true;
                        tree.comTotal++;
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
            var node = getNode('_z');
            //如果存在组件且未勾选“显示组件view”，从树中删除组件
            if ((!node || !node.checked) && rewalk) {
                rewalk = function (tree) {
                    for (var i = tree.children.length - 1; i >= 0; i--) {
                        var item = tree.children[i];
                        if (item.component) {
                            tree.children.splice(i, 1);
                        }
                        else {
                            rewalk(item);
                        }
                    }
                };
                rewalk(tree);
            }
            var il = [];
            for (var p in allMap) {
                il.push({
                    id: p,
                    il: true,
                    status: Status['_A'],
                    children: []
                });
                flattened.push({
                    id: p,
                    cls: '_t'
                });
            }
            tree.isolated = il;
            return {
                tree: tree,
                flattened: flattened,
                map: map
            };
        },
        '_I': function (env) {
            var managers = env['_C']();
            var result = [], rows = 0, cleanedMap = {}, total = 0;
            var temp = {}, id = 0;
            for (var i = 0; i < managers.length; i++) {
                var t = managers[i];
                var o = t.exports.$mMetas || t.exports.$mm || t.exports.$m;
                if (!o._$id)
                    o._$id = 't' + id++;
                if (temp[o._$id])
                    temp[o._$id].continued = true;
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
                var counter = 0, maxLeft = 0, maxRight = 0, p = void 0, info = void 0;
                var metas = m.exports.$mMetas || m.exports.$mm || m.exports.$m;
                delete metas._$id;
                if (!m.continued) {
                    /* mc-uncheck */
                    for (p in metas) {
                        info = metas[p];
                        if (info.cleans) {
                            var a = (info.cleans + '').split(',');
                            /* mc-uncheck */
                            for (var x = 0; x < a.length; x++) {
                                cleanedMap[a[x]] = p;
                            }
                        }
                    }
                    for (p in metas) {
                        info = metas[p];
                        var c = ManagerColors['_D'];
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
                            c = ManagerColors['_E'];
                            ti.color = c;
                            cleans.left.push(ti);
                            maxLeft++;
                        }
                        else if (cleanedMap[p]) {
                            c = ManagerColors['_F'];
                            ti.color = c;
                            cleans.right.push(ti);
                            maxRight++;
                        }
                        else {
                            if (info.cache || info.cacheTime) {
                                c = ManagerColors['_G'];
                                ti.color = c;
                                caches.push(ti);
                            }
                            else {
                                r.push(ti);
                                counter++;
                            }
                        }
                        total++;
                    }
                }
                rows += Math.ceil(counter / Consts['_H']);
                rows += Math.max(maxLeft, maxRight);
                rows += Math.ceil(caches.length / Consts['_H']);
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
        '_J': function (callback) {
            var env = Inspector['_e']();
            env['_J']();
            var max = 50;
            var poll = function () {
                max--;
                if (!max) {
                    window.console.error('prepareError:无法在当前环境下启动Magix Inspector(需要的模块如jquery,magix等检测不到)，如需更多帮助，请旺旺联系：行列');
                }
                else {
                    if (D.body) {
                        if (env['_K']()) {
                            callback();
                        }
                        else {
                            setTimeout(poll, 500);
                        }
                    }
                    else {
                        setTimeout(poll, 500);
                    }
                }
            };
            poll();
        },
        '_V': function () {
            Inspector['_J'](function () {
                UI['_L']();
                var env = Inspector['_e']();
                var vom = env['_p']();
                var drawTimer, intervalTimer, moveTimer, activeId, treeInfo, blinkCount = 0;
                var stopActive = function () {
                    if (activeId && intervalTimer) {
                        blinkCount = 0;
                        Graphics['_M'](treeInfo.tree);
                        clearInterval(intervalTimer);
                        activeId = intervalTimer = '';
                    }
                };
                var startActive = function () {
                    blinkCount = 16;
                    if (activeId && !intervalTimer) {
                        Graphics['_M'](treeInfo.tree, activeId);
                        intervalTimer = setInterval(function () {
                            if (!blinkCount) {
                                stopActive();
                            }
                            else {
                                blinkCount--;
                                Graphics['_M'](treeInfo.tree, activeId);
                            }
                        }, 600);
                    }
                };
                document.onmouseout = document.onmouseover = function (e) {
                    clearTimeout(moveTimer);
                    moveTimer = setTimeout(function () {
                        var vfs = vom.all();
                        var begin = e.type == 'mouseout' ? e.relatedTarget : e.target;
                        var fId;
                        while (begin && begin.parentNode) {
                            var id = begin.id;
                            if (id && vfs[id]) {
                                fId = id;
                                break;
                            }
                            begin = begin.parentNode;
                        }
                        if (fId) {
                            if (fId != activeId) {
                                activeId = fId;
                                startActive();
                            }
                        }
                        else {
                            stopActive();
                        }
                    }, 50);
                };
                var attachVframe = function (vf) {
                    vf.on('created', function () {
                        Tracer['_N']('vframe:' + vf.id + '[' + (vf.path || vf.view.path || '') + ']渲染完毕', Status['_q']);
                        drawTree();
                    });
                    vf.on('alter', function (e) {
                        if (e.id && !e.logged) {
                            e.logged = 1;
                            var f = vom.get(e.id);
                            if (f) {
                                Tracer['_N']('从vframe:' + f.id + '[' + (f.path || f.view.path || '') + '] 发起界面变更', Status['_O']);
                            }
                        }
                        Tracer['_N']('vframe:' + vf.id + '收到变更消息', Status['_r']);
                        drawTree();
                    });
                    vf.on('viewInited', function () {
                        Tracer['_N']('vframe:' + vf.id + '的view[' + vf.view.path + ']，init调用完毕', Status['_q']);
                    });
                    vf.on('viewUnmounted', function () {
                        var path = (vf.path || (vf.view && vf.view.path || ''));
                        if (path) {
                            path = '[' + path + ']';
                        }
                        Tracer['_N']('vframe:' + vf.id + '的view' + path + '销毁完毕', Status['_P']);
                    });
                    vf.on('viewMounted', function () {
                        Tracer['_N']('vframe:' + vf.id + '的view[' + (vf.path || vf.view.path ||
                            '') + ']，首次渲染完毕', Status['_q']);
                    });
                    vf.___mh = true;
                };
                var attachVframes = function () {
                    var all = vom.all();
                    for (var a in all) {
                        var vf = vom.get(a);
                        if (!vf.___mh) {
                            attachVframe(vf);
                        }
                    }
                };
                var drawTree = function (e) {
                    if (e) {
                        if (e.type == 'remove') {
                            if (e.vframe) {
                                var path = e.vframe.path;
                                if (!path && e.vframe.view) {
                                    path = e.vframe.view.path;
                                }
                                if (path) {
                                    path = '(' + path + ')';
                                }
                                else {
                                    path = '';
                                }
                                Tracer['_N']('从VOM中移除vframe:' + e.vframe.id + path, Status['_Q']);
                            }
                            else {
                                Tracer['_N']('remove:', e);
                            }
                        }
                        else if (e.type == 'created') {
                            attachVframes();
                        }
                    }
                    clearTimeout(drawTimer);
                    drawTimer = setTimeout(function () {
                        stopActive();
                        treeInfo = Inspector['_B'](env);
                        Graphics['_M'](treeInfo.tree);
                        startActive();
                        env['_R'](treeInfo.flattened);
                    }, 0);
                };
                vom.on('add', function (e) {
                    drawTree();
                    if (e.vframe.pId) {
                        Tracer['_N']('找到vframe:' + e.vframe.pId + '的子vframe:' + e.vframe.id, Status['_O']);
                    }
                    Tracer['_N']('创建vframe:' + e.vframe.id, Status['_O']);
                    attachVframe(e.vframe);
                });
                vom.on('remove', drawTree);
                var rootVf = vom.get(env['_o']());
                if (rootVf) {
                    rootVf.on('created', drawTree);
                }
                attachVframes();
                drawTree();
                Inspector['_M'] = drawTree;
                var managerTimer;
                var drawManagerTree = function () {
                    clearTimeout(managerTimer);
                    managerTimer = setTimeout(function () {
                        var tree = Inspector['_I'](env);
                        Graphics['_S'](tree);
                    }, 500);
                };
                env['_T'](drawManagerTree);
                env['_U'](drawTree);
                drawManagerTree();
            });
        }
    };
    Inspector['_V']();
}

})();