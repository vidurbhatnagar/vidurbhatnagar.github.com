jQuery(document).ready(function($) {
    "use strict";

    $(".site-wrap").removeClass("d-none");
    $(".loadScreen").fadeOut("fast");

    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
    });

    var siteMenuClone = function() {
        $('body').on('click', '.js-menu-toggle', function(e) {
            e.preventDefault();

            var $this = $(this);

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        })

        // click outisde offcanvas
        $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    }();

    // navigation
    var OnePageNavigation = function() {
        var navToggler = $('.site-menu-toggle');
        $("body").on("click", ".btn[href^='#'], .main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-nav-wrap li a", function(e) {
            e.preventDefault();

            var hash = this.hash;
            var scrollTo = $(hash).offset().top - 100;

            $('html, body').animate({
                'scrollTop': scrollTo
            }, 600, 'easeInOutCirc', function() {
                window.location.hash = hash;
            });

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
            }
        });
    }();

    //Sections
    var onSectionClick = function() {
        // Load everything once for bots to crawl
        $("#experience-content").load("experience.html");
        $("#awards-content").load("awards.html");
        $("#press-content").load("press.html");
        $("#academics-content").load("academics.html");
        $("#ip-content").load("ip.html");
        $("#design-content").load("design.html");

        // Clear the content and load everything again for animations to work as expected
        $("#experience-section").on("click", function() {
            // Clicked to open, hence !open right now
            if (!$("#experience-section").parent()[0].open) {
                $("#experience-content")[0].innerHTML = "";
                $("#experience-content").load("experience.html");
            }
        });
        $("#awards-section").on("click", function() {
            if (!$("#awards-section").parent()[0].open) {
                $("#awards-content")[0].innerHTML = "";
                $("#awards-content").load("awards.html");
            }
        });
        $("#press-section").on("click", function() {
            if (!$("#press-section").parent()[0].open) {
                $("#press-content")[0].innerHTML = "";
                $("#press-content").load("press.html");
            }
        });
        $("#academics-section").on("click", function() {
            if (!$("#academics-section").parent()[0].open) {
                $("#academics-content")[0].innerHTML = "";
                $("#academics-content").load("academics.html");
            }
        });
        $("#ip-section").on("click", function() {
            if (!$("#ip-section").parent()[0].open) {
                $("#ip-content")[0].innerHTML = "";
                $("#ip-content").load("ip.html");
            }
        });
        $("#design-section").on("click", function() {
            if (!$("#design-section").parent()[0].open) {
                $("#design-content")[0].innerHTML = "";
                $("#design-content").load("design.html");
            }
        });
    }();

    var findOpenDetails = function() {
        var openDetails = false;
        $('details').each(function() {
            if (this.open) {
                openDetails = this;
            }
        });

        return openDetails;
    }

    var toggleSectionCloser = function() {
        if (findOpenDetails()) {
            $("#section-closer")[0].style.visibility = "visible";
        } else {
            $("#section-closer")[0].style.visibility = "hidden";
        }

        AOS.init();
    }

    var bindClicks = function() {
        $('details').click(function(event) {
            // This calculation keeps the scroll position as-is when content is removed from top
            var currentOffset = $(this).offset().top - $(document).scrollTop();

            // Close all sections but the one clicked
            $('details').not(this).removeAttr("open");

            $(document).scrollTop($(this).offset().top - currentOffset);

            // Show/Hide the section closer
            setTimeout(toggleSectionCloser, 25);
        });

        $('body').on('click', '#section-closer', function(e) {
            e.preventDefault();

            var openDetails = findOpenDetails();

            if (openDetails) {
                $(document).scrollTop($(openDetails).offset().top);
            }

            $('details').removeAttr("open");

            setTimeout(toggleSectionCloser, 25);
        });
    }();
});