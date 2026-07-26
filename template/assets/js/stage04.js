(function () {
    "use strict";

    const referenceRoot = "http://localhost/templates/Architecture/referencias/references-used";
    const referenceFiles = [
        { from: 1, to: 5, name: "top 01 - 002-body1-268368aac9d7.webp" },
        { from: 6, to: 9, name: "top 02 - 057-body6-902f8ee0307d.jpg" },
        { from: 10, to: 11, name: "top 02 - 116-main-29c67a74620d.webp" },
        { from: 12, to: 13, name: "top 03 - 007-body2-53c281a2e63f.webp" },
        { from: 14, to: 17, name: "top 05 - 001-body1-2ab030adf4a9.webp" },
        { from: 18, to: 22, name: "top 06 - 069-body1-0681e4ab127d.webp" },
        { from: 23, to: 28, name: "top 09 - 103-body1-cc1f78ca979d.webp" },
        { from: 29, to: 33, name: "ztop 01 - 094-body1-8dc0c2f5f203.webp" },
        { from: 34, to: 34, name: "ztop 04 - 019-body1-b513b6caf7a3.webp" },
        { from: 35, to: 36, name: "ztop 04 - 019-body3-6bf1806e344f.webp" }
    ];
    const videoStudies = [
        {
            section: 2,
            mp4: "https://videos.pexels.com/video-files/35771451/15165829_2160_3840_30fps.mp4",
            page: "https://www.pexels.com/video/elegant-interior-of-classic-architecture-35771451/",
            label: "Classic interior study"
        },
        {
            section: 6,
            mp4: "https://videos.pexels.com/video-files/2994185/2994185-uhd_3840_2160_30fps.mp4",
            page: "https://www.pexels.com/video/tilt-shot-of-the-facade-of-a-modern-building-with-glass-exterior-2994185/",
            label: "Glass facade study"
        },
        {
            section: 11,
            mp4: "https://videos.pexels.com/video-files/35670044/15115516_3840_2160_30fps.mp4",
            page: "https://www.pexels.com/video/drone-aerial-view-of-modern-building-and-cityscape-35670044/",
            label: "Urban architecture study"
        },
        {
            section: 13,
            mp4: "https://videos.pexels.com/video-files/33920492/14394686_2560_1440_60fps.mp4",
            page: "https://www.pexels.com/video/aerial-view-of-modern-architecture-building-33920492/",
            label: "Green architecture study"
        },
        {
            section: 29,
            mp4: "https://videos.pexels.com/video-files/34421321/14582374_3840_2160_30fps.mp4",
            page: "https://www.pexels.com/video/drone-view-of-modern-architecture-in-urban-landscape-34421321/",
            label: "Urban landscape study"
        },
        {
            section: 35,
            mp4: "https://videos.pexels.com/video-files/34941081/14800922_2160_3840_60fps.mp4",
            page: "https://www.pexels.com/video/modern-high-rise-building-exterior-drone-view-34941081/",
            label: "High-rise exterior study"
        }
    ];

    function addVideoStudies() {
        videoStudies.forEach(function (study, index) {
            const original = document.querySelector(`.body-section[data-section="${study.section}"]`);

            if (!original) {
                return;
            }

            const clone = original.cloneNode(true);
            clone.removeAttribute("data-section");
            clone.removeAttribute("aria-labelledby");
            clone.querySelectorAll("[id]").forEach(function (node) {
                node.removeAttribute("id");
            });
            clone.classList.add("stage04-video-variant");
            clone.dataset.sourceSection = String(study.section);
            clone.setAttribute("aria-label", `${study.label}, video variation ${index + 1} of ${videoStudies.length}`);

            const video = document.createElement("video");
            video.className = "stage04-video";
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.setAttribute("aria-hidden", "true");
            video.innerHTML = `<source src="${study.mp4}" type="video/mp4">`;
            clone.prepend(video);

            const source = document.createElement("a");
            source.className = "stage04-video-source";
            source.href = study.page;
            source.target = "_blank";
            source.rel = "noreferrer";
            source.textContent = "Pexels video source";
            clone.append(source);
            original.after(clone);
        });
    }

    function referenceName(sectionNumber) {
        return referenceFiles.find(function (item) {
            return sectionNumber >= item.from && sectionNumber <= item.to;
        });
    }

    function referenceUrl(folder, variant, filename) {
        return encodeURI(`${referenceRoot}/${folder}/${variant}/${filename}`);
    }

    function addReferenceLinks(target, folder, filename) {
        if (!target || !filename || target.querySelector(":scope > .reference-links")) {
            return;
        }

        const group = document.createElement("div");
        group.className = "reference-links";
        group.setAttribute("aria-label", "Design reference images");
        group.innerHTML = `
            <a class="reference-link" href="${referenceUrl(folder, "cutted-section", filename)}" target="_blank" rel="noreferrer" aria-label="Open cut section reference">C</a>
            <a class="reference-link" href="${referenceUrl(folder, "original", filename)}" target="_blank" rel="noreferrer" aria-label="Open original reference">O</a>
        `;
        target.append(group);
    }

    function addAllReferenceLinks() {
        const heroFooterReference = "ztop 01 - 094-body1-8dc0c2f5f203.webp";
        addReferenceLinks(document.querySelector(".hero"), "hero", heroFooterReference);

        document.querySelectorAll(".body-section[data-section]").forEach(function (section) {
            const sectionNumber = Number(section.dataset.section);
            const reference = referenceName(sectionNumber);

            if (reference) {
                addReferenceLinks(section, `body-content/section ${sectionNumber}`, reference.name);
            }
        });

        document.querySelectorAll(".stage04-video-variant").forEach(function (section) {
            const sectionNumber = Number(section.dataset.sourceSection);
            const reference = referenceName(sectionNumber);

            if (reference) {
                addReferenceLinks(section, `body-content/section ${sectionNumber}`, reference.name);
            }
        });

        addReferenceLinks(document.querySelector(".site-footer"), "footer", heroFooterReference);
    }

    function initializeDropdowns() {
        function closeDropdown(item) {
            const button = item.querySelector(".nav-dropdown__toggle");
            item.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-label", `Open ${item.querySelector(".nav-link").textContent.trim()} submenu`);
        }

        document.querySelectorAll(".nav-dropdown__toggle").forEach(function (button) {
            button.addEventListener("click", function () {
                const item = button.closest(".nav-dropdown");
                const willOpen = !item.classList.contains("is-open");

                document.querySelectorAll(".nav-dropdown.is-open").forEach(function (openItem) {
                    closeDropdown(openItem);
                });
                item.classList.toggle("is-open", willOpen);
                button.setAttribute("aria-expanded", String(willOpen));
                button.setAttribute("aria-label", `${willOpen ? "Close" : "Open"} ${item.querySelector(".nav-link").textContent.trim()} submenu`);
            });
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".nav-dropdown")) {
                document.querySelectorAll(".nav-dropdown.is-open").forEach(closeDropdown);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key !== "Escape") {
                return;
            }

            const openDropdown = document.querySelector(".nav-dropdown.is-open");
            if (openDropdown) {
                const button = openDropdown.querySelector(".nav-dropdown__toggle");
                closeDropdown(openDropdown);
                button.focus();
            }
        });
    }
    function initializeFixedNavigation() {
        const navigation = document.querySelector(".hero__nav");
        const footer = document.querySelector(".site-footer");

        if (!navigation || !footer) {
            return;
        }

        function updateFixedState() {
            navigation.classList.toggle("is-fixed", window.scrollY > 160);
        }

        const footerObserver = new IntersectionObserver(function (entries) {
            navigation.classList.toggle("is-footer-visible", entries[0].isIntersecting);
        }, { threshold: 0.08 });

        footerObserver.observe(footer);
        window.addEventListener("scroll", updateFixedState, { passive: true });
        updateFixedState();
    }

    addVideoStudies();
    addAllReferenceLinks();
    initializeDropdowns();
    initializeFixedNavigation();
})();
