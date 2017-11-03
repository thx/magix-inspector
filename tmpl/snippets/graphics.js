//#snippet;
//#exclude(loader)
let Graphics = {
    '@{captureItmes}'() {
        let g = Graphics;
        g.list = [];
        delete g['@{view.last}'];
        UI['@{onMousemove}'] = e => {
            let loop, one, dis;
            if (g['@{view.last}']) {
                one = g['@{view.last}'];
                dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                if (dis > one.radius) {
                    g['@{onHoverItem}']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['@{view.last}'];
                    loop = true;
                }
            } else {
                loop = true;
            }
            if (loop) {
                for (let i = g.list.length - 1; i >= 0; i--) {
                    one = g.list[i];
                    dis = Math.pow(Math.pow(one.center.x - e.x, 2) + Math.pow(one.center.y - e.y, 2), 1 / 2);
                    if (dis <= one.radius) {
                        if (g['@{view.last}'] != one) {
                            g['@{view.last}'] = one;
                            g['@{onHoverItem}']({
                                item: one,
                                action: 'enter'
                            });
                        }
                        break;
                    }
                }
            }
        };
        UI['@{onCanvasClick}'] = g['@{onClickItem}'];
    },
    '@{captureManagerItmes}'() {
        let g = Graphics;
        g.managerList = [];
        delete g['@{manager.last}'];

        UI['@{onManagerMousemove}'] = e => {
            let loop, one, rect;
            if (g['@{manager.last}']) {
                one = g['@{manager.last}'];
                rect = one.rect;
                if (e.x < rect[0] || e.y < rect[1] || e.x > (rect[0] + rect[2]) || e.y > (rect[1] + rect[3])) {
                    g['@{onHoverManagerItem}']({
                        item: one,
                        action: 'leave'
                    });
                    delete g['@{manager.last}'];
                    loop = true;
                }
            } else {
                loop = true;
            }
            if (loop) {
                for (let i = g.managerList.length - 1; i >= 0; i--) {
                    one = g.managerList[i];
                    rect = one.rect;
                    if (e.x >= rect[0] && e.y >= rect[1] && e.x <= (rect[0] + rect[2]) && e.y <= (rect[1] + rect[3])) {
                        if (g['@{manager.last}'] != one) {
                            g['@{manager.last}'] = one;
                            g['@{onHoverManagerItem}']({
                                item: one,
                                action: 'enter'
                            });
                        }
                    }
                }
            }
        };
    },
    '@{getBestParams}'(tree, width, height) {
        let maxChildren = 0,
            deep = 0,
            deepMap = {};
        let walk = (item, level) => {
            item.deep = level;
            if (level > deep) {
                deep = level;
            }
            if (!deepMap[level]) {
                deepMap[level] = 0;
            }
            item.leftCount = deepMap[level];
            deepMap[level]++;
            if (deepMap[level] > maxChildren) {
                maxChildren = deepMap[level];
            }
            for (let i = 0, one; i < item.children.length; i++) {
                one = item.children[i];
                walk(item.children[i], item.deep + 1);
            }
        };
        tree.deepMap = deepMap;
        walk(tree, 1, 0);
        maxChildren = Math.max(maxChildren, tree.isolated.length + 1);
        let hRadius = width / maxChildren - Consts['@{circleMargin}'];
        let vRadius = height / deep - Consts['@{circleMargin}'];
        let tw = width;
        let dMinRadius = 2 * Consts['@{minCircleRadius}'];
        if (hRadius < dMinRadius) {
            hRadius = dMinRadius;
            tw = dMinRadius * maxChildren + (maxChildren + 1) * Consts['@{circleMargin}'];
            if (tw > 30000) {
                tw = 30000;
            }
            UI['@{updateVOMCanvansWidth}'](tw);
        } else {
            UI['@{updateVOMCanvansWidth}'](tw);
        }
        let radius = Math.floor(Math.min(vRadius, hRadius) / 2);
        let band = (radius / 20).toFixed(1);
        return {
            width: tw,
            margin: Consts['@{circleMargin}'],
            radius: radius,
            band: band
        };
    },
    '@{drawTree}'(tree, active) {
        if (tree.id) {
            let width = Consts['@{width}'],
                height = Consts['@{canvasHeight}'],
                g = Graphics;
            g['@{captureItmes}']();
            let params = g['@{getBestParams}'](tree, width, height);
            width = params.width;
            let ctx = getNode('@{mx_view_canvas}').getContext('2d');
            ctx.clearRect(0, 0, width, height);
            let max = params.radius * 2 - 2 * (params.band + 1) - 1;
            if (!g['@{text.cache}']) g['@{text.cache}'] = {};
            let getWidth = text => {
                if (!g['@{text.cache}'][text]) {
                    ctx.font = 'normal 12px Arial';
                    g['@{text.cache}'][text] = ctx.measureText(text).width;
                }
                return g['@{text.cache}'][text];
            };
            let cutText = text => {
                let len = 1,
                    width = 0;
                while (len <= text.length) {
                    width += getWidth(text.substring(len - 1, len));
                    if (width < max) {
                        len += 1;
                    } else {
                        return text.substring(0, len - 3) + '..';
                    }
                }
                return text;
            };
            let linecolorIndex = 0;
            let drawLine = (item, pos, ppos, lineColor) => {
                if (ppos) {
                    ctx.beginPath();
                    let deg = Math.atan((pos.y - ppos.y) / (pos.x - ppos.x)) * 180 / Math.PI;
                    if (deg < 0) {
                        deg += 180;
                    }
                    let tx = Math.round(ppos.x + params.radius * Math.cos(deg * Math.PI / 180));
                    let ty = Math.round(ppos.y + params.radius * Math.sin(deg * Math.PI / 180));
                    ctx.moveTo(tx, ty); // 设置路径起点，坐标为(20,20)
                    ctx.lineTo(pos.x, pos.y); // 绘制一条到(200,20)的直线
                    ctx.lineWidth = params.band / 1.5; // 设置线宽
                    ctx.strokeStyle = lineColor;
                    ctx.stroke(); // 进行线的着色，这时整条线才变得可见
                }
                let count = tree.deepMap[item.deep + 1];
                if (count) {
                    let space = (width - (count * params.radius * 2 + (count - 1) * params.margin)) / 2;
                    let lcolor = '#' + Lines[linecolorIndex++ % Lines.length]; // Lines[Math.floor(Math.random() * (Lines.length - 1))];
                    for (let i = 0, one; i < item.children.length; i++) {
                        one = item.children[i];
                        drawLine(one, {
                            x: space + one.leftCount * (params.radius * 2 + params.margin) + params.radius,
                            y: pos.y + params.margin + 2 * params.radius
                        }, pos, lcolor);
                    }
                }
            };
            let drawCircle = (item, pos) => {
                ctx.moveTo(pos.x, pos.y);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, params.radius, 0, Math.PI * 2, true);
                ctx.fillStyle = item.status;
                if (item.id == active) {
                    if (item.flag) {
                        ctx.fillStyle = Status['@{active}'];
                    } else {
                        ctx.fillStyle = item.status;
                    }
                    item.flag = !item.flag;
                }
                ctx.fill();

                //bottom small cicle
                let radius = Math.max(0.5, params.radius / 10);
                let ly = pos.y + params.radius / 2;
                let lx = pos.x - params.radius / 2 + radius;
                //left
                if (item.event) {
                    ctx.beginPath();
                    ctx.arc(lx, ly, radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.event;
                    ctx.fill();
                }
                //center
                if (item.location) {
                    ctx.beginPath();
                    ctx.arc(pos.x, ly + radius, radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.location;
                    ctx.fill();
                }
                // center left top
                if (item.mixins) {
                    let x1 = lx,
                        y1 = ly,
                        x2 = pos.x,
                        y2 = ly + radius;
                    let x3 = (x1 + x2 + Math.sqrt(3) * (y2 - y1)) / 2 - (x2 - x1) / 10;
                    let y3 = (y1 + y2 - Math.sqrt(3) * (x2 - x1)) / 2 + (x2 - x1) / 3;
                    ctx.beginPath();
                    ctx.arc(x3, y3, radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.mixins;
                    ctx.fill();
                }
                //right
                if (item.shared) {
                    let rx = pos.x + params.radius / 2 - radius;
                    ctx.beginPath();
                    ctx.arc(rx, ly, radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.shared;
                    ctx.fill();
                }
                // center right top
                if (item.state) {
                    let x1 = pos.x,
                        y1 = ly + radius,
                        x2 = pos.x + params.radius / 2 - radius,
                        y2 = ly;
                    let x3 = (x1 + x2 + Math.sqrt(3) * (y2 - y1)) / 2 + (x2 - x1) / 10;
                    let y3 = (y1 + y2 - Math.sqrt(3) * (x2 - x1)) / 2 + (x2 - x1) / 3;
                    ctx.beginPath();
                    ctx.arc(x3, y3, radius, 0, Math.PI * 2, true);
                    ctx.fillStyle = item.state;
                    ctx.fill();
                }
                if (item.inline) {
                    ctx.beginPath();
                    let r = params.radius - params.band - 1;
                    let d60 = -2 * Math.PI / 360 * 60;
                    let d120 = -2 * Math.PI / 360 * 120;
                    let x1 = pos.x + r * Math.cos(d60);
                    let y1 = pos.y + r * Math.sin(d60);

                    let x2 = pos.x + r * Math.cos(d120);
                    let y2 = pos.y + r * Math.sin(d120);
                    ctx.moveTo(x1, y1);
                    ctx.quadraticCurveTo(pos.x, pos.y - r / 2, x2, y2);
                    ctx.moveTo(x1, y1);
                    ctx.quadraticCurveTo(pos.x, pos.y - params.radius - params.band, x2, y2);
                    ctx.fillStyle = '#fff';
                    ctx.fill();
                }

                ctx.moveTo(pos.x, pos.y);
                ctx.beginPath();

                //white slot
                ctx.arc(pos.x, pos.y, params.radius - params.band - 1, 0, Math.PI * 2, true);
                ctx.lineWidth = params.band;
                ctx.strokeStyle = '#fff';
                ctx.stroke();

                g.list.push({
                    id: item.id,
                    center: pos,
                    il: item.il,
                    radius: params.radius
                });
                //text
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.font = 'normal 12px Arial';
                ctx.fillStyle = '#eee';
                let id = cutText(item.id);
                let textWidth = Math.round(ctx.measureText(id).width);
                let left = (2 * params.radius - textWidth) / 2;
                ctx.fillText(id, pos.x + left - params.radius, pos.y + 4);
                let count = tree.deepMap[item.deep + 1];
                if (count) {
                    let space = (width - (count * params.radius * 2 + (count - 1) * params.margin)) / 2;
                    for (let i = 0, one; i < item.children.length; i++) {
                        one = item.children[i];
                        drawCircle(one, {
                            x: space + one.leftCount * (params.radius * 2 + params.margin) + params.radius,
                            y: pos.y + params.margin + 2 * params.radius
                        });
                    }
                }
            };
            let temp = tree.isolated;
            let space = width / 2;
            if (temp.length) {
                space = (width - (temp.length + 1) * params.radius * 2 + temp.length * params.margin) / 2;
                for (let i = 0; i < temp.length; i++) {
                    drawCircle(temp[i], {
                        x: space + (i + 1) * (params.radius * 2 + params.margin) + params.radius,
                        y: params.margin + params.radius
                    });
                }
                space += params.radius;
            }
            drawLine(tree, {
                x: space,
                y: params.margin + params.radius
            });
            drawCircle(tree, {
                x: space,
                y: params.margin + params.radius
            });
            UI['@{showTotal}'](tree, params);
        }
    },
    '@{drawManagerTree}'(tree) {
        let gs = Graphics;
        gs['@{captureManagerItmes}']();
        let height = Consts['@{managerMargin}'] * (tree.rows + 1) + tree.rows * Consts['@{managerHeight}'] + (Consts['@{managerGroupSpace}'] + Consts['@{managerMargin}']) * tree.groups.length;
        UI['@{updateManagerCanvasHeight}'](height);
        let ctx = getNode('@{mx_manager_canvas}').getContext('2d');
        ctx.clearRect(0, 0, Consts['@{canvasWidth}'], height);
        let margin = Consts['@{managerMargin}'];
        let managerWidth = ((Consts['@{canvasWidth}'] - (1 + Consts['@{managerCols}']) * Consts['@{managerMargin}']) / Consts['@{managerCols}']) | 0;
        let oneWidth = (() => {
            ctx.font = 'normal 14px Arial';
            let width = ctx.measureText('M').width;
            return width;
        })();
        let drawRect = (ctx, rect, one, pname) => {
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1]);
            ctx.fillStyle = one.color;
            ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
            //text
            ctx.beginPath();
            ctx.moveTo(rect[0], rect[1] + 10);
            ctx.font = 'normal 14px Arial';
            ctx.fillStyle = '#282828';
            let id = one.id,
                tail;
            while ((id.length - 3) * oneWidth > rect[2]) {
                id = id.slice(0, -1);
                tail = true;
            }
            if (tail) {
                id = id.slice(0, -3) + '...';
            }
            ctx.fillText(id, rect[0] + 5, rect[1] + 25);

            one.package = pname;
            one.rect = rect;
            gs.managerList.push(one);
        };
        let draw = groups => {
            /* mc-uncheck */
            for (let i = 0; i < groups.length; i++) {
                let g = groups[i];
                let left = Consts['@{managerMargin}'];
                let pad = false;
                ctx.beginPath();
                ctx.moveTo(left, margin);
                ctx.font = 'normal 14px Arial';
                ctx.fillStyle = '#282828';
                ctx.fillText(g.name, left + 5, margin + 25);
                margin += Consts['@{managerGroupSpace}'];
                let u, one;
                let max = Math.max(g.maxLeft, g.maxRight);
                let maps = {};
                let linecolorIndex = 0;
                let leftTopSpace = ((max - g.maxLeft) / 2) * (Consts['@{managerHeight}'] + Consts['@{managerMargin}']);
                let rightTopSpace = ((max - g.maxRight) / 2) * (Consts['@{managerHeight}'] + Consts['@{managerMargin}']);
                for (u = 0; u < max; u++) {
                    let lo = g.cleans.left[u];
                    let ro = g.cleans.right[u];
                    if (lo) {
                        drawRect(ctx, [
                                left,
                                margin + leftTopSpace,
                                150,
                                Consts['@{managerHeight}']
                            ], lo, g.name);
                        maps[lo.id] = lo;
                    }
                    if (ro) {
                        drawRect(ctx, [
                                Consts['@{canvasWidth}'] - Consts['@{managerMargin}'] - 150,
                                margin + rightTopSpace,
                                150,
                                Consts['@{managerHeight}']
                            ], ro, g.name);
                        maps[ro.id] = ro;
                        ro.lineColor = Lines[linecolorIndex++ % Lines.length];
                    }
                    margin += Consts['@{managerMargin}'] + Consts['@{managerHeight}'];
                }
                for (let p in maps) {
                    one = maps[p];
                    if (one.cleans) {
                        let beginPos = {
                            x: one.rect[0] + one.rect[2],
                            y: one.rect[1] + (one.rect[3] / 2 | 0)
                        };
                        let a = (one.cleans + '').split(',');
                        for (let x = a.length - 1; x >= 0; x--) {
                            let endOne = maps[a[x]];
                            let endPos = {
                                x: endOne.rect[0],
                                y: endOne.rect[1] + (endOne.rect[3] / 2 | 0)
                            };
                            ctx.beginPath();

                            ctx.moveTo(beginPos.x, beginPos.y); // 设置路径起点，坐标为(20,20)
                            ctx.lineTo(endPos.x, endPos.y); // 绘制一条到(200,20)的直线
                            ctx.lineWidth = 1.0; // 设置线宽
                            ctx.strokeStyle = '#' + (endOne.lineColor || '996699');
                            ctx.stroke();
                        }
                    }
                }
                for (u = 0; u < g.caches.length; u++) {
                    drawRect(ctx, [left, margin, managerWidth, Consts['@{managerHeight}']], g.caches[u], g.name);
                    if ((u + 1) % Consts['@{managerCols}'] === 0) {
                        left = Consts['@{managerMargin}'];
                        margin += Consts['@{managerMargin}'] + Consts['@{managerHeight}'];
                        pad = false;
                    } else {
                        left += managerWidth + Consts['@{managerMargin}'];
                        pad = true;
                    }
                }
                left = Consts['@{managerMargin}'];
                if (pad) {
                    margin += Consts['@{managerMargin}'] + Consts['@{managerHeight}'];
                }
                for (u = 0; u < g.items.length; u++) {
                    one = g.items[u];

                    drawRect(ctx, [left, margin, managerWidth, Consts['@{managerHeight}']], one, g.name);

                    if ((u + 1) % Consts['@{managerCols}'] === 0) {
                        left = Consts['@{managerMargin}'];
                        margin += Consts['@{managerMargin}'] + Consts['@{managerHeight}'];
                        pad = false;
                    } else {
                        left += managerWidth + Consts['@{managerMargin}'];
                        pad = true;
                    }
                }
                left = Consts['@{managerMargin}'];
                if (pad) {
                    margin += Consts['@{managerGroupSpace}'];
                }
            }
        };
        draw(tree.groups);
        UI['@{showManagerTotal}'](tree);
    },
    '@{onHoverItem}'(e) {
        let env = Inspector['@{getEnv}']();
        let vom = env['@{getVOM}']();
        if (e.action == 'enter') {
            Graphics['@{lastVOM}'] = vom.get(e.item.id);
            UI['@{showMoreInfo}'](vom.get(e.item.id), e.item);
        } else {
            Graphics['@{lastVOM}'] = null;
            UI['@{hideMoreInfo}']();
        }
    },
    '@{onHoverManagerItem}'(e) {
        if (e.action == 'enter') {
            UI['@{showManagerMoreInfo}'](e.item);
        } else {
            UI['@{hideManagerMoreInfo}']();
        }
    },
    '@{onClickItem}'(e) {
        var lastVOM = Graphics['@{lastVOM}'];
        if(!lastVOM) {
            return;
        }
        var path = (lastVOM.view && lastVOM.view.path) || lastVOM.path;
        if(!path) {
            return;
        }
        var base = (window.Site && window.Site.onlineHostname) || window.location.hostname;
        IdePort['@{connectAllPromise}'](base, path + '.js', path + '.html');
    }
};