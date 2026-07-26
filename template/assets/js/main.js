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
    const $projectBrowser = $(".project-browser");

    if ($projectBrowser.length) {
        const browserProjects = [
            { label: "Architecture", image: "assets/images/body-14-architecture.webp", alt: "Modern civic building with terracotta fins", title: "Modern, sustainable, & innovative architecture solution." },
            { label: "Interior", image: "assets/images/body-11-interior.webp", alt: "Warm oak living interior", title: "Quiet interiors composed through material, light, and proportion." },
            { label: "Residential", image: "assets/images/body-09-courtyard-pond.png", alt: "Contemporary courtyard residence beside a reflecting pond", title: "Private homes grounded in landscape and everyday rituals." },
            { label: "Exterior", image: "assets/images/body-08-architecture.webp", alt: "Low-profile timber residence in a wide landscape", title: "Expressive envelopes built for climate, context, and longevity." },
            { label: "Floor planning", image: "assets/images/body-05-elevation.webp", alt: "Architectural elevation study", title: "Clear spatial planning that turns constraints into opportunity." }
        ];
        const $browserButtons = $projectBrowser.find("[data-browser-project]");
        const $browserFigure = $projectBrowser.find(".project-browser__feature");
        const $browserImage = $projectBrowser.find("[data-browser-image]");
        const $browserTitle = $projectBrowser.find("[data-browser-title]");
        const $browserLink = $projectBrowser.find("[data-browser-link]");
        const $browserStatus = $projectBrowser.find("[data-browser-status]");
        let browserIndex = 0;

        const setBrowserProject = function (nextIndex) {
            browserIndex = (nextIndex + browserProjects.length) % browserProjects.length;
            const project = browserProjects[browserIndex];

            $browserButtons.removeClass("is-active").attr("aria-pressed", "false")
                .filter(`[data-browser-project="${browserIndex}"]`).addClass("is-active").attr("aria-pressed", "true");
            $browserFigure.addClass("is-changing");
            $browserImage.attr({ src: project.image, alt: project.alt });
            $browserTitle.text(project.title);
            $browserLink.attr({ href: `mailto:studio@zarqi.example?subject=${encodeURIComponent(project.label + " project")}`, "aria-label": `Discuss this ${project.label.toLowerCase()} project` });
            $browserStatus.text(`${project.label} project selected`);
            window.setTimeout(function () { $browserFigure.removeClass("is-changing"); }, 180);
        };

        $browserButtons.on("click", function () {
            setBrowserProject(Number($(this).data("browser-project")));
        });
        $projectBrowser.find("[data-browser-direction]").on("click", function () {
            setBrowserProject(browserIndex + Number($(this).data("browser-direction")));
        });
    }
    $(".service-spectrum__tab").on("click", function () {
        const $tab = $(this);
        const $item = $tab.closest(".service-spectrum__item");
        const $items = $item.siblings(".service-spectrum__item");

        $items.removeClass("is-active").find(".service-spectrum__tab").attr("aria-expanded", "false");
        $items.find(".service-spectrum__panel").attr("hidden", true);
        $item.addClass("is-active");
        $tab.attr("aria-expanded", "true");
        $item.find(".service-spectrum__panel").removeAttr("hidden");
    });
    const $testimonialGallery = $(".testimonial-gallery");

    if ($testimonialGallery.length) {
        const testimonials = [
            { quote: "Incredible architects, seamless process, & stunning designs; our dream space became a reality!", name: "Maria Gomez", location: "London, UK" },
            { quote: "Zarqi translated a complex brief into a home that feels calm, generous, and unmistakably ours.", name: "Daniel Foster", location: "Lisbon, Portugal" },
            { quote: "Every decision was precise and collaborative, from the first plan to the final material detail.", name: "Amina Rahman", location: "Copenhagen, Denmark" }
        ];
        let testimonialIndex = 0;

        $testimonialGallery.find("[data-testimonial-direction]").on("click", function () {
            testimonialIndex = (testimonialIndex + Number($(this).data("testimonial-direction")) + testimonials.length) % testimonials.length;
            const testimonial = testimonials[testimonialIndex];

            $testimonialGallery.find("[data-testimonial-quote]").text(testimonial.quote);
            $testimonialGallery.find("[data-testimonial-name]").text(testimonial.name);
            $testimonialGallery.find("[data-testimonial-location]").text(testimonial.location);
            $testimonialGallery.find("[data-testimonial-status]").text(`Testimonial ${testimonialIndex + 1} of ${testimonials.length}`);
        });
    }
    $(".hero__navigation a").on("click", function () {
        const navigation = document.getElementById("primaryNavigation");

        if (navigation && navigation.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navigation).hide();
        }
    });
})(jQuery);
