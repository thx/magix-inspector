//#snippet;
//#exclude(loader)
let S = window.KISSY;
let KISSYEnv = {
    '@{prepare}'() {
        S.use('node');
    },
    '@{getRootId}'() {
        let old = S.Env.mods['magix/magix'];
        let magix;
        if (old) {
            magix = S.require('magix/magix');
        } else {
            magix = S.require('magix');
        }
        return magix.config('rootId');
    },
    '@{getVOM}'() {
        let old = S.Env.mods['magix/magix'];
        if (old) {
            return S.require('magix/vom');
        }
        let magix = S.require('magix');
        return magix.VOM || magix.Vframe;
    },
    '@{getMangerMods}'() {
        let mods = S.Env.mods;
        let result = [];
        for (let p in mods) {
            let v = mods[p].exports || mods[p].value;
            if (v && ((v.$mMetas && v.$mCache) || (v.$mm && v.$mc) || (v.$m && v.$c))) {
                result.push({
                    name: mods[p].name,
                    exports: v
                });
            }
        }
        return result;
    },
    '@{isReady}'() {
        let magix = S.Env.mods['magix/magix'];
        let node = S.Env.mods.node;
        if (magix) {
            let vom = S.Env.mods['magix/vom'];
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
    '@{updateDOMStyle}'(style, id) {
        let node = S.require('node').one('#' + id);
        if (!node) return;
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
    '@{getDOMOffset}'(id) {
        let node = S.require('node');
        return node.one('#' + id).offset();
    },
    '@{bind}'(id, type, fn) {
        let node = S.require('node');
        if (S.isString(id)) id = '#' + id;
        return node.one(id).on(type, fn);
    },
    '@{unbind}'(id, type, fn) {
        let node = S.require('node');
        if (S.isString(id)) id = '#' + id;
        return node.one(id).detach(type, fn);
    },
    '@{getMixinId}'(mixins) {
        let mods = S.Env.mods;
        let ids = [];
        for (let i = 0; i < mixins.length; i++) {
            let mixin = mixins[i];
            if (mixin) {
                if (mixin['\x1e']) {
                    ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
                } else {
                    for (let p in mods) {
                        let mod = mods[p];
                        let v = mod.exports || mod.value;
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
    '@{getResType}'(r) {
        let type = '';
        let e = r.res || r.e;
        if (e) {
            if (e.all && e.constructor && e.constructor.cached) {
                type = 'Magix.Service';
            } else if (e.fetchAll || (e.all && e.one && e.next && e.then)) {
                type = 'Model Manager';
            } else if (e.bricks) {
                type = 'Pagelet';
            } else if (e.__attrs && e.__attrVals && e.constructor) {
                let mods = S.Env.mods,
                    found;
                for (let p in mods) {
                    let info = mods[p];
                    let v = info.value || info.exports;
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
    '@{hookAttachMod}'(callback) {
        let old = S.Loader.Utils.attachMod;
        S.Loader.Utils.attachMod = () => {
            old.apply(S.Loader.Utils, arguments);
            callback();
        };
    },
    '@{dragIt}'(node, handle) {
        let root = S.one(node);
        let dd = Drag['@{get}'](S.one, 'detach', S.isFunction);
        S.one(handle).on('mousedown', e => {
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
        for (let i = flattened.length - 1; i >= 0; i--) {
            let f = flattened[i];
            let root = S.one('#' + f.id);
            if (root) {
                root.removeClass('@ui.css:icon-bad').removeClass('@ui.css:icon-alter').addClass('@ui.css:icon');
            }
            if (f.cls && root) {
                root.addClass(IconsMap[f.cls]);
            }
        }
    },
    '@{getNode}'(node) {
        return S.one(node);
    },
    '@{hookViewShare}'(cb) {
        let magix = S.Env.mods.magix;
        if (magix) {
            magix = S.require('magix');
            if (magix && magix.View && magix.View.prototype.share) {
                let old = magix.View.prototype.share;
                magix.View.prototype.share = function() {
                    old.apply(this, arguments);
                    cb();
                };
            }
        }
    }
};