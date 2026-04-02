'use strict';
(function () {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:0.06';
    document.body.appendChild(overlay);

    var size = 128;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    var img = ctx.createImageData(size, size);
    var d = img.data;

    for (var i = 0; i < d.length; i += 4) {
        var v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
    }

    ctx.putImageData(img, 0, 0);
    overlay.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
    overlay.style.backgroundRepeat = 'repeat';
})();
