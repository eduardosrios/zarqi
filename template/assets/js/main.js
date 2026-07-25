(function ($) {
  'use strict';

  var faqAnswers = [
    'The best time is before a site, property or contractor decision is locked. Early involvement keeps the concept buildable.',
    'Yes. zarqi can coordinate with your contractor, consultant team or procurement partner while keeping design decisions documented.',
    'Yes. Interior and exterior packages can include finish schedules, alternates, notes and approval status.',
    'Yes. The template is structured for architecture, interior design, exterior design and urban design in one workflow.'
  ];

  function animateCount($el) {
    if ($el.data('counted')) {
      return;
    }

    var raw = $.trim($el.text());
    var target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    var suffix = raw.replace(/[0-9]/g, '');

    if (!target) {
      return;
    }

    $el.data('counted', true).attr('data-count', target);

    $({ value: 0 }).animate({ value: target }, {
      duration: 1200,
      easing: 'swing',
      step: function () {
        $el.text(Math.floor(this.value) + suffix);
      },
      complete: function () {
        $el.text(target + suffix);
      }
    });
  }

  function setupCounters() {
    var counters = $('.stat-item strong, .stat-ribbon strong, .awards-band strong');

    if (!('IntersectionObserver' in window)) {
      counters.each(function () { animateCount($(this)); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount($(entry.target));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.each(function () { observer.observe(this); });
  }

  function setupFaq() {
    $('.faq-list button').each(function (index) {
      var id = 'faq-answer-' + index;
      $(this)
        .attr({ 'aria-expanded': 'false', 'aria-controls': id })
        .after('<p class="faq-answer" id="' + id + '">' + faqAnswers[index % faqAnswers.length] + '</p>');
    });

    $('.faq-list button').on('click', function () {
      var expanded = $(this).hasClass('active');
      $('.faq-list button').removeClass('active').attr('aria-expanded', 'false');
      if (!expanded) {
        $(this).addClass('active').attr('aria-expanded', 'true');
      }
    });
  }

  function setupGallery() {
    var modalEl = document.getElementById('projectLightbox');
    if (!modalEl || !window.bootstrap) {
      return;
    }

    var modal = new window.bootstrap.Modal(modalEl);
    var selectors = '.project-row img, .mosaic-grid img, .journal-row img, .before-grid img, .paired-images img, .wide-image-row img, .mag-grid img, .featured-card img, .project-showcase img';

    $(selectors).attr('tabindex', '0').attr('role', 'button').on('click keydown', function (event) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
      var src = $(this).attr('src');
      var title = $(this).closest('article, figure, section').find('h2, h3').first().text() || $(this).attr('alt') || 'Project preview';
      $('#projectLightboxImage').attr({ src: src, alt: $(this).attr('alt') || title });
      $('#projectLightboxTitle').text(title);
      modal.show();
    });
  }

  function setupScrollProgress(gsap, ScrollTrigger) {
    var bar = document.createElement('span');
    bar.className = 'motion-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    if (ScrollTrigger) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });
      return;
    }

    $(window).on('scroll.motionProgress resize.motionProgress', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? window.scrollY / max : 0;
      gsap.to(bar, { scaleX: progress, duration: 0.18, ease: 'power2.out' });
    }).trigger('scroll.motionProgress');
  }

  function setupParallax(gsap, ScrollTrigger) {
    if (!ScrollTrigger) {
      return;
    }

    var parallaxImages = '.hero-visual > img, .body-stage .image-editorial > img, .body-stage .full-image-statement > img, .body-stage .project-showcase img, .body-stage .sustainability-split img, .body-stage .wide-image-row img, .body-stage .paired-images img';

    gsap.utils.toArray(parallaxImages).forEach(function (image, index) {
      var section = image.closest('section') || image.parentElement;
      var depth = index % 2 === 0 ? -9 : 9;
      image.classList.add('motion-parallax-source');
      gsap.set(image, { scale: 1.06, transformOrigin: 'center center', force3D: true });
      gsap.to(image, {
        yPercent: depth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.55
        }
      });
    });
  }

  function setupAmbientFloating(gsap) {
    var floatingTargets = '.hero-stat-panel, .featured-card, .card-heading-icon, .stat-ribbon strong, .awards-band strong, .footer-social a';

    gsap.utils.toArray(floatingTargets).forEach(function (element, index) {
      element.classList.add('motion-float');
      gsap.to(element, {
        y: index % 2 === 0 ? -7 : 7,
        rotation: index % 3 === 0 ? 0.45 : -0.35,
        duration: 3.2 + (index % 5) * 0.35,
        delay: index * 0.04,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  function setupCursorEvasion(gsap) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    var evasiveTargets = '.icon-btn, .filter-chip, .card-heading-icon-wrap, .footer-social a';

    gsap.utils.toArray(evasiveTargets).forEach(function (element, index) {
      var jumped = false;
      var maxOffset = element.classList.contains('card-heading-icon-wrap') ? 14 : 22;

      element.classList.add('motion-evasive');

      function resetElement() {
        jumped = false;
        gsap.to(element, { x: 0, y: 0, rotation: 0, duration: 0.52, ease: 'elastic.out(1, 0.46)', overwrite: 'auto' });
      }

      function evadePointer(event) {
        var rect = element.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var dx = centerX - event.clientX;
        var dy = centerY - event.clientY;
        var distance = Math.max(Math.hypot(dx, dy), 1);
        var radius = Math.max(rect.width, rect.height) * 2.45;

        if (distance > radius) {
          resetElement();
          return;
        }

        var angle = Math.atan2(dy, dx);
        var pressure = (radius - distance) / radius;
        var closeRange = Math.max(rect.width, rect.height) * 0.58;
        var x;
        var y;

        if (distance < closeRange) {
          jumped = !jumped;
          angle += Math.PI + (jumped ? 0.85 : -0.85);
          x = Math.cos(angle) * maxOffset * 1.45;
          y = Math.sin(angle) * maxOffset * 1.45;
          gsap.to(element, { x: x, y: y, rotation: jumped ? 1.6 : -1.6, duration: 0.48, ease: 'elastic.out(1, 0.36)', overwrite: 'auto' });
          return;
        }

        x = Math.cos(angle) * maxOffset * pressure;
        y = Math.sin(angle) * maxOffset * pressure;
        gsap.to(element, { x: x, y: y, rotation: (index % 2 ? -0.7 : 0.7) * pressure, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
      }

      element.addEventListener('mousemove', evadePointer);
      element.addEventListener('mouseleave', resetElement);
      element.addEventListener('blur', resetElement);
    });
  }

  function setupGsap() {
    if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('motion-reduced');
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    document.documentElement.classList.add('motion-ready');

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from('.hero-copy > *, .hero-stat-panel', {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08
    });

    gsap.utils.toArray('.body-section, .site-footer').forEach(function (section) {
      gsap.from(section, {
        y: 42,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: ScrollTrigger ? {
          trigger: section,
          start: 'top 84%',
          once: true
        } : undefined,
        onComplete: function () {
          section.classList.add('is-animated-in');
        }
      });
    });

    setupScrollProgress(gsap, ScrollTrigger);
    setupParallax(gsap, ScrollTrigger);
    setupAmbientFloating(gsap);
    setupCursorEvasion(gsap);
  }


  function setupResponsiveRefresh() {
    if (!window.ScrollTrigger) {
      return;
    }

    var refreshTimer;
    $(window).on('load resize orientationchange', function () {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(function () {
        window.ScrollTrigger.refresh();
      }, 180);
    });
  }
  $(function () {
    var $links = $('.nav-link[href^="#"], .mobile-links a[href^="#"]');

    $links.on('click', function () {
      var target = $(this).attr('href');
      if (!target || target === '#') {
        return;
      }

      $('.nav-pill .nav-link').removeClass('active');
      $('.nav-pill .nav-link[href="' + target + '"]').addClass('active');
    });

    $('.principle-card').on('mouseenter focusin', function () {
      $('.principle-card').removeClass('principle-card-active');
      $(this).addClass('principle-card-active');
    });

    $('.filter-chip').on('click', function () {
      var filter = $(this).data('filter');
      $('.filter-chip').removeClass('active');
      $(this).addClass('active');

      $('.expertise-grid article').each(function () {
        var show = filter === 'all' || $(this).data('kind') === filter;
        $(this).toggle(show);
      });
    });

    $('.contact-form').on('submit', function (event) {
      event.preventDefault();
      $(this).find('button[type="submit"]').text('Inquiry ready').addClass('disabled');
    });

    setupFaq();
    setupCounters();
    setupGallery();
    setupGsap();
    setupResponsiveRefresh();
  });
})(window.jQuery);
