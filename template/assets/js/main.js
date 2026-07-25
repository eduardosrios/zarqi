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

  function setupGsap() {
    if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    window.gsap.from('.hero-copy > *, .hero-stat-panel', {
      y: 28,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08
    });

    window.gsap.utils.toArray('.body-section, .site-footer').forEach(function (section) {
      window.gsap.from(section, {
        y: 42,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: window.ScrollTrigger ? {
          trigger: section,
          start: 'top 84%',
          once: true
        } : undefined,
        onComplete: function () {
          section.classList.add('is-animated-in');
        }
      });
    });
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
