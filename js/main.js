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

    // ── SHOW MORE / LESS (achievements, press lists) ────────────────
    document.querySelectorAll('.collapse-toggle').forEach(function (btn) {
        var region = document.getElementById(btn.getAttribute('data-target'));
        if (!region) return;
        btn.addEventListener('click', function () {
            var open = region.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.firstChild.textContent = open ? btn.getAttribute('data-less') : btn.getAttribute('data-more');
        });
    });

    // ── SCROLL-SPY NAV ──────────────────────────────────────────────
    var navLinks = document.querySelectorAll('.nav-center a');
    if (navLinks.length && 'IntersectionObserver' in window) {
        var linkFor = {};
        var targets = [];
        navLinks.forEach(function (a) {
            var id = a.getAttribute('href').slice(1);
            var sec = document.getElementById(id);
            if (sec) { linkFor[id] = a; targets.push(sec); }
        });
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                navLinks.forEach(function (a) { a.classList.remove('nav-active'); });
                var active = linkFor[en.target.id];
                if (active) active.classList.add('nav-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        targets.forEach(function (t) { spy.observe(t); });
    }

});
