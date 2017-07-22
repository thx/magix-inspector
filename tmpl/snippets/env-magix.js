//#snippet;
//#exclude(loader)
MagixEnv.getMod = (k => ey) {
    if (key == 'magix') {
        return window.Magix;
    }
};
MagixEnv.getDL = () => {
    return window.$ || window.jQuery;
};

MagixEnv.getRootId = () => {
    return Magix.config('rootId');
};
MagixEnv.getVOM = () => {
    return Magix.VOM || Magix.Vframe;
};
MagixEnv.getMangerMods = () => {
    return [];
};
MagixEnv.getMixinId = mixins => {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};
MagixEnv.isReady = () => {
    return true;
};