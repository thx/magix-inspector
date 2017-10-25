//#snippet;
//#exclude(loader)
let Tracer = {
    '@{log}'(info, color) {
        let node = D.getElementById('mx_trancer');
        if (Tracer['@{idle}']) {
            let t = D.createElement('hr');
            t.className = '@ui.css:bar';
            node.insertBefore(t, node.firstChild);
            delete Tracer['@{idle}'];
        }
        let d = D.createElement('div');
        d.innerHTML = info;
        if (color) d.style.color = color;
        node.insertBefore(d, node.firstChild);
        if (node.getElementsByTagName('div').length > 200) {
            node.removeChild(node.lastChild);
            node.removeChild(node.lastChild);
        }
        clearTimeout(Tracer['@{tracer.timer}']);
        Tracer['@{tracer.timer}'] = setTimeout(() => {
            Tracer['@{idle}'] = true;
        }, 1500);
    }
};