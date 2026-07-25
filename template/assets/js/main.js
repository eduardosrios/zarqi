(function ($) {
  'use strict';

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

    $('.faq-list button').on('click', function () {
      $(this).toggleClass('active');
    });

    $('.contact-form').on('submit', function (event) {
      event.preventDefault();
      $(this).find('button[type="submit"]').text('Inquiry ready').addClass('disabled');
    });
  });
})(window.jQuery);