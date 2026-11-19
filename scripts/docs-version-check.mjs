// Daily docs check, step 1: are the docs on the same version as the app?
//
//   node scripts/docs-version-check.mjs
//
// Compares the app's version (package.json here, or APP_VERSION_URL: the deployed app's /version.json) with the
// version the docs describe (version.json in the docs repo). Same version: prints so and exits 0, and the automation
// stops. Different: lists what changed in the app since the docs were last updated (commits and files from the docs'
// appCommit to now) and every doc that exists, writes it all to docs-check.json, and exits 10, so the automation
// goes on to update the docs that cover the change, or write a doc where none exists.
//
// Settings (environment variables, all optional):
//   DOCS_REPO         GitHub repo of the docs (default LeeKnowles02/cc-demo-walkthrough-docs)
//   DOCS_BRANCH       branch of the docs (default main)
//   DOCS_DIR          a local checkout of the docs repo; read instead of GitHub when set
//   APP_VERSION_URL   the deployed app's /version.json; package.json is used when not set
//   OUT               where to write the result (default docs-check.json)
//
// Exit codes: 0 same version, 10 different (docs to update), 1 the check itself failed.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const DOCS_REPO = process.env.DOCS_REPO || 'LeeKnowles02/cc-demo-walkthrough-docs';
const DOCS_BRANCH = process.env.DOCS_BRANCH || 'main';
const DOCS_DIR = process.env.DOCS_DIR;
const OUT = process.env.OUT || 'docs-check.json';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

async function appVersion() {
  if (process.env.APP_VERSION_URL) {
    const res = await fetch(process.env.APP_VERSION_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${process.env.APP_VERSION_URL} answered ${res.status}`);
    const v = await res.json();
    return { version: v.version, buildId: v.buildId ?? null, from: process.env.APP_VERSION_URL };
  }
  const { version } = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  return { version, buildId: null, from: 'package.json' };
}

async function docsFile(rel) {
  if (DOCS_DIR) return readFileSync(path.join(DOCS_DIR, rel), 'utf8');
  const url = `https://raw.githubusercontent.com/${DOCS_REPO}/${DOCS_BRANCH}/${rel}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return res.text();
}

/** Every doc (Markdown under docs/) with its title and type from the front matter. */
async function docsList() {
  let files;
  if (DOCS_DIR) {
    const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(path.join(dir, f)).isDirectory() ? walk(path.join(dir, f)) : [path.join(dir, f)]));
    files = walk(path.join(DOCS_DIR, 'docs')).map((f) => path.relative(DOCS_DIR, f));
  } else {
    const res = await fetch(`https://api.github.com/repos/${DOCS_REPO}/git/trees/${DOCS_BRANCH}?recursive=1`);
    if (!res.ok) throw new Error(`listing ${DOCS_REPO} answered ${res.status}`);
    files = (await res.json()).tree.map((t) => t.path);
  }
  const docs = [];
  for (const file of files.filter((f) => f.startsWith('docs/') && f.endsWith('.md')).sort()) {
    const text = await docsFile(file);
    const field = (name) => new RegExp(`^${name}:\\s*"?([^"\\n]*)"?`, 'm').exec(text)?.[1] ?? null;
    docs.push({ file, title: field('title'), type: field('type'), description: field('description') });
  }
  return docs;
}

/** What changed in the app since the commit the docs describe. */
function appChanges(since) {
  if (!since) return { since: null, commits: [], files: [], note: 'the docs record no appCommit: compare the whole app with the docs' };
  try {
    git('cat-file', '-e', `${since}^{commit}`);
  } catch {
    return { since, commits: [], files: [], note: `commit ${since} is not in this clone (fetch full history): compare the whole app with the docs` };
  }
  const commits = git('log', '--format=%h %s', `${since}..HEAD`).split('\n').filter(Boolean);
  const files = git('diff', '--name-status', `${since}..HEAD`, '--', 'src', 'public', 'package.json')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, ...names] = line.split('\t');
      return { status: { A: 'added', M: 'changed', D: 'deleted' }[status[0]] ?? (status[0] === 'R' ? 'renamed' : status), file: names.at(-1), ...(names.length > 1 ? { from: names[0] } : {}) };
    });
  return { since, commits, files };
}

try {
  const app = await appVersion();
  const docsVersion = JSON.parse(await docsFile('version.json'));
  const same = app.version === docsVersion.appVersion;
  const result = {
    checkedAt: new Date().toISOString(),
    status: same ? 'same' : 'different',
    app: { ...app, commit: git('rev-parse', 'HEAD') },
    docs: { repo: DOCS_REPO, branch: DOCS_BRANCH, appVersion: docsVersion.appVersion, appCommit: docsVersion.appCommit ?? null },
  };

  if (same) {
    writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`);
    console.log(`Docs are up to date: app ${app.version} (${app.from}), docs describe ${docsVersion.appVersion}. Nothing to do.`);
    process.exit(0);
  }

  result.changes = appChanges(docsVersion.appCommit);
  result.docsList = await docsList();
  writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`);

  console.log(`Docs are out of date: app ${app.version} (${app.from}), docs describe ${docsVersion.appVersion}.`);
  console.log(`\nApp changes since ${docsVersion.appCommit?.slice(0, 7) ?? 'the docs were written'}:`);
  for (const c of result.changes.commits) console.log(`  ${c}`);
  for (const f of result.changes.files) console.log(`  ${f.status.padEnd(8)} ${f.from ? `${f.from} -> ` : ''}${f.file}`);
  if (result.changes.note) console.log(`  ${result.changes.note}`);
  console.log(`\nDocs in ${DOCS_REPO}:`);
  for (const d of result.docsList) console.log(`  [${d.type ?? '?'}] ${d.file}: ${d.title ?? ''}`);
  console.log(`\nDetails: ${OUT}`);
  process.exit(10);
} catch (err) {
  console.error(`The docs version check failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
