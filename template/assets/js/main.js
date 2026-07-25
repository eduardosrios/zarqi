(function ($) {
    "use strict";

    const $playButton = $(".hero__play");

    $playButton.on("click", function () {
        const $button = $(this);
        const isPlaying = !$button.hasClass("is-playing");

        $button.toggleClass("is-playing", isPlaying);
        $button.attr("aria-pressed", String(isPlaying));
        $button.attr("aria-label", isPlaying ? "Pause studio film" : "Play studio film");
        $button.find("i").toggleClass("fa-play", !isPlaying).toggleClass("fa-pause", isPlaying);
    });

    $(".hero__navigation a").on("click", function () {
        const navigation = document.getElementById("primaryNavigation");

        if (navigation && navigation.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
    });
})(jQuery);
