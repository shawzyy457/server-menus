import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/, value => value.slice(1)));
const ignored = new Set([".git", "dist", "node_modules"]);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(absolute));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(absolute);
  }

  return files;
}

await mkdir(path.join(root, "dist"), { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || ignored.has(entry.name)) continue;

  const scopeRoot = path.join(root, entry.name);
  const bundle = {};

  for (const file of (await filesIn(scopeRoot)).sort()) {
    const key = path.relative(scopeRoot, file).replaceAll(path.sep, "/").replace(/\.json$/, "");
    bundle[key] = JSON.parse(await readFile(file, "utf8"));
  }

  await writeFile(
    path.join(root, "dist", `${entry.name}.json`),
    `${JSON.stringify(bundle, null, 2)}\n`,
    "utf8",
  );
}
