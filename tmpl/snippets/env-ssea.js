//#snippet;
//#exclude(loader)
SeajsSEnv.getMod = key => {
    var o;
    try {
        o = require(key);
    } catch (e) {}
    if (!o) {
        window.console.warn('seajs standalone模式下无法找到模块：' + key + '，也无法智能探测。如需更多帮助信息请钉钉联系：行列');
    }
    return o;
};
SeajsSEnv.getMangerMods = () => {
    return [];
};
SeajsSEnv.getMixinId = mixins => {
    return new Array(mixins.length + 2).join('unknown').slice(1);
};