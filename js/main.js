(function ($) {
    "use strict";

    // 1. Hide Loader
    var hideLoader = function () {
        setTimeout(function () {
            var $loader = $('#loader');
            if ($loader.length > 0) {
                $loader.removeClass('show');
            }
        }, 120);
    };
    $(window).on('load', hideLoader);
    // Fallback safety timeout
    setTimeout(hideLoader, 1500);

    // 2. Initiate WOW.js animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // 3. Back to Top Button
    var $backToTop = $('.back-to-top');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $backToTop.fadeIn(250);
        } else {
            $backToTop.fadeOut(250);
        }
    });

    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 700, 'easeInOutExpo');
        return false;
    });

    // Helper: Scroll active dock link into view on mobile
    var centerActiveDockLink = function ($activeLink) {
        if (!$activeLink || !$activeLink.length) return;
        var dockEl = document.querySelector('.floating-dock');
        if (dockEl && dockEl.scrollWidth > dockEl.clientWidth) {
            var el = $activeLink[0];
            var targetScrollLeft = el.offsetLeft - (dockEl.clientWidth / 2) + (el.clientWidth / 2);
            dockEl.scrollTo({
                left: Math.max(0, targetScrollLeft),
                behavior: 'smooth'
            });
        }
    };

    // 4. Smooth Scrolling for Navigation Dock and Anchor Links
    var isSmoothScrolling = false;

    $('a[href^="#"]').on('click', function (event) {
        var targetHash = this.hash;
        if (!targetHash || targetHash === '#') return;

        var $target = $(targetHash);
        if ($target.length) {
            event.preventDefault();

            var offset = window.innerWidth <= 1080 ? 20 : 40;
            var targetTop = Math.max(0, $target.offset().top - offset);

            if ($(this).hasClass('dock-link')) {
                $('.dock-link').removeClass('active');
                $(this).addClass('active');
                centerActiveDockLink($(this));
            }

            isSmoothScrolling = true;
            $('html, body').stop().animate({
                scrollTop: targetTop
            }, 700, 'easeInOutExpo', function () {
                isSmoothScrolling = false;
            });
        }
    });

    // 5. ScrollSpy for Floating Dock
    var $sections = $('section[id]');
    var $dockLinks = $('.dock-link');

    $(window).on('scroll', function () {
        if (isSmoothScrolling || !$sections.length || !$dockLinks.length) return;

        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();

        // If user scrolled to the bottom of the page, activate contact
        if (scrollTop + windowHeight >= docHeight - 60) {
            var $contactLink = $('.dock-link[href="#contact"]');
            if (!$contactLink.hasClass('active')) {
                $dockLinks.removeClass('active');
                $contactLink.addClass('active');
                centerActiveDockLink($contactLink);
            }
            return;
        }

        var scrollPos = scrollTop + (window.innerWidth <= 1080 ? 100 : 160);
        var currentSectionId = '';

        $sections.each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSectionId = id;
            }
        });

        if (currentSectionId) {
            var $activeLink = $('.dock-link[href="#' + currentSectionId + '"]');
            if ($activeLink.length && !$activeLink.hasClass('active')) {
                $dockLinks.removeClass('active');
                $activeLink.addClass('active');
                centerActiveDockLink($activeLink);
            }
        }
    });

    // 6. Typed.js Dynamic Role Typing
    var $typedTarget = $('.typed-text-target');
    if ($typedTarget.length && typeof Typed !== 'undefined') {
        var typedStrings = [
            "Full Stack Software Engineer",
            "AI Coding Specialist (Google Antigravity & OpenAI Codex)",
            "Cloud & DevOps Architecture (.NET, Angular, AWS)"
        ];

        new Typed('.typed-text-target', {
            strings: typedStrings,
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 1600,
            smartBackspace: true,
            loop: true
        });
    }

    // 7. Portfolio Flex Grid Filter
    var handleFilter = function ($btn) {
        $('#portfolio-filter li')
            .removeClass('filter-active')
            .attr('aria-selected', 'false');

        $btn.addClass('filter-active').attr('aria-selected', 'true');
        var filterValue = $btn.attr('data-filter');

        var $items = $('.portfolio-item');
        if (filterValue === '*' || !filterValue) {
            $items.each(function () {
                var $item = $(this);
                $item.stop(true, true).css('display', 'flex').fadeTo(250, 1);
            });
        } else {
            $items.each(function () {
                var $item = $(this);
                if ($item.is(filterValue)) {
                    $item.stop(true, true).css('display', 'flex').fadeTo(250, 1);
                } else {
                    $item.stop(true, true).fadeTo(200, 0, function () {
                        $(this).css('display', 'none');
                    });
                }
            });
        }
    };

    $('#portfolio-filter li').on('click', function () {
        handleFilter($(this));
    });

    $('#portfolio-filter li').on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFilter($(this));
        }
    });

})(jQuery);
