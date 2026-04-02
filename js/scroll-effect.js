'use strict';
(function () {
    var targets = [
        '.sec-head', '.sec-h', '.sec-p', '.about-h', '.footer-h',
        '.exp-card', '.exp-accordion', '.exp-two-col',
        '.award-cat', '.award', '.award-img',
        '.design-item',
        '.ip-item', '.press-item', '.press-block', '.press-feat',
        '.edu-card',
        '.about-combined', '.bball-row', '.bball-img', '.comp',
        '.f-link', '.f-bottom',
        '.vid-item',
        '.dg-strip-wrap'
    ];

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll(targets.join(',')).forEach(function (el) {
        el.classList.add('fade-up');
        observer.observe(el);
    });
})();
