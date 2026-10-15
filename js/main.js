(function ($) {
    "use strict";
    
    // Hide Loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 100);
    };
    loader();
    
    // Initiate WOW.js animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        return false;
    });
    
    // Smooth scrolling for navigation dock and internal links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 30
            }, 800, 'easeInOutExpo');
            
            // If it's a dock link, set active state
            if ($(this).hasClass('dock-link')) {
                $('.dock-link').removeClass('active');
                $(this).addClass('active');
            }
        }
    });
    
    // ScrollSpy for Floating Dock
    $(window).on('scroll', function () {
        var scrollPosition = $(this).scrollTop() + 150;
        $('section[id]').each(function () {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            if (scrollPosition >= top && scrollPosition <= bottom) {
                $('.dock-link').removeClass('active');
                $('.dock-link[href="#' + id + '"]').addClass('active');
            }
        });
    });
    
    // Typed.js Dynamic Role Typing
    var typedElement = $('.typed-text-target');
    if (typedElement.length) {
        var typed_strings = $('.typed-source').text();
        if (typed_strings) {
            new Typed('.typed-text-target', {
                strings: typed_strings.split(', '),
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 1500,
                smartBackspace: true,
                loop: true
            });
        }
    }
    
    // Portfolio Isotope Filter
    var $grid = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
        transitionDuration: '0.4s'
    });

    $(window).on('load', function () {
        $grid.isotope('layout');
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

})(jQuery);
