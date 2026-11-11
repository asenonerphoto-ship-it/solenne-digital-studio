<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (products, steps, FAQs) lives in src/data/*; pages read from there so copy is easy to edit.
- Forms submit through src/lib/forms.ts `submitForm` stub; swap it for a backend call when one is connected.
- Shared site UI lives in src/components/site (ui.tsx primitives, Layout.tsx header/footer/age gate).

- External Shopify embeds use a browser-only SDK provider with one shared Shopify cart; product selections come from src/config/shopify.ts so placeholders never make store requests.
- Reusable product cards read primary and alternate imagery from the product catalog; touch state and desktop hover remain local presentation only.
- Motion: timing/easing tokens and all animation CSS live in the Motion layer section of src/styles.css; scroll reveals are auto-assigned per route by useAutoReveal (src/lib/motion.tsx) via data-m attributes, so new page content animates without extra wiring (opt out with data-m-skip).

- Retro lifestyle photo slots are centralized by their supplied hyphenated names in src/lib/images.ts so replacements require only one path change.
- Doodles are independently replaceable SVG components, placed through per-section data in src/data/doodles.ts to keep art positioning editable.
- Shared retro photo bands, tilted frames and section labels live in the site Retro module; product-card color comes from category, never flavor.
