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
    $(".selected-projects__list button").on("click", function () {
        $(this).addClass("is-active").siblings().removeClass("is-active");
    });
    $(".expertise-item__toggle").on("click", function () {
        const $toggle = $(this);
        const $item = $toggle.closest(".expertise-item");
        const $siblings = $item.siblings(".expertise-item");

        $siblings.removeClass("is-open").find(".expertise-item__toggle")
            .attr("aria-expanded", "false").find("i").removeClass("fa-xmark").addClass("fa-plus");
        $siblings.find(".expertise-item__panel").attr("hidden", true);
        $item.addClass("is-open");
        $toggle.attr("aria-expanded", "true").find("i").removeClass("fa-plus").addClass("fa-xmark");
        $item.find(".expertise-item__panel").removeAttr("hidden");
    });
    const $projectGallery = $(".project-gallery");

    if ($projectGallery.length) {
        const $filters = $projectGallery.find(".project-gallery__filters");
        const $cards = $projectGallery.find(".project-gallery__card");
        const $status = $("#project-gallery-status");
        let projectType = "residential";
        let currentProject = 0;

        const updateProjectGallery = function () {
            const location = String($filters.find("[name='location']").val() || "");
            const year = String($filters.find("[name='year']").val() || "");
            const style = String($filters.find("[name='style']").val() || "");
            const keyword = String($filters.find("[name='keyword']").val() || "").trim().toLowerCase();
            let visibleCount = 0;

            $cards.each(function () {
                const $card = $(this);
                const typeMatch = projectType === "all" || String($card.data("type")).split(" ").includes(projectType);
                const matches = typeMatch
                    && (!location || $card.data("location") === location)
                    && (!year || String($card.data("year")) === year)
                    && (!style || $card.data("style") === style)
                    && (!keyword || $card.text().toLowerCase().includes(keyword));

                $card.attr("hidden", !matches);
                visibleCount += matches ? 1 : 0;
            });

            currentProject = 0;
            $cards.removeClass("is-current").filter(":not([hidden])").first().addClass("is-current");
            $projectGallery.find(".project-gallery__pagination b").text(visibleCount ? "01" : "00");
            $projectGallery.find(".project-gallery__pagination span").contents().last()[0].textContent = ` / ${String(visibleCount).padStart(2, "0")}`;
            $status.text(`${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`);
        };

        $filters.on("change input", "select, input", updateProjectGallery);
        $filters.on("click", "[data-project-type]", function () {
            const $button = $(this);

            projectType = $button.data("project-type");
            $button.addClass("is-active").attr("aria-pressed", "true")
                .siblings().removeClass("is-active").attr("aria-pressed", "false");
            updateProjectGallery();
        });
        $filters.on("reset", function () {
            window.setTimeout(function () {
                projectType = "residential";
                $filters.find("[data-project-type='residential']").trigger("click");
            }, 0);
        });
        $projectGallery.find("[data-project-direction]").on("click", function () {
            const $visibleCards = $cards.filter(":not([hidden])");

            if (!$visibleCards.length) {
                return;
            }

            currentProject = (currentProject + Number($(this).data("project-direction")) + $visibleCards.length) % $visibleCards.length;
            $cards.removeClass("is-current");
            $visibleCards.eq(currentProject).addClass("is-current").find("a").trigger("focus");
            $projectGallery.find(".project-gallery__pagination b").text(String(currentProject + 1).padStart(2, "0"));
        });
        updateProjectGallery();
    }
    $(".hero__navigation a").on("click", function () {
        const navigation = document.getElementById("primaryNavigation");

        if (navigation && navigation.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
    });
})(jQuery);
