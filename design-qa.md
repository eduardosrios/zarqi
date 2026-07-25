# ETAPA 01 QA

Status: passed for ETAPA 01.

Selected reference: `referencias/final-references/pinterest - top 01 - 025-0499c7d73212.jpg`.
Reason: strongest hero/topbar system for a premium architecture front page: dark framed composition, centered pill navigation, editorial three-line headline, CTA/text grouping, glass stats panel, featured project card, and coherent below-hero rhythm.

Implementation files:
- `template/index.html`
- `template/assets/css/styles.css`
- `template/assets/js/main.js`
- `template/assets/img/hero-residence.jpg`
- `template/assets/img/ridge-house.jpg`
- `template/assets/img/work-residence.jpg`
- `template/assets/vendor/bootstrap/`
- `template/assets/vendor/fontawesome/`
- `template/assets/vendor/jquery/`

Green-flag substitutions:
- Hero residence image replaced with a locally downloaded Unsplash architecture image.
- Featured project image replaced with a locally downloaded Unsplash interior/residential image.
- Showcase image replaced with a locally downloaded Unsplash modern residence image.
- Icons use local Font Awesome Free instead of the exact source icons.
- Brand changed from Axis Haus to zarqi per project rules.

Vendor versions:
- Bootstrap: 5.3.8
- Font Awesome Free: 7.3.1
- jQuery: 4.0.0

Google Fonts:
- Cormorant Garamond for the editorial architecture tone.
- Manrope for nav, CTAs, stats, labels, and compact UI copy.

Visual review and correction passes:
1. Chose best hero from final references based on commercial quality, memorability, hierarchy, typography, image use, and conversion clarity.
2. Built first hero section with frame, dark image, pill nav, CTA, stats, featured card, and continuation sections.
3. Desktop screenshot found headline clipped by the right stats panel; reduced headline width and type scale.
4. Tightened nav pill dimensions to better match the compact reference topbar.
5. Reduced stats panel width, stat item height, stat number size, and featured-card image height.
6. Mobile screenshot found horizontal cropping risk; added overflow constraints and smaller small-screen headline sizing.
7. Added `min-width: 0` to featured-card text column and text nodes so card copy can wrap instead of forcing layout width.
8. Built side-by-side comparison image against the selected reference; found headline line breaks less faithful.
9. Converted headline to explicit source-style line breaks: High-end / residential design / & build.
10. Final desktop screenshot showed clean hero composition with no text clipping, local assets loaded, and source-level hierarchy preserved.

Final font review passes:
1. Confirmed Cormorant Garamond felt too ornate for the main oversized headline, so the hero headline stays in Manrope for closer source fidelity.
2. Kept Cormorant Garamond available for later editorial sections if needed, while ETAPA 01 hero typography remains geometric and modern.
3. Checked CTA/nav/card typography for legibility over dark imagery and corrected sizing to avoid overflow on mobile.

Verification:
- Local page load: `200 /templates/Architecture/template/`
- CSS load: `200 /templates/Architecture/template/assets/css/styles.css`
- JS load: `200 /templates/Architecture/template/assets/js/main.js`
- Bootstrap CSS/JS load: `200`
- Font Awesome CSS load: `200`
- jQuery load: `200`
- Three local images load: `200`
- Desktop screenshot: `tmp/template-hero-pass-04.png`
- Mobile screenshot: `tmp/template-hero-mobile-pass-04-500.png`
- Final comparison: `tmp/etapa01-reference-vs-final.png`

Residual differences accepted for ETAPA 01:
- Exact original hero image is unavailable; an Unsplash substitute was used as allowed by instructions.
- Exact Axis Haus icon is replaced by a Font Awesome architecture icon and zarqi branding.
- Browser headless Chrome on Windows crops the 390px screenshot at a minimum internal width; 500px mobile capture is contained and the CSS includes small-screen overflow guards.
# ETAPA 02 QA

Status: passed for ETAPA 02.

Selected body references and replicated section patterns:
1. Behance top 02: studio overview/details intro.
2. Behance top 02: four service cards.
3. Pinterest top 05: light editorial image/text section.
4. Behance top 02: featured project rail.
5. Pinterest top 08: metric strip.
6. Pinterest top 10: design workflow.
7. Behance top 13: material palette.
8. Behance top 16: full image statement.
9. Dribbble top 03: expertise filter cards.
10. Dribbble top 01: category mosaic.
11. Behance top 20: project overview strip.
12. Pinterest top 08: dark service stack.
13. Pinterest top 05: team row.
14. Pinterest top 05: centered testimonial.
15. Pinterest top 16: journal card grid.
16. Dribbble top 08: technical precision list.
17. Pinterest top 13: philosophy split.
18. Pinterest top 11: partner/logo row.
19. Dribbble top 10: before/after transformation cards.
20. Pinterest top 06: exterior showcase.
21. Pinterest top 14: interior service cards.
22. Behance top 11: urban design map grid.
23. Pinterest top 18: editorial before/after story.
24. Dribbble top 08: FAQ preview.
25. Behance top 12: awards/stat band.
26. Pinterest top 15: seamless journey steps.
27. Pinterest top 04: portfolio carousel row.
28. Pinterest top 10: procurement/specification table.
29. Pinterest top 07: sustainability split.
30. Pinterest top 06: visualization cards.
31. Dribbble top 06: timeline band.
32. Dribbble top 09: location cards.
33. Dribbble top 13: case study deep dive.
34. Behance top 03: inquiry panel.
35. Behance top 10: magazine gallery grid.
36. Dribbble top 14: centered body CTA.

Review loop summary:
- Sections 01-36 were checked against the selected reference contact sheets for content type, hierarchy, layout rhythm, color mood, image use, commercial usefulness, and visual variety.
- Repeated proposal types were kept below the requested cap: service/card systems, project/gallery systems, process/technical systems, editorial image sections, stats/CTA sections, and trust/support sections.
- The temporary `perfect-review-for-section-N` counters reached three consecutive no-change checks for sections whose layout stayed visually stable after the global CSS pass. Sections with visible issues received corrections and restarted checks.
- Corrections applied during the loop: inserted the missing body sections after the correct `</main>` marker, added body-specific CSS, added jQuery interactions, fixed temp preview asset paths, fixed ETAPA 01 active card override, and corrected light-band team role contrast.

Verification:
- Local page load: `200 /templates/Architecture/template/`.
- Body section count: 36.
- Referenced local image files present: 11/11.
- Body preview screenshots: `tmp/etapa02-body-preview-top-02.png`, `tmp/etapa02-body-preview-mid.png`, `tmp/etapa02-body-preview-end.png`, `tmp/etapa02-body-mobile-preview.png`.
- QA contact sheet: `tmp/etapa02-range-qa.png`.
- Mobile width checked at 500px; text and cards remain contained.

Residual differences accepted for ETAPA 02:
- Reference screenshots are used as layout/design sources, not copied as visual assets.
- Photos were replaced by locally downloaded Unsplash images as allowed.
- Icons use local Font Awesome Free as allowed.
- Body sections are implemented as a cohesive zarqi page rather than isolated one-to-one screenshot slices, to keep navigation, content, and spacing consistent across a single HTML template.
# ETAPA 03 QA

Status: passed for ETAPA 03.

Selected footer reference: `referencias/final-references/pinterest - top 02 - 034-9f5f24b6ac1f.jpg`.
Reason: strongest footer among reviewed screenshots because it combines a commercial CTA, contact details, social links, brand block, legal/navigation row, dark architectural mood, thin dividers, and a conversion-oriented final impression.

Footer implementation:
- Added `footer.site-footer#site-footer` after the 36 body sections.
- Built dark architectural CTA column: "Something extraordinary.".
- Added contact methods, address, social icon links, zarqi brand block, and bottom nav/legal strip.
- Used local Font Awesome icons and local `concrete-facade.jpg` background image as green-flag substitutions.

10 review/correction passes:
1. Compared footer structure against the Arcova-style reference: CTA/contact/brand/footer-bottom pattern selected.
2. Checked hierarchy: CTA left, contact middle, brand right retained.
3. Checked visual density: dividers and dark image overlay added to match the robust reference tone.
4. Checked conversion: primary "Start your project" CTA added.
5. Checked brand compliance: Arcova replaced by zarqi.
6. Checked icons: local Font Awesome used for contact and social links.
7. Checked desktop preview: columns align and do not overflow.
8. Checked mobile preview: columns stack cleanly and text remains contained.
9. Checked encoding: copyright glyph converted to `&copy;` entity for ASCII-safe source.
10. Checked full page: footer exists and body section count remains 36.

Verification:
- Local page load: `200 /templates/Architecture/template/`.
- Footer present: true.
- Body sections still present: 36.
- Desktop footer screenshot: `tmp/etapa03-footer-desktop.png`.
- Mobile footer screenshot: `tmp/etapa03-footer-mobile.png`.
- Footer QA sheet: `tmp/etapa03-footer-qa.png`.

Residual differences accepted for ETAPA 03:
- Exact Arcova logo and social destinations are replaced by zarqi branding and local placeholder links.
- Background imagery is a local Unsplash-derived architecture asset, allowed by the instructions.