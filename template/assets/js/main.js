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
  });
})(window.jQuery);