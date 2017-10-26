//#snippet;
//#exclude(loader)
let ehReg = /[&<>]/g;
let ehMap = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt'
};
let encodeHTML = src => {
    return src.replace(ehReg, m => '&' + ehMap[m] + ';');
};
let main = '@ui-main.html';
let moreInfo = '@ui-more.html';
let moreManagerInfo = '@ui-manager.html';
let total = '@ui-total.html';
let managerTotal = '@ui-mtotal.html';
let UI = {
    '@{setup}'() {
        let div = D.createElement('div');
        div.innerHTML = main.replace(/\{(\w+|(?:@\{[^\}]+\}))\}/g, (m, v) => {
            return Consts[v] || m;
        });
        D.documentElement.appendChild(div);
        UI['@{attachEvent}']();
        let env = Inspector['@{getEnv}']();
        env['@{dragIt}']('#@{mx}', '#@{mx_tabs}');
    },
    '@{attachEvent}'() {
        UI['@{detachEvent}']();
        let moveTimer;
        let env = Inspector['@{getEnv}']();
        env['@{bind}']('@{mx_view_canvas}', 'mousemove', UI['@{$mousemove}'] = e => {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(() => {
                let offset = env['@{getDOMOffset}']('@{mx_view_canvas}');
                UI['@{onMousemove}']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['@{bind}']('@{mx_view_canvas}', 'mouseout', UI['@{$mouseout}'] = () => {
            clearTimeout(moveTimer);
            UI['@{onMousemove}']({
                x: -1,
                y: -1
            });
        });
        env['@{bind}']('@{mx_manager_canvas}', 'mousemove', UI['@{$mangerMousemove}'] = e => {
            clearTimeout(moveTimer);
            moveTimer = setTimeout(() => {
                let offset = env['@{getDOMOffset}']('@{mx_manager_canvas}');
                UI['@{onManagerMousemove}']({
                    x: e.pageX - offset.left,
                    y: e.pageY - offset.top
                });
            }, 10);
        });
        env['@{bind}']('@{mx_manager_canvas}', 'mouseout', UI['@{$managerMouseout}'] = () => {
            clearTimeout(moveTimer);
            UI['@{onManagerMousemove}']({
                x: -1,
                y: -1
            });
        });
        env['@{bind}']('@{mx_moreinfo}', 'mouseover', UI['@{$imouseover}'] = () => {
            clearTimeout(UI['@{$hideTimer}']
        });
        env['@{bind}']('@{mx_moreinfo}', 'mouseout', UI['@{$imouseout}'] = () => {
            UI['@{hideMoreInfo}']();
        });
        env['@{bind}']('@{mx_log_console}', 'click', () => {
            let logNode = getNode('@{mx_log_console}');
            if (logNode.checked)
                window.console.dir(env['@{getVOM}']().all());
        });
        env['@{bind}']('@{mx_com_view}', 'click', () => {
            Inspector['@{drawTree}']();
        });
        env['@{bind}']('@{mx}', 'click', UI['@{$click}'] = e => {
            let node;
            if (e.target.id == '@{mx_min}') {
                node = getNode('@{mx}');
                if (e.target.innerHTML == '△') {
                    node.style.height = Consts['@{titleHeight}'] + 'px';
                    node.style.width = '40px';
                    node.style.overflow = 'hidden';
                    e.target.innerHTML = '▽';
                    env['@{getNode}']('#@{mx_tabs}').addClass('@ui.css:shrink');
                } else {
                    node.style.height = Consts['@{height}'] + 'px';
                    node.style.width = Consts['@{width}'] + 'px';
                    node.style.overflow = 'inherit';
                    e.target.innerHTML = '△';
                    env['@{getNode}']('#@{mx_tabs}').removeClass('@ui.css:shrink');
                }
            } else if (e.target.innerHTML == 'VOM') {
                node = getNode('@{mx_painter}');
                node.style.display = 'block';
                node = getNode('@{mx_trancer}');
                node.style.display = 'none';
                node = getNode('@{mx_manager}');
                node.style.display = 'none';
            } else if (e.target.innerHTML == 'Tracer') {
                node = getNode('@{mx_painter}');
                node.style.display = 'none';
                node = getNode('@{mx_manager}');
                node.style.display = 'none';
                node = getNode('@{mx_trancer}');
                node.style.display = 'block';
            } else if (e.target.innerHTML == 'Manager') {
                node = getNode('@{mx_painter}');
                node.style.display = 'none';
                node = getNode('@{mx_trancer}');
                node.style.display = 'none';
                node = getNode('@{mx_manager}');
                node.style.display = 'block';
            }
        });
    },
    '@{expand}'() {
        let min = getNode('@{mx_min}');
        let env = Inspector['@{getEnv}']();
        if (min.innerHTML == '▽') {
            let node = getNode('@{mx}');
            node.style.height = Consts['@{height}'] + 'px';
            node.style.width = Consts['@{width}'] + 'px';
            node.style.overflow = 'inherit';
            min.innerHTML = '△';
            env['@{getNode}']('#@{mx_tabs}').removeClass('@ui.css:shrink');
        }
    },
    '@{detachEvent}'() {
        let env = Inspector['@{getEnv}']();
        env['@{unbind}']('@{mx_view_canvas}', 'mousemove', UI['@{$mousemove}']);
        env['@{unbind}']('@{mx_view_canvas}', 'mouseout', UI['@{$mouseout}']);
        env['@{unbind}']('@{mx_manager_canvas}', 'mousemove', UI['@{$managerMousemove}']);
        env['@{unbind}']('@{mx_manager_canvas}', 'mouseout', UI['@{$managerMouseout}']);
        env['@{unbind}']('@{mx_min}', 'click', UI['@{$click}']);
        env['@{unbind}']('@{mx_moreinfo}', 'mouseoout', UI['@{$imouseout}']);
        env['@{unbind}']('@{mx_moreinfo}', 'mouseover', UI['@{$imouseover}']);
        //env['@{unbind}']('mx_mover', 'mousedown', UI['@{$mousedown}']);
    },
    '@{showMoreInfo}'(vf, item) {
        clearTimeout(UI['@{$hideTimer}']);
        let logNode = getNode('@{mx_log_console}');
        if (logNode.checked) {
            window.console.log(vf);
        }
        let cover = getNode('@{mx_cover}');
        if (!cover) {
            cover = D.createElement('div');
            cover.className = '@ui.css:mask';
            cover.id = '@{mx_cover}';
            D.body.appendChild(cover);
        }

        let node = getNode('@{mx_moreinfo}');
        node.style.display = 'block';
        let left = item.center.x - Consts['@{moreInfoWidth}'] / 2 - getNode('@{mx_view_cnt}').scrollLeft;
        node.style.left = left + 'px';
        node.style.top = item.center.y + item.radius + Consts['@{titleHeight}'] + 5 + 'px';
        let env = Inspector['@{getEnv}']();
        env['@{updateDOMStyle}'](cover.style, vf.id);
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
                    let evts = Inspector['@{getEvents}'](vf);
                    return evts.total ? '<li><b class="@ui.css:tle">listen:</b>' + evts.list + '</li>' : '';
                case 'share':
                    let s = Inspector['@{getShared}'](vf);
                    return s.length ? '<li><b class="@ui.css:tle">share:</b>' + s + '</li>' : '';
                case 'location':
                    let l = Inspector['@{getLocation}'](vf);
                    let f = l.path || (l.keys && l.keys.length);
                    if (f) {
                        let r = [];
                        if (l.path) {
                            r.push('<span style="color:#FFC125">path</span>');
                        }
                        if (l.keys) {
                            r = r.concat(l.keys);
                        }
                        return '<li><b class="@ui.css:tle">location:</b>' + r + '</li>';
                    }
                    return '';
                case 'mixins':
                    let mixins = Inspector['@{getMixins}'](vf);
                    if (mixins.length) {
                        let list = env['@{getMixinId}'](mixins);
                        list = list.join(',');
                        return '<li><b class="@ui.css:tle">mixins:</b>' + list + '</li>';
                    }
                    return '';
                case 'state':
                    let state = Inspector['@{getState}'](vf);
                    if (state.length) {
                        return '<li><b class="@ui.css:tle">state:</b>' + state.join(',') + '</li>';
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
                    let t = [];
                    let res = vf && vf.view && vf.view.$res;
                    res = res || vf && vf.$v && vf.$v.$r;
                    let hasRrs;
                    if (res) {
                        for (let p in res) {
                            hasRrs = true;
                            break;
                        }
                        if (hasRrs) {
                            t.push('<table style="width:100%"><tr><td>key</td><td>type</td></tr>');
                            for (let p in res) {
                                t.push('<tr><td>', p, '</td><td>', env['@{getResType}'](res[p]), '</td></tr>');
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
    '@{hideMoreInfo}'() {
        let node = getNode('@{mx_moreinfo}');
        let cover = getNode('@{mx_cover}');
        UI['@{$hideTimer}'] = setTimeout(() => {
            node.style.display = 'none';
            cover.style.display = 'none';
        }, 150);
    },
    '@{showManagerMoreInfo}'(item) {
        clearTimeout(UI['@{$hideManagerTimer}']);
        let node = getNode('@{mx_manager_moreinfo}');
        node.style.display = 'block';
        node.style.left = item.rect[0] + 'px';
        let top = item.rect[1] + item.rect[3] + Consts['@{titleHeight}'];
        let st = getNode('@{mx_manager_cnt}').scrollTop;
        top -= st;
        node.style.top = top + 'px';
        node.innerHTML = moreManagerInfo.replace(/\{(\w+)\}/g, (m, v) => {
            switch (v) {
                case 'id':
                    return item.id;
                default:
                    return item[v] || m;
            }
        });
    },
    '@{hideManagerMoreInfo}'() {
        let node = getNode('@{mx_manager_moreinfo}');
        UI['@{$hideManagerTimer}'] = setTimeout(() => {
            node.style.display = 'none';
        }, 150);
    },
    '@{showManagerTotal}'(tree) {
        let node = getNode('@{mx_manager_total}');
        node.innerHTML = managerTotal.replace(/\{(\w+)\}/g, (m, v) => {
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
    '@{showTotal}'(tree) {
        let node = getNode('@{mx_view_total}');
        node.innerHTML = total.replace(/\{(\w+)\}/g, (m, v) => {
            switch (v) {
                case 'count':
                    return 'com:' + tree.comTotal + ',vom:' + tree.vomTotal + ',total:' + tree.total;
                default:
                    return m;
            }
        });
    },
    '@{updateManagerCanvasHeight}'(height) {
        getNode('@{mx_manager_canvas}').height = height | 0;
    },
    '@{updateVOMCanvansWidth}'(width) {
        let c = getNode('@{mx_view_canvas}');
        c.width = width | 0;
        c.parentNode.scrollLeft = (c.width - Consts['@{canvasWidth}']) / 2;
    },
    '@{onMousemove}'(e) {
        console.log(e);
    },
    '@{onManagerMousemove}'(e) {
        console.log(e);
    }
};
ApplyStyle('@ui.css');