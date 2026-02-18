'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // ── Loading screen ────────────────────────────────────────────────────
    var loadScreen = document.querySelector('.loadScreen');
    if (loadScreen) { loadScreen.remove(); }

    var siteWrap = document.querySelector('.site-wrap');
    if (siteWrap) { siteWrap.classList.remove('d-none'); }

    // ── AOS – Animate On Scroll (IntersectionObserver, fade-up only) ─────
    function initAOS() {
        var elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
        if (!elements.length) { return; }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) { return; }
                var el    = entry.target;
                var delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
                setTimeout(function () { el.classList.add('aos-animate'); }, delay);
                obs.unobserve(el);
            });
        }, { threshold: 0.1 });

        elements.forEach(function (el) { observer.observe(el); });
    }

    initAOS();

    // ── Mobile menu toggle ────────────────────────────────────────────────
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest('.js-menu-toggle');
        if (!toggle) { return; }
        e.preventDefault();
        document.body.classList.toggle('offcanvas-menu');
    });

    // Click outside mobile menu → close
    document.addEventListener('mouseup', function (e) {
        var menu = document.querySelector('.site-mobile-menu');
        if (menu && !menu.contains(e.target) && !e.target.closest('.js-menu-toggle')) {
            document.body.classList.remove('offcanvas-menu');
        }
    });

    // ── Smooth scroll for anchor links ───────────────────────────────────
    document.addEventListener('click', function (e) {
        var link = e.target.closest(
            'a.btn[href^="#"], .site-nav-wrap li a[href^="#"], .smoothscroll[href^="#"]'
        );
        if (!link) { return; }

        var hash = link.getAttribute('href');
        if (!hash || hash === '#') { return; }

        var target = document.querySelector(hash);
        if (!target) { return; }

        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
        window.location.hash = hash;
        document.body.classList.remove('offcanvas-menu');
    });

    // ── Dynamic section content loading ──────────────────────────────────
    function loadInto(selector, url, callback) {
        var el = document.querySelector(selector);
        if (!el) { return; }
        fetch(url)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                el.innerHTML = html;
                initAOS();
                if (callback) { callback(); }
            });
    }

    // Pre-load all sections on page init (for SEO / bots)
    loadInto('#experience-content', 'experience.html');
    loadInto('#awards-content',     'awards.html');
    loadInto('#press-content',      'press.html');
    loadInto('#academics-content',  'academics.html');
    loadInto('#ip-content',         'ip.html');
    loadInto('#design-content',     'design.html');

    // Reload on <details> open so AOS animations re-fire
    var sectionMap = {
        'experience-section': ['#experience-content', 'experience.html'],
        'awards-section':     ['#awards-content',     'awards.html'],
        'press-section':      ['#press-content',      'press.html'],
        'academics-section':  ['#academics-content',  'academics.html'],
        'ip-section':         ['#ip-content',         'ip.html'],
        'design-section':     ['#design-content',     'design.html']
    };

    Object.keys(sectionMap).forEach(function (id) {
        var summary = document.getElementById(id);
        if (!summary) { return; }
        summary.addEventListener('click', function () {
            var details = summary.closest('details');
            // details.open is still false at click time (toggle happens after)
            if (details && !details.open) {
                var info = sectionMap[id];
                var el   = document.querySelector(info[0]);
                if (el) {
                    el.innerHTML = '';
                    loadInto(info[0], info[1]);
                }
            }
        });
    });

    // ── Details accordion + section-closer ───────────────────────────────
    function findOpenDetails() {
        var all = document.querySelectorAll('details');
        for (var i = 0; i < all.length; i++) {
            if (all[i].open) { return all[i]; }
        }
        return null;
    }

    function toggleSectionCloser() {
        var closer = document.getElementById('section-closer');
        if (!closer) { return; }
        closer.style.visibility = findOpenDetails() ? 'visible' : 'hidden';
        initAOS();
    }

    // Accordion: close all siblings when a details is clicked
    document.addEventListener('click', function (e) {
        var details = e.target.closest('details');
        if (!details) { return; }

        // Position of element in viewport before DOM changes
        var viewportDist = details.getBoundingClientRect().top;

        // Close every other open details
        document.querySelectorAll('details').forEach(function (d) {
            if (d !== details) { d.removeAttribute('open'); }
        });

        // Restore scroll so the clicked details stays at the same viewport position
        var newAbsTop = details.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, newAbsTop - viewportDist);

        setTimeout(toggleSectionCloser, 25);
    });

    // Section-closer button: collapse all open details, scroll to the section
    document.addEventListener('click', function (e) {
        var closer = e.target.closest('#section-closer');
        if (!closer) { return; }
        e.preventDefault();

        var open = findOpenDetails();
        if (open) {
            var absTop = open.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: absTop, behavior: 'smooth' });
        }

        document.querySelectorAll('details').forEach(function (d) {
            d.removeAttribute('open');
        });

        setTimeout(toggleSectionCloser, 25);
    });

});
