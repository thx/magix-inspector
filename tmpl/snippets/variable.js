//#snippet;
//#exclude(loader)
let Status = {
    '@{created}': '#008B00',
    '@{init}': '#FF3030',
    '@{alter}': '#BC8F8F',
    '@{isolated}': '#FF3030',
    '@{build}': '#9AC0CD',
    '@{destroy}': '#8B5F65',
    '@{remove}': '#EED5B7',
    '@{active}': '#94d694'
};
let Consts = {
    '@{width}': 550,
    '@{height}': 470,
    '@{canvasWidth}': 530,
    '@{canvasHeight}': 400,
    '@{moreInfoWidth}': 490,
    '@{titleHeight}': 34,
    '@{circleMargin}': 6,
    '@{minCircleRadius}': 15,
    '@{managerCols}': 5,
    '@{managerMargin}': 5,
    '@{managerHeight}': 40,
    '@{managerGroupSpace}': 40,
    '@{gradualStartColor}': {
        r: 0,
        g: 153,
        b: 102
    },
    '@{gradualEndColor}': {
        r: 255,
        g: 255,
        b: 0
    },
    '@{eventsCommonCount}': 15,
    '@{sharedCount}': 5,
    '@{locationCount}': 12,
    '@{mixinsCount}': 5,
    '@{stateCount}': 12
};
let Lines = [
        'FFC125',
        'C71585',
        'CDBA96',
        'FF7F00',
        'BA55D3',
        '8B4726',
        '7CFC00',
        '4A4A4A',
        'EE7AE9'
    ];
let ManagerColors = {
    '@{cache}': '#CC9966',
    '@{cleaned}': '#99CCCC',
    '@{cleans}': '#FF9999',
    '@{normal}': '#CCCC99'
};
let ApplyStyle = (x, h) => {
    let i = document.createElement('style');
    document.documentElement.appendChild(i);
    if (i.styleSheet) {
        i.styleSheet.cssText = h;
    } else {
        i.appendChild(document.createTextNode(h));
    }
};
let IconsMap = {
    alter: '@ui.css:icon-alter',
    bad: '@ui.css:icon-bad'
};