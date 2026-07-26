(function () {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reviewMode = document.body.classList.contains("review-mode");
    const videoSources = {
        hero: {
            src: "https://videos.pexels.com/video-files/2994185/2994185-uhd_3840_2160_30fps.mp4",
            poster: "assets/images/hero-aetheria-coastal-house.png",
            title: "Zarqi studio film"
        },
        modernity: {
            src: "https://videos.pexels.com/video-files/33920492/14394686_2560_1440_60fps.mp4",
            poster: "assets/images/body-24-brick.webp",
            title: "Modernity in motion"
        }
    };

    function createScrollProgress() {
        const progress = document.createElement("div");
        let ticking = false;
        progress.className = "stage05-scroll-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.prepend(progress);

        function update() {
            const available = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
            progress.style.transform = `scaleX(${ratio})`;
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        window.addEventListener("resize", update);
        update();
    }

    function createMediaDialog() {
        const dialog = document.createElement("dialog");
        dialog.className = "stage05-media-dialog";
        dialog.setAttribute("aria-label", "Zarqi media viewer");
        dialog.innerHTML = `
            <div class="stage05-media-dialog__layout">
                <header class="stage05-media-dialog__toolbar">
                    <p data-stage05-dialog-title>Project image</p>
                    <button class="stage05-media-dialog__close" type="button" aria-label="Close media viewer">
                        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </header>
                <div class="stage05-media-dialog__stage">
                    <button class="stage05-media-dialog__nav stage05-media-dialog__nav--previous" type="button" aria-label="Previous image">
                        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <img class="stage05-media-dialog__image" src="assets/images/body-01-terrace.webp" alt="" hidden>
                    <video class="stage05-media-dialog__video" controls playsinline hidden></video>
                    <button class="stage05-media-dialog__nav stage05-media-dialog__nav--next" type="button" aria-label="Next image">
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
                <footer class="stage05-media-dialog__footer">
                    <p data-stage05-dialog-caption></p>
                    <p class="stage05-media-dialog__count" data-stage05-dialog-count></p>
                </footer>
            </div>
        `;
        document.body.append(dialog);

        const image = dialog.querySelector(".stage05-media-dialog__image");
        const video = dialog.querySelector(".stage05-media-dialog__video");
        const title = dialog.querySelector("[data-stage05-dialog-title]");
        const caption = dialog.querySelector("[data-stage05-dialog-caption]");
        const count = dialog.querySelector("[data-stage05-dialog-count]");
        const previous = dialog.querySelector(".stage05-media-dialog__nav--previous");
        const next = dialog.querySelector(".stage05-media-dialog__nav--next");
        const close = dialog.querySelector(".stage05-media-dialog__close");
        let gallery = [];
        let activeIndex = 0;
        let lastFocused = null;

        function showDialog() {
            lastFocused = document.activeElement;
            document.body.classList.add("stage05-modal-open");
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                dialog.setAttribute("open", "");
            }
            close.focus();
        }

        function renderImage() {
            const item = gallery[activeIndex];
            if (!item) {
                return;
            }

            image.src = item.currentSrc || item.src;
            image.alt = item.alt || "Zarqi project image";
            title.textContent = "Project image";
            caption.textContent = item.alt || "Zarqi architecture and design";
            count.textContent = `${activeIndex + 1} / ${gallery.length}`;
        }

        function openImage(items, index) {
            gallery = items;
            activeIndex = index;
            video.pause();
            video.hidden = true;
            video.removeAttribute("src");
            image.hidden = false;
            previous.hidden = gallery.length < 2;
            next.hidden = gallery.length < 2;
            renderImage();
            showDialog();
        }

        function openVideo(item) {
            gallery = [];
            image.hidden = true;
            previous.hidden = true;
            next.hidden = true;
            video.hidden = false;
            video.src = item.src;
            video.poster = item.poster;
            title.textContent = item.title;
            caption.textContent = "Architecture film";
            count.textContent = "";
            showDialog();
            video.play().catch(function () {
                video.controls = true;
            });
        }

        function closeDialog() {
            if (dialog.open && typeof dialog.close === "function") {
                dialog.close();
            } else {
                dialog.removeAttribute("open");
                dialog.dispatchEvent(new Event("close"));
            }
        }

        function move(direction) {
            if (gallery.length < 2) {
                return;
            }
            activeIndex = (activeIndex + direction + gallery.length) % gallery.length;
            renderImage();
        }

        close.addEventListener("click", closeDialog);
        previous.addEventListener("click", function () {
            move(-1);
        });
        next.addEventListener("click", function () {
            move(1);
        });
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                closeDialog();
            }
        });
        dialog.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                move(-1);
            }
            if (event.key === "ArrowRight") {
                move(1);
            }
        });
        dialog.addEventListener("close", function () {
            video.pause();
            video.removeAttribute("src");
            video.load();
            document.body.classList.remove("stage05-modal-open");
            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            }
        });

        return { openImage, openVideo };
    }

    function initializeLightbox(mediaDialog) {
        const items = [...document.querySelectorAll(".body-section img")].filter(function (image) {
            const rect = image.getBoundingClientRect();
            return !image.closest("a, button, .stage04-video-variant, .trusted-studio__avatars") &&
                !image.src.includes("/stage04-icons/") &&
                !image.hasAttribute("aria-hidden") &&
                rect.width >= 180 &&
                rect.height >= 140;
        });

        items.forEach(function (image, index) {
            image.classList.add("stage05-lightbox-item");
            image.setAttribute("role", "button");
            image.setAttribute("tabindex", "0");
            image.setAttribute("aria-label", `Open image viewer: ${image.alt || `project image ${index + 1}`}`);

            function open() {
                mediaDialog.openImage(items, index);
            }

            image.addEventListener("click", open);
            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open();
                }
            });
        });
    }

    function initializeVideoModal(mediaDialog) {
        const heroButton = document.querySelector(".hero__play");
        const modernityButton = document.querySelector("[data-modernity-play]");

        if (heroButton) {
            heroButton.addEventListener("click", function () {
                mediaDialog.openVideo(videoSources.hero);
            });
        }

        if (modernityButton) {
            modernityButton.addEventListener("click", function () {
                mediaDialog.openVideo(videoSources.modernity);
            });
        }
    }

    function initializeMotion() {
        if (reviewMode || reducedMotion || typeof Element.prototype.animate !== "function") {
            return;
        }

        function reveal(targets, baseDelay) {
            targets.forEach(function (target, index) {
                target.classList.add("stage05-motion-target");
                const animation = target.animate([
                    { opacity: 0, transform: "translateY(28px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ], {
                    duration: 720,
                    delay: baseDelay + (index * 70),
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "both"
                });
                animation.addEventListener("finish", function () {
                    animation.cancel();
                    target.classList.remove("stage05-motion-target");
                }, { once: true });
            });
        }

        reveal([...document.querySelectorAll(".hero__heading, .hero__intro, .hero__actions")], 80);

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const targets = [...entry.target.children].filter(function (child) {
                    return !child.matches(".reference-links, .stage04-video");
                }).slice(0, 6);
                reveal(targets, 0);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -14% 0px", threshold: 0.08 });

        document.querySelectorAll(".body-section, .site-footer").forEach(function (section) {
            observer.observe(section);
        });
    }
    function initializeCounters() {
        const counters = [...document.querySelectorAll(
            ".studio-profile__metrics dt, .studio-figures__facts dt, .studio-legacy__stats strong, .pool-stats__metrics dt"
        )];

        if (!reducedMotion && window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
        }

        counters.forEach(function (counter) {
            const original = counter.textContent.trim();
            const match = original.match(/^([\d,.]+)(.*)$/);
            if (!match) {
                return;
            }

            const numeric = Number(match[1].replace(/,/g, ""));
            const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
            const suffix = match[2];

            function render(value) {
                counter.textContent = `${value.toFixed(decimals)}${suffix}`;
            }

            if (!reducedMotion && window.gsap && window.ScrollTrigger && !reviewMode) {
                const state = { value: 0 };
                render(0);
                window.gsap.to(state, {
                    value: numeric,
                    duration: 1.4,
                    ease: "power2.out",
                    snap: decimals ? false : { value: 1 },
                    onUpdate: function () {
                        render(state.value);
                    },
                    onComplete: function () {
                        counter.textContent = original;
                    },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 92%",
                        once: true
                    }
                });
            }
        });
    }

    function initializeActiveNavigation() {
        const links = [...document.querySelectorAll(".hero__links > .nav-item > .nav-link")];
        const pairs = links.map(function (link) {
            const selector = link.getAttribute("href");
            return { link, section: selector && selector.startsWith("#") ? document.querySelector(selector) : null };
        }).filter(function (pair) {
            return pair.section;
        });

        if (!pairs.length) {
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            const visibleEntry = entries.filter(function (entry) {
                return entry.isIntersecting;
            }).sort(function (a, b) {
                return b.intersectionRatio - a.intersectionRatio;
            })[0];

            if (!visibleEntry) {
                return;
            }

            pairs.forEach(function (pair) {
                const current = pair.section === visibleEntry.target;
                pair.link.classList.toggle("is-current", current);
                if (current) {
                    pair.link.setAttribute("aria-current", "location");
                } else {
                    pair.link.removeAttribute("aria-current");
                }
            });
        }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.5] });

        pairs.forEach(function (pair) {
            observer.observe(pair.section);
        });
    }

    function createQuickContact() {
        const hero = document.querySelector(".hero");
        const footer = document.querySelector(".site-footer");
        const contact = document.querySelector("#contact");
        if (!hero || !footer || !contact) {
            return;
        }

        const button = document.createElement("a");
        button.className = "stage05-quick-contact";
        button.href = "#contact";
        button.setAttribute("aria-label", "Start a private consultation");
        button.dataset.stage05Tooltip = "Start a private consultation";
        button.innerHTML = '<i class="fa-regular fa-envelope" aria-hidden="true"></i>';
        document.body.append(button);

        let heroVisible = true;
        let footerVisible = false;
        function update() {
            button.classList.toggle("is-visible", !heroVisible && !footerVisible);
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.target === hero) {
                    heroVisible = entry.isIntersecting;
                }
                if (entry.target === footer) {
                    footerVisible = entry.isIntersecting;
                }
            });
            update();
        }, { threshold: 0.08 });
        observer.observe(hero);
        observer.observe(footer);

        button.addEventListener("click", function (event) {
            event.preventDefault();
            contact.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
            window.setTimeout(function () {
                const heading = contact.querySelector("h2");
                heading.setAttribute("tabindex", "-1");
                heading.focus({ preventScroll: true });
            }, reducedMotion ? 0 : 700);
        });
    }

    function labelReferenceLinks() {
        document.querySelectorAll(".reference-link").forEach(function (link) {
            const label = link.textContent.trim() === "C" ? "Cropped section reference" : "Original project reference";
            link.title = label;
        });
    }

    createScrollProgress();
    const mediaDialog = createMediaDialog();
    initializeLightbox(mediaDialog);
    initializeVideoModal(mediaDialog);
    initializeMotion();
    initializeCounters();
    initializeActiveNavigation();
    createQuickContact();
    labelReferenceLinks();
})();
