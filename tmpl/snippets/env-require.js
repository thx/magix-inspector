//#snippet;
//#exclude(loader)
let RequireEnv = {
    '@{prepare}'() { },
    '@{hookAttachMod}'(cb) {
        if (W.MutationObserver) {
            let timer;
            let o = new W.MutationObserver(() => {
                clearTimeout(timer);
                setTimeout(cb, 1000);
            });
            o.observe(D.body, {
                subtree: true,
                childList: true,
                characterData: true
            });
        }
    },
    '@{getMod}'(key) {
        let ms = require.s.contexts._.defined;
        let o = ms[key] || ModuleIdMap[key];
        if (!o && ModulesFeatures[key]) {
            let rules = ModulesFeatures[key];
            /* mc-uncheck */
            for (let p in ms) {
                let found = false;
                for (let i = rules.length - 1; i >= 0; i--) {
                    let r = rules[i];
                    let parts = r.split('.');
                    let root = ms[p];
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
    '@{getDL}'() {
        return this['@{getMod}']('$') || this['@{getMod}']('jquery') || this['@{getMod}']('zepto') || LiteQ;
    },
    '@{getRootId}'() {
        let old = this['@{getMod}']('magix/magix');
        let magix;
        if (old) {
            magix = old;
        } else {
            magix = this['@{getMod}']('magix');
        }
        return magix.config('rootId');
    },
    '@{getVOM}'() {
        let old = this['@{getMod}']('magix/vom');
        if (old) {
            return old;
        }
        let magix = this['@{getMod}']('magix');
        return magix.VOM || magix.Vframe;
    },
    '@{getMangerMods}'() {
        let mods = require.s.contexts._.defined;
        let result = [];
        for (let p in mods) {
            let v = mods[p];
            if (v && ((v.$mMetas && v.$mCache) || (v.$mm && v.$mc) || (v.$m && v.$c))) {
                result.push({
                    name: p,
                    exports: v
                });
            }
        }
        return result;
    },
    '@{isReady}'() {
        return this['@{getMod}']('magix/magix') || this['@{getMod}']('magix');
    },
    '@{updateDOMStyle}'(style, id) {
        let $ = this['@{getDL}']();
        let node = $('#' + id);
        let prev = node.prev();
        if (node.css('position') == 'absolute' && prev.prop('tagName') == 'INPUT') {
            node = prev;
        }
        let n = node;
        let size = {
            height: n.outerHeight ? n.outerHeight() : n.height(),
            width: n.outerWidth ? n.outerWidth() : n.width()
        };
        let startZINode, offset;
        if (!size.height) {
            let max = 4;
            do {
                n = n.children();
                size.height = n.height();
                startZINode = n;
                if (size.height) {
                    let pos = n.css('position');
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
                        size.width = Math.max(size.width, n.children().width() || 0);
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
            size.width = Math.max(size.width, n.children().width() || 0);
            startZINode = n;
        }
        let zIndex = -1;
        let hide;
        do {
            if (!hide) hide = node.css('display') == 'none';
            let z = parseInt(node.css('z-index')) || 1;
            if (z && z > zIndex) zIndex = z;
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
    '@{getDOMOffset}'(id) {
        let $ = this['@{getDL}']();
        return $('#' + id).offset();
    },
    '@{bind}'(id, type, fn) {
        let $ = this['@{getDL}']();
        if ($.type(id) == 'string') id = '#' + id;
        return $(id).on(type, fn);
    },
    '@{unbind}'(id, type, fn) {
        let $ = this['@{getDL}']();
        if ($.type(id) == 'string') id = '#' + id;
        return $(id).off(type, fn);
    },
    '@{getMixinId}'(mixins) {
        let mods = require.s.contexts._.defined;
        let ids = [];
        for (let i = 0; i < mixins.length; i++) {
            let mixin = mixins[i];
            if (mixin) {
                if (mixin['\x1e']) {
                    ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
                } else {
                    for (let p in mods) {
                        let mod = mods[p];
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
    '@{getResType}'(r) {
        let e = r.res || r.e;
        let $ = this['@{getDL}']();
        let type = $.type(r);
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
    '@{dragIt}'(node, handle) {
        let $ = this['@{getDL}']();
        let root = $(node);
        let dd = Drag['@{get}']($, 'off', $.isFunction);
        $(handle).on('mousedown', e => {
            if (e.target.id != handle.slice(1)) return;
            let right = parseInt(root.css('right'), 10);
            let top = parseInt(root.css('top'), 10);
            let x = e.pageX;
            let y = e.pageY;
            dd['@{begin}'](e.target, e => {
                dd['@{clear}']();
                let fx = e.pageX - x,
                    fy = e.pageY - y;
                if (top + fy < 0) fy = -top;
                root.css({
                    right: right - fx,
                    top: top + fy
                });
            });
        });
    },
    '@{drawIcons}'(flattened) {
        let $ = this['@{getDL}']();
        for (let i = flattened.length - 1; i >= 0; i--) {
            let f = flattened[i];
            let root = $('#' + f.id);
            if (root)
                root.removeClass('@ui.css:icon-bad').removeClass('@ui.css:icon-alter').addClass('@ui.css:icon');
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '@{getNode}'(node) {
        let $ = this['@{getDL}']();
        return $(node);
    },
    '@{hookViewShare}'(cb) {
        let magix = this['@{getMod}']('magix');
        if (magix && magix.View && magix.View.prototype.share) {
            let old = magix.View.prototype.share;
            magix.View.prototype.share = function () {
                old.apply(this, arguments);
                cb();
            };
        }
    }
};