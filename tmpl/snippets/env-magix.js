//#snippet;
//#exclude(loader)
MagixEnv['@{getMod}'] = (key) => {
    if (key == 'magix') {
        return W.Magix;
    }
};
MagixEnv['@{getDL}'] = () => {
    return W.$ || W.jQuery || W.Zepto;
};

MagixEnv['@{getRootId}'] = () => {
    return Magix.config('rootId');
};
MagixEnv['@{getVOM}'] = () => {
    return Magix.VOM || Magix.Vframe;
};
MagixEnv['@{getMangerMods}'] = () => {
    return [];
};
MagixEnv['@{getMixinId}'] = mixins => {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};
MagixEnv['@{isReady}'] = () => {
    return true;
};