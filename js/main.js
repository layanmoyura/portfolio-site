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
            "Cloud & DevOps Architecture (.NET, Angular, AWS)",
            "The Code Struggler — Defying Causality"
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


    // ==========================================================================
    // 8. BERSERK THEME CONTROLLER & ECLIPSE EMBERS ENGINE
    // ==========================================================================

    // Metallic Sword Resonant Chime (Dragon Slayer Clang via Web Audio API)
    var playDragonslayerClang = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            var ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            var now = ctx.currentTime;

            // Deep iron blade impact
            var oscBass = ctx.createOscillator();
            var gainBass = ctx.createGain();
            oscBass.type = 'triangle';
            oscBass.frequency.setValueAtTime(130, now);
            oscBass.frequency.exponentialRampToValueAtTime(40, now + 0.45);
            gainBass.gain.setValueAtTime(0.25, now);
            gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            oscBass.connect(gainBass);
            gainBass.connect(ctx.destination);
            oscBass.start(now);
            oscBass.stop(now + 0.5);

            // Shimmering high-frequency harmonics of heavy steel
            var bladePitches = [680, 1140, 1850, 2900];
            bladePitches.forEach(function (freq, i) {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                var amp = 0.1 / (i + 1);
                gain.gain.setValueAtTime(amp, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7 + i * 0.15);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.0);
            });
        } catch (e) {
            // Audio policy / unavailable - fail silently
        }
    };

    // Ambient Floating Crimson Embers (Canvas Engine)
    var embersAnimationId = null;
    var embersCanvas = document.getElementById('berserk-canvas');
    var embersCtx = embersCanvas ? embersCanvas.getContext('2d') : null;
    var emberParticles = [];

    var resizeEmbers = function () {
        if (!embersCanvas) return;
        embersCanvas.width = window.innerWidth;
        embersCanvas.height = window.innerHeight;
    };

    var createEmber = function (w, h, initial) {
        return {
            x: Math.random() * w,
            y: initial ? Math.random() * h : h + Math.random() * 20,
            radius: Math.random() * 2.2 + 0.8,
            speedY: Math.random() * 0.9 + 0.4,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.6 + 0.3,
            fadeSpeed: Math.random() * 0.003 + 0.001,
            sway: Math.random() * 2,
            swaySpeed: Math.random() * 0.02 + 0.01
        };
    };

    var updateAndDrawEmbers = function () {
        if (!embersCtx || !embersCanvas) return;
        var w = embersCanvas.width;
        var h = embersCanvas.height;
        embersCtx.clearRect(0, 0, w, h);

        for (var i = 0; i < emberParticles.length; i++) {
            var p = emberParticles[i];
            p.y -= p.speedY;
            p.sway += p.swaySpeed;
            p.x += Math.sin(p.sway) * 0.4 + p.speedX;
            p.opacity -= p.fadeSpeed;

            if (p.y < -10 || p.opacity <= 0) {
                emberParticles[i] = createEmber(w, h, false);
                continue;
            }

            embersCtx.beginPath();
            embersCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            embersCtx.fillStyle = 'rgba(230, 40, 59, ' + Math.max(0, p.opacity) + ')';
            embersCtx.shadowBlur = 8;
            embersCtx.shadowColor = 'rgba(255, 60, 80, 0.8)';
            embersCtx.fill();
        }

        embersAnimationId = requestAnimationFrame(updateAndDrawEmbers);
    };

    var startEmbers = function () {
        if (!embersCanvas || embersAnimationId) return;
        resizeEmbers();
        emberParticles = [];
        var count = window.innerWidth < 768 ? 16 : 30;
        for (var i = 0; i < count; i++) {
            emberParticles.push(createEmber(embersCanvas.width, embersCanvas.height, true));
        }
        window.addEventListener('resize', resizeEmbers);
        embersAnimationId = requestAnimationFrame(updateAndDrawEmbers);
    };

    var stopEmbers = function () {
        if (embersAnimationId) {
            cancelAnimationFrame(embersAnimationId);
            embersAnimationId = null;
        }
        if (embersCtx && embersCanvas) {
            embersCtx.clearRect(0, 0, embersCanvas.width, embersCanvas.height);
        }
        window.removeEventListener('resize', resizeEmbers);
    };

    // Berserk Theme Toggle Handler
    var $berserkToggle = $('#berserk-toggle');
    var $dockBerserkText = $('.dock-berserk-text');
    // Default to active unless explicitly set to 'inactive'
    var savedBerserkPref = localStorage.getItem('berserk-theme');
    var isBerserkActive = savedBerserkPref !== 'inactive';

    var applyBerserkTheme = function (enable, withSound) {
        if (enable) {
            $('body').addClass('berserk-mode');
            $berserkToggle.addClass('active').attr('aria-pressed', 'true');
            $dockBerserkText.text('Berserk');
            localStorage.setItem('berserk-theme', 'active');
            startEmbers();
            if (withSound) {
                playDragonslayerClang();
            }
        } else {
            $('body').removeClass('berserk-mode');
            $berserkToggle.removeClass('active').attr('aria-pressed', 'false');
            $dockBerserkText.text('Berserk');
            localStorage.setItem('berserk-theme', 'inactive');
            stopEmbers();
        }
    };

    // Initialize default theme (active by default)
    if (isBerserkActive) {
        applyBerserkTheme(true, false);
    } else {
        applyBerserkTheme(false, false);
    }

    $berserkToggle.on('click', function (e) {
        e.preventDefault();
        var isCurrentlyActive = $('body').hasClass('berserk-mode');
        applyBerserkTheme(!isCurrentlyActive, true);
    });

})(jQuery);
