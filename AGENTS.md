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

## Conventions

- App source is plain JavaScript with JSX (`.js`/`.jsx`) — the user asked for React + JavaScript, not TypeScript. Never add `.ts`/`.tsx` app files; only the auto-generated `src/routeTree.gen.ts` and the root `vite.config.ts`/`vitest.config.ts` stay TypeScript because the platform tooling writes or expects them.

