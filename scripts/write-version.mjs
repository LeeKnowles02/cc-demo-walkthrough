// Writes public/version.json before every build and dev server start: the app's version (from package.json), a
// unique id for this build, and when it was built. The deployed app serves it at /version.json, so a script can
// compare the app's version with the version the docs describe (docs/version.json).
import { randomUUID } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const info = { version, buildId: randomUUID(), builtAt: new Date().toISOString() };
writeFileSync(new URL('../public/version.json', import.meta.url), `${JSON.stringify(info, null, 2)}\n`);
console.log(`version.json: ${version} (build ${info.buildId})`);
