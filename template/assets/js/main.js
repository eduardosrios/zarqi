(function ($) {
    "use strict";

    const $playButton = $(".hero__play");
    const reviewSection = new URLSearchParams(window.location.search).get("review");

    if (reviewSection) {
        document.body.classList.add("review-mode");
        $(".hero, .body-section").attr("hidden", true);
        $(`.body-section[data-section="${reviewSection}"]`).removeAttr("hidden");
    }

    $playButton.on("click", function () {
        const $button = $(this);
        const isPlaying = !$button.hasClass("is-playing");

        $button.toggleClass("is-playing", isPlaying);
        $button.attr("aria-pressed", String(isPlaying));
        $button.attr("aria-label", isPlaying ? "Pause studio film" : "Play studio film");
        $button.find("i").toggleClass("fa-play", !isPlaying).toggleClass("fa-pause", isPlaying);
    });

    $("[data-room-mode]").on("click", function () {
        const $button = $(this);
        const $section = $button.closest(".room-explorer");

        $button.addClass("is-active").attr("aria-pressed", "true")
            .siblings().removeClass("is-active").attr("aria-pressed", "false");
        $section.attr("data-mode", $button.data("room-mode"));
    });

    $(".room-explorer__focus").on("click", function () {
        const $button = $(this);
        const isExploring = $button.attr("aria-pressed") !== "true";

        $button.attr("aria-pressed", String(isExploring));
        $button.closest(".room-explorer").toggleClass("is-exploring", isExploring);
    });
    $(".services-index__list button").on("click", function () {
        $(this).addClass("is-active").siblings("button").removeClass("is-active");
    });
    $(".purpose-process__principles button").on("click", function () {
        $(this).addClass("is-active").siblings().removeClass("is-active");
    });
    $(".hero__navigation a").on("click", function () {
        const navigation = document.getElementById("primaryNavigation");

        if (navigation && navigation.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
    });
})(jQuery);
