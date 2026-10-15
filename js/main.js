(function ($) {
    "use strict";

    // 1. Hide Loader
    var hideLoader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 80);
    };
    hideLoader();

    // 2. Mobile Navigation Toggle
    var $mobileMenuBtn = $('#mobileMenuBtn');
    var $primaryNav = $('#primaryNav');

    $mobileMenuBtn.on('click', function () {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
        $(this).toggleClass('is-active');
        $primaryNav.toggleClass('nav-open');
    });

    // Close mobile nav when clicking outside or on a link
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.header-container').length) {
            if ($primaryNav.hasClass('nav-open')) {
                $primaryNav.removeClass('nav-open');
                $mobileMenuBtn.attr('aria-expanded', 'false').removeClass('is-active');
            }
        }
    });

    // 3. Smooth Scrolling
    $('a[href^="#"]').on('click', function (event) {
        var targetHash = this.hash;
        if (!targetHash || targetHash === '#') return;

        var $target = $(targetHash);
        if ($target.length) {
            event.preventDefault();

            // Close mobile menu if open
            if ($primaryNav.hasClass('nav-open')) {
                $primaryNav.removeClass('nav-open');
                $mobileMenuBtn.attr('aria-expanded', 'false').removeClass('is-active');
            }

            var offsetTop = $target.offset().top - 70;
            $('html, body').stop().animate({
                scrollTop: Math.max(0, offsetTop)
            }, 600, 'easeInOutExpo');
        }
    });

    // 4. ScrollSpy for Navigation Links & Back-To-Top Button
    var $sections = $('section[id]');
    var $navLinks = $('.nav-link');
    var $backToTop = $('.back-to-top');

    $(window).on('scroll', function () {
        var scrollPosition = $(this).scrollTop();

        // Back to top visibility
        if (scrollPosition > 350) {
            $backToTop.fadeIn(250);
        } else {
            $backToTop.fadeOut(250);
        }

        // Active section highlight
        var spyPosition = scrollPosition + 120;
        $sections.each(function () {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (spyPosition >= top && spyPosition <= bottom) {
                $navLinks.removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600, 'easeInOutExpo');
        return false;
    });

    // 5. Typed.js Dynamic Specialization Rotation
    var $typedTarget = $('.typed-text-target');
    if ($typedTarget.length && typeof Typed !== 'undefined') {
        var typedStrings = [
            ".NET Core & C# Architecture",
            "Enterprise Web APIs & MVC",
            "Azure DevOps & Cloud CI/CD",
            "Angular & Next.js Full Stack",
            "Relational Database Design & MSSQL"
        ];
        new Typed('.typed-text-target', {
            strings: typedStrings,
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1800,
            smartBackspace: true,
            loop: true
        });
    }

    // 6. Portfolio Isotope Filter
    if ($.fn.isotope) {
        var $grid = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'masonry',
            transitionDuration: '0.35s'
        });

        $(window).on('load', function () {
            $grid.isotope('layout');
        });

        $('#portfolio-filter .filter-btn').on('click', function () {
            $('#portfolio-filter .filter-btn').removeClass('filter-active').attr('aria-selected', 'false');
            $(this).addClass('filter-active').attr('aria-selected', 'true');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    }

})(jQuery);
