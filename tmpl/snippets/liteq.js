//#snippet;
//#exclude(loader)

let type = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
};
let Query = function (selector) {
    let doms = type(selector) === 'array' ? selector : [selector];
    if (type(selector) == 'string') {
        doms = document.querySelectorAll(selector);
    }
    this['@{doms}'] = doms;
};
Query.prototype = {
    off(type, fn) {
        let doms = this['@{doms}'];
        for (let d of doms) {
            let evts = type.split(/\s+/);
            for (let e of evts) {
                d.removeEventListener(e, fn);
            }
        }
        return this;
    },
    on(type, fn) {
        let doms = this['@{doms}'];
        for (let d of doms) {
            let evts = type.split(/\s+/);
            for (let e of evts) {
                d.addEventListener(e, fn, false);
            }
        }
        return this;
    },
    removeClass(name) {
        let doms = this['@{doms}'];
        for (let d of doms) {
            d.classList.remove(name);
        }
        return this;
    },
    addClass(name) {
        let doms = this['@{doms}'];
        for (let d of doms) {
            d.classList.add(name);
        }
        return this;
    },
    css(styles) {
        let doms = this['@{doms}'];
        if (type(styles) == 'string') {
            let dom = doms[0];
            if (dom) {
                let s = getComputedStyle(dom, null);
                s = s[styles];
                return s;
            }
            return null;
        }
        for (let d of doms) {
            for (let s in styles) {
                let v = styles[s];
                if (/^\d+$/.test(v)) {
                    v = v + 'px';
                }
                d.style[s] = v;
            }
        }
        return this;
    },
    offset() {
        let dom = this['@{doms}'][0];
        if (dom) {
            let rect = dom.getBoundingClientRect();
            return rect;
        }
        return null;
    },
    prev() {
        let dom = this['@{doms}'][0];
        if (dom) {
            while (dom.nodeType != 1) {
                dom = dom.previousSibling;
            }
            return dom;
        }
        return null;
    },
    height() {
        let dom = this['@{doms}'][0];
        if (dom) {
            return dom.clientHeight;
        }
        return 0;
    },
    width() {
        let dom = this['@{doms}'][0];
        if (dom) {
            return dom.clientWidth;
        }
        return 0;
    },
    children() {
        let dom = this['@{doms}'][0];
        if (dom) {
            return new Query(dom.children);
        }
        return 0;
    },
    parent() {
        let dom = this['@{doms}'][0];
        if (dom) {
            return dom.parentElement;
        }
        return 0;
    }
};
let LiteQ = function (selector) {
    return new Query(selector);
};
LiteQ.type = type;
LiteQ.isFunction = o => type(o) === 'function';