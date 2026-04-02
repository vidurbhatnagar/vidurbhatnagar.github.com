'use strict';
(function () {
    if (matchMedia('(pointer: coarse)').matches) return;

    // Pre-render basketball emoji to an offscreen canvas
    var size = 18;
    var emojiCanvas = document.createElement('canvas');
    emojiCanvas.width = size * 2;
    emojiCanvas.height = size * 2;
    var emojiCtx = emojiCanvas.getContext('2d');
    emojiCtx.font = size + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    emojiCtx.textAlign = 'center';
    emojiCtx.textBaseline = 'middle';
    emojiCtx.fillText('\uD83C\uDFC0', size, size);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    document.body.classList.add('cursor-trail-active');

    var dpr = window.devicePixelRatio || 1;
    var w, h;
    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    var N = 20;
    var points = [];
    for (var i = 0; i < N; i++) points.push({ x: -100, y: -100 });

    var moving = 0; // fades from 1 to 0 when cursor stops

    document.addEventListener('mousemove', function (e) {
        points[0].x = e.clientX;
        points[0].y = e.clientY;
        moving = 1;
    });

    function draw() {
        for (var i = 1; i < N; i++) {
            var ease = 0.35;
            points[i].x += (points[i - 1].x - points[i].x) * ease;
            points[i].y += (points[i - 1].y - points[i].y) * ease;
        }

        // Fade out trail when at rest
        moving = Math.max(0, moving - 0.03);

        ctx.clearRect(0, 0, w, h);

        // Only draw trail when moving
        if (moving > 0.01) {
            for (var i = 1; i < N; i++) {
                var t = 1 - i / N;
                var r = t * 5 + 0.5;
                var a = t * 0.65 * moving;

                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, r + 6, 0, 6.2832);
                ctx.fillStyle = 'rgba(255,113,32,' + (a * 0.12) + ')';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, r, 0, 6.2832);
                ctx.fillStyle = 'rgba(255,113,32,' + a + ')';
                ctx.fill();
            }
        }

        // Basketball cursor at head (draw full offscreen canvas centered on cursor)
        ctx.drawImage(emojiCanvas, points[0].x - size, points[0].y - size, size * 2, size * 2);

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();
