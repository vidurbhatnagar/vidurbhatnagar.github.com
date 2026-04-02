'use strict';
(function () {
    var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var FLIP_DURATION = 70;
    var STAGGER = 50;

    function createFlipChar(ch) {
        var el = document.createElement('span');
        el.className = 'flip-char flip-char--hero';

        var top = document.createElement('div');
        top.className = 'flip-top';
        var topSpan = document.createElement('span');
        topSpan.textContent = ' ';
        top.appendChild(topSpan);

        var bottom = document.createElement('div');
        bottom.className = 'flip-bottom';
        var bottomSpan = document.createElement('span');
        bottomSpan.textContent = ' ';
        bottom.appendChild(bottomSpan);

        el.appendChild(top);
        el.appendChild(bottom);

        el._topSpan = topSpan;
        el._bottomSpan = bottomSpan;
        el._current = ' ';
        el._flipping = false;
        return el;
    }

    function flipTo(el, target) {
        if (el._flipping) return;
        el._flipping = true;
        var steps = 4 + Math.floor(Math.random() * 5);
        var count = 0;

        function doFlip(ch) {
            var card = document.createElement('div');
            card.className = 'flip-card';
            var span = document.createElement('span');
            span.textContent = el._current;
            card.appendChild(span);
            el.appendChild(card);

            el._topSpan.textContent = ch;
            el._bottomSpan.textContent = ch;
            el._current = ch;

            card.style.transition = 'transform ' + FLIP_DURATION + 'ms ease-in';
            requestAnimationFrame(function () {
                card.style.transform = 'rotateX(-90deg)';
            });

            setTimeout(function () {
                if (card.parentNode) card.parentNode.removeChild(card);
            }, FLIP_DURATION + 10);
        }

        function step() {
            count++;
            if (count <= steps) {
                doFlip(ALPHA[Math.floor(Math.random() * ALPHA.length)]);
                setTimeout(step, FLIP_DURATION);
            } else {
                doFlip(target);
                setTimeout(function () {
                    el._flipping = false;
                }, FLIP_DURATION);
            }
        }

        step();
    }

    // ── Hero name only ──────────────────────────────────────────────
    var heroH = document.getElementById('hero-h');
    if (!heroH) return;

    var allChars = [];
    var charMap = new Map();
    var lines = heroH.querySelectorAll('.h-inner');

    lines.forEach(function (lineEl) {
        var text = lineEl.textContent.trim();
        lineEl.textContent = '';
        lineEl.style.display = 'flex';
        lineEl.style.gap = '0';

        text.split('').forEach(function (ch) {
            if (ch === ' ') {
                var spacer = document.createElement('span');
                spacer.className = 'flip-spacer';
                lineEl.appendChild(spacer);
            } else {
                var flipEl = createFlipChar(ch);
                lineEl.appendChild(flipEl);
                var item = { el: flipEl, ch: ch };
                allChars.push(item);
                charMap.set(flipEl, item);
            }
        });
    });

    // Initial flip after page transition
    setTimeout(function () {
        allChars.forEach(function (item, i) {
            setTimeout(function () {
                flipTo(item.el, item.ch);
            }, i * STAGGER);
        });
    }, 1000);

    // ── Hover via mousemove + elementFromPoint ──
    var lastHovered = null;
    document.addEventListener('mousemove', function (e) {
        var canvases = document.querySelectorAll('canvas');
        canvases.forEach(function (c) { c.style.display = 'none'; });
        var target = document.elementFromPoint(e.clientX, e.clientY);
        canvases.forEach(function (c) { c.style.display = ''; });

        var flipEl = target;
        while (flipEl && !flipEl.classList.contains('flip-char')) {
            flipEl = flipEl.parentElement;
        }

        if (flipEl && flipEl !== lastHovered) {
            lastHovered = flipEl;
            var item = charMap.get(flipEl);
            if (item) flipTo(item.el, item.ch);
        } else if (!flipEl) {
            lastHovered = null;
        }
    });
})();
