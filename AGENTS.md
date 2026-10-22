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
- Shared site UI lives in src/components/site (ui.tsx primitives, Layout.tsx header/footer/cart/age gate).
