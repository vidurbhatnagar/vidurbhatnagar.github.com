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
    var touchX = null, touchY = null, justSwiped = false;
    var SWIPE_MIN = 40; // px of horizontal travel to count as a swipe

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
        if (justSwiped) { justSwiped = false; return; }
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('dg-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });

    // ── Touch swipe (mobile has no keyboard) ────────────────────────
    lightbox.addEventListener('touchstart', function (e) {
        touchX = e.changedTouches[0].clientX;
        touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        var dy = e.changedTouches[0].clientY - touchY;
        if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
            show(current + (dx < 0 ? 1 : -1));
            justSwiped = true; // suppress the synthesized backdrop click that would close
        }
        touchX = touchY = null;
    }, { passive: true });

    function close() {
        lightbox.classList.remove('dg-open');
    }
})();
