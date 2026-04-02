'use strict';
(function () {
    var lightbox = document.getElementById('dg-lightbox');
    var fullImg = document.getElementById('dg-full');
    var counter = document.getElementById('dg-counter');
    if (!lightbox) return;

    // Collect unique image sources in order
    var srcs = [
        'images/Design_10.gif', 'images/Design_11.png', 'images/Design_4.png',
        'images/Design_3.png', 'images/Design_5.png', 'images/Design_6.png',
        'images/Design_1.png', 'images/Design_8.png', 'images/Design_2.png',
        'images/Design_7.png', 'images/Design_9.png'
    ];
    var current = 0;
    var total = srcs.length;

    // ── Lightbox open ───────────────────────────────────────────────
    document.querySelectorAll('.dg-thumb').forEach(function (t) {
        t.addEventListener('click', function () {
            current = parseInt(t.getAttribute('data-i'));
            show(current);
            lightbox.classList.add('dg-open');
        });
    });

    function show(i) {
        current = (i + total) % total;
        fullImg.src = srcs[current];
        counter.textContent = (current + 1) + ' / ' + total;
    }

    // ── Lightbox controls ───────────────────────────────────────────
    lightbox.querySelector('.dg-close').addEventListener('click', close);
    lightbox.querySelector('.dg-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.dg-next').addEventListener('click', function () { show(current + 1); });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('dg-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });

    function close() {
        lightbox.classList.remove('dg-open');
    }
})();
