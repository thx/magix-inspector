//#snippet;
//#exclude(loader)
let Drag = {
    '@{get}'($, off, isFn) {
        let Win = $(W);
        let Doc = $(D);
        let ClearSelection = t => {
            if ((t = W.getSelection)) {
                t().removeAllRanges();
            } else if ((t = D.selection)) {
                if (t.empty) t.empty();
                else t = null;
            }
        };
        let DragObject;
        let DragPrevent = e => {
            e.preventDefault();
        };
        let DragMove = event => {
            if (DragObject.iMove) {
                DragObject.move(event);
            }
        };
        let DragMoveEvent = 'mousemove touchmove';
        let DragEndEvent = 'mouseup touchend';
        let DragPreventEvent = 'keydown mousewheel DOMMouseScroll';
        let DragStop = e => {
            if (DragObject) {
                Doc[off](DragMoveEvent, DragMove)[off](DragEndEvent, DragStop)[off](DragPreventEvent, DragPrevent);
                Win[off]('blur', DragStop);
                let node = DragObject.node;
                $(node)[off]('losecapture', DragStop);
                if (node.setCapture) node.releaseCapture();
                if (DragObject.iStop) {
                    DragObject.stop(e);
                }
                DragObject = null;
            }
        };
        return {
            '@{begin}'(node, moveCallback, endCallback) {
                DragStop();
                if (node) {
                    ClearSelection();
                    if (node.setCapture) {
                        node.setCapture();
                    }
                    DragObject = {
                        move: moveCallback,
                        stop: endCallback,
                        node: node,
                        iMove: isFn(moveCallback),
                        iStop: isFn(endCallback)
                    };
                    Doc.on(DragMoveEvent, DragMove)
                        .on(DragEndEvent, DragStop)
                        .on(DragPreventEvent, DragPrevent);
                    Win.on('blur', DragStop);
                    $(node).on('losecapture', DragStop);
                }
            },
            '@{clear}': ClearSelection
        };
    }
};