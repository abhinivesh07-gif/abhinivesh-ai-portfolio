<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All personal content (bio, links, projects, experience, achievements, certificates, education) lives in `src/data/portfolio.ts`; components only render it, so the owner can edit one file.
- Empty links render a "Coming soon" state via `LinkButton`/`SocialLinks` instead of a URL; never invent links or credentials. Exception: optional extras like a project APK are hidden until `isValidDownloadUrl` (`src/lib/project-links.ts`) accepts the link, so the live site shows no dead buttons for things that may never exist.
- The portfolio is one long scrolling page at `/` with in-page section anchors, because the owner asked for a sticky nav with smooth scrolling between sections.
- Contact form messages are inserted from the browser into `public.contact_messages` (insert-only for anon; no read policy), validated by the shared zod schema in `src/lib/contact-schema.ts`.
- The AI certificate finder is a public server function (`src/lib/certificate-finder.functions.ts`) that sends the certificate list from `portfolio.ts` to Lovable AI Gateway and returns indexes into that list, so it can never show a certificate that isn't in the collection; results are re-validated by `normalizeMatches`.
- Certification filter options (issuer, topic, year) are derived from `portfolio.ts` data via `src/lib/certificate-filters.ts`, so editing a certificate's issuer/date/topics updates the filters with no UI change.
- Opening effects use bounded canvas rendering in ParticleScene, pause drawing offscreen, and bypass the timed intro for reduced motion or deep links to keep navigation accessible.
- Achievement counters derive totals from the achievement collection rather than hardcoded claims, so content edits remain accurate.
