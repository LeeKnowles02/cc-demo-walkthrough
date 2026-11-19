# Docs automation (daily, Cursor)

The instructions for the Cursor automation that keeps the docs repo ([cc-demo-walkthrough-docs](https://github.com/LeeKnowles02/cc-demo-walkthrough-docs)) in step with this app.

**Schedule:** daily. **Repositories:** this app and the docs repo. **Tools:** open PR, Playwright MCP.

## Prompt

1. In this repo, run `npm ci`, then `npm run docs:check`.
   - Exit code 0 ("Docs are up to date"): stop. Do nothing else.
   - Exit code 1: the check failed. Stop and report the error.
   - Exit code 10: the docs are out of date. Read `docs-check.json` and go on.
2. From `docs-check.json`, take `changes` (the app's commits and changed files since the docs were last updated) and `docsList` (every doc that exists). Read the changed files' diffs to see what a user would notice: a label, a page, a step, a new feature.
3. For each change a user would notice:
   - A doc in `docsList` covers it: update that doc. Change only what the change affects; keep the doc's style (labels in bold, numbered steps).
   - No doc covers it (a new page or feature): write one in the docs repo, under `docs/guides/` for something a user does (numbered steps) or `docs/info/` for what a page shows, with `title`, `description` and `type` front matter like the existing docs.
   - A change no user sees (refactoring, styles only): nothing to write.
4. Run the app (`npm start`, http://localhost:4200) and, with Playwright MCP, follow every guide you changed or wrote, step by step, and check every information page you changed against its page. Fix the doc until it matches what you see. Use only labels you can see on screen.
5. In the docs repo, set `version.json` to the app's version and commit: `{"appVersion": "<app.version>", "appCommit": "<app.commit>"}` from `docs-check.json`.
6. Open one pull request in the docs repo with all of it. In the description list each doc changed or written, the app change it follows, and what you checked with Playwright. If a change could not be checked, say so.
