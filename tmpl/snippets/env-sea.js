//#snippet;
//#exclude(loader)
SeajsEnv.getMod = key => {
    // try {
    //     let entity = seajs.require(key); //seajs有别名，优先使用内置的require获取
    //     if (entity)
    //         return entity;
    // } catch (e) {
    //     console.log(e);
    // }
    let mods = seajs.cache;
    let o = ModuleIdMap[key];
    if (!o) {
        for (let p in mods) {
            let mod = mods[p];
            if (mod.id === key) {
                return mod.exports;
            }
        }
    }
    if (!o && ModulesFeatures[key]) {
        let rules = ModulesFeatures[key];
        /* mc-uncheck */
        for (let p in mods) {
            let found = false;
            for (let i = rules.length - 1; i >= 0; i--) {
                let r = rules[i];
                let parts = r.split('.');
                let root = mods[p].exports;
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
SeajsEnv.getMangerMods = () => {
    let mods = seajs.cache;
    let result = [];
    for (let p in mods) {
        let v = mods[p];
        let exports = v.exports;
        if (exports && (exports.$m && exports.$s)) {
            result.push({
                name: v.id,
                exports: exports
            });
        }
    }
    return result;
};
SeajsEnv.getMixinId = mixins => {
    let mods = seajs.cache;
    let ids = [];
    for (let i = 0; i < mixins.length; i++) {
        let mixin = mixins[i];
        if (mixin) {
            if (mixin['\x1e']) {
                ids.push('<span style="color:#C71585">State.clean("' + mixin['\x1e'] + '")</span>');
            } else {
                for (let p in mods) {
                    let mod = mods[p];
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