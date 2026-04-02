'use strict';
document.addEventListener('DOMContentLoaded', function () {


    // ── PAGE TRANSITION ─────────────────────────────────────────────
    var heroH = document.querySelector('.hero .wrap');
    var pt = document.getElementById('pt');
    if (pt) {
        var cols = pt.querySelectorAll('.pt-c');
        cols.forEach(function (c, i) {
            c.style.transition = 'transform .5s ' + (i * .07) + 's cubic-bezier(.65,0,.35,1)';
        });
        setTimeout(function () {
            cols.forEach(function (c) { c.style.transform = 'scaleY(0)'; });
            if (heroH) heroH.classList.add('hero-animate');
            setTimeout(function () { pt.remove(); }, 800);
        }, 200);
    } else {
        if (heroH) heroH.classList.add('hero-animate');
    }

    // ── MOBILE MENU ─────────────────────────────────────────────────
    document.addEventListener('click', function (e) {
        var t = e.target.closest('.js-menu-toggle');
        if (!t) return;
        e.preventDefault();
        document.body.classList.toggle('offcanvas-menu');
    });

    // ── SMOOTH SCROLL ───────────────────────────────────────────────
    document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var h = a.getAttribute('href');
        if (!h || h === '#') return;
        var el = document.querySelector(h);
        if (!el) return;
        e.preventDefault();
        document.body.classList.remove('offcanvas-menu');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', h);
    });
});
