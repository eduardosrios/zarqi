(function () {
    "use strict";

    const root = document.documentElement;
    const navigation = document.querySelector("#primaryNavigation");
    const menuButton = document.querySelector(".hero__menu-button");
    let previousDesktopState = window.matchMedia("(min-width: 62rem)").matches;
    let resizeFrame = 0;

    function setViewportState() {
        const viewport = window.visualViewport;
        const viewportHeight = viewport ? viewport.height : window.innerHeight;
        const width = window.innerWidth;
        root.style.setProperty("--stage06-viewport-height", `${viewportHeight}px`);
        root.dataset.stage06Viewport = width >= 1200 ? "desktop" : width >= 992 ? "transition" : width >= 576 ? "tablet" : "phone";
    }

    function resetNavigationState() {
        if (!navigation || !menuButton) {
            return;
        }

        navigation.classList.remove("show");
        menuButton.classList.add("collapsed");
        menuButton.setAttribute("aria-expanded", "false");
        document.querySelectorAll(".nav-dropdown.is-open").forEach(function (dropdown) {
            dropdown.classList.remove("is-open");
        });
        document.querySelectorAll(".nav-dropdown__toggle[aria-expanded='true']").forEach(function (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        });
    }

    function refreshLayoutSystems() {
        if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === "function") {
            window.ScrollTrigger.refresh();
        }
    }

    function handleResize() {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(function () {
            const desktopState = window.matchMedia("(min-width: 62rem)").matches;
            setViewportState();
            if (desktopState !== previousDesktopState) {
                resetNavigationState();
                previousDesktopState = desktopState;
            }
            refreshLayoutSystems();
        });
    }

    setViewportState();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    window.addEventListener("pageshow", refreshLayoutSystems);
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleResize, { passive: true });
    }
})();
