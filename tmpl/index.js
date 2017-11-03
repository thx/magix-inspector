//kissy drawIcons  removeClass报错
let D = document;
let W = window;
if (D['@{magix}']) {
    W.postMessage({
        '@{from}': '@{mx_ispt}',
        '@{action}': '@{expand}'
    }, '*');
} else {
    W.addEventListener('message', e => {
        let d = e.data;
        if (d && d['@{from}'] == '@{mx_ispt}') {
            if (d['@{action}'] == '@{expand}') {
                UI['@{expand}']();
            }
        }
    }, false);
    D['@{magix}'] = 1;
    '@snippets/env-ide-port.js';
    '@snippets/variable.js';
    '@snippets/drag.js';
    '@snippets/ui.js';
    '@snippets/tracer.js';
    '@snippets/graphics.js';
    '@snippets/env-modules.js';
    '@snippets/env-kissy.js';
    '@snippets/env-require.js';
    var SeajsEnv = {},
        SeajsSEnv = {},
        MagixEnv = {};
    for (let p in RequireEnv) {
        SeajsEnv[p] = SeajsSEnv[p] = MagixEnv[p] = RequireEnv[p];
    }
    '@snippets/env-sea.js';
    '@snippets/env-ssea.js';
    '@snippets/env-magix.js';
    var Inspector = {
        '@{getEnv}'() {
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
        '@{getEvents}'(vf) {
            let evts = [],
                total = 0;
            if (vf) {
                let evto = (vf.view && (vf.view.events || vf.view.$evts)) || (vf.$v && vf.$v.$eo);
                let commons = [];
                let selectorEvents = [];
                for (let p in evto) {
                    total++;
                    let v = evto[p];
                    if (isFinite(v)) {
                        if ((v & 1) === 1) {
                            commons.push(p);
                        }
                        if ((v & 2) === 2) {
                            selectorEvents.push(p);
                        }
                    } else {
                        commons.push(p);
                    }
                }
                let evetnsList = (vf.view && vf.view.tmplEvents); //2.0
                if (evetnsList && evetnsList.length) {
                    commons = commons.concat(evetnsList);
                    total += evetnsList.length;
                }
                if (commons.length) {
                    evts.push('&lt;' + commons + '&gt;');
                }
                let list = vf.$v && vf.$v.$el;
                let globalWins = [],
                    globalDocs = [],
                    selectors = [],
                    selectorsMap = {};
                if (list) {
                    for (let i = 0, one; i < list.length; i++) {
                        one = list[i];
                        total++;
                        if (one.e) {
                            if (one.e == window) {
                                globalWins.push(one.n);
                            } else if (one.e == document) {
                                globalDocs.push(one.n);
                            }
                        } else {
                            let coll = selectorsMap[one.s];
                            if (!coll) {
                                selectorsMap[one.s] = [one.n];
                            } else {
                                coll.push(one.n);
                            }
                        }
                    }
                    for (let p in selectorsMap) {
                        selectors.push('$' + p + '&lt;' + selectorsMap[p] + '&gt;');
                    }
                }
                let so = vf.$v && vf.$v.$so;
                if (selectorEvents.length) {
                    let sMap = {};
                    for (let j = 0, selector, eName; j < selectorEvents.length; j++) {
                        eName = selectorEvents[j];
                        selector = so[eName];
                        for (let s in selector) {
                            let c = sMap[s];
                            if (!c) {
                                sMap[s] = [eName];
                            } else {
                                c.push(eName);
                            }
                        }
                    }
                    for (let p in sMap) {
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
        '@{getShared}'(vf) {
            let shares = [];
            if (vf && vf.$v) {
                let sd = vf.$v.$sd;
                if (sd) {
                    for (let p in sd) {
                        shares.push(p);
                    }
                }
            }
            return shares;
        },
        '@{getLocation}'(vf) {
            let path, keys = [];
            if (vf) {
                if (vf.view) {
                    let ol = vf.view.$ol;
                    if (ol) {
                        path = ol.pn;
                        keys = ol.keys || ol.ks;
                    }
                }
                if (vf.$v) {
                    let l = vf.$v.$l;
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
        '@{getGradualColor}'(current, max) {
            let sc = Consts['@{gradualStartColor}'];
            let ec = Consts['@{gradualEndColor}'];
            let rs = (ec.r - sc.r) / max;
            let gs = (ec.g - sc.g) / max;
            let bs = (ec.b - sc.b) / max;
            let hexr = ('0' + parseInt(sc.r + current * rs).toString(16)).slice(-2);
            let hexg = ('0' + parseInt(sc.g + current * gs).toString(16)).slice(-2);
            let hexb = ('0' + parseInt(sc.b + current * bs).toString(16)).slice(-2);
            return '#' + hexr + hexg + hexb;
        },
        '@{getIsInline}'(vf) {
            if (vf) {
                let view = vf.view;
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
        '@{getMixins}'(vf) {
            if (vf) {
                let view = vf.$v;
                if (view && view.mixins) {
                    return view.mixins;
                }
            }
            return [];
        },
        '@{getState}'(vf) {
            if (vf) {
                let view = vf.$v;
                if (view && view.$os) {
                    return view.$os;
                }
            }
            return [];
        },
        '@{getTree}'(env) {
            let rootId = env['@{getRootId}']();
            let vom = env['@{getVOM}']();
            let flattened = [];
            let map = {};
            let tree = {
                total: 0,
                comTotal: 0,
                vomTotal: 0,
                children: []
            };
            let all = vom.all();
            let allMap = {};
            let rewalk = false;
            for (let a in all) {
                if (all.hasOwnProperty(a)) {
                    tree.vomTotal++;
                }
                allMap[a] = 1;
            }
            let walk = (id, info) => {
                let vf = vom.get(id);
                let finfo = {};
                if (vf) {
                    tree.total++;
                    info.id = vf.id;
                    finfo.id = vf.id;
                    delete allMap[vf.id];
                    if (vf.fcc || vf.$cr) {
                        info.status = Status['@{created}'];
                        finfo.cls = '';
                    } else if (vf.fca || vf.$ca) {
                        info.status = Status['@{alter}'];
                        finfo.cls = '@{alter}';
                        if ((vf.cM && !vf.view) || (vf.$c && !vf.$v)) {
                            info.status = Status['@{init}'];
                            finfo.cls = '@{bad}';
                        }
                    } else {
                        info.status = Status['@{init}'];
                        finfo.cls = '@{bad}';
                    }
                    flattened.push(finfo);
                    map[vf.id] = info;
                    let evts = Inspector['@{getEvents}'](vf);
                    let total = evts.total;
                    if (total) {
                        let cc = Consts['@{eventsCommonCount}'];
                        total = Math.min(total, cc);
                        info.event = Inspector['@{getGradualColor}'](total, cc);
                    }
                    let shared = Inspector['@{getShared}'](vf);
                    if (shared.length) {
                        let sc = Consts['@{sharedCount}'];
                        let current = Math.min(shared.length, sc);
                        info.shared = Inspector['@{getGradualColor}'](current, sc);
                    }
                    let location = Inspector['@{getLocation}'](vf);
                    if (location.path || (location.keys && location.keys.length)) {
                        let lc = Consts['@{locationCount}'];
                        let keys = location.keys || [];
                        let current = Math.min(lc, keys.length);
                        info.location = Inspector['@{getGradualColor}'](current, lc);
                    }
                    let mixins = Inspector['@{getMixins}'](vf);
                    if (mixins.length) {
                        let mc = Consts['@{mixinsCount}'];
                        let current = Math.min(mixins.length, mc);
                        info.mixins = Inspector['@{getGradualColor}'](current, mc);
                    }
                    let state = Inspector['@{getState}'](vf);
                    if (state.length) {
                        let sc = Consts['@{stateCount}'];
                        let current = Math.min(state.length, sc);
                        info.state = Inspector['@{getGradualColor}'](current, sc);
                    }
                    info.inline = Inspector['@{getIsInline}'](vf);
                    let path = vf.path;
                    //组件识别
                    //没有模板或在gallery目录下
                    if (info.inline || (path && path.indexOf('/gallery/') > 0)) {
                        rewalk = true;
                        info.component = true;
                        tree.comTotal++;
                    }
                    let cm = vf.cM || vf.$c;
                    for (let p in cm) {
                        let newInfo = {
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
            let node = getNode('@{mx_com_view}');
            //如果存在组件且未勾选“显示组件view”，从树中删除组件
            if ((!node || !node.checked) && rewalk) {
                rewalk = tree => {
                    for (let i = tree.children.length - 1; i >= 0; i--) {
                        let item = tree.children[i];
                        if (item.component) {
                            tree.children.splice(i, 1);
                        } else {
                            rewalk(item);
                        }
                    }
                };
                rewalk(tree);
            }
            let il = [];
            for (let p in allMap) {
                il.push({
                    id: p,
                    il: true,
                    status: Status['@{isolated}'],
                    children: []
                });
                flattened.push({
                    id: p,
                    cls: '@{bad}'
                });
            }
            tree.isolated = il;
            return {
                tree: tree,
                flattened: flattened,
                map: map
            };
        },
        '@{getManagerTree}'(env) {
            let managers = env['@{getMangerMods}']();
            let result = [],
                rows = 0,

                cleanedMap = {},
                total = 0;
            let temp = {},
                id = 0;
            for (let i = 0; i < managers.length; i++) {
                let t = managers[i];
                let o = t.exports.$mMetas || t.exports.$mm || t.exports.$m;
                if (!o._$id) o._$id = 't' + id++;
                if (temp[o._$id]) temp[o._$id].continued = true;
                temp[o._$id] = t;
            }
            for (let j = 0; j < managers.length; j++) {
                let m = managers[j];
                let r = [];
                let cleans = {
                    left: [],
                    right: []
                };
                let caches = [];
                let counter = 0,
                    maxLeft = 0,
                    maxRight = 0,
                    p, info;
                let metas = m.exports.$mMetas || m.exports.$mm || m.exports.$m;
                delete metas._$id;
                if (!m.continued) {
                    /* mc-uncheck */
                    for (p in metas) {
                        info = metas[p];
                        if (info.cleans) {
                            let a = (info.cleans + '').split(',');
                            /* mc-uncheck */
                            for (let x = 0; x < a.length; x++) {
                                cleanedMap[a[x]] = p;
                            }
                        }
                    }
                    for (p in metas) {
                        info = metas[p];
                        let c = ManagerColors['@{normal}'];
                        let ti = {
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
                            c = ManagerColors['@{cleans}'];
                            ti.color = c;
                            cleans.left.push(ti);
                            maxLeft++;
                        } else if (cleanedMap[p]) {
                            c = ManagerColors['@{cleaned}'];
                            ti.color = c;
                            cleans.right.push(ti);
                            maxRight++;
                        } else {
                            if (info.cache || info.cacheTime) {
                                c = ManagerColors['@{cache}'];
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
                rows += Math.ceil(counter / Consts['@{managerCols}']);
                rows += Math.max(maxLeft, maxRight);
                rows += Math.ceil(caches.length / Consts['@{managerCols}']);
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
        '@{prepare}'(callback) {
            let env = Inspector['@{getEnv}']();
            env['@{prepare}']();
            let max = 50;
            let poll = () => {
                max--;
                if (!max) {
                    window.console.error('prepareError:无法在当前环境下启动Magix Inspector(需要的模块如jquery,magix等检测不到)，如需更多帮助，请钉钉联系：行列');
                } else {
                    if (D.body) {
                        if (env['@{isReady}']()) {
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
        '@{start}'() {
            Inspector['@{prepare}'](() => {
                UI['@{setup}']();
                let env = Inspector['@{getEnv}']();
                let vom = env['@{getVOM}']();
                let drawTimer, intervalTimer, moveTimer, activeId, treeInfo, blinkCount = 0;

                let stopActive = function () {
                    if (activeId && intervalTimer) {
                        blinkCount = 0;
                        Graphics['@{drawTree}'](treeInfo.tree);
                        clearInterval(intervalTimer);
                        activeId = intervalTimer = '';
                    }
                };

                let startActive = function () {
                    blinkCount = 16;
                    if (activeId && !intervalTimer) {
                        Graphics['@{drawTree}'](treeInfo.tree, activeId);
                        intervalTimer = setInterval(function () {
                            if (!blinkCount) {
                                stopActive();
                            } else {
                                blinkCount--;
                                Graphics['@{drawTree}'](treeInfo.tree, activeId);
                            }
                        }, 600);
                    }
                };

                document.onmouseout = document.onmouseover = e => {
                    clearTimeout(moveTimer);
                    moveTimer = setTimeout(() => {
                        let vfs = vom.all();
                        let begin = e.type == 'mouseout' ? e.relatedTarget : e.target;
                        let fId;
                        while (begin && begin.parentNode) {
                            let id = begin.id;
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
                        } else {
                            stopActive();
                        }
                    }, 50);
                };
                let attachVframe = vf => {
                    vf.on('created', () => {
                        Tracer['@{log}']('vframe:' + vf.id + '[' + (vf.path || vf.view.path || '') + ']渲染完毕', Status['@{created}']);
                        drawTree();
                    });
                    vf.on('alter', e => {
                        if (e.id && !e.logged) {
                            e.logged = 1;
                            let f = vom.get(e.id);
                            if (f) {
                                Tracer['@{log}']('从vframe:' + f.id + '[' + (f.path || f.view.path || '') + '] 发起界面变更', Status['@{build}']);
                            }
                        }
                        Tracer['@{log}']('vframe:' + vf.id + '收到变更消息', Status['@{alter}']);
                        drawTree();
                    });
                    vf.on('viewInited', () => {
                        Tracer['@{log}']('vframe:' + vf.id + '的view[' + vf.view.path + ']，init调用完毕', Status['@{created}']);
                    });
                    vf.on('viewUnmounted', () => {
                        let path = (vf.path || (vf.view && vf.view.path || ''));
                        if (path) {
                            path = '[' + path + ']';
                        }
                        Tracer['@{log}']('vframe:' + vf.id + '的view' + path + '销毁完毕', Status['@{destroy}']);
                    });
                    vf.on('viewMounted', () => {
                        Tracer['@{log}']('vframe:' + vf.id + '的view[' + (vf.path || vf.view.path ||
                            '') + ']，首次渲染完毕', Status['@{created}']);
                    });
                    vf.___mh = true;
                };
                let attachVframes = () => {
                    let all = vom.all();
                    for (let a in all) {
                        let vf = vom.get(a);
                        if (!vf.___mh) {
                            attachVframe(vf);
                        }
                    }
                };
                let drawTree = e => {
                    if (e) {
                        if (e.type == 'remove') {
                            if (e.vframe) {
                                let path = e.vframe.path;
                                if (!path && e.vframe.view) {
                                    path = e.vframe.view.path;
                                }
                                if (path) {
                                    path = '(' + path + ')';
                                } else {
                                    path = '';
                                }
                                Tracer['@{log}']('从VOM中移除vframe:' + e.vframe.id + path, Status['@{remove}']);
                            } else {
                                Tracer['@{log}']('remove:', e);
                            }
                        } else if (e.type == 'created') {
                            attachVframes();
                        }
                    }
                    clearTimeout(drawTimer);
                    drawTimer = setTimeout(() => {
                        stopActive();
                        treeInfo = Inspector['@{getTree}'](env);
                        Graphics['@{drawTree}'](treeInfo.tree);
                        startActive();
                        env['@{drawIcons}'](treeInfo.flattened);
                    }, 0);
                };
                vom.on('add', e => {
                    drawTree();
                    if (e.vframe.pId) {
                        Tracer['@{log}']('找到vframe:' + e.vframe.pId + '的子vframe:' + e.vframe.id, Status['@{build}']);
                    }
                    Tracer['@{log}']('创建vframe:' + e.vframe.id, Status['@{build}']);
                    attachVframe(e.vframe);
                });
                vom.on('remove', drawTree);
                let rootVf = vom.get(env['@{getRootId}']());
                if (rootVf) {
                    rootVf.on('created', drawTree);
                }
                attachVframes();
                drawTree();
                Inspector['@{drawTree}'] = drawTree;

                let managerTimer;
                let drawManagerTree = () => {
                    clearTimeout(managerTimer);
                    managerTimer = setTimeout(() => {
                        let tree = Inspector['@{getManagerTree}'](env);
                        Graphics['@{drawManagerTree}'](tree);
                    }, 500);
                };
                env['@{hookAttachMod}'](drawManagerTree);
                env['@{hookViewShare}'](drawTree);
                drawManagerTree();
            });
        }
    };
    Inspector['@{start}']();
}