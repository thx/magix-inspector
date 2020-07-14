/*
    generate by magix-combine@3.11.44: https://github.com/thx/magix-combine
    author: kooboy_li@163.com
    loader: iife
 */
(function(){
//kissy drawIcons  removeClass报错
//2014.7.29第一次以helper名称发布
var D = document;
var W = window;
if (D['___']) {
    W.postMessage({
        '__b': '__a',
        '__d': '__c'
    }, '*');
}
else {
    W.addEventListener('message', function (e) {
        var d = e.data;
        if (d && d['__b'] == '__a') {
            if (d['__d'] == '__c') {
                UI['__c']();
            }
        }
    }, false);
    D['___'] = 1;
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var IdePort = {
    '__Y': function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.responseText) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(new Error("Network failed(" + xhr.status + "): " + url));
                    }
                }
            };
            xhr.send();
        });
    },
    '__a_': function (inputHostname) {
        var files = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            files[_i - 1] = arguments[_i];
        }
        IdePort['__Z'](inputHostname)
            .then(function (determinedURL) {
            return Promise.all(files.map(function (file) {
                return IdePort['__Y'](determinedURL + encodeURIComponent(file));
            }));
        })
            .then(function (determinedURL) {
            console.info("Files(" + files.length + ") all opened.");
        })["catch"](function (err) { return console.error(err); });
    },
    '__Z': function (inputHostname) {
        if (IdePort.determinedURL && IdePort.determinedBase == inputHostname) {
            return Promise.resolve(IdePort.determinedURL);
        }
        return IdePort['__aa'](inputHostname);
    },
    '__aa': function (inputHostname) {
        return __awaiter(this, void 0, void 0, function () {
            function hashStr(str, max) {
                // SDBM Algorithm from http://www.cse.yorku.ca/~oz/hash.html
                var hash = 0;
                for (var i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
                }
                hash = hash >>> 0;
                max && (hash %= max);
                return hash;
            }
            var MAX_TRIAL, trials, port, location, determinedURL, responseHostname, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MAX_TRIAL = 3;
                        trials = 0;
                        port = hashStr(inputHostname, 8192) + 32768;
                        _a.label = 1;
                    case 1:
                        location = "http://127.0.0.1:" + port + "/";
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, IdePort['__Y'](location)];
                    case 3:
                        responseHostname = _a.sent();
                        if (responseHostname != inputHostname) {
                            throw '';
                        }
                        determinedURL = location + 'open?link=';
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        trials++;
                        port++;
                        _a.label = 6;
                    case 6:
                        if (!determinedURL && trials < MAX_TRIAL) return [3 /*break*/, 1];
                        _a.label = 7;
                    case 7:
                        if (!determinedURL) {
                            throw new Error("Cannot find available port within range: " + (port - MAX_TRIAL) + " ~ " + port);
                        }
                        IdePort.determinedBase = inputHostname;
                        IdePort.determinedURL = determinedURL;
                        return [2 /*return*/, determinedURL];
                }
            });
        });
    }
};
// Tested in Browser:
// IdePort["@{determineIDEServiceURLPromise}"]('dianjiang.di.taobao.com');

    var Status = {
    '__q': '#008B00',
    '__s': '#FF3030',
    '__r': '#BC8F8F',
    '__A': '#FF3030',
    '__Q': '#9AC0CD',
    '__R': '#8B5F65',
    '__S': '#EED5B7',
    '__ab': '#94d694'
};
var Consts = {
    '__ac': 550,
    '__ad': 470,
    '__ae': 530,
    '__af': 400,
    '__ag': 490,
    '__ah': 34,
    '__ai': 6,
    '__aj': 15,
    '__I': 5,
    '__ak': 5,
    '__al': 40,
    '__am': 40,
    '__i': {
        r: 0,
        g: 153,
        b: 102
    },
    '__j': {
        r: 255,
        g: 255,
        b: 0
    },
    '__u': 15,
    '__v': 5,
    '__w': 12,
    '__x': 5,
    '__y': 12
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
    '__H': '#CC9966',
    '__G': '#99CCCC',
    '__F': '#FF9999',
    '__E': '#CCCC99'
};
var ApplyStyle = function (x, h) {
    var i = D.createElement('style');
    D.documentElement.appendChild(i);
    if (i.styleSheet) {
        i.styleSheet.cssText = h;
    }
    else {
        i.appendChild(D.createTextNode(h));
    }
};
var IconsMap = {
    '__r': 'MsCPjFb',
    '__t': 'MsCPjFa'
};
var getNode = function (id) {
    return D.getElementById(id);
};

    var Drag = {
    '__ap': function ($, off, isFn) {
        var Win = $(W);
        var Doc = $(D);
        var ClearSelection = function (t) {
            if ((t = W.getSelection)) {
                t().removeAllRanges();
            }
            else if ((t = D.selection)) {
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
            '__an': function (node, moveCallback, endCallback) {
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
            '__ao': ClearSelection
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
var main = "<div class=\"MsCPjFe\" id=\"__av\"><ul class=\"MsCPjFp MsCPjFd\" id=\"__aw\"><li class=\"MsCPjFl MsCPjFn MsCPjFm\" id=\"__aJ\">△</li><li class=\"MsCPjFk MsCPjFn MsCPjFm\">VOM</li><li class=\"MsCPjFk MsCPjFn MsCPjFm\">Tracer</li><li class=\"MsCPjFk MsCPjFn MsCPjFm\">Manager</li></ul><div id=\"__aL\"><div style=\"width:{__ac}px;height:{__af}px;overflow-x:auto;overflow-y:hidden\" id=\"__aP\"><canvas width=\"{__ac}\" height=\"{__af}\" id=\"__az\"></canvas></div><label class=\"MsCPjFk MsCPjFh\"><input type=\"checkbox\" class=\"MsCPjFj\" id=\"__aI\"/>控制台显示view信息</label><label class=\"MsCPjFk MsCPjFh\"><input type=\"checkbox\" class=\"MsCPjFj\" id=\"__z\"/>显示组件view</label><ul class=\"MsCPjFp MsCPjFk\" id=\"__b_\"></ul></div><div id=\"__aq\" style=\"height:{__af}px;overflow:scroll;overflow-x:auto;display:none;padding:8px;\"></div><div id=\"__aM\" style=\"display:none\"><div style=\"height:{__af}px;overflow:scroll;overflow-x:auto;\" id=\"__aV\"><canvas width=\"{__ae}\" height=\"{__af}\" id=\"__aE\"></canvas></div><ul class=\"MsCPjFp MsCPjFn\" id=\"__aY\"></ul></div><div id=\"__aG\" class=\"MsCPjFr\"></div><div id=\"__aU\" class=\"MsCPjFr\"></div></div>";
var moreInfo = "<ul><li><b class=\"MsCPjFc\">id:</b>{id}</li><li><b class=\"MsCPjFc\">view:</b>{view}</li>{events} {location} {share} {mixins} {state}<li class=\"MsCPjFo\">{ex}</li><li><b class=\"MsCPjFc\">resources</b></li><li style=\"{__ag}px;overflow:auto;max-height:200px;\">{res}</li></ul>";
var moreManagerInfo = "<ul><li><b>key:</b>{id}</li><li><b>url:</b>{url}</li><li><b>描述:</b>{desc}</li><li><b>缓存:</b>{cache}</li><li><b>清理缓存:</b>{cleans}</li><li><b>预处理:</b>{hasAfter}</li></ul>";
var total = "<li class=\"MsCPjFk MsCPjFg MsCPjFi\">view统计:[{count}]</li>";
var managerTotal = "<li class=\"MsCPjFk MsCPjFg\">{groups}个接口文件，共{total}个接口</li>";
var UI = {
    '__M': function () {
        var div = D.createElement('div');
        div.innerHTML = main.replace(/\{(\w+|(?:@\{[^\}]+\}))\}/g, function (m, v) {
            return Consts[v] || m;
        });
        D.documentElement.appendChild(div);
        UI['__at']();
        var env = Inspector['__e']();
        env['__au']('#__av', '#__aw');
    },
    '__at': function () {
        UI['__ax']();
        var moveTimer;
        var env = Inspector['__e']();
        env['__ay']('__az', 'mousemove', UI['@{$mousemove}'] = function (e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function () {
                var offset = env['__aA']('__az');
                UI['__aB']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['__ay']('__az', 'click', UI['__aC'] = function (e) {
            UI['__aD'](e);
        });
        env['__ay']('__az', 'mouseout', UI['@{$mouseout}'] = function () {
            clearTimeout(moveTimer);
            UI['__aB']({
                x: -1,
                y: -1
            });
        });
        env['__ay']('__aE', 'mousemove', UI['@{$mangerMousemove}'] = function (e) {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(function () {
                var offset = env['__aA']('__aE');
                UI['__aF']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['__ay']('__aE', 'mouseout', UI['@{$managerMouseout}'] = function () {
            clearTimeout(moveTimer);
            UI['__aF']({
                x: -1,
                y: -1
            });
        });
        env['__ay']('__aG', 'mouseover', UI['@{$imouseover}'] = function () {
            clearTimeout(UI['@{$hideTimer}']);
        });
        env['__ay']('__aG', 'mouseout', UI['@{$imouseout}'] = function () {
            UI['__aH']();
        });
        env['__ay']('__aI', 'click', function () {
            var logNode = getNode('__aI');
            if (logNode.checked)
                W.console.dir(env['__p']().all());
        });
        env['__ay']('__z', 'click', function () {
            Inspector['__O']();
        });
        env['__ay']('__av', 'click', UI['@{$click}'] = function (e) {
            var node;
            if (e.target.id == '__aJ') {
                node = getNode('__av');
                if (e.target.innerHTML == '△') {
                    node.style.height = Consts['__ah'] + 'px';
                    node.style.width = '40px';
                    node.style.overflow = 'hidden';
                    e.target.innerHTML = '▽';
                    env['__aK']('#__aw').addClass('MsCPjFs');
                }
                else {
                    node.style.height = Consts['__ad'] + 'px';
                    node.style.width = Consts['__ac'] + 'px';
                    node.style.overflow = 'inherit';
                    e.target.innerHTML = '△';
                    env['__aK']('#__aw').removeClass('MsCPjFs');
                }
            }
            else if (e.target.innerHTML == 'VOM') {
                node = getNode('__aL');
                node.style.display = 'block';
                node = getNode('__aq');
                node.style.display = 'none';
                node = getNode('__aM');
                node.style.display = 'none';
            }
            else if (e.target.innerHTML == 'Tracer') {
                node = getNode('__aL');
                node.style.display = 'none';
                node = getNode('__aM');
                node.style.display = 'none';
                node = getNode('__aq');
                node.style.display = 'block';
            }
            else if (e.target.innerHTML == 'Manager') {
                node = getNode('__aL');
                node.style.display = 'none';
                node = getNode('__aq');
                node.style.display = 'none';
                node = getNode('__aM');
                node.style.display = 'block';
            }
        });
    },
    '__c': function () {
        var min = getNode('__aJ');
        var env = Inspector['__e']();
        if (min.innerHTML == '▽') {
            var node = getNode('__av');
            node.style.height = Consts['__ad'] + 'px';
            node.style.width = Consts['__ac'] + 'px';
            node.style.overflow = 'inherit';
            min.innerHTML = '△';
            env['__aK']('#__aw').removeClass('MsCPjFs');
        }
    },
    '__N': function () {
        var min = getNode('__aJ');
        var env = Inspector['__e']();
        if (min.innerHTML == '△') {
            var node = getNode('__av');
            node.style.height = Consts['__ah'] + 'px';
            node.style.width = '40px';
            node.style.overflow = 'hidden';
            min.innerHTML = '▽';
            env['__aK']('#__aw').addClass('MsCPjFs');
        }
    },
    '__ax': function () {
        var env = Inspector['__e']();
        env['__aN']('__az', 'mousemove', UI['@{$mousemove}']);
        env['__aN']('__az', 'mouseout', UI['@{$mouseout}']);
        env['__aN']('__az', 'click', UI['__aC']);
        env['__aN']('__aE', 'mousemove', UI['@{$managerMousemove}']);
        env['__aN']('__aE', 'mouseout', UI['@{$managerMouseout}']);
        env['__aN']('__aJ', 'click', UI['@{$click}']);
        env['__aN']('__aG', 'mouseoout', UI['@{$imouseout}']);
        env['__aN']('__aG', 'mouseover', UI['@{$imouseover}']);
        //env['@{unbind}']('mx_mover', 'mousedown', UI['@{$mousedown}']);
    },
    '__aT': function (vf, item) {
        clearTimeout(UI['@{$hideTimer}']);
        var logNode = getNode('__aI');
        if (logNode.checked) {
            W.console.log(vf);
        }
        var cover = getNode('__aO');
        if (!cover) {
            cover = D.createElement('div');
            cover.className = 'MsCPjFf';
            cover.id = '__aO';
            D.body.appendChild(cover);
        }
        var node = getNode('__aG');
        node.style.display = 'block';
        var left = item.center.x - Consts['__ag'] / 2 - getNode('__aP').scrollLeft;
        node.style.left = left + 'px';
        node.style.top = item.center.y + item.radius + Consts['__ah'] + 5 + 'px';
        var env = Inspector['__e']();
        env['__aQ'](cover.style, vf.id);
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
                    var evts = Inspector['__f'](vf);
                    return evts.total ? '<li><b class="MsCPjFc">listen:</b>' + evts.list + '</li>' : '';
                case 'share':
                    var s = Inspector['__g'](vf);
                    return s.length ? '<li><b class="MsCPjFc">share:</b>' + s + '</li>' : '';
                case 'location':
                    var l = Inspector['__h'](vf);
                    var f = l.path || (l.keys && l.keys.length);
                    if (f) {
                        var r = [];
                        if (l.path) {
                            r.push('<span style="color:#FFC125">path</span>');
                        }
                        if (l.keys) {
                            r = r.concat(l.keys);
                        }
                        return '<li><b class="MsCPjFc">location:</b>' + r + '</li>';
                    }
                    return '';
                case 'mixins':
                    var mixins = Inspector['__m'](vf);
                    if (mixins.length) {
                        var list = env['__aR'](mixins);
                        list = list.join(',');
                        return '<li><b class="MsCPjFc">mixins:</b>' + list + '</li>';
                    }
                    return '';
                case 'state':
                    var state = Inspector['__n'](vf);
                    if (state.length) {
                        return '<li><b class="MsCPjFc">state:</b>' + state.join(',') + '</li>';
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
                                t.push('<tr><td>', p, '</td><td>', env['__aS'](res[p]), '</td></tr>');
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
    '__aH': function () {
        var node = getNode('__aG');
        var cover = getNode('__aO');
        UI['@{$hideTimer}'] = setTimeout(function () {
            node.style.display = 'none';
            cover.style.display = 'none';
        }, 150);
    },
    '__aW': function (item) {
        clearTimeout(UI['@{$hideManagerTimer}']);
        var node = getNode('__aU');
        node.style.display = 'block';
        node.style.left = item.rect[0] + 'px';
        var top = item.rect[1] + item.rect[3] + Consts['__ah'];
        var st = getNode('__aV').scrollTop;
        top -= st;
        node.style.top = top + 'px';
        node.innerHTML = moreManagerInfo.replace(/\{(\w+)\}/g, function (m, v) {
            switch (v) {
                case 'id':
                    return item.id;
                default:
                    return item[v] || '';
            }
        });
    },
    '__aX': function () {
        var node = getNode('__aU');
        UI['@{$hideManagerTimer}'] = setTimeout(function () {
            node.style.display = 'none';
        }, 150);
    },
    '__aZ': function (tree) {
        var node = getNode('__aY');
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
    '__ba': function (tree) {
        var node = getNode('__b_');
        node.innerHTML = total.replace(/\{(\w+)\}/g, function (m, v) {
            switch (v) {
                case 'count':
                    return 'com:' + tree.comTotal + ',vom:' + tree.vomTotal + ',total:' + tree.total;
                default:
                    return m;
            }
        });
    },
    '__bb': function (height) {
        getNode('__aE').height = height | 0;
    },
    '__bc': function (width) {
        var c = getNode('__az');
        c.width = width | 0;
        c.parentNode.scrollLeft = (c.width - Consts['__ae']) / 2;
    },
    '__aB': function (e) {
        console.log(e);
    },
    '__aF': function (e) {
        console.log(e);
    },
    '__aD': function (e) {
        console.log(e);
    }
};
ApplyStyle("MsCPjF_","vframe{display:block}.MsCPjF_:before{width:12px;content:\"M\";height:12px;border-radius:6px;position:absolute;background-color:#008b00;opacity:.4;font-size:10px;line-height:12px;text-align:center;color:#fff}.MsCPjFa:before{background-color:#ff3030}.MsCPjFb:before{background-color:#bc8f8f}.MsCPjFc{padding-right:5px}.MsCPjFd{background:#eee;cursor:move;margin:0;padding:0}.MsCPjFe{position:fixed;right:20px;top:20px;width:550px;height:470px;z-index:2147483647;box-shadow:0 0 5px #b9b9b9;background-color:#fff;font-size:12px;line-height:1.5}.MsCPjFf{position:absolute;opacity:.7;background-color:#90ee90}.MsCPjFe ul{list-style:none;padding:0;margin:0}.MsCPjFg{padding:5px}.MsCPjFh{height:28px;line-height:28px;margin:0 0 0 5px;padding:0}.MsCPjFi{color:#bbb}.MsCPjFj{margin-right:3px}.MsCPjFk{float:left}.MsCPjFl{float:right}.MsCPjFm{cursor:pointer}.MsCPjFn{padding:8px}.MsCPjFo{color:red}.MsCPjFp:after,.MsCPjFp:before{content:\"\";display:table}.MsCPjFp:after{clear:both}.MsCPjFp{*zoom:1}.MsCPjFq{height:1px;border:0;padding:0;margin:5px;background:rgba(0,0,0,.2);background:-webkit-gradient(linear,left top,right top,from(rgba(165,69,243,0)),color-stop(.5,rgba(125,118,132,.33)),to(rgba(165,69,243,0)))}.MsCPjFr{position:absolute;background-color:#eee;padding:8px;width:440px;display:none;box-shadow:0 2px 2px 2px #b9b9b9;word-break:break-all}.MsCPjFs:before{left:4px;bottom:5px}.MsCPjFs:after,.MsCPjFs:before{content:\" \";position:absolute;top:10px;border:2px dotted #b9b1b1;height:10px;cursor:move}.MsCPjFs:after{left:9px}");

    var Tracer = {
    '__P': function (info, color) {
        var node = getNode('__aq');
        if (Tracer['__ar']) {
            var t = D.createElement('hr');
            t.className = 'MsCPjFq';
            node.insertBefore(t, node.firstChild);
            delete Tracer['__ar'];
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
        clearTimeout(Tracer['__as']);
        Tracer['__as'] = setTimeout(function () {
            Tracer['__ar'] = true;
        }, 1500);
    }
};

    var Graphics = {
    '__bg': function () {
        var g = Graphics;
        g.list = [];
        delete g['__bd'];
        UI['__aB'] = function (e) {
            var loop, one, dis;
            if (g['__bd']) {
                one = g['__bd'];
                dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                if (dis > one.radius) {
                    g['__be']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['__bd'];
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
                        if (g['__bd'] != one) {
                            g['__bd'] = one;
                            g['__be']({
                                item: one,
                                action: 'enter'
                            });
                        }
                        break;
                    }
                }
            }
        };
        UI['__aD'] = g['__bf'];
    },
    '__bj': function () {
        var g = Graphics;
        g.managerList = [];
        delete g['__bh'];
        UI['__aF'] = function (e) {
            var loop, one, rect;
            if (g['__bh']) {
                one = g['__bh'];
                rect = one.rect;
                if (e.x < rect[0] || e.y < rect[1] || e.x > (rect[0] + rect[2]) || e.y > (rect[1] + rect[3])) {
                    g['__bi']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['__bh'];
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
                        if (g['__bh'] != one) {
                            g['__bh'] = one;
                            g['__bi']({
                                item: one,
                                action: 'enter'
                            });
                        }
                    }
                }
            }
        };
    },
    '__bk': function (tree, width, height) {
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
        var hRadius = width / maxChildren - Consts['__ai'];
        var vRadius = height / deep - Consts['__ai'];
        var tw = width;
        var dMinRadius = 2 * Consts['__aj'];
        if (hRadius < dMinRadius) {
            hRadius = dMinRadius;
            tw = dMinRadius * maxChildren + (maxChildren + 1) * Consts['__ai'];
            if (tw > 30000) {
                tw = 30000;
            }
            UI['__bc'](tw);
        }
        else {
            UI['__bc'](tw);
        }
        var radius = Math.floor(Math.min(vRadius, hRadius) / 2);
        var band = (radius / 20).toFixed(1);
        return {
            width: tw,
            margin: Consts['__ai'],
            radius: radius,
            band: band
        };
    },
    '__O': function (tree, active) {
        if (tree.id) {
            var width_1 = Consts['__ac'], height = Consts['__af'], g_1 = Graphics;
            g_1['__bg']();
            var params_1 = g_1['__bk'](tree, width_1, height);
            width_1 = params_1.width;
            var ctx_1 = getNode('__az').getContext('2d');
            ctx_1.clearRect(0, 0, width_1, height);
            var max_1 = params_1.radius * 2 - 2 * (params_1.band + 1) - 1;
            if (!g_1['__bl'])
                g_1['__bl'] = {};
            var getWidth_1 = function (text) {
                if (!g_1['__bl'][text]) {
                    ctx_1.font = 'normal 12px Arial';
                    g_1['__bl'][text] = ctx_1.measureText(text).width;
                }
                return g_1['__bl'][text];
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
                        ctx_1.fillStyle = Status['__ab'];
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
            UI['__ba'](tree, params_1);
        }
    },
    '__U': function (tree) {
        var gs = Graphics;
        gs['__bj']();
        var height = Consts['__ak'] * (tree.rows + 1) + tree.rows * Consts['__al'] + (Consts['__am'] + Consts['__ak']) * tree.groups.length;
        UI['__bb'](height);
        var ctx = getNode('__aE').getContext('2d');
        ctx.clearRect(0, 0, Consts['__ae'], height);
        var margin = Consts['__ak'];
        var managerWidth = ((Consts['__ae'] - (1 + Consts['__I']) * Consts['__ak']) / Consts['__I']) | 0;
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
                var left = Consts['__ak'];
                var pad = false;
                ctx.beginPath();
                ctx.moveTo(left, margin);
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = '#282828';
                ctx.fillText(g.name, left + 5, margin + 25);
                margin += Consts['__am'];
                var u = void 0, one = void 0;
                var max = Math.max(g.maxLeft, g.maxRight);
                var maps = {};
                var linecolorIndex = 0;
                var leftTopSpace = ((max - g.maxLeft) / 2) * (Consts['__al'] + Consts['__ak']);
                var rightTopSpace = ((max - g.maxRight) / 2) * (Consts['__al'] + Consts['__ak']);
                for (u = 0; u < max; u++) {
                    var lo = g.cleans.left[u];
                    var ro = g.cleans.right[u];
                    if (lo) {
                        drawRect(ctx, [
                            left,
                            margin + leftTopSpace,
                            150,
                            Consts['__al']
                        ], lo, g.name);
                        maps[lo.id] = lo;
                    }
                    if (ro) {
                        drawRect(ctx, [
                            Consts['__ae'] - Consts['__ak'] - 150,
                            margin + rightTopSpace,
                            150,
                            Consts['__al']
                        ], ro, g.name);
                        maps[ro.id] = ro;
                        ro.lineColor = Lines[linecolorIndex++ % Lines.length];
                    }
                    margin += Consts['__ak'] + Consts['__al'];
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
                    drawRect(ctx, [left, margin, managerWidth, Consts['__al']], g.caches[u], g.name);
                    if ((u + 1) % Consts['__I'] === 0) {
                        left = Consts['__ak'];
                        margin += Consts['__ak'] + Consts['__al'];
                        pad = false;
                    }
                    else {
                        left += managerWidth + Consts['__ak'];
                        pad = true;
                    }
                }
                left = Consts['__ak'];
                if (pad) {
                    margin += Consts['__ak'] + Consts['__al'];
                }
                for (u = 0; u < g.items.length; u++) {
                    one = g.items[u];
                    drawRect(ctx, [left, margin, managerWidth, Consts['__al']], one, g.name);
                    if ((u + 1) % Consts['__I'] === 0) {
                        left = Consts['__ak'];
                        margin += Consts['__ak'] + Consts['__al'];
                        pad = false;
                    }
                    else {
                        left += managerWidth + Consts['__ak'];
                        pad = true;
                    }
                }
                left = Consts['__ak'];
                if (pad) {
                    margin += Consts['__am'];
                }
            }
        };
        draw(tree.groups);
        UI['__aZ'](tree);
    },
    '__be': function (e) {
        var env = Inspector['__e']();
        var vom = env['__p']();
        if (e.action == 'enter') {
            Graphics['__bm'] = vom.get(e.item.id);
            UI['__aT'](vom.get(e.item.id), e.item);
        }
        else {
            Graphics['__bm'] = null;
            UI['__aH']();
        }
    },
    '__bi': function (e) {
        if (e.action == 'enter') {
            UI['__aW'](e.item);
        }
        else {
            UI['__aX']();
        }
    },
    '__bf': function (e) {
        var lastVOM = Graphics['__bm'];
        if (!lastVOM) {
            return;
        }
        var path = (lastVOM.view && lastVOM.view.path) || lastVOM.path;
        if (!path) {
            return;
        }
        var base = (W.Site && W.Site.onlineHostname) || W.location.hostname;
        IdePort['__a_'](base, path + '.js', path + '.html');
    }
};

    var type = function (o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
};
var Query = function (selector) {
    var doms = type(selector) === 'array' ? selector : [selector];
    if (type(selector) == 'string') {
        doms = document.querySelectorAll(selector);
    }
    this['__bp'] = doms;
};
Query.prototype = {
    off: function (type, fn) {
        var doms = this['__bp'];
        for (var _i = 0, doms_1 = doms; _i < doms_1.length; _i++) {
            var d = doms_1[_i];
            var evts = type.split(/\s+/);
            for (var _a = 0, evts_1 = evts; _a < evts_1.length; _a++) {
                var e = evts_1[_a];
                d.removeEventListener(e, fn);
            }
        }
        return this;
    },
    on: function (type, fn) {
        var doms = this['__bp'];
        for (var _i = 0, doms_2 = doms; _i < doms_2.length; _i++) {
            var d = doms_2[_i];
            var evts = type.split(/\s+/);
            for (var _a = 0, evts_2 = evts; _a < evts_2.length; _a++) {
                var e = evts_2[_a];
                d.addEventListener(e, fn, false);
            }
        }
        return this;
    },
    removeClass: function (name) {
        var doms = this['__bp'];
        for (var _i = 0, doms_3 = doms; _i < doms_3.length; _i++) {
            var d = doms_3[_i];
            d.classList.remove(name);
        }
        return this;
    },
    addClass: function (name) {
        var doms = this['__bp'];
        for (var _i = 0, doms_4 = doms; _i < doms_4.length; _i++) {
            var d = doms_4[_i];
            d.classList.add(name);
        }
        return this;
    },
    css: function (styles) {
        var doms = this['__bp'];
        if (type(styles) == 'string') {
            var dom = doms[0];
            if (dom) {
                var s = getComputedStyle(dom, null);
                s = s[styles];
                return s;
            }
            return null;
        }
        for (var _i = 0, doms_5 = doms; _i < doms_5.length; _i++) {
            var d = doms_5[_i];
            for (var s in styles) {
                var v = styles[s];
                if (/^\d+$/.test(v)) {
                    v = v + 'px';
                }
                d.style[s] = v;
            }
        }
        return this;
    },
    offset: function () {
        var dom = this['__bp'][0];
        if (dom) {
            var rect = dom.getBoundingClientRect();
            return rect;
        }
        return null;
    },
    prev: function () {
        var dom = this['__bp'][0];
        if (dom) {
            while (dom.nodeType != 1) {
                dom = dom.previousSibling;
            }
            return dom;
        }
        return null;
    },
    height: function () {
        var dom = this['__bp'][0];
        if (dom) {
            return dom.clientHeight;
        }
        return 0;
    },
    width: function () {
        var dom = this['__bp'][0];
        if (dom) {
            return dom.clientWidth;
        }
        return 0;
    },
    children: function () {
        var dom = this['__bp'][0];
        if (dom) {
            return new Query(dom.children);
        }
        return 0;
    },
    parent: function () {
        var dom = this['__bp'][0];
        if (dom) {
            return dom.parentElement;
        }
        return 0;
    }
};
var LiteQ = function (selector) {
    return new Query(selector);
};
LiteQ.type = type;
LiteQ.isFunction = function (o) { return type(o) === 'function'; };

    var ModulesFeatures = {
    $: ['zepto', 'fn.jquery'],
    jquery: ['fn.jquery'],
    zepto: ['zepto'],
    magix: ['safeExec', 'toTry']
};
var ModuleIdMap = {};

    var S = W.KISSY;
var KISSYEnv = {
    '__K': function () {
        S.use('node');
    },
    '__o': function () {
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
    '__p': function () {
        var old = S.Env.mods['magix/magix'];
        if (old) {
            return S.require('magix/vom');
        }
        var magix = S.require('magix');
        return magix.VOM || magix.Vframe;
    },
    '__C': function () {
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
    '__L': function () {
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
    '__aQ': function (style, id) {
        var node = S.require('node').one('#' + id);
        if (!node)
            return;
        var prev = node.prev();
        if (node.css('position') == 'absolute' && prev && prev.nodeName() == 'input') {
            node = prev;
        }
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
    '__aA': function (id) {
        var node = S.require('node');
        return node.one('#' + id).offset();
    },
    '__ay': function (id, type, fn) {
        var node = S.require('node');
        if (S.isString(id))
            id = '#' + id;
        return node.one(id).on(type, fn);
    },
    '__aN': function (id, type, fn) {
        var node = S.require('node');
        if (S.isString(id))
            id = '#' + id;
        return node.one(id).detach(type, fn);
    },
    '__aR': function (mixins) {
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
    '__aS': function (r) {
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
    '__V': function (callback) {
        var old = S.Loader.Utils.attachMod;
        S.Loader.Utils.attachMod = function () {
            old.apply(S.Loader.Utils, arguments);
            callback();
        };
    },
    '__au': function (node, handle) {
        var root = S.one(node);
        var dd = Drag['__ap'](S.one, 'detach', S.isFunction);
        S.one(handle).on('mousedown', function (e) {
            if (e.target.id != handle.slice(1))
                return;
            var right = parseInt(root.css('right'), 10);
            var top = parseInt(root.css('top'), 10);
            var x = e.pageX;
            var y = e.pageY;
            dd['__an'](e.target, function (e) {
                dd['__ao']();
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
    '__T': function (flattened) {
        for (var i = flattened.length - 1; i >= 0; i--) {
            var f = flattened[i];
            var root = S.one('#' + f.id);
            if (root) {
                root.removeClass('MsCPjFa').removeClass('MsCPjFb').addClass('MsCPjF_');
            }
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '__aK': function (node) {
        return S.one(node);
    },
    '__W': function (cb) {
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
    '__K': function () { },
    '__V': function (cb) {
        if (W.MutationObserver) {
            var timer_1;
            var o = new W.MutationObserver(function () {
                clearTimeout(timer_1);
                setTimeout(cb, 1000);
            });
            o.observe(D.body, {
                subtree: true,
                childList: true,
                characterData: true
            });
        }
    },
    '__bn': function (key) {
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
    '__bo': function () {
        return this['__bn']('$') || this['__bn']('jquery') || this['__bn']('zepto') || LiteQ;
    },
    '__o': function () {
        var old = this['__bn']('magix/magix');
        var magix;
        if (old) {
            magix = old;
        }
        else {
            magix = this['__bn']('magix');
        }
        return magix.config('rootId');
    },
    '__p': function () {
        var old = this['__bn']('magix/vom');
        if (old) {
            return old;
        }
        var magix = this['__bn']('magix');
        return magix.VOM || magix.Vframe;
    },
    '__C': function () {
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
    '__L': function () {
        return this['__bn']('magix/magix') || this['__bn']('magix');
    },
    '__aQ': function (style, id) {
        var $ = this['__bo']();
        var node = $('#' + id);
        var prev = node.prev();
        if (node.css('position') == 'absolute' && prev.prop('tagName') == 'INPUT') {
            node = prev;
        }
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
        } while (node.length && $.contains(D.body, node[0]));
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
    '__aA': function (id) {
        var $ = this['__bo']();
        return $('#' + id).offset();
    },
    '__ay': function (id, type, fn) {
        var $ = this['__bo']();
        if ($.type(id) == 'string')
            id = '#' + id;
        return $(id).on(type, fn);
    },
    '__aN': function (id, type, fn) {
        var $ = this['__bo']();
        if ($.type(id) == 'string')
            id = '#' + id;
        return $(id).off(type, fn);
    },
    '__aR': function (mixins) {
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
    '__aS': function (r) {
        var e = r.res || r.e;
        var $ = this['__bo']();
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
    '__au': function (node, handle) {
        var $ = this['__bo']();
        var root = $(node);
        var dd = Drag['__ap']($, 'off', $.isFunction);
        $(handle).on('mousedown', function (e) {
            if (e.target.id != handle.slice(1))
                return;
            var right = parseInt(root.css('right'), 10);
            var top = parseInt(root.css('top'), 10);
            var x = e.pageX;
            var y = e.pageY;
            dd['__an'](e.target, function (e) {
                dd['__ao']();
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
    '__T': function (flattened) {
        var $ = this['__bo']();
        for (var i = flattened.length - 1; i >= 0; i--) {
            var f = flattened[i];
            var root = $('#' + f.id);
            if (root)
                root.removeClass('MsCPjFa').removeClass('MsCPjFb').addClass('MsCPjF_');
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '__aK': function (node) {
        var $ = this['__bo']();
        return $(node);
    },
    '__W': function (cb) {
        var magix = this['__bn']('magix');
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
    SeajsEnv['__bn'] = function (key) {
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
            for (var i = rules.length; i--;) {
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
SeajsEnv['__C'] = function () {
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
SeajsEnv['__aR'] = function (mixins) {
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

    SeajsSEnv['__bn'] = function (key) {
    var o;
    try {
        o = require(key);
    }
    catch (e) { }
    if (!o) {
        W.console.warn('seajs standalone模式下无法找到模块：' + key + '，也无法智能探测。如需更多帮助信息请钉钉联系：行列');
    }
    return o;
};
SeajsSEnv['__C'] = function () {
    return [];
};
SeajsSEnv['__aR'] = function (mixins) {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};

    MagixEnv['__bn'] = function (key) {
    if (key == 'magix') {
        return W.Magix;
    }
};
MagixEnv['__bo'] = function () {
    return W.$ || W.jQuery || W.Zepto;
};
MagixEnv['__o'] = function () {
    return Magix.config('rootId');
};
MagixEnv['__p'] = function () {
    return Magix.VOM || Magix.Vframe;
};
MagixEnv['__C'] = function () {
    return [];
};
MagixEnv['__aR'] = function (mixins) {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};
MagixEnv['__L'] = function () {
    return true;
};

    var Inspector = {
        '__e': function () {
            if (W.KISSY) {
                return KISSYEnv;
            }
            if (W.requirejs) {
                return RequireEnv;
            }
            if (W.seajs) {
                return SeajsEnv;
            }
            if (W.Magix) {
                return MagixEnv;
            }
            if (W.define && W.require) {
                return SeajsSEnv;
            }
            W.console.error('getEnvError:无法在当前环境下启动Magix Inspector，如需更多帮助，请钉钉联系：行列');
        },
        '__f': function (vf) {
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
                if (vf.$v && vf.$v.constructor && vf.$v.constructor.prototype.$el) {
                    list = vf.$v.constructor.prototype.$el;
                }
                var globalWins = [], globalDocs = [], selectors = [], selectorsMap = {};
                if (list) {
                    for (var i = 0, one = void 0; i < list.length; i++) {
                        one = list[i];
                        total++;
                        if (one.e) {
                            if (one.e == W) {
                                globalWins.push(one.n);
                            }
                            else if (one.e == D) {
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
        '__g': function (vf) {
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
        '__h': function (vf) {
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
        '__k': function (current, max) {
            var sc = Consts['__i'];
            var ec = Consts['__j'];
            var rs = (ec.r - sc.r) / max;
            var gs = (ec.g - sc.g) / max;
            var bs = (ec.b - sc.b) / max;
            var hexr = ('0' + parseInt(sc.r + current * rs).toString(16)).slice(-2);
            var hexg = ('0' + parseInt(sc.g + current * gs).toString(16)).slice(-2);
            var hexb = ('0' + parseInt(sc.b + current * bs).toString(16)).slice(-2);
            return '#' + hexr + hexg + hexb;
        },
        '__l': function (vf) {
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
        '__m': function (vf) {
            if (vf) {
                var view = vf.$v;
                if (view && view.mixins) {
                    return view.mixins;
                }
            }
            return [];
        },
        '__n': function (vf) {
            if (vf) {
                var view = vf.$v;
                if (view && view.$os) {
                    return view.$os;
                }
            }
            return [];
        },
        '__B': function (env) {
            var rootId = env['__o']();
            var vom = env['__p']();
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
                        info.status = Status['__q'];
                        finfo.cls = '';
                    }
                    else if (vf.fca || vf.$ca) {
                        info.status = Status['__r'];
                        finfo.cls = '__r';
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            info.status = Status['__s'];
                            finfo.cls = '__t';
                        }
                    }
                    else {
                        info.status = Status['__s'];
                        finfo.cls = '__t';
                    }
                    flattened.push(finfo);
                    map[vf.id] = info;
                    var evts = Inspector['__f'](vf);
                    var total = evts.total;
                    if (total) {
                        var cc = Consts['__u'];
                        total = Math.min(total, cc);
                        info.event = Inspector['__k'](total, cc);
                    }
                    var shared = Inspector['__g'](vf);
                    if (shared.length) {
                        var sc = Consts['__v'];
                        var current = Math.min(shared.length, sc);
                        info.shared = Inspector['__k'](current, sc);
                    }
                    var location = Inspector['__h'](vf);
                    if (location.path || (location.keys && location.keys.length)) {
                        var lc = Consts['__w'];
                        var keys = location.keys || [];
                        var current = Math.min(lc, keys.length);
                        info.location = Inspector['__k'](current, lc);
                    }
                    var mixins = Inspector['__m'](vf);
                    if (mixins.length) {
                        var mc = Consts['__x'];
                        var current = Math.min(mixins.length, mc);
                        info.mixins = Inspector['__k'](current, mc);
                    }
                    var state = Inspector['__n'](vf);
                    if (state.length) {
                        var sc = Consts['__y'];
                        var current = Math.min(state.length, sc);
                        info.state = Inspector['__k'](current, sc);
                    }
                    info.inline = Inspector['__l'](vf);
                    var path = vf.path;
                    //组件识别
                    //没有模板或在gallery目录下
                    if (info.inline || (path && (path.indexOf('gallery/') > 0 ||
                        path.indexOf('/gallery') > 0))) {
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
            var node = getNode('__z');
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
                    status: Status['__A'],
                    children: []
                });
                flattened.push({
                    id: p,
                    cls: '__t'
                });
            }
            tree.isolated = il;
            return {
                tree: tree,
                flattened: flattened,
                map: map
            };
        },
        '__J': function (env) {
            var managers = env['__C']();
            var result = [], rows = 0, cleanedMap = {}, total = 0;
            var temp = {}, id = 0;
            for (var i = 0; i < managers.length; i++) {
                var t = managers[i];
                var o = t.exports.$mMetas || t.exports.$mm || t.exports.$m;
                if (!o['__D'])
                    o['__D'] = 't' + id++;
                if (temp[o['__D']])
                    temp[o['__D']].continued = true;
                temp[o['__D']] = t;
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
                delete metas['__D'];
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
                        var c = ManagerColors['__E'];
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
                            c = ManagerColors['__F'];
                            ti.color = c;
                            cleans.left.push(ti);
                            maxLeft++;
                        }
                        else if (cleanedMap[p]) {
                            c = ManagerColors['__G'];
                            ti.color = c;
                            cleans.right.push(ti);
                            maxRight++;
                        }
                        else {
                            if (info.cache || info.cacheTime) {
                                c = ManagerColors['__H'];
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
                rows += Math.ceil(counter / Consts['__I']);
                rows += Math.max(maxLeft, maxRight);
                rows += Math.ceil(caches.length / Consts['__I']);
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
        '__K': function (callback) {
            var env = Inspector['__e']();
            env['__K']();
            var max = 50;
            var poll = function () {
                max--;
                if (!max) {
                    W.console.error('prepareError:无法在当前环境下启动Magix Inspector(需要的模块如jquery,magix等检测不到)，如需更多帮助，请钉钉联系：行列');
                }
                else {
                    if (D.body) {
                        if (env['__L']()) {
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
        '__X': function () {
            Inspector['__K'](function () {
                UI['__M']();
                UI['__N']();
                var env = Inspector['__e']();
                var vom = env['__p']();
                var drawTimer, intervalTimer, moveTimer, activeId, treeInfo, blinkCount = 0;
                var stopActive = function () {
                    if (activeId && intervalTimer) {
                        blinkCount = 0;
                        Graphics['__O'](treeInfo.tree);
                        clearInterval(intervalTimer);
                        activeId = intervalTimer = '';
                    }
                };
                var startActive = function () {
                    blinkCount = 16;
                    if (activeId && !intervalTimer) {
                        Graphics['__O'](treeInfo.tree, activeId);
                        intervalTimer = setInterval(function () {
                            if (!blinkCount) {
                                stopActive();
                            }
                            else {
                                blinkCount--;
                                Graphics['__O'](treeInfo.tree, activeId);
                            }
                        }, 600);
                    }
                };
                D.onmouseout = D.onmouseover = function (e) {
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
                            else if (begin.vframe) {
                                fId = begin.vframe.id;
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
                        Tracer['__P']('vframe:' + vf.id + '[' + (vf.path || vf.view.path || '') + ']渲染完毕', Status['__q']);
                        drawTree();
                    });
                    vf.on('alter', function (e) {
                        if (e.id && !e.logged) {
                            e.logged = 1;
                            var f = vom.get(e.id);
                            if (f) {
                                Tracer['__P']('从vframe:' + f.id + '[' + (f.path || f.view.path || '') + '] 发起界面变更', Status['__Q']);
                            }
                        }
                        Tracer['__P']('vframe:' + vf.id + '收到变更消息', Status['__r']);
                        drawTree();
                    });
                    vf.on('viewInited', function () {
                        Tracer['__P']('vframe:' + vf.id + '的view[' + vf.view.path + ']，init调用完毕', Status['__q']);
                    });
                    vf.on('viewUnmounted', function () {
                        var path = (vf.path || (vf.view && vf.view.path || ''));
                        if (path) {
                            path = '[' + path + ']';
                        }
                        Tracer['__P']('vframe:' + vf.id + '的view' + path + '销毁完毕', Status['__R']);
                    });
                    vf.on('viewMounted', function () {
                        Tracer['__P']('vframe:' + vf.id + '的view[' + (vf.path || vf.view.path ||
                            '') + ']，首次渲染完毕', Status['__q']);
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
                                var vf = e.vframe;
                                vf.off('created');
                                vf.off('alter');
                                vf.off('viewInited');
                                vf.off('viewUnmounted');
                                vf.off('viewMounted');
                                var path = vf.path;
                                if (!path && vf.view) {
                                    path = vf.view.path;
                                }
                                if (path) {
                                    path = '(' + path + ')';
                                }
                                else {
                                    path = '';
                                }
                                Tracer['__P']('从VOM中移除vframe:' + vf.id + path, Status['__S']);
                            }
                            else {
                                Tracer['__P']('remove:', e);
                            }
                        }
                        else if (e.type == 'created') {
                            attachVframes();
                        }
                    }
                    clearTimeout(drawTimer);
                    drawTimer = setTimeout(function () {
                        stopActive();
                        treeInfo = Inspector['__B'](env);
                        Graphics['__O'](treeInfo.tree);
                        startActive();
                        env['__T'](treeInfo.flattened);
                    }, 0);
                };
                vom.on('add', function (e) {
                    drawTree();
                    if (e.vframe.pId) {
                        Tracer['__P']('找到vframe:' + e.vframe.pId + '的子vframe:' + e.vframe.id, Status['__Q']);
                    }
                    Tracer['__P']('创建vframe:' + e.vframe.id, Status['__Q']);
                    attachVframe(e.vframe);
                });
                vom.on('remove', drawTree);
                var rootVf = vom.get(env['__o']());
                if (rootVf) {
                    rootVf.on('created', drawTree);
                }
                attachVframes();
                drawTree();
                Inspector['__O'] = drawTree;
                var managerTimer;
                var drawManagerTree = function () {
                    clearTimeout(managerTimer);
                    managerTimer = setTimeout(function () {
                        var tree = Inspector['__J'](env);
                        Graphics['__U'](tree);
                    }, 500);
                };
                env['__V'](drawManagerTree);
                env['__W'](drawTree);
                drawManagerTree();
            });
        }
    };
    Inspector['__X']();
}

})();